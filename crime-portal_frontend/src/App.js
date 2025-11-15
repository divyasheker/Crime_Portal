// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./styles/App.css";

import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";

// Pages
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound"; 
import Profile from "./pages/Profile";

// Citizen pages & layout
import CitizenLayout from "./layouts/CitizenLayout";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import Chatbox from "./pages/citizen/Chatbox";
import TrackReports from "./pages/citizen/TrackReports";
import CrimeAlerts from "./pages/citizen/CrimeAlerts";
import Resources from "./pages/citizen/Resources";
import CitizenAnalytics from "./pages/citizen/CitizenAnalytics";

//police pages and layout
import PoliceLayout from "./layouts/PoliceLayout";
import PoliceDashboard from "./pages/police/PoliceDashboard";
import ViewReports from "./pages/police/ViewReports";
import UpdateCases from "./pages/police/UpdateCases";
import PoliceAlerts from "./pages/police/PoliceAlerts";
import PoliceAnalytics from "./pages/police/PoliceAnalytics";


//admin pages and Layout
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Seereports from "./pages/admin/Seereports";

import AdminAnalytics from "./pages/admin/AdminAnalytics";



// Animated Routes Wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/features" element={<PageWrapper><Features /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />

        {/* Citizen Routes with Layout */}
        <Route path="/citizen" element={<CitizenLayout />}>
          <Route index element={<CitizenDashboard />} />
          <Route path="chatbox" element={<Chatbox />} />
          <Route path="track-reports" element={<TrackReports />} />
          <Route path="crime-alerts" element={<CrimeAlerts />} />
          <Route path="analytics" element={<CitizenAnalytics />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        <Route path="/police" element={<PoliceLayout />}>
          <Route index element={<PoliceDashboard />} />
          <Route path="view-reports" element={<ViewReports />} />
          <Route path="updatecases" element={<UpdateCases />} />
          <Route path="police-alerts" element={<PoliceAlerts />} />
          <Route path="analytics" element={<PoliceAnalytics />} />         
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="seereports" element={<Seereports />} />
      
          <Route path="analytics" element={<AdminAnalytics />} /> 
          
        </Route>

       

        {/* Catch-all NotFound */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// Main App
function App() {
  return (
  <AuthProvider>
  <Router>
  <div className="app-wrapper">
  <Navbar />
  <main className="main-content">
  <AnimatedRoutes />
  </main>
  <Footer />
  </div>
  </Router>
  </AuthProvider>
  );
  }

export default App;
