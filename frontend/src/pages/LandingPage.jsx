import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/college-logo.svg";
import collegePhoto from "../assets/college-photo1.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  const navLinks = [
   { name: "Home", onClick: () => window.location.href = "/" },

    { name: "Login", onClick: () => navigate("/login") },
   { name: "About", onClick: () => navigate("/about") },

   { name: "Contact", onClick: () => navigate("/contact") }

  ];

  return (

    <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, x: -100 }}   // 👈 THIS IS THE BUTTON CLICK EFFECT
  transition={{ duration: 0.6, ease: "easeInOut" }}
  style={{ ...styles.container, backgroundImage: `url(${collegePhoto})` }}
>

    
      <motion.div
        style={styles.navbar}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div style={styles.left}>
          <img src={logo} alt="College Logo" style={styles.logo} />
          <h3 style={styles.title}>Student Complaint System</h3>
        </div>

        <div style={styles.links}>
          {navLinks.map((link, idx) => (
            <motion.span
              key={idx}
              onClick={link.onClick}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              whileHover={{ scale: 1.1 }}
              style={{
                ...styles.link,
                color: hoverIndex === idx ? "#eb0505ff" : "#111",
              }}
            >
              {link.name}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h1 style={styles.heading}>Welcome to Our College</motion.h1>
        <motion.p style={styles.text}>
          Manage your complaints efficiently with our Student Complaint System.
        </motion.p>

        <motion.button
          style={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

/* ✅ VERY IMPORTANT: styles must be defined here */
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#111",
  },
  navbar: {
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 60px",
    height: "70px",
    backgroundColor: "transparent",
    zIndex: 20,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logo: {
    height: "50px",
    width: "50px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
  },
  links: {
    display: "flex",
    gap: "30px",
    cursor: "pointer",
  },
  link: {
    transition: "color 0.3s ease",
    fontSize: "16px",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "15px",
  },
  heading: {
    fontSize: "52px",
    fontWeight: "700",
  },
  text: {
    fontSize: "20px",
    maxWidth: "600px",
  },
  cta: {
    padding: "14px 28px",
    fontSize: "18px",
    backgroundColor: "#ef4444",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "white",
  },
};

export default LandingPage;
