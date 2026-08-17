import { useEffect, useState } from 'react';
import { adminFetchUsers, adminUpdateUserRole } from '../../api/admin';
import { useAuth } from '../../context/AuthContext';
import { Loading } from '../../components/common/Loading';

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [data, setData] = useState({ data: [], current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    setLoading(true);
    adminFetchUsers(page).then((res) => setData(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, [page]);

  const handleRoleChange = async (user, role) => {
    setUpdatingId(user.id);
    try {
      await adminUpdateUserRole(user.id, role);
      load();
    } finally {
      setUpdatingId(null);
    }
  };

  const users = data.data ?? [];

  return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      disabled={updatingId === u.id || u.id === me?.id}
                      onChange={(e) => handleRoleChange(u, e.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                    {u.id === me?.id && <span className="muted" style={{ marginLeft: 8, fontSize: '0.78rem' }}>(you)</span>}
                  </td>
                  <td className="muted">{new Date(u.created_at).toLocaleDateString()}</td>
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
