import {
  Mail,
  Phone,
  Send,
  MapPin,
  ShieldCheck,
  HelpCircle,
  RotateCcw,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";
// =========================
// SOCIAL ICONS
// =========================

const Facebook = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    {...props}
  >
    <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" />
  </svg>
);

const Instagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const Youtube = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    {...props}
  >
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8-.5-5.8s0-3.9-.5-5.8ZM9.5 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

const Telegram = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    {...props}
  >
    <path d="M21.9 3.7 2.7 11.2c-1 .4-1 1.7.1 2l4.7 1.5 1.8 5.5c.2.6 1 .8 1.4.3l2.6-2.7 4.6 3.4c.7.5 1.7.1 1.9-.7l3.4-15.6c.2-.9-.7-1.5-1.4-1.2ZM8.5 14l9.2-6.4c.2-.1.4.1.2.3l-7.6 7.1-.3 3-1.5-4Z" />
  </svg>
);

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    {...props}
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.58.1.79-.25.79-.56v-2.1c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.27-1.29-5.27-5.72 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.42-5.28 5.71.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

// =========================
// FOOTER
// =========================

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      style={{
        width: "100%",
        background: "#fff",
        color: "#111",
        padding: "55px 5% 25px",
        marginTop: "60px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "40px",
          width: "100%",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        {/* =========================
            QR
        ========================= */}

<div>
  <h3 style={titleStyle}>
    V-Store QR
  </h3>

  <div
    style={{
      width: "115px",
      height: "115px",
      border: "3px solid #111",
      marginTop: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      overflow: "hidden",
    }}
  >
    <img
      src="/vstore-qr.png"
      alt="V-Store QR Code"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </div>
</div>
        {/* =========================
            MEMBERSHIP
        ========================= */}

        <div>
          <h3 style={titleStyle}>
            Membership
          </h3>

          <FooterLink
            icon={<Heart size={19} />}
            text="Membership & Benefits"
          />

          <FooterLink
            icon={<Heart size={19} />}
            text="Rewards Program"
          />

          <FooterLink
            icon={<Heart size={19} />}
            text="Special Offers"
          />
        </div>

        {/* =========================
            FOLLOW US
        ========================= */}

        <div>
          <h3 style={titleStyle}>
            FOLLOW US
          </h3>

          <FooterLink
            icon={<Facebook />}
            text="Facebook"
            to="https://web.facebook.com/sokk.davithh"
          />

          <FooterLink
            icon={<Instagram />}
            text="Instagram"
            to="https://www.instagram.com/d4vth_xyz"
          />

          <FooterLink
            icon={<Telegram />}
            text="Telegram"
            to="https://t.me/SokkDavithh"
          />

          <FooterLink
            icon={<Github />}
            text="GitHub"
            to="https://github.com/sokdavithh19-gif"
          />

          <FooterLink
            icon={<Youtube />}
            text="Youtube"
            to="https://www.youtube.com/@dvxvvs"
          />
        </div>

        {/* =========================
            CUSTOMER SERVICES
        ========================= */}

        <div>
          <h3 style={titleStyle}>
            CUSTOMER SERVICES
          </h3>

          <FooterLink
            icon={<RotateCcw size={19} />}
            text="Online exchange policy"
          />

          <FooterLink
            icon={<ShieldCheck size={19} />}
            text="Privacy Policy"
          />

          <FooterLink
            icon={<HelpCircle size={19} />}
            text="FAQs & guides"
          />

          <FooterLink
            icon={<MapPin size={19} />}
            text="Find a store"
          />
        </div>

        {/* =========================
            CONTACT
        ========================= */}

        <div>
          <h3 style={titleStyle}>
            CONTACT US
          </h3>

          <FooterLink
            icon={<Mail size={19} />}
            text="vstore@vstore.com"
          />

          <FooterLink
            icon={<Phone size={19} />}
            text="(+855) 096 89 42 997"
          />

          <FooterLink
            icon={<Send size={19} />}
            text="Telegram"
            to="https://t.me/SokkDavithh"
          />
        </div>
      </div>

      {/* =========================
          PAYMENT METHODS
      ========================= */}

      <div
        style={{
          width: "100%",
          maxWidth: "1500px",
          margin: "55px auto 0",
        }}
      >
        <h3 style={titleStyle}>
          WE ACCEPT
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <PaymentBox text="ABA PAY" />
          <PaymentBox text="VISA" />
          <PaymentBox text="MASTER CARD" />
          <PaymentBox text="UNIONPAY" />
          <PaymentBox text="ACLEDA" />
          <PaymentBox text="WING" />
          <PaymentBox text="BANK TRANSFER" />
          <PaymentBox text="CASH ON DELIVERY" />
        </div>
      </div>

      {/* =========================
          DIVIDER
      ========================= */}

      <div
        style={{
          width: "100%",
          maxWidth: "1500px",
          margin: "65px auto 0",
          borderTop: "1px solid #999",
        }}
      />

      {/* =========================
          COPYRIGHT
      ========================= */}

      <div
        style={{
          width: "100%",
          maxWidth: "1500px",
          margin: "30px auto 0",
          display: "flex",
          justifyContent: "flex-end",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            textAlign: "right",
          }}
        >
          © 2026 V-Store. All rights reserved.
        </p>
      </div>

      {/* =========================
          BACK TO TOP
      ========================= */}

      <button
        onClick={scrollToTop}
        title="Back to top"
        style={{
          position: "fixed",
          right: "25px",
          bottom: "25px",

          width: "45px",
          height: "45px",

          borderRadius: "50%",
          border: "1px solid #111",

          background: "#fff",
          color: "#111",

          cursor: "pointer",

          fontSize: "20px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          zIndex: 999,
        }}
      >
        ↑
      </button>
    </footer>
  );
}

// =========================
// FOOTER LINK
// =========================

function FooterLink({ icon, text, to, external = false }) {
  const content = (
    <>
      <span
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </span>

      <span
        style={{
          overflowWrap: "anywhere",
        }}
      >
        {text}
      </span>
    </>
  );

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "13px",
    fontSize: "16px",
    lineHeight: "1.4",
    minWidth: 0,
    color: "#111",
    textDecoration: "none",
  };

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={to}
      style={linkStyle}
    >
      {content}
    </Link>
  );
}
// =========================
// PAYMENT BOX
// =========================

function PaymentBox({ text }) {
  return (
    <div
      style={{
        minHeight: "32px",
        minWidth: "75px",
        padding: "0 10px",

        border: "1px solid #ddd",
        borderRadius: "4px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        boxSizing: "border-box",

        fontSize: "11px",
        fontWeight: "600",

        background: "#fafafa",

        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
}

// =========================
// TITLE STYLE
// =========================

const titleStyle = {
  fontSize: "19px",
  fontWeight: "700",
  margin: "0 0 22px",
  lineHeight: "1.3",
};