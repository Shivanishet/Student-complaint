import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import API from "../services/api";
import loginBackpage from "../assets/login-backpage.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await API.post("/auth/register", { name, email, password, role });
        const res = await API.post("/auth/login", { email, password, role });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("studentEmail", email);
        navigate("/dashboard");
      } else {
        const res = await API.post("/auth/login", { email, password, role });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("studentEmail", email);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || (isRegister ? "Registration failed" : "Login failed")
      );
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%", // changed from 100vw
        backgroundImage: `url(${loginBackpage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden", // prevents scrolling
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={styles.form}
      >
        <h2 style={styles.title}>College Complaint System</h2>
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.roleContainer}>
          {["student", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                ...styles.roleButton,
                backgroundColor: role === r ? "#2575fc" : "#ccc",
                color: role === r ? "#fff" : "#333",
              }}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.submitButton}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          style={styles.toggleText}
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New user? Register here"}
        </p>
      </motion.form>
    </div>
  );
};

const styles = {
  form: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: { marginBottom: "20px", color: "#333", textAlign: "center" },
  roleContainer: { display: "flex", marginBottom: "20px", width: "100%" },
  roleButton: {
    flex: 1,
    padding: "8px 0",
    margin: "0 4px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: { color: "red", marginBottom: "10px", fontSize: "14px", textAlign: "center" },
  toggleText: {
    marginTop: "15px",
    color: "#2575fc",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
    textAlign: "center",
  },
};

export default Login;
