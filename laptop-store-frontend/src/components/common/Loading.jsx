export function Loading({ label = 'Loading…' }) {
  return <p className="center muted" style={{ padding: '40px 0', fontFamily: 'var(--font-mono)' }}>{label}</p>;
}

export function EmptyState({ title, subtitle, action }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
      {action}
    </div>
  );
}
