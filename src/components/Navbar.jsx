import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScaleIcon } from "@heroicons/react/24/outline";

const backendUrl = "https://lawpal-backend.onrender.com"; // Change if deploying

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ScaleIcon className="h-8 w-8 text-yellow-300" />
              <span className="text-white text-2xl font-bold tracking-wide">
                Law<span className="text-yellow-300">Pal</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-indigo-900 bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4 ml-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 group"
                  >
                    <img
                      src={user.profilePic ? `${backendUrl}${user.profilePic}` : "/default-profile.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-yellow-300 group-hover:border-white transition-colors duration-200"
                    />
                    <span className="text-white font-medium group-hover:text-yellow-300 transition-colors duration-200">
                      {user.name.split(' ')[0]}
                    </span>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-indigo-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>
            About
          </MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </MobileNavLink>
          
          {!user ? (
            <div className="pt-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-indigo-900 bg-yellow-300 hover:bg-yellow-400 px-3 py-2 rounded-md text-base font-medium shadow-sm"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="pt-4 pb-2 border-t border-indigo-700">
              <div className="flex items-center px-4 space-x-3">
                <img
                  src={user.profilePic ? `${backendUrl}${user.profilePic}` : "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-300"
                />
                <div>
                  <p className="text-base font-medium text-white">{user.name}</p>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="text-sm font-medium text-red-300 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink component for desktop
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium relative group transition-colors duration-200"
    >
      {children}
      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-300 w-0 group-hover:w-4/5 transition-all duration-300"></span>
    </Link>
  );
}

// Reusable NavLink component for mobile
function MobileNavLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-white hover:bg-indigo-700 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
    >
      {children}
    </Link>
  );
}