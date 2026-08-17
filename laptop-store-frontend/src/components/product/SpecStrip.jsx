// Renders a laptop's key specs as small monospace chips, e.g.
// [BRAND] Dell  [STOCK] 12  — used on cards, detail hero, and admin rows.
export default function SpecStrip({ specs, size = '' }) {
  return (
    <div className={`spec-strip ${size}`}>
      {specs.map(([label, value]) => (
        <span className="spec-chip" key={label}>
          <b>{label}</b> {value}
        </span>
      ))}
    </div>
  );
}
