import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { EmptyState } from '../components/common/Loading';

export default function Cart() {
  const { items, total, updateItem, removeItem, checkout, loading } = useCart();
  const [error, setError] = useState(null);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setError(null);
    setPlacing(true);
    try {
      const order = await checkout();
      navigate('/profile', { state: { justOrderedId: order.id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!loading && items.length === 0) {
    return (
      <div className="container page">
        <EmptyState
          title="Your cart is empty"
          subtitle="Browse the catalog and add a laptop to get started."
          action={<Link to="/shop" className="btn btn-primary">Browse laptops</Link>}
        />
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Your cart</h1>
      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="thumb">
                {item.laptop.image_url && <img src={item.laptop.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <Link to={`/laptops/${item.laptop.id}`}><strong>{item.laptop.name}</strong></Link>
                <p style={{ margin: '2px 0' }} className="muted">${Number(item.laptop.price).toLocaleString()} each</p>
              </div>
              <div className="qty-control">
                <button onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateItem(item.id, item.quantity + 1)}>+</button>
              </div>
              <span className="price">${(item.laptop.price * item.quantity).toLocaleString()}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="summary-card">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${Number(total).toLocaleString()}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <div className="summary-row total"><span>Total</span><span>${Number(total).toLocaleString()}</span></div>
          {error && <div className="alert alert-error" style={{ marginTop: 10 }}>{error}</div>}
          <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} disabled={placing} onClick={handleCheckout}>
            {placing ? 'Placing order…' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}
