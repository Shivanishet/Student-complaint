import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/Dashboard_picture.jpeg";
import logo from "../assets/college-logo.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [hoverIndex, setHoverIndex] = useState(null); // for hover effects
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowLogoutPopup(true);
    setTimeout(() => {
      setShowLogoutPopup(false);
      navigate("/");
    }, 1500);
  };

  // Navbar links
  const navLinks =
    role === "student"
      ? [
          { name: "Raise", onClick: () => navigate("/raise-complaint") },
          { name: "View", onClick: () => navigate("/view-complaints") },
          { name: "Track", onClick: () => navigate("/track-complaint") },
        ]
      : role === "admin"
      ? [
          { name: "All Complaints", onClick: () => navigate("/admin-all-complaints") },
          { name: "Reports", onClick: () => navigate("/admin-reports") },
        ]
      : [];

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>

        {/* Navbar (Login page style) */}
        {(role === "student" || role === "admin") && isLoggedIn && (
          <div style={styles.navbar}>
            <div style={styles.left}>
              <img src={logo} alt="College Logo" style={styles.logo} />
              <h3 style={styles.navTitle}>
                {role === "student" ? "Student Dashboard" : "Admin Dashboard"}
              </h3>
            </div>

            <div style={styles.links}>
              {navLinks.map((link, idx) => (
                <span
                  key={idx}
                  onClick={link.onClick}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{
                    ...styles.link,
                    color: hoverIndex === idx ? "#eb0505ff" : "#fff",
                  }}
                >
                  {link.name}
                </span>
              ))}
              <span
                onClick={logout}
                onMouseEnter={() => setHoverIndex(navLinks.length)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  ...styles.link,
                  color: hoverIndex === navLinks.length ? "#eb0505ff" : "#fff",
                }}
              >
                Logout
              </span>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div style={styles.welcome}>
          <h3>Welcome, {email || "User"} 👋</h3>
          <p>You are logged in as <b>{role}</b></p>
        </div>

        {/* Dashboard Cards */}
        <div style={styles.cardContainer}>
          {role === "student" && isLoggedIn && (
            <>
              <DashboardCard
                icon="📝"
                title="Raise Complaint"
                desc="Submit a new complaint to the college administration"
                onClick={() => navigate("/raise-complaint")}
              />
              <DashboardCard
                icon="📂"
                title="My Complaints"
                desc="View all complaints you have raised"
                onClick={() => navigate("/view-complaints")}
              />
              <DashboardCard
                icon="📊"
                title="Track Complaint"
                desc="Track the status of your complaint"
                onClick={() => navigate("/track-complaint")}
              />
            </>
          )}

          {role === "admin" && isLoggedIn && (
            <>
              <DashboardCard
                icon="📋"
                title="All Complaints"
                desc="View and manage all complaints"
                onClick={() => navigate("/admin-all-complaints")}
              />
              <DashboardCard
                icon="📈"
                title="Reports"
                desc="View complaint statistics and reports"
                onClick={() => navigate("/admin-reports")}
              />
            </>
          )}
        </div>

        {/* Logout Popup */}
        {showLogoutPopup && (
          <div style={styles.logoutPopup}>
            You have been logged out!
          </div>
        )}

      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, desc, onClick }) => (
  <div style={styles.card} onClick={onClick}>
    <div style={styles.icon}>{icon}</div>
    <h4 style={styles.cardTitle}>{title}</h4>
    <p style={styles.cardDesc}>{desc}</p>
    <button style={styles.cardBtn}>OPEN</button>
  </div>
  
);

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    paddingBottom: "40px",
  },

  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    paddingTop: "80px",
  },

  /* Navbar styles (Login page style) */
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 5px",
    backgroundColor: "transparent",
    zIndex: 100,
  },
  left: { display: "flex", alignItems: "center", gap: "14px" },
  logo: { height: "50px", width: "50px" },
  navTitle: { fontSize: "20px", fontWeight: "600", color: "#fff" },
  links: { display: "flex", gap: "15px", cursor: "pointer", paddingRight: "10px" },
  link: { transition: "color 0.3s ease", fontSize: "16px", padding: "6px 10px", borderRadius: "6px" },

  welcome: { textAlign: "center", color: "#fff", margin: "30px 0" },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    padding: "0 30px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  icon: { fontSize: "36px", marginBottom: "12px" },
  cardTitle: { margin: "10px 0", color: "#333" },
  cardDesc: { fontSize: "14px", color: "#555", marginBottom: "18px" },
  cardBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logoutPopup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 30px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    zIndex: 200,
    textAlign: "center",
  },
};

export default Dashboard;
