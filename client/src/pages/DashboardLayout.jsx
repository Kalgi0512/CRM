import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ClipboardList,
  Users,
  CheckSquare,
  BarChart3,
  Shield,
  UserCog,
  Settings,
  LayoutDashboard,
  ChevronRight,
  Home,
  LogOut
} from "lucide-react";

// Navigation items
const navItems = [
  { to: "", label: "Dashboard", icon: LayoutDashboard },
  { to: "leads", label: "Leads", icon: ClipboardList },
  { to: "clients", label: "Clients", icon: Users },
  { to: "tasks", label: "Tasks", icon: CheckSquare },
  { to: "reports", label: "Reports", icon: BarChart3 },
  { to: "admin", label: "Admin", icon: Shield },
  { to: "users", label: "Users", icon: UserCog },
  { to: "settings", label: "Settings", icon: Settings },
];

// Sidebar Item component
const SidebarItem = ({ to, icon: Icon, label, onClick, index, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        to={to}
        onClick={onClick}
        className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 relative w-full text-left ${
          isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ background: "linear-gradient(90deg, #1B3890, #0F79C5)" }}
            transition={{ duration: 0.3 }}
          />
        )}
        {isHovered && !isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <div className="relative z-10 flex items-center gap-3 w-full">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600 group-hover:text-[#1B3890]"}`} />
          </motion.div>
          <span className="flex-1">{label}</span>
          <motion.div
            className={`transition-all ${isActive ? "text-white opacity-100" : "text-gray-400 opacity-0 group-hover:opacity-100"}`}
            animate={{ x: isActive || isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "";

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex relative bg-gradient-soft">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg z-[999]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-description-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <button onClick={toggleSidebar} className="p-2 rounded-xl bg-gradient-primary text-white shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={sidebarOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </motion.header>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !window.matchMedia("(max-width: 768px)").matches) && (
          <motion.aside
            className="fixed top-10 left-0 w-72 h-full bg-white/90 backdrop-blur-xl border-r border-white/30 z-50 shadow-2xl md:relative"
            initial={{ x: -288, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -288, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
          >
            <div className="p-8 space-y-8 h-screen flex flex-col">
              <motion.nav className="flex flex-col space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                {navItems.map((item, index) => (
                  <SidebarItem
                    key={item.to}
                    {...item}
                    onClick={closeSidebar}
                    index={index}
                    isActive={currentPath === item.to}
                  />
                ))}
              </motion.nav>

              <motion.div className="mt-auto">
                <button
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-white font-medium transition-all duration-300 relative overflow-hidden w-full"
                  onClick={() => {
                    // Logout logic
                    localStorage.removeItem("authUser");
                    window.location.href = "/";
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.aside>
        )}

        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.main className="flex-1 overflow-y-auto relative pt-20 lg:p-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-10 blur-md" style={{ background: "linear-gradient(90deg, #1B3890, #0F79C5)" }} />
          <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-10 blur-md" style={{ background: "linear-gradient(90deg, #0F79C5, #1B3890)" }} />
        </div>

        <motion.div
          className="relative z-10 bg-white/50 backdrop-blur-sm lg:rounded-2xl p-8 min-h-full shadow-xl border border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
