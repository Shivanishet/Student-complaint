import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <div style={styles.page}>
      {/* Top Navbar */}
      <div style={styles.navbar}>
        <h2 style={{ margin: 0 }}>🎓 College Complaint System</h2>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* Welcome Section */}
      <div style={styles.welcome}>
        <h3>Welcome, {email || "User"} 👋</h3>
        <p>You are logged in as <b>{role}</b></p>
      </div>

      {/* Dashboard Cards */}
      <div style={styles.cardContainer}>

        {/* Student Cards */}
        {role === "student" && (
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

        

        {/* Admin Cards */}
        {role === "admin" && (
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
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    paddingBottom: "40px"
  },

  navbar: {
    backgroundColor: "#ffffff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  },

  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  welcome: {
    textAlign: "center",
    color: "#ffffff",
    margin: "30px 0"
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    padding: "0 30px"
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease"
  },

  icon: {
    fontSize: "36px",
    marginBottom: "12px"
  },

  cardTitle: {
    margin: "10px 0",
    color: "#333"
  },

  cardDesc: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "18px"
  },

  cardBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Dashboard;
