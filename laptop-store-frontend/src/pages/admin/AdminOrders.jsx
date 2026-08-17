import { useEffect, useState } from 'react';
import { adminFetchOrders, adminUpdateOrderStatus } from '../../api/admin';
import { Loading, EmptyState } from '../../components/common/Loading';

const STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

export default function AdminOrders() {
  const [data, setData] = useState({ data: [], current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    setLoading(true);
    adminFetchOrders({ status: status || undefined, page }).then((res) => setData(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, [status, page]);

  const handleStatusChange = async (order, newStatus) => {
    setUpdatingId(order.id);
    try {
      await adminUpdateOrderStatus(order.id, newStatus);
      load();
    } finally {
      setUpdatingId(null);
    }
  };

  const orders = data.data ?? [];

  return (
    <div>
      <div className="page-head">
        <h2 style={{ margin: 0 }}>Orders</h2>
        <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <EmptyState title="No orders found" />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>#</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Placed</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.user?.name}<br /><span className="muted" style={{ fontSize: '0.78rem' }}>{o.user?.email}</span></td>
                  <td>{o.items?.map((i) => `${i.quantity}× ${i.laptop?.name}`).join(', ')}</td>
                  <td className="price">${Number(o.total_price).toLocaleString()}</td>
                  <td>
                    <select
                      value={o.status}
                      disabled={updatingId === o.id}
                      onChange={(e) => handleStatusChange(o, e.target.value)}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="muted">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.last_page > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← Prev</button>
          <span className="muted" style={{ alignSelf: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{data.current_page} / {data.last_page}</span>
          <button className="btn btn-secondary btn-sm" disabled={page >= data.last_page} onClick={() => setPage((p) => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}
