import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import logo from "../assets/college-logo.svg";

const COLORS = ["#FFBB28", "#0088FE", "#00C49F", "#FF8042"];

const AdminReports = () => {
  const [reports, setReports] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/reports", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, [token]);

  const logout = () => {
    localStorage.clear();
    setShowLogoutPopup(true);
    setTimeout(() => {
      setShowLogoutPopup(false);
      navigate("/");
    }, 1500);
  };

  const navLinks = [
    { name: "All Complaints", onClick: () => navigate("/admin-all-complaints") },
    { name: "Dashboard", onClick: () => navigate("/dashboard") },
  ];

  if (!reports) return <p>Loading reports...</p>;

  const pieData = [
    { name: "Submitted", value: reports.statusCounts.submitted },
    { name: "In Progress", value: reports.statusCounts.inprogress },
    { name: "Resolved", value: reports.statusCounts.resolved },
    { name: "Closed", value: reports.statusCounts.closed },
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

      <h2 style={{ textAlign: "center", marginTop: "90px" }}>Complaint Reports</h2>
      <p style={{ textAlign: "center" }}>
        <b>Total Complaints:</b> {reports.total}
      </p>

      {/* Centered Pie Chart */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* List of complaints */}
      <div style={{ marginTop: "30px" }}>
        {reports.complaints.map(c => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><b>Name:</b> {c.candidateName}</p>
            <p><b>Email:</b> {c.candidateEmail}</p>
            <p><b>Date:</b> {new Date(c.createdAt).toLocaleDateString()}</p>
            <p><b>Complaint:</b> {c.text}</p>
            <p><b>Status:</b> <span style={{ fontWeight: "bold", color: "white" }}>{c.status}</span></p>
          </div>
        ))}
      </div>

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

export default AdminReports;
