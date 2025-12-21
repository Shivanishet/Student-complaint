import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const RaiseComplaint = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Raise Complaint</h2>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <form style={styles.form} onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        {/* Title */}
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />

        {/* Category */}
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={styles.input}
  required
>
  <option value="" disabled>
    Write Category
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


        {/* Description */}
        <textarea
          placeholder="Complaint Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: "100px" }}
          required
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
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
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
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
  error: {
    color: "red",
    textAlign: "center",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
};

export default RaiseComplaint;
