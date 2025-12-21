import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>My Complaints</h2>

        {error && <p style={styles.error}>{error}</p>}

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

              <p><strong>Status:</strong> {c.status}</p>
              <p><strong>Date:</strong> {new Date(c.createdAt).toLocaleDateString()}</p>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
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
                        setComplaints(complaints.filter(x => x._id !== c._id));
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
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
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

  /* 🔘 COMMON BUTTON BASE */
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

  backBtn: {
    background: "#f59e0b",
    marginTop: "20px",
    padding: "10px",
  },

  error: { color: "red" },
};

export default ViewComplaints;
