import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/Raise.jpeg";
import logo from "../assets/college-logo.svg";

export default function TrackComplaint() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("studentEmail");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.clear();
    setShowLogoutPopup(true);
    setTimeout(() => {
      setShowLogoutPopup(false);
      navigate("/");
    }, 1500);
  };

  const navLinks =
    role === "student"
      ? [
          { name: "Raise", onClick: () => navigate("/raise-complaint") },
          { name: "View", onClick: () => navigate("/view-complaints") },
          { name: "Dashboard", onClick: () => navigate("/dashboard") },
        ]
      : role === "admin"
      ? [
          { name: "All Complaints", onClick: () => navigate("/admin-all-complaints") },
          { name: "Reports", onClick: () => navigate("/admin-reports") },
        ]
      : [];

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints/my");
        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "rgba(0,0,0,0.25)",
          paddingTop: "100px", // space for navbar
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "40px",
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>Track Complaints</h2>

        {loading && <p style={{ color: "#fff" }}>Loading complaints...</p>}
        {!loading && complaints.length === 0 && (
          <p style={{ color: "#fff" }}>No complaints raised yet.</p>
        )}

        {!loading &&
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                color: "#000",
              }}
            >
              <h3 style={{ color: "#000" }}>{complaint.title}</h3>
              <p>
  <strong>Status:</strong>{" "}
  <span style={{ color: "#000", fontWeight: "bold" }}>
    {complaint.status}
  </span>
</p>

            </div>
          ))}

        {/* Logout popup */}
        {showLogoutPopup && (
          <div style={styles.logoutPopup}>You have been logged out!</div>
        )}
      </div>
    </div>
  );
}

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
