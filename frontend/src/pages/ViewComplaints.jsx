import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import bgImage from "../assets/Raise.jpeg";
import logo from "../assets/college-logo.svg";

const categories = [
  "Academics",
  "Hostel",
  "Infrastructure",
  "Examination",
  "Faculty",
  "Administration",
  "Transport",
  "Cafeteria",
  "Other",
];

const ViewComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints/view");
        setComplaints(res.data);
      } catch (err) {
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const logout = () => {
    localStorage.clear();
    setShowLogoutPopup(true);
    setTimeout(() => {
      setShowLogoutPopup(false);
      navigate("/");
    }, 1500);
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/complaints/${id}`, {
        category: editCategory,
        description: editDescription,
      });

      alert("Complaint updated successfully");

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id
            ? { ...c, category: editCategory, description: editDescription }
            : c
        )
      );

      setEditId(null);
    } catch (err) {
      alert("Failed to update complaint");
    }
  };

  const navLinks = [
    { name: "Raise", onClick: () => navigate("/raise-complaint") },
    { name: "Track", onClick: () => navigate("/track-complaint") },
    { name: "Dashboard", onClick: () => navigate("/dashboard") },
  ];

  return (
    <div style={styles.page}>
      {/* Navbar */}
      {(role === "student" || role === "admin") && (
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

      {/* Overlay + content */}
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h2 style={styles.heading}>My Complaints</h2>

          {error && <p style={styles.error}>{error}</p>}

          {loading && <p style={{ color: "#fff" }}>Loading...</p>}

          <div style={styles.cardContainer}>
            {complaints.map((c) => (
              <div key={c._id} style={styles.card}>
                <h3>{c.title}</h3>

                {/* CATEGORY */}
                <p>
                  <strong>Category:</strong>{" "}
                  {editId === c._id ? (
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    c.category
                  )}
                </p>

                {/* DESCRIPTION */}
                <p>
                  <strong>Description:</strong>{" "}
                  {editId === c._id ? (
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows="3"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    c.description
                  )}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: "#000", fontWeight: "bold" }}>
                    {c.status}
                  </span>
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>

                {/* ACTION BUTTONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {editId === c._id ? (
                    <>
                      <button
                        style={{ ...styles.buttonBase, ...styles.saveBtn }}
                        onClick={() => handleUpdate(c._id)}
                      >
                        Save
                      </button>

                      <button
                        style={{ ...styles.buttonBase, ...styles.cancelBtn }}
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ ...styles.buttonBase, ...styles.updateBtn }}
                        onClick={() => {
                          setEditId(c._id);
                          setEditCategory(c.category);
                          setEditDescription(c.description);
                        }}
                      >
                        Update
                      </button>

                      <button
                        style={{ ...styles.buttonBase, ...styles.trackBtn }}
                        onClick={() => navigate("/track-complaint")}
                      >
                        Track
                      </button>

                      <button
                        style={{ ...styles.buttonBase, ...styles.deleteBtn }}
                        onClick={async () => {
                          if (!window.confirm("Delete this complaint?")) return;
                          await API.delete(`/complaints/${c._id}`);
                          setComplaints(
                            complaints.filter((x) => x._id !== c._id)
                          );
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            style={{ ...styles.buttonBase, ...styles.backBtn }}
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Logout popup */}
      {showLogoutPopup && (
        <div style={styles.logoutPopup}>You have been logged out!</div>
      )}
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: "40px",
  },
  container: { maxWidth: "900px", margin: "auto" },
  heading: { color: "#fff" },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    color: "#000",
  },

  /* Navbar styles */
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

  /* Buttons */
  buttonBase: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
  },
  updateBtn: { background: "#2563eb" },
  trackBtn: { background: "#16a34a" },
  saveBtn: { background: "#16a34a" },
  cancelBtn: { background: "#f59e0b" },
  deleteBtn: { background: "#dc2626" },
  backBtn: { background: "#f59e0b", marginTop: "20px", padding: "10px" },
  error: { color: "red" },
};

export default ViewComplaints;
