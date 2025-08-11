import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, AtSign, Lock, User, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // This is a placeholder for a real login function.
  // It simply prevents the form from submitting and does nothing else.
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login form submitted (UI-only)");
  };

  const roles = ["Admin", "Sales", "Agent"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Left side: Hero section with logo and marketing message */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-blue-950 text-white relative overflow-hidden"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50, duration: 1 }}
      >
        <div className="absolute inset-0 bg-blue-950 opacity-20"></div>
        <div className="z-10 text-center space-y-6 max-w-lg">
          <motion.img
            src="https://bluewhalemigration.com/wp-content/uploads/2024/03/bluwwhale-e1740737022623.png"
            alt="Blue Whale CRM Logo"
            className="w-48 mx-auto mb-4 drop-shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <h1 className="text-4xl font-extrabold tracking-tight">
            Streamline Your Workflow
          </h1>
          <p className="text-xl font-light text-gray-200">
            A powerful CRM solution designed to help you manage leads, clients, and tasks with ease.
          </p>
          <ul className="text-left space-y-2 mt-6">
            <motion.li variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
              </svg>
              Intuitive Lead Management
            </motion.li>
            <motion.li variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
              </svg>
              Seamless Client Communication
            </motion.li>
            <motion.li variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
              </svg>
              Efficient Task Automation
            </motion.li>
          </ul>
        </div>
      </motion.div>

      {/* Right side: Login form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <motion.div
          className="w-full max-w-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-8 lg:hidden">
            <img
              src="https://bluewhalemigration.com/wp-content/uploads/2024/03/bluwwhale-e1740737022623.png"
              alt="Blue Whale CRM Logo"
              className="w-32 mx-auto mb-2"
            />
            <h1 className="text-3xl font-extrabold text-gray-900">
              CRM Login
            </h1>
            <p className="text-gray-500 mt-1">Sign in to your account</p>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden lg:block text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </h1>
            <p className="text-gray-500 mt-1">Please sign in to continue</p>
          </motion.div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AtSign className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 shadow-sm"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;