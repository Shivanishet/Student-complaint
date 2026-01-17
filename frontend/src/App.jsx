import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import Navbar
import Navbar from "./components/Navbar"; 

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import ViewComplaints from "./pages/ViewComplaints";
import TrackComplaint from "./pages/TrackComplaint";
import AdminAllComplaints from "./pages/AdminAllComplaints";
import AdminReports from "./pages/AdminReports";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Layout() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Pages where Navbar should NOT appear
  const hideNavbarRoutes = ["/", "/login", "/about", "/contact","/dashboard","/raise-complaint","/track-complaint","/view-complaints","/admin-all-complaints","/admin-reports"]; // add more routes if needed
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
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
          <Route
            path="/raise-complaint"
            element={token ? <RaiseComplaint /> : <Navigate to="/login" />}
          />
          <Route
            path="/view-complaints"
            element={token ? <ViewComplaints /> : <Navigate to="/login" />}
          />
          <Route
            path="/track-complaint"
            element={token ? <TrackComplaint /> : <Navigate to="/login" />}
          />
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
