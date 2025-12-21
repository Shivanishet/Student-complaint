import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#FFBB28", "#0088FE", "#00C49F", "#FF8042"];

const AdminReports = () => {
  const [reports, setReports] = useState(null);
  const token = localStorage.getItem("token");

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

  if (!reports) return <p>Loading reports...</p>;

  const pieData = [
    { name: "Submitted", value: reports.statusCounts.submitted },
    { name: "In Progress", value: reports.statusCounts.inprogress },
    { name: "Resolved", value: reports.statusCounts.resolved },
    { name: "Closed", value: reports.statusCounts.closed },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Complaint Reports</h2>
      <p style={{ textAlign: "center" }}><b>Total Complaints:</b> {reports.total}</p>

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
            <p><b>Status:</b> {c.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
