import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import ViewComplaints from "./pages/ViewComplaints";
import TrackComplaint from "./pages/TrackComplaint";
import AdminAllComplaints from "./pages/AdminAllComplaints";
import AdminReports from "./pages/AdminReports";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Layout() {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      {/* ✅ Hide Navbar only on Landing Page */}
      {location.pathname !== "/" && <Navbar />}

      {/* ✅ REQUIRED for page transition */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/contact" element={<Contact />} />


          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Admin: All Complaints */}
          <Route
            path="/admin-all-complaints"
            element={
              token && role === "admin" ? (
                <AdminAllComplaints />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Admin: Reports */}
          <Route
            path="/admin-reports"
            element={
              token && role === "admin" ? (
                <AdminReports />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/about" element={<About />} />

          {/* Raise Complaint */}
          <Route
            path="/raise-complaint"
            element={token ? <RaiseComplaint /> : <Navigate to="/login" />}
          />

          {/* View Complaints */}
          <Route
            path="/view-complaints"
            element={token ? <ViewComplaints /> : <Navigate to="/login" />}
          />

          {/* Track Complaint */}
          <Route
            path="/track-complaint"
            element={token ? <TrackComplaint /> : <Navigate to="/login" />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
