import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const About = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={styles.page}
    >
      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>About Our Website</h1>
        <p style={styles.heroSubtitle}>
          A simple and transparent platform for managing student complaints
        </p>
      </section>

      {/* ===== CONTENT ===== */}
      <section style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Student Complaint Management System</h2>
          <p style={styles.text}>
            The <strong>Student Complaint Management System</strong> helps students
            submit complaints related to academics, administration, or campus
            facilities in an organized manner.
          </p>
          <p style={styles.text}>
            Students can track complaint progress, while administrators can
            efficiently review and resolve issues, ensuring transparency and
            accountability.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.subHeading}>How to Use This Website</h3>
          <ul style={styles.list}>
            <li>Login as a student or admin</li>
            <li>Submit complaints with proper details</li>
            <li>Track complaint status anytime</li>
            <li>Admins can update and resolve complaints</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h3 style={styles.subHeading}>Guidelines</h3>
          <ul style={styles.list}>
            <li>Provide clear information while submitting complaints</li>
            <li>Avoid duplicate submissions</li>
            <li>Use respectful language</li>
            <li>Check updates regularly</li>
          </ul>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <h4 style={styles.footerTitle}>Student Complaint System</h4>
            <p style={styles.footerText}>
              Making grievance redressal simple and transparent.
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
              Email: shivanishet035@gmail.com<br />
              Phone : 6360877518
            </p>
          </div>
        </div>

        <div style={styles.footerBottom}>
          © {new Date().getFullYear()} Student Complaint Management System. All
          rights reserved.
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
  heroTitle: { fontSize: "42px" },
  heroSubtitle: { fontSize: "18px", opacity: 0.9 },

  content: {
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  heading: { fontSize: "28px", marginBottom: "15px" },
  subHeading: { fontSize: "22px", marginBottom: "10px" },
  text: { fontSize: "16px", lineHeight: "1.7", color: "#444" },
  list: { paddingLeft: "20px", color: "#444" },

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
    fontSize: "13px",
    borderTop: "1px solid #333",
    color: "#aaa",
  },
};

export default About;
