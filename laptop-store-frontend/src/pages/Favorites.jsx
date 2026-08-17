import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { fetchLaptop } from '../api/laptops';
import ProductCard from '../components/product/ProductCard';
import { Loading, EmptyState } from '../components/common/Loading';

export default function Favorites() {
  const { favoriteIds } = useFavorites();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setLaptops([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(favoriteIds.map((id) => fetchLaptop(id).then((r) => r.data).catch(() => null)))
      .then((results) => setLaptops(results.filter(Boolean)))
      .finally(() => setLoading(false));
  }, [favoriteIds]);

  return (
    <div className="container page">
      <span className="eyebrow">Saved</span>
      <h1 style={{ marginBottom: 20 }}>Your wishlist</h1>
      {loading ? (
        <Loading />
      ) : laptops.length === 0 ? (
        <EmptyState
          title="No saved laptops yet"
          subtitle="Tap the ♡ on any laptop to save it here."
          action={<Link to="/shop" className="btn btn-primary">Browse laptops</Link>}
        />
      ) : (
        <div className="product-grid">
          {laptops.map((l) => <ProductCard key={l.id} laptop={l} />)}
        </div>
      )}
    </div>
  );
}
