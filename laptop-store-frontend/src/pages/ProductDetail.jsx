import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchLaptop } from '../api/laptops';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import SpecStrip from '../components/product/SpecStrip';
import { Loading } from '../components/common/Loading';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState(null); // {type, message}
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchLaptop(id)
      .then((res) => setLaptop(res.data))
      .catch(() => setLaptop(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container page"><Loading /></div>;
  if (!laptop) return <div className="container page"><p>Laptop not found.</p></div>;

  const handleAdd = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/laptops/${id}` } } });
      return;
    }
    setAdding(true);
    setStatus(null);
    try {
      await addItem(laptop.id, qty);
      setStatus({ type: 'success', message: 'Added to cart.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Could not add to cart.' });
    } finally {
      setAdding(false);
    }
  };

  const fav = isFavorite(laptop.id);

  return (
    <div className="container page">
      <Link to="/shop" className="btn-ghost" style={{ display: 'inline-block', marginBottom: 16 }}>← Back to shop</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div className="product-thumb" style={{ borderRadius: 'var(--radius-lg)', aspectRatio: '4/3' }}>
          {laptop.image_url ? <img src={laptop.image_url} alt={laptop.name} /> : <span>NO IMAGE</span>}
        </div>

        <div>
          <span className="product-brand">{laptop.brand}</span>
          <h1>{laptop.name}</h1>
          <p className="price" style={{ fontSize: '1.6rem' }}>${Number(laptop.price).toLocaleString()}</p>

          <SpecStrip
            size="lg"
            specs={[
              ['SKU', `#${laptop.id}`],
              ['STOCK', laptop.stock],
              ['BRAND', laptop.brand],
            ]}
          />

          <p style={{ marginTop: 18 }}>{laptop.description || 'No description provided.'}</p>

          {status && <div className={`alert alert-${status.type === 'error' ? 'error' : 'success'}`}>{status.message}</div>}

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 16 }}>
            <div className="qty-control">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(laptop.stock || 1, q + 1))}>+</button>
            </div>
            <button className="btn btn-primary" disabled={laptop.stock <= 0 || adding} onClick={handleAdd}>
              {laptop.stock <= 0 ? 'Out of stock' : adding ? 'Adding…' : 'Add to cart'}
            </button>
            <button
              className={`btn btn-secondary ${fav ? 'active' : ''}`}
              onClick={() => toggleFavorite(laptop.id)}
            >
              {fav ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
