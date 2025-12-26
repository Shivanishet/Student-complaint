import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import bgImage from "../assets/Raise.jpeg";
import logo from "../assets/college-logo.svg";
import { motion } from "framer-motion";

const RaiseComplaint = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const studentEmail = localStorage.getItem("studentEmail");

    if (!description.trim()) {
      return setError("Complaint description cannot be empty.");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("studentEmail", studentEmail);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);

      if (file) {
        formData.append("file", file);
      }

      await API.post("/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Complaint submitted successfully!");
      setName("");
      setTitle("");
      setCategory("Academics");
      setDescription("");
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLinks = [
    { name: "Track", onClick: () => navigate("/track-complaint") },
    { name: "View", onClick: () => navigate("/view-complaints") },
    { name: "Dashboard", onClick: () => navigate("/dashboard") },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        {/* Navbar */}
        <motion.div
          style={styles.navbar}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div style={styles.left}>
            <img src={logo} alt="College Logo" style={styles.logo} />
            <h3 style={styles.navTitle}>Student Complaint System</h3>
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
                  color: hoverIndex === idx ? "#eb0505ff" : "#fff",
                }}
              >
                {link.name}
              </motion.span>
            ))}
            <motion.span
              onClick={logout}
              onMouseEnter={() => setHoverIndex(navLinks.length)}
              onMouseLeave={() => setHoverIndex(null)}
              whileHover={{ scale: 1.1 }}
              style={{
                ...styles.link,
                color: hoverIndex === navLinks.length ? "#eb0505ff" : "#fff",
              }}
            >
              Logout
            </motion.span>
          </div>
        </motion.div>

        {/* Page Heading */}
        <h2 style={styles.heading}>Raise Complaint</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Complaint Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
            required
          >
            <option value="" disabled>
              Category
            </option>
            <option value="Academics">Academics</option>
            <option value="Hostel">Hostel</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Examination">Examination</option>
            <option value="Faculty">Faculty</option>
            <option value="Administration">Administration</option>
            <option value="Transport">Transport</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            placeholder="Complaint Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...styles.input, height: "100px" }}
            required
          />
          <button type="submit" style={styles.submitBtn}>
            Submit Complaint
          </button>
          <button
            type="button"
            style={styles.backBtn}
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </form>
      </div>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "80px", // leave space for navbar
  },
  overlay: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    color: "#fff",
    marginBottom: "20px",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
  },
  submitBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  backBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#e74c3c",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "5px",
  },
  error: { color: "red", textAlign: "center" },
  success: { color: "green", textAlign: "center" },

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
    padding: "0 5px",
    backgroundColor: "transparent",
    zIndex: 100,
  },
  left: { display: "flex", alignItems: "center", gap: "14px" },
  logo: { height: "50px", width: "50px" },
  navTitle: { fontSize: "20px", fontWeight: "600", color: "#fff" },
  links: { display: "flex", gap: "15px", cursor: "pointer", paddingRight: "10px" },
  link: { transition: "color 0.3s ease", fontSize: "16px", padding: "6px 10px", borderRadius: "6px" },
};

export default RaiseComplaint;
