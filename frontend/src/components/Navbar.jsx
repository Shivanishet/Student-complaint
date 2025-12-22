import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/college-logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      {/* LEFT */}
      <div style={styles.left}>
        <img src={logo} alt="College Logo" style={styles.logo} />
        <h3 style={styles.title}>Student Complaint System</h3>
      </div>

      {/* CENTER */}
      <div style={styles.center}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/raise-complaint" style={styles.link}>Raise</Link>
        <Link to="/view-complaints" style={styles.link}>View</Link>
        <Link to="/track-complaint" style={styles.link}>Track</Link>

        {role === "admin" && (
          <>
            <Link to="/admin-all-complaints" style={styles.link}>All</Link>
            <Link to="/admin-reports" style={styles.link}>Reports</Link>
          </>
        )}
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    width: "100%",
    height: "70px",
    backgroundColor: "#1e293b",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "260px", // 🔹 keeps center centered
  },

  center: {
    flex: 1, // 🔹 occupies remaining space
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
  },

  right: {
    minWidth: "120px",
    display: "flex",
    justifyContent: "flex-end",
  },

  logo: {
    height: "48px",
    width: "48px",
    objectFit: "contain",
  },

  title: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    padding: "6px 8px",
    flexWrap: "wrap",
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    border: "none",
    color: "white",
    padding: "7px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;
