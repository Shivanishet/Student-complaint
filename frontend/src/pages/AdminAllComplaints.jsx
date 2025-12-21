import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [popup, setPopup] = useState(""); // Popup message
  const token = localStorage.getItem("token");

  // Fetch all complaints from backend
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

  // Update complaint status
  const updateStatus = async (id, status) => {
    console.log("Updating complaint:", id, status);
    try {
      await axios.put(
        `http://localhost:5000/api/admin/complaints/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state immediately
      setComplaints(prev =>
        prev.map(c => (c._id === id ? { ...c, status } : c))
      );

      // Show success popup
      setPopup(`Status updated to "${status}"`);
      setTimeout(() => setPopup(""), 3000);
    } catch (err) {
      console.error(err);
      setPopup("Failed to update status");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Complaints</h2>

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
          <p><b>Status:</b> {complaint.status}</p>

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
    </div>
  );
};

export default AdminAllComplaints;
