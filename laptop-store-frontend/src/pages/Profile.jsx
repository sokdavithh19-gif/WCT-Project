import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchOrders } from "../api/orders";
import {
  Loading,
  EmptyState,
} from "../components/common/Loading";

const ADDR_KEY = "saved_addresses";

/* =========================================================
   ADDRESS BOOK
========================================================= */

function AddressBook() {
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(ADDR_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading addresses:", error);
      return [];
    }
  });

  const [form, setForm] = useState({
    label: "",
    line1: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     SAVE ADDRESSES TO LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      ADDR_KEY,
      JSON.stringify(addresses)
    );
  }, [addresses]);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  /* =========================================================
     SAVE / UPDATE ADDRESS
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.label.trim()) {
      setError("Please enter an address label.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!form.line1.trim()) {
      setError("Please enter your street address.");
      return;
    }

    if (!form.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    /* UPDATE EXISTING ADDRESS */

    if (editingId !== null) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingId
            ? {
                ...address,
                ...form,
              }
            : address
        )
      );

      setMessage("Address updated successfully.");
    }

    /* ADD NEW ADDRESS */

    else {
      const newAddress = {
        id: Date.now(),
        label: form.label.trim(),
        phone: form.phone.trim(),
        line1: form.line1.trim(),
        city: form.city.trim(),
        zip: form.zip.trim(),
      };

      setAddresses((prev) => [
        ...prev,
        newAddress,
      ]);

      setMessage("Address saved successfully.");
    }

    resetForm();
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setForm({
      label: "",
      line1: "",
      city: "",
      zip: "",
      phone: "",
    });

    setEditingId(null);
  };

  /* =========================================================
     EDIT ADDRESS
  ========================================================= */

  const handleEdit = (address) => {
    setForm({
      label: address.label || "",
      line1: address.line1 || "",
      city: address.city || "",
      zip: address.zip || "",
      phone: address.phone || "",
    });

    setEditingId(address.id);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE ADDRESS
  ========================================================= */

  const handleRemove = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this address?"
    );

    if (!confirmDelete) {
      return;
    }

    setAddresses((prev) =>
      prev.filter(
        (address) => address.id !== id
      )
    );

    setMessage("Address removed successfully.");

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div>
      {/* =====================================================
          MESSAGES
      ===================================================== */}

      {message && (
        <div
          className="alert alert-success"
          style={{
            marginBottom: 20,
            padding: "12px 16px",
            borderRadius: 8,
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          className="alert alert-danger"
          style={{
            marginBottom: 20,
            padding: "12px 16px",
            borderRadius: 8,
          }}
        >
          {error}
        </div>
      )}

      {/* =====================================================
          SAVED ADDRESSES
      ===================================================== */}

      <div
        style={{
          marginBottom: 35,
        }}
      >
        <h2
          style={{
            marginBottom: 8,
          }}
        >
          Saved addresses
        </h2>

        <p
          className="muted"
          style={{
            marginTop: 0,
          }}
        >
          Manage your delivery addresses and phone numbers.
        </p>
      </div>

      {addresses.length === 0 ? (
        <div
          style={{
            padding: 25,
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            marginBottom: 30,
          }}
        >
          <p
            className="muted"
            style={{
              margin: 0,
            }}
          >
            No saved addresses yet.
            Add your first delivery address below.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 16,
            marginBottom: 35,
          }}
        >
          {addresses.map((address) => (
            <div
              key={address.id}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 16,
                padding: 22,
                background: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              {/* ADDRESS INFORMATION */}

              <div
                style={{
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 18,
                    }}
                  >
                    {address.label || "Address"}
                  </h3>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 6,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#555",
                    }}
                  >
                    📍 {address.line1}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#555",
                    }}
                  >
                    🏙️ {address.city}
                    {address.zip
                      ? `, ${address.zip}`
                      : ""}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#555",
                    }}
                  >
                    📱 {address.phone}
                  </p>
                </div>
              </div>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    handleEdit(address)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() =>
                    handleRemove(address.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================
          ADD / EDIT ADDRESS FORM
      ===================================================== */}

      <div
        style={{
          borderTop: "1px solid #e5e5e5",
          paddingTop: 30,
        }}
      >
        <h2
          style={{
            marginBottom: 8,
          }}
        >
          {editingId !== null
            ? "Edit address"
            : "Add new address"}
        </h2>

        <p
          className="muted"
          style={{
            marginTop: 0,
            marginBottom: 25,
          }}
        >
          Enter your delivery information below.
        </p>

        <form
          className="form"
          onSubmit={handleSubmit}
          style={{
            maxWidth: 520,
          }}
        >
          {/* LABEL */}

          <div className="field">
            <label>
              Address label
            </label>

            <input
              type="text"
              name="label"
              placeholder="Home, Office, School..."
              value={form.label}
              onChange={handleChange}
            />
          </div>

          {/* PHONE */}

          <div className="field">
            <label>
              Phone number *
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="012 345 678"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* STREET ADDRESS */}

          <div className="field">
            <label>
              Street address *
            </label>

            <input
              type="text"
              name="line1"
              placeholder="Street, house number..."
              value={form.line1}
              onChange={handleChange}
              required
            />
          </div>

          {/* CITY + ZIP */}

          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            <div
              className="field"
              style={{
                flex: 1,
              }}
            >
              <label>
                City *
              </label>

              <input
                type="text"
                name="city"
                placeholder="Phnom Penh"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div
              className="field"
              style={{
                width: 130,
              }}
            >
              <label>
                ZIP
              </label>

              <input
                type="text"
                name="zip"
                placeholder="12000"
                value={form.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FORM BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 8,
            }}
          >
            <button
              className="btn btn-secondary"
              type="submit"
            >
              {editingId !== null
                ? "Update address"
                : "Save address"}
            </button>

            {editingId !== null && (
              <button
                className="btn btn-ghost"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   ORDER STATUS
========================================================= */

function statusClass(status) {
  return `status-pill status-${status}`;
}

/* =========================================================
   ORDER HISTORY
========================================================= */

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const justOrderedId =
    location.state?.justOrderedId;

  /* =======================================================
     FETCH ORDERS
  ======================================================= */

  useEffect(() => {
    fetchOrders()
      .then((res) => {
        setOrders(
          res.data?.data ?? []
        );
      })
      .catch((error) => {
        console.error(
          "Error fetching orders:",
          error
        );

        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return <Loading />;
  }

  /* =======================================================
     EMPTY ORDERS
  ======================================================= */

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        subtitle="Your purchases will show up here."
      />
    );
  }

  /* =======================================================
     ORDERS TABLE
  ======================================================= */

  return (
    <div className="table-wrap">
      {/* ORDER SUCCESS MESSAGE */}

      {justOrderedId && (
        <div
          className="alert alert-success"
          style={{
            marginBottom: 14,
          }}
        >
          Order #{justOrderedId} placed
          successfully — thank you!
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              {/* ORDER ID */}

              <td>
                #{order.id}
              </td>

              {/* DATE */}

              <td>
                {order.created_at
                  ? new Date(
                      order.created_at
                    ).toLocaleDateString()
                  : "-"}
              </td>

              {/* ITEMS */}

              <td>
                {order.items?.length
                  ? order.items
                      .map(
                        (item) =>
                          item.laptop?.name
                      )
                      .filter(Boolean)
                      .join(", ")
                  : "No items"}
              </td>

              {/* TOTAL */}

              <td className="price">
                $
                {Number(
                  order.total_price || 0
                ).toLocaleString()}
              </td>

              {/* STATUS */}

              <td>
                <span
                  className={statusClass(
                    order.status
                  )}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   PROFILE PAGE
========================================================= */

export default function Profile() {
  const { user } = useAuth();

  const [tab, setTab] = useState("orders");

  return (
    <div className="container page">

      {/* ===================================================
          PROFILE HEADER
      =================================================== */}

      <div
        style={{
          marginBottom: 30,
        }}
      >
        <span className="eyebrow">
          ACCOUNT
        </span>

        <h1
          style={{
            marginBottom: 8,
          }}
        >
          {user?.name || "My Account"}
        </h1>

        <p
          className="muted"
          style={{
            marginTop: 0,
          }}
        >
          {user?.email || "No email available"}

          {user?.role && (
            <>
              {" "}
              · role: {user.role}
            </>
          )}
        </p>
      </div>

      {/* ===================================================
          TABS
      =================================================== */}

      <div className="tabs">

        <div
          className={`tab ${
            tab === "orders"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTab("orders")
          }
        >
          Order history
        </div>

        <div
          className={`tab ${
            tab === "addresses"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTab("addresses")
          }
        >
          Saved addresses
        </div>

      </div>

      {/* ===================================================
          TAB CONTENT
      =================================================== */}

      {tab === "orders" ? (
        <OrderHistory />
      ) : (
        <AddressBook />
      )}

    </div>
  );
}