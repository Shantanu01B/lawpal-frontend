import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Features, Testimonials, Stats, Cards, Footer ---

const features = [
  {
    title: "AI-Powered Legal Assistance",
    description: "Generate accurate legal documents with the power of artificial intelligence.",
    icon: "⚖️",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50"
  },
  {
    title: "FIR Generation Made Easy",
    description: "Create First Information Reports in simple language without legal jargon.",
    icon: "📝",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    title: "User-Friendly Interface",
    description: "Designed for everyone, regardless of legal knowledge or technical skills.",
    icon: "👨‍💻",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
  },
  {
    title: "Secure & Confidential",
    description: "Your documents and data are protected with enterprise-grade security.",
    icon: "🔒",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "LawPal saved me hundreds in legal fees. I created a professional contract in minutes!",
    avatar: "👩‍💼"
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    content: "Finally a legal tool that speaks human language. The FIR generator is a lifesaver!",
    avatar: "👨‍💻"
  },
  {
    name: "Priya Patel",
    role: "College Student",
    content: "As someone with no legal background, I found LawPal incredibly easy to use.",
    avatar: "👩‍🎓"
  }
];

const stats = [
  { value: "10,000+", label: "Documents Generated" },
  { value: "95%", label: "User Satisfaction" },
  { value: "24/7", label: "Availability" },
  { value: "5min", label: "Average Time Saved" }
];

const FeatureCard = ({ title, description, icon, color, isActive, onClick }) => (
  <motion.div
    initial={{ opacity: 0.7, y: 10 }}
    animate={{
      opacity: isActive ? 1 : 0.7,
      y: isActive ? 0 : 10,
      boxShadow: isActive
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }}
    transition={{ duration: 0.4 }}
    onClick={onClick}
    className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
      isActive ? "ring-2 ring-indigo-500 scale-[1.02] bg-white" : "hover:scale-[1.01] bg-white/90"
    }`}
  >
    {isActive && (
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
    )}
    <div
      className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-3xl bg-gradient-to-br ${color} text-white shadow-md`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, content, avatar, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
    transition={{ duration: 0.5 }}
    className={`absolute inset-0 bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col ${
      isActive ? "z-10" : "z-0"
    }`}
  >
    <div className="text-5xl mb-4 bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-full">
      {avatar}
    </div>
    <p className="text-lg text-gray-700 mb-6 flex-grow italic leading-relaxed">
      "{content}"
    </p>
    <div>
      <p className="font-bold text-gray-900 text-lg">{name}</p>
      <p className="text-indigo-600">{role}</p>
    </div>
  </motion.div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-16 pb-12 px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <span className="bg-indigo-600 p-2 rounded-lg mr-3">⚖️</span>
            LawPal
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Making legal simple and accessible for everyone with AI-powered solutions.
          </p>
          <div className="flex space-x-4">
            {["Twitter", "Facebook", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label={social}
              >
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all">
                  {social[0]}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6">Product</h4>
          <ul className="space-y-3">
            {["Features", "Pricing", "Documentation", "Guides"].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6">Company</h4>
          <ul className="space-y-3">
            {["About", "Blog", "Careers", "Press"].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6">Legal</h4>
          <ul className="space-y-3">
            {["Privacy", "Terms", "Cookie Policy", "Compliance"].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 mb-4 md:mb-0">
          © {new Date().getFullYear()} LawPal. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Home Component ---

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Chatbot open/close state
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-20">
        <div className="max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Floating decorative elements */}
            <motion.div 
              className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-200/30 blur-3xl -z-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-blue-200/30 blur-3xl -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                Legal Documents
              </span>
              <br />
              Made Simple
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              AI-powered legal document and FIR generation in plain English. No law degree required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/register"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
                >
                  Get Started Free Today
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/features"
                  className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-base sm:text-lg border-2 border-indigo-100"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full mr-2">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 text-sm sm:text-base">No credit card required</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full mr-2">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 text-sm sm:text-base">100% Secure</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-5 h-5 bg-indigo-500 rounded-full mr-2">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 text-sm sm:text-base">AI-Powered Accuracy</span>
              </div>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <p className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to create legal documents
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From contracts to FIRs, LawPal covers all your legal document needs with a simple, intuitive interface.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                isActive={currentFeature === idx}
                onClick={() => setCurrentFeature(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by thousands
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See how LawPal is making a difference for people from all walks of life.
            </p>
          </motion.div>
          <div className="relative h-72 md:h-56">
            <AnimatePresence>
              {testimonials.map((testimonial, idx) =>
                currentTestimonial === idx ? (
                  <TestimonialCard key={testimonial.name} {...testimonial} isActive={true} />
                ) : null
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentTestimonial === idx ? "bg-indigo-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Chatbot Floating Button and Popup --- */}
      <div>
        {/* Floating Chatbot Icon/Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            style={{
              position: "fixed",
              bottom: 32,
              right: 32,
              zIndex: 9999,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            aria-label="Open Chatbot"
          >
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 5.92 2 10.5c0 2.29 1.18 4.36 3.16 5.86-.13.47-.54 1.84-.62 2.17-.1.41.15.41.32.37.13-.03 1.52-.49 2.14-.73.87.24 1.8.37 2.8.37 5.52 0 10-3.92 10-8.5S17.52 2 12 2zm-4 7c.83 0 1.5.67 1.5 1.5S8.83 12 8 12s-1.5-.67-1.5-1.5S7.17 9 8 9zm8 0c.83 0 1.5.67 1.5 1.5S16.83 12 16 12s-1.5-.67-1.5-1.5S15.17 9 16 9zm-8 3.5c.83 0 1.5.67 1.5 1.5S8.83 15 8 15s-1.5-.67-1.5-1.5S7.17 12.5 8 12.5zm8 0c.83 0 1.5.67 1.5 1.5S16.83 15 16 15s-1.5-.67-1.5-1.5S15.17 12.5 16 12.5z"/>
            </svg>
          </button>
        )}

        {/* Chatbot Iframe Popup */}
        {isChatOpen && (
          <div
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 9999,
              width: 370,
              height: 540,
              borderRadius: 18,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              background: "#fff",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsChatOpen(false)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10000,
                background: "rgba(0,0,0,0.1)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
              aria-label="Close Chatbot"
            >
              <svg width="20" height="20" fill="#333" viewBox="0 0 24 24">
                <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.89 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z"/>
              </svg>
            </button>
            <iframe
              title="LawPal Chatbot"
              src="https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/29/13/20250629130830-BFDG4HEH.json"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: 18
              }}
              allow="clipboard-write"
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
