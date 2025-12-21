import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function TrackComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints/my");
        setComplaints(res.data); // <-- data comes from backend
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="layout">
      {/* Sidebar removed completely */}

      <div className="content">
        <Navbar />

        <h2>Track Complaints</h2>

        {/* Loading */}
        {loading && <p>Loading complaints...</p>}

        {/* No complaints */}
        {!loading && complaints.length === 0 && (
          <p>No complaints raised yet.</p>
        )}

        {/* Complaints list */}
        {!loading &&
          complaints.map((complaint) => (
            <div className="card" key={complaint._id}>
              <h3>{complaint.title}</h3>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${complaint.status?.toLowerCase()}`}>
                  {complaint.status}
                </span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
