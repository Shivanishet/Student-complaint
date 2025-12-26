import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/college-logo.svg";

const AdminAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [popup, setPopup] = useState(""); // Popup message
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
      setPopup("Failed to fetch complaints");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/complaints/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaints(prev =>
        prev.map(c => (c._id === id ? { ...c, status } : c))
      );

      setPopup(`Status updated to "${status}"`);
      setTimeout(() => setPopup(""), 3000);
    } catch (err) {
      console.error(err);
      setPopup("Failed to update status");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  const logout = () => {
    localStorage.clear();
    setShowLogoutPopup(true);
    setTimeout(() => {
      setShowLogoutPopup(false);
      navigate("/");
    }, 1500);
  };

  const navLinks = [
    { name: "Dashboard", onClick: () => navigate("/dashboard") },
    { name: "Reports", onClick: () => navigate("/admin-reports") },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      {/* Navbar */}
      {(role === "admin" || role === "student") && (
        <div style={styles.navbar}>
          <div style={styles.left}>
            <img src={logo} alt="College Logo" style={styles.logo} />
            <h3 style={styles.navTitle}>Student Complaint System</h3>
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

      <h2 style={{ marginTop: "90px" }}>All Complaints</h2>

      {/* Popup */}
      {popup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: popup.includes("Failed") ? "#f44336" : "#4caf50",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {popup}
        </div>
      )}

      {complaints.map(complaint => (
        <div
          key={complaint._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <p><b>Name:</b> {complaint.name}</p>
          <p><b>Email:</b> {complaint.studentEmail}</p>
          <p><b>Title:</b> {complaint.title}</p>
          <p><b>Category:</b> {complaint.category}</p>
          <p><b>Description:</b> {complaint.description}</p>
          <p><b>Status:</b> <span style={{ fontWeight: "bold", color: "white" }}>{complaint.status}</span></p>

          <div style={{ marginTop: "10px" }}>
            {["Submitted", "InProgress", "Resolved", "Closed"].map(s => (
              <button
                key={s}
                onClick={() => updateStatus(complaint._id, s)}
                style={{
                  marginRight: "8px",
                  padding: "5px 10px",
                  backgroundColor: complaint.status === s ? "#4caf50" : "#eee",
                  color: complaint.status === s ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout popup */}
      {showLogoutPopup && (
        <div style={styles.logoutPopup}>You have been logged out!</div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
    backgroundColor: "transparent",
    zIndex: 100,
  },
  left: { display: "flex", alignItems: "center", gap: "14px" },
  logo: { height: "50px", width: "50px" },
  navTitle: { fontSize: "20px", fontWeight: "600", color: "#fff" },
  links: { display: "flex", gap: "15px", cursor: "pointer", paddingRight: "10px" },
  link: { transition: "color 0.3s ease", fontSize: "16px", padding: "6px 10px", borderRadius: "6px" },
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

export default AdminAllComplaints;
