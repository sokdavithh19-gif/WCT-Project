import { Link } from 'react-router-dom';
import SpecStrip from './SpecStrip';
import { useFavorites } from '../../context/FavoritesContext';

function stockTag(stock) {
  if (stock <= 0) {
    return {
      cls: 'out',
      label: 'Out of stock',
    };
  }

  if (stock <= 5) {
    return {
      cls: 'low',
      label: `Only ${stock} left`,
    };
  }

  return {
    cls: 'in',
    label: 'In stock',
  };
}

export default function ProductCard({ laptop }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const fav = isFavorite(laptop.id);
  const tag = stockTag(Number(laptop.stock));

  return (
    <div className="product-card">

      {/* ================= IMAGE ================= */}
      <Link
        to={`/laptops/${laptop.id}`}
        className="product-thumb"
      >
        {laptop.image_url ? (
          <img
            src={laptop.image_url}
            alt={laptop.name}
            className="product-image"
          />
        ) : (
          <span className="no-image">
            NO IMAGE
          </span>
        )}

        {/* Favorite button */}
        <button
          type="button"
          className={`fav-toggle ${fav ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(laptop.id);
          }}
          aria-label={
            fav
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          title={
            fav
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
        >
          {fav ? '♥' : '♡'}
        </button>
      </Link>

      {/* ================= PRODUCT BODY ================= */}
      <div className="product-body">

        {/* Brand */}
        <span className="product-brand">
          {laptop.brand}
        </span>

        {/* Product name */}
        <Link
          to={`/laptops/${laptop.id}`}
          className="product-name-link"
        >
          <h3 className="product-name">
            {laptop.name}
          </h3>
        </Link>

        {/* Specifications */}
        <SpecStrip
          specs={[
            ['SKU', `#${laptop.id}`],
            ['STOCK', laptop.stock],
          ]}
        />

        {/* Price + Stock */}
        <div className="product-footer">

          <span className="price">
            $
            {Number(laptop.price).toLocaleString()}
          </span>

          <span
            className={`stock-tag ${tag.cls}`}
          >
            {tag.label}
          </span>

        </div>

      </div>
    </div>
  );
}