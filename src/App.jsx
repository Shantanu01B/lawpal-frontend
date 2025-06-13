import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/about";
import Contact from "./pages/contact";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Handler after login/register
  function handleAuth(data) {
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  // Handler after profile update
  function handleUpdateUser(newUser) {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  // Logout function
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <Router>
      {/* Global toast notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile user={user} onUpdateUser={handleUpdateUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/dashboard" /> : <Login onAuth={handleAuth} />
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/dashboard" /> : <Register onAuth={handleAuth} />
            }
          />
          {/* New public routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Optional: 404 catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;