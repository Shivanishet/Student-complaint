import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/raise">Raise Complaint</Link>
      <Link to="/track">Track Complaint</Link>
    </div>
  );
}
