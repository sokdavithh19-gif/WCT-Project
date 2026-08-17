import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLaptops } from '../api/laptops';
import ProductCard from '../components/product/ProductCard';
import { Loading } from '../components/common/Loading';

export default function Home() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaptops({ sort: 'newest' })
      .then((res) => setLaptops(res.data.data?.slice(0, 8) ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">V-Store — laptop store</span>
            <h1>Laptops, plainly specified.</h1>
            <p>
              No marketing fog. Every listing shows exactly what's inside — CPU, RAM, storage —
              so you compare machines, not adjectives.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/shop" className="btn btn-primary">Browse catalog</Link>
              <Link to="/about" className="btn btn-secondary">Why V-Store</Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="line"><span>STATUS</span><span className="ok">READY</span></div>
            <div className="line"><span>CATALOG</span><span>{laptops.length ? `${laptops.length}+ laptops` : '…'}</span></div>
            <div className="line"><span>CHECKOUT</span><span>real-time stock</span></div>
            <div className="line"><span>SHIPPING</span><span>tracked orders</span></div>
          </div>
        </div>
      </section>

      <div className="container page">
        <div className="page-head">
          <h2>Newest arrivals</h2>
          <Link to="/shop" className="btn btn-ghost">View all →</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="product-grid">
            {laptops.map((l) => (
              <ProductCard key={l.id} laptop={l} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
