import { useEffect, useState } from 'react';
import { adminFetchLaptops, adminCreateLaptop, adminUpdateLaptop, adminDeleteLaptop } from '../../api/admin';
import { Loading, EmptyState } from '../../components/common/Loading';

const EMPTY_FORM = { name: '', brand: '', description: '', price: '', stock: '', image_url: '' };

export default function AdminLaptops() {
  const [data, setData] = useState({ data: [], current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null); // laptop object or null
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminFetchLaptops(page).then((res) => setData(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, [page]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (laptop) => {
    setEditing(laptop);
    setForm({
      name: laptop.name,
      brand: laptop.brand,
      description: laptop.description || '',
      price: laptop.price,
      stock: laptop.stock,
      image_url: laptop.image_url || '',
    });
    setError(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editing) {
        await adminUpdateLaptop(editing.id, payload);
      } else {
        await adminCreateLaptop(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? Object.values(errors).flat().join(' ') : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (laptop) => {
    if (!confirm(`Delete "${laptop.name}"? This can't be undone.`)) return;
    await adminDeleteLaptop(laptop.id);
    load();
  };

  const laptops = data.data ?? [];

  return (
    <div>
      <div className="page-head">
        <h2 style={{ margin: 0 }}>Inventory</h2>
        <button className="btn btn-primary" onClick={openCreate}>+ Add laptop</button>
      </div>

      {showForm && (
        <div className="form-card" style={{ margin: '0 0 24px', maxWidth: 480 }}>
          <h3>{editing ? `Edit "${editing.name}"` : 'New laptop'}</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="field">
              <label>Brand</label>
              <input required value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="field" style={{ flex: 1 }}>
                <label>Price (USD)</label>
                <input type="number" min="0" step="0.01" required value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label>Stock</label>
                <input type="number" min="0" required value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
              </div>
            </div>
            <div className="field">
              <label>Image URL</label>
              <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} placeholder="https://…" />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            {error && <div className="form-error">{error}</div>}
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" disabled={saving} type="submit">{saving ? 'Saving…' : 'Save'}</button>
              <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : laptops.length === 0 ? (
        <EmptyState title="No laptops yet" subtitle="Add your first laptop to the catalog." />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Brand</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {laptops.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{l.brand}</td>
                  <td className="price">${Number(l.price).toLocaleString()}</td>
                  <td>{l.stock <= 5 ? <span className="status-pill status-pending">{l.stock} left</span> : l.stock}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => openEdit(l)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(l)}>Delete</button>
                  </td>
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
