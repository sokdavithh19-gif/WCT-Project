import { Link } from "react-router-dom";

export default function About() {
  return (
    <div
      className="container page"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "70px 24px",
      }}
    >
      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "70px",
        }}
      >
        <span
          className="eyebrow"
          style={{
            display: "inline-block",
            padding: "7px 15px",
            borderRadius: "20px",
            background: "#f0efff",
            color: "#5b52e8",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1.5px",
            marginBottom: "20px",
          }}
        >
          ABOUT V-STORE
        </span>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: "1",
            letterSpacing: "-3px",
            margin: "0 auto 25px",
            fontWeight: "800",
            maxWidth: "900px",
          }}
        >
          The right laptop.
          <br />
          <span style={{ color: "#5b52e8" }}>
            For the way you work.
          </span>
        </h1>

        <p
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#666",
          }}
        >
          V-Store is a laptop store offering reliable computers
          for students, professionals, creators, gamers, and
          everyday users. We make it easier to find the right
          laptop at the right price.
        </p>
      </section>

      {/* ABOUT V-STORE */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "25px",
          marginBottom: "70px",
        }}
      >
        <div
          style={{
            background: "#111",
            color: "#fff",
            borderRadius: "24px",
            padding: "45px",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#9b94ff",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1.5px",
            }}
          >
            WHO WE ARE
          </span>

          <h2
            style={{
              fontSize: "34px",
              lineHeight: "1.15",
              margin: "15px 0",
              letterSpacing: "-1px",
            }}
          >
            Technology made
            <br />
            <span style={{ color: "#9b94ff" }}>
              simple.
            </span>
          </h2>

          <p
            style={{
              color: "#aaa",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            At V-Store, we believe buying a laptop should
            be simple and straightforward. Our goal is to
            provide quality laptops with clear specifications,
            competitive prices, and a smooth shopping experience.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #e8e8e8",
            borderRadius: "24px",
            padding: "35px",
            background: "#fafafa",
          }}
        >
          <h3
            style={{
              margin: "0 0 25px",
              fontSize: "22px",
            }}
          >
            Why shop with us?
          </h3>

          <div style={{ display: "grid", gap: "22px" }}>
            <Info
              title="Quality Products"
              text="Carefully selected laptops from trusted brands."
            />

            <Info
              title="Competitive Prices"
              text="Great value for students, professionals and businesses."
            />

            <Info
              title="Clear Information"
              text="Detailed specifications help you choose with confidence."
            />

            <Info
              title="Easy Shopping"
              text="Browse, compare, add to cart and order with ease."
            />
          </div>
        </div>
      </section>

      {/* WHAT WE SELL */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "70px",
        }}
      >
        <span
          style={{
            color: "#5b52e8",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1.5px",
          }}
        >
          OUR PRODUCTS
        </span>

        <h2
          style={{
            fontSize: "38px",
            margin: "10px 0 15px",
            letterSpacing: "-1.5px",
          }}
        >
          Laptops for every need
        </h2>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto 35px",
            color: "#666",
            lineHeight: "1.7",
          }}
        >
          Whether you need a laptop for studying, working,
          gaming, programming, or creative work, V-Store
          helps you find a device that fits your needs.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
            textAlign: "left",
          }}
        >
          <ProductType
            title="Everyday"
            text="Affordable laptops for school, browsing, entertainment and daily tasks."
          />

          <ProductType
            title="Business"
            text="Reliable and productive laptops designed for professional work."
          />

          <ProductType
            title="Gaming & Performance"
            text="Powerful laptops built for gaming, development, design and demanding workloads."
          />
        </div>
      </section>

      {/* HOW WE WORK */}
      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <span
            style={{
              color: "#5b52e8",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1.5px",
            }}
          >
            OUR PROMISE
          </span>

          <h2
            style={{
              fontSize: "38px",
              margin: "10px 0",
              letterSpacing: "-1.5px",
            }}
          >
            A better way to buy laptops
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
          }}
        >
          <Step
            number="01"
            title="Choose"
            text="Browse our selection and find laptops that match your needs."
          />

          <Step
            number="02"
            title="Compare"
            text="Review specifications, prices and available stock."
          />

          <Step
            number="03"
            title="Order"
            text="Add your laptop to the cart and complete your purchase."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          background: "#f4f4f6",
          borderRadius: "24px",
          padding: "55px 40px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "#5b52e8",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1.5px",
          }}
        >
          V-STORE
        </span>

        <h2
          style={{
            fontSize: "40px",
            margin: "12px 0",
            letterSpacing: "-1.5px",
          }}
        >
          Find your next laptop.
        </h2>

        <p
          style={{
            color: "#666",
            marginBottom: "28px",
          }}
        >
          Explore our collection and find the laptop that's right for you.
        </p>

        {/* FIXED BUTTON */}
        <Link
          to="/shop"
          style={{
            display: "inline-block",
            padding: "13px 24px",
            background: "#111",
            color: "#fff",
            borderRadius: "9px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Shop Laptops →
        </Link>
      </section>
    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function Info({ title, text }) {
  return (
    <div>
      <h4
        style={{
          margin: "0 0 5px",
          fontSize: "15px",
        }}
      >
        {title}
      </h4>

      <p
        style={{
          margin: 0,
          color: "#777",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function ProductType({ title, text }) {
  return (
    <div
      style={{
        padding: "28px",
        border: "1px solid #e8e8e8",
        borderRadius: "18px",
        background: "#fff",
      }}
    >
      <h3
        style={{
          margin: "0 0 10px",
          fontSize: "19px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#777",
          fontSize: "14px",
          lineHeight: "1.7",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div
      style={{
        padding: "30px",
        border: "1px solid #e8e8e8",
        borderRadius: "18px",
      }}
    >
      <span
        style={{
          color: "#5b52e8",
          fontSize: "13px",
          fontWeight: "800",
        }}
      >
        {number}
      </span>

      <h3
        style={{
          margin: "12px 0 8px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#777",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        {text}
      </p>
    </div>
  );
}