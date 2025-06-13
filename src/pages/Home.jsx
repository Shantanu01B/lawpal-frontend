import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

// 3D Gavel Demo Component
function RotatingGavel(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    let frame;
    const animate = () => {
      if (mesh.current) {
        mesh.current.rotation.y += 0.01;
        if (hovered) mesh.current.rotation.x += 0.01;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [hovered]);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 0.3, 0.3]} />
      <meshStandardMaterial color={hovered ? "orange" : "gray"} />
    </mesh>
  );
}

const features = [
  {
    title: "AI-Powered Legal Assistance",
    description: "Generate accurate legal documents with the power of artificial intelligence.",
    icon: "⚖️",
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "FIR Generation Made Easy",
    description: "Create First Information Reports in simple language without legal jargon.",
    icon: "📝",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "User-Friendly Interface",
    description: "Designed for everyone, regardless of legal knowledge or technical skills.",
    icon: "👨‍💻",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Secure & Confidential",
    description: "Your documents and data are protected with enterprise-grade security.",
    icon: "🔒",
    color: "from-emerald-500 to-teal-500"
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

const FeatureCard = ({ title, description, icon, color, isActive }) => (
  <motion.div
    initial={{ opacity: 0.7, y: 10 }}
    animate={{ 
      opacity: isActive ? 1 : 0.7,
      y: isActive ? 0 : 10,
      boxShadow: isActive ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }}
    transition={{ duration: 0.4 }}
    className={`bg-white p-4 md:p-6 rounded-2xl cursor-pointer ${isActive ? "ring-2 ring-indigo-500" : ""}`}
  >
    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl mb-3 md:mb-4 flex items-center justify-center text-2xl md:text-3xl bg-gradient-to-r ${color} text-white`}>
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{title}</h3>
    <p className="text-sm md:text-base text-gray-600">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, content, avatar, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
    transition={{ duration: 0.5 }}
    className={`absolute inset-0 bg-white p-6 md:p-8 rounded-2xl shadow-md flex flex-col ${isActive ? "z-10" : "z-0"}`}
  >
    <div className="text-4xl md:text-5xl mb-3 md:mb-4">{avatar}</div>
    <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 flex-grow">"{content}"</p>
    <div>
      <p className="font-bold text-gray-900">{name}</p>
      <p className="text-indigo-600">{role}</p>
    </div>
  </motion.div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-12 pb-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="bg-indigo-600 p-2 rounded-lg mr-2">⚖️</span>
            LawPal
          </h3>
          <p className="text-gray-400 mb-4">
            Making legal simple and accessible for everyone with AI-powered solutions.
          </p>
          <div className="flex space-x-4">
            {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social}
              >
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  {social[0]}
                </div>
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            {['Features', 'Pricing', 'Documentation', 'Guides'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            {['About', 'Blog', 'Careers', 'Press'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            {['Privacy', 'Terms', 'Cookie Policy', 'Compliance'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Zapier Chatbot Ref
  const zapierBotRef = useRef(null);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Inject Zapier chatbot script ONCE
    if (!document.getElementById("zapier-interfaces-script")) {
      const script = document.createElement("script");
      script.id = "zapier-interfaces-script";
      script.async = true;
      script.type = "module";
      script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
      document.body.appendChild(script);
    }

    // Add the chatbot custom element if not already present
    if (zapierBotRef.current && !zapierBotRef.current.hasChildNodes()) {
      const chatbot = document.createElement("zapier-interfaces-chatbot-embed");
      chatbot.setAttribute("is-popup", "true");
      chatbot.setAttribute("chatbot-id", "cmbuys2jw00amh9lest1qmtwr");
      zapierBotRef.current.appendChild(chatbot);
    }

    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-full h-full"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </motion.div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6 md:mb-8"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg flex items-center justify-center">
                <span className="text-2xl md:text-4xl text-white">⚖️</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-600">LawPal</span> <span className="text-gray-900">Makes Legal Simple</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              AI-powered legal document and FIR generation in plain English. No law degree required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 md:px-10 md:py-4 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base md:text-lg"
              >
                Get Started Free Today
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3 text-xs md:text-sm"
            >
              {["No credit card required", "100% Secure", "AI-Powered Accuracy"].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/80 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3D Demo Section */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 flex flex-col items-center bg-white/70">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Experience Interactive LawPal</h2>
        <div className="w-full h-72 max-w-2xl rounded-lg shadow-lg bg-white">
          <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} castShadow />
            <RotatingGavel position={[0, 0, 0]} />
            <OrbitControls enableZoom={false} />
            <Environment preset="city" />
          </Canvas>
        </div>
        <p className="mt-4 text-gray-600 text-center max-w-lg">
          Rotate and interact with the LawPal gavel! This 3D element is powered by Three.js and react-three-fiber.
        </p>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm md:shadow-md text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1 md:mb-2">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Powerful Features</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to handle legal matters with confidence
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                onClick={() => setCurrentFeature(index)}
              >
                <FeatureCard 
                  {...feature} 
                  isActive={index === currentFeature}
                />
              </div>
            ))}
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 bg-white rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg md:shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
              >
                <div className="text-center max-w-2xl">
                  <div className={`text-4xl md:text-6xl mb-4 md:mb-8 inline-block p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-r ${features[currentFeature].color} text-white`}>
                    {features[currentFeature].icon}
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-6">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-sm md:text-base lg:text-xl text-gray-600 mb-4 md:mb-8">
                    {features[currentFeature].description}
                  </p>
                  <Link
                    to="/dashboard"
                    className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium px-6 py-2 md:px-8 md:py-3 rounded-md md:rounded-lg shadow-md hover:shadow-lg transition-all text-sm md:text-base"
                  >
                    Try It Now
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-700 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">What Our Users Say</h2>
            <p className="text-base md:text-lg text-indigo-100 max-w-2xl mx-auto">
              Trusted by individuals and businesses worldwide
            </p>
          </motion.div>
          <div className="relative h-64 sm:h-80 md:h-96 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                {...testimonial}
                isActive={index === currentTestimonial}
              />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${index === currentTestimonial ? "bg-white" : "bg-white/30"}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Ready to Simplify Your Legal Work?</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
              Join thousands of users who trust LawPal for their legal documentation needs
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 md:px-12 md:py-4 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base md:text-lg"
              >
                Start Now - It's Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Zapier Chatbot Embed */}
      <div ref={zapierBotRef}></div>
    </div>
  );
}