import { useEffect, useState, useCallback } from 'react';
import { fetchLaptops } from '../api/laptops';
import ProductCard from '../components/product/ProductCard';
import { Loading, EmptyState } from '../components/common/Loading';

const SORTS = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest' },
];

export default function ProductList() {
  const [data, setData] = useState({ data: [], current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);

  const load = useCallback(() => {
    setLoading(true);
    fetchLaptops({
      search: search || undefined,
      brand: brand || undefined,
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
      sort,
      page,
    })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [search, brand, minPrice, maxPrice, sort, page]);

  useEffect(() => {
    const t = setTimeout(load, 300); // debounce typing
    return () => clearTimeout(t);
  }, [load]);

  const laptops = data.data ?? [];

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <span className="eyebrow">Catalog</span>
          <h1 style={{ marginBottom: 0 }}>Shop laptops</h1>
        </div>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search by name or brand…"
          value={search}
          onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => { setPage(1); setBrand(e.target.value); }}
          style={{ width: 120 }}
        />
        <input
          type="number"
          placeholder="Min $"
          value={minPrice}
          onChange={(e) => { setPage(1); setMinPrice(e.target.value); }}
          style={{ width: 90 }}
        />
        <input
          type="number"
          placeholder="Max $"
          value={maxPrice}
          onChange={(e) => { setPage(1); setMaxPrice(e.target.value); }}
          style={{ width: 90 }}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : laptops.length === 0 ? (
        <EmptyState title="No laptops match those filters" subtitle="Try widening your search." />
      ) : (
        <>
          <div className="product-grid">
            {laptops.map((l) => <ProductCard key={l.id} laptop={l} />)}
          </div>

          {data.last_page > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
              <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                ← Prev
              </button>
              <span className="muted" style={{ alignSelf: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                {data.current_page} / {data.last_page}
              </span>
              <button className="btn btn-secondary btn-sm" disabled={page >= data.last_page} onClick={() => setPage((p) => p + 1)}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
