import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    closeMenu();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          V-Store
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="navbar-menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* NAVIGATION */}
        <nav
          className={`navbar-links ${
            menuOpen ? "navbar-links-open" : ""
          }`}
        >
          {/* HOME */}
          <Link
            to="/"
            className={`navbar-link ${
              isActive("/") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* LAPTOPS */}
          <Link
            to="/shop"
            className={`navbar-link ${
              isActive("/shop") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Laptops
          </Link>
           {/* ABOUT */}
          <Link
            to="/about"
            className={`navbar-link ${
              isActive("/about") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            About
          </Link>

          {/* FAVORITES */}
          <Link
            to="/favorites"
            className={`navbar-link ${
              isActive("/favorites") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Favorites
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className={`navbar-link ${
              isActive("/cart") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Cart
          </Link>

          {/* PROFILE */}
          <Link
            to="/profile"
            className={`navbar-link ${
              isActive("/profile") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Profile
          </Link>
          {/* LOGOUT */}
          <button
            type="button"
            className="navbar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}