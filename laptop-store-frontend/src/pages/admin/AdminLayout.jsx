import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/laptops', label: 'Inventory' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/users', label: 'Users' },
];

export default function AdminLayout() {
  return (
    <div className="container page">
      <span className="eyebrow">Admin</span>
      <h1 style={{ marginBottom: 20 }}>Store management</h1>
      <div className="tabs">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
