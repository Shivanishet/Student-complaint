import { color, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null);

  const members = [
    {
      name: "Shivani Shet",
      role: "Admin",
      email: "shivanishet035@gmail.com",
      phone: "6360877518",
    },
    {
      name: "Shivayogi",
      role: "Admin",
      email: "shivayogi.cs24@bmsce.ac.in",
      phone: "9008855283",
    },
    {
      name: "Shashank S Patil",
      role: "Admin",
      email: "shashankspatil.cs24@bmsce.ac.in",
      phone: "8660806538",
    },
    {
      name: "Shashank N S",
      role: "Admin",
      email: "shashankns.cs24@bmsce.ac.in",
      phone: "7338345452",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.6 }}
      style={styles.page}
    >
      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Contact Us</h1>
        <p style={styles.heroSubtitle}>
          Meet the team behind the Student Complaint Management System
        </p>
      </section>

      {/* ===== TEAM ===== */}
      <section style={styles.team}>
        {members.map((m, i) => (
          <div
            key={i}
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <h3 style={styles.name}>{m.name}</h3>
            <p style={styles.role}>{m.role}</p>
            <hr style={styles.line} />
            <p style={styles.info}>
              📧 <a href={`mailto:${m.email}`} style={styles.link}>{m.email}</a>
            </p>
            <p style={styles.info}>
              📞 <a href={`tel:${m.phone}`} style={styles.link}>{m.phone}</a>
            </p>
          </div>
        ))}
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <h4 style={styles.footerTitle}>Student Complaint System</h4>
            <p style={styles.footerText}>
              A transparent platform for student grievance handling.
            </p>
          </div>

          <div>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <ul style={styles.footerLinks}>
  {["home", "about", "login", "contact"].map((link) => (
    <li
      key={link}
      onClick={() =>
        link === "contact"
          ? window.location.href = "/contact"   // Reloads page
          : navigate(link === "home" ? "/" : `/${link}`)
      }
      onMouseEnter={() => setHover(link)}
      onMouseLeave={() => setHover(null)}
      style={{
        color: hover === link ? "#2575fc" : "#ccc",
        cursor: "pointer",
        transition: "color 0.3s",
      }}
    >
      {link.charAt(0).toUpperCase() + link.slice(1)}
    </li>
  ))}
</ul>

          </div>

          <div>
            <h4 style={styles.footerTitle}>Contact</h4>
            <p style={styles.footerText}>
              Email: complaint123@gmail.com<br />
              Phone : +91 00134 34987
            </p>
          </div>
        </div>

        <div style={styles.footerBottom}>
          © {new Date().getFullYear()} Student Complaint Management System
        </div>
      </footer>
    </motion.div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    flexDirection: "column",
  },
  hero: {
    padding: "80px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
  },
  heroTitle: { fontSize: "40px" },
  heroSubtitle: { fontSize: "18px", opacity: 0.9 },

  team: {
    padding: "50px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  name: { fontSize: "20px", fontWeight: "600", color: "#111" },
  role: { fontSize: "14px", color: "#666", marginBottom: "10px" },
  line: { margin: "10px 0" },
  info: { fontSize: "14px", color: "#444" },
  link: { color: "#2575fc", textDecoration: "none" },

  footer: { backgroundColor: "#111", marginTop: "auto" },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    padding: "40px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  footerTitle: { color: "#fff", marginBottom: "10px" },
  footerText: { fontSize: "14px", color: "#ccc" },
  footerLinks: { listStyle: "none", padding: 0, lineHeight: "1.8" },
  footerBottom: {
    textAlign: "center",
    padding: "15px",
    borderTop: "1px solid #333",
    fontSize: "13px",
    color: "#aaa",
  },
};

export default Contact;
