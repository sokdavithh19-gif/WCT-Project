import { useEffect, useState } from 'react';
import { fetchDashboard } from '../../api/admin';
import { Loading } from '../../components/common/Loading';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard().then((res) => setData(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (!data) return <p>Could not load dashboard.</p>;

  const { totals, orders_by_status, low_stock_laptops, recent_orders } = data;

  return (
    <div>
      <div className="stat-grid">
        <Stat label="Revenue" value={`$${Number(totals.revenue).toLocaleString()}`} />
        <Stat label="Orders" value={totals.orders} />
        <Stat label="Laptops" value={totals.laptops} />
        <Stat label="Customers" value={totals.users} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <h3>Orders by status</h3>
          <div className="spec-strip lg">
            {Object.entries(orders_by_status || {}).map(([status, count]) => (
              <span className={`status-pill status-${status}`} key={status}>{status}: {count}</span>
            ))}
          </div>

          <h3 style={{ marginTop: 24 }}>Low stock (≤ 5 units)</h3>
          {low_stock_laptops?.length ? (
            <table className="data-table">
              <thead><tr><th>Laptop</th><th>Brand</th><th>Stock</th></tr></thead>
              <tbody>
                {low_stock_laptops.map((l) => (
                  <tr key={l.id}><td>{l.name}</td><td>{l.brand}</td><td>{l.stock}</td></tr>
                ))}
              </tbody>
            </table>
          ) : <p className="muted">Nothing low on stock.</p>}
        </div>

        <div>
          <h3>Recent orders</h3>
          {recent_orders?.length ? (
            <table className="data-table">
              <thead><tr><th>#</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {recent_orders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.user?.name}</td>
                    <td className="price">${Number(o.total_price).toLocaleString()}</td>
                    <td><span className={`status-pill status-${o.status}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="muted">No orders yet.</p>}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
