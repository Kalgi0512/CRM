import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, Clock, AlertTriangle, Trash2, Edit2, Calendar, Filter, Search, Briefcase, Clipboard, ClipboardList, } from "lucide-react";

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up with John Smith",
      description: "Check in about missing medical certificate for migration process. Need to ensure all documentation is complete before deadline.",
      dueDate: "2023-08-15",
      priority: "High",
      status: "Pending",
      assignee: "Sarah Johnson",
      category: "Follow-up",
    },
    {
      id: 2,
      title: "Submit Visa Documents for Maria Garcia",
      description: "Upload verified passport and degree certificate to immigration portal. Double-check all document formats meet requirements.",
      dueDate: "2023-08-18",
      priority: "Medium",
      status: "In Progress",
      assignee: "Mike Chen",
      category: "Documentation",
    },
    {
      id: 3,
      title: "Schedule meeting with Global Talent Agency",
      description: "Discuss recruitment pipeline for Q3 healthcare professionals. Review upcoming placement opportunities and contract terms.",
      dueDate: "2023-08-20",
      priority: "Low",
      status: "Completed",
      assignee: "David Wilson",
      category: "Meeting",
    },
    {
      id: 4,
      title: "Review Ahmed Khan's Application",
      description: "Complete assessment of construction manager application. Verify experience certificates and skill assessments.",
      dueDate: "2023-08-22",
      priority: "High",
      status: "Pending",
      assignee: "Emma Davis",
      category: "Assessment",
    },
  ]);

  const [hoveredTask, setHoveredTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Pending":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: Clock,
        };
      case "In Progress":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: AlertTriangle,
        };
      case "Completed":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle2,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-500",
          icon: Clock,
        };
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Follow-up": "bg-indigo-100 text-indigo-800",
      "Documentation": "bg-emerald-100 text-emerald-800",
      "Meeting": "bg-violet-100 text-violet-800",
      "Assessment": "bg-cyan-100 text-cyan-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === "All" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "Pending").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  const hoverCard = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 200,
      }
    }
  };

  const hoverButton = {
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="p-4 md:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="space-y-1">
            <h1 className="text-heading-lg font-bold bg-gradient-primary bg-clip-text text-transparent pb-1">Task Management</h1>
            <p className="text-muted-dark text-sm sm:text-base">Track, manage, and complete your daily workflow tasks efficiently</p>
          </div>
          <motion.div
            className="flex gap-3 mx-auto md:mx-0"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} className="sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="hidden sm:inline">Add New Task</span>
              <span className="sm:hidden">Add Task</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total", value: stats.total, color: "bg-blue-100", text: "text-blue-500", icon: <Calendar className="text-blue-500" size={26} /> },
            { label: "Pending", value: stats.pending, color: "bg-orange-100", text: "text-orange-500", icon: <Clock className="text-orange-500" size={26} /> },
            { label: "In Progress", value: stats.inProgress, color: "bg-purple-100", text: "text-purple-500", icon: <AlertTriangle className="text-purple-500" size={26} /> },
            { label: "Completed", value: stats.completed, color: "bg-green-100", text: "text-green-500", icon: <CheckCircle2 className="text-green-500" size={26} /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={hoverCard}
              whileHover="hover"
              className="bg-white/80 rounded-xl shadow-md border border-white/20 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-dark">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <motion.div
                  className={`p-3 rounded-lg ${stat.color}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  {stat.icon}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 rounded-xl shadow-md border border-white/20 p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all duration-300 bg-white/80"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {["All", "Pending", "In Progress", "Completed"].map((status) => (
                <motion.button
                  key={status}
                  onClick={() => setFilter(status)}
                  variants={hoverButton}
                  whileHover="hover"
                  whileTap="tap"
                  className={`px-4 py-2 rounded-lg font-medium cursor-pointer text-sm transition-all duration-300 ${filter === status
                      ? "bg-gradient-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tasks List */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-description-lg font-semibold text-gray-800 flex items-center gap-2">
                <Filter size={18} className="sm:w-5 sm:h-5 text-[var(--color-secondary)]" />
                Task Overview
              </h3>
              <div className="text-xs sm:text-sm text-gray-500">
                {filteredTasks.length} of {tasks.length} tasks
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <AnimatePresence mode="wait">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => {
                  const statusConfig = getStatusConfig(task.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <motion.div
                      key={task.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: 20 }}
                      className="group relative p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-300"
                      onMouseEnter={() => setHoveredTask(task.id)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      {/* Task Content */}
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Left Side - Main Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <motion.div
                              className="p-2 rounded-xl bg-[var(--color-primary)]/20"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <ClipboardList className="h-5 w-5 text-[var(--color-primary)]" />
                            </motion.div>
                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                              {task.title}
                            </h4>

                            <div className="flex gap-2 flex-wrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}
                              >
                                {task.priority}
                              </span>

                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full border ${statusConfig.color}`}
                              >
                                <StatusIcon size={12} className="inline mr-1" />
                                {task.status}
                              </span>

                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(task.category)}`}
                              >
                                {task.category}
                              </span>
                            </div>
                          </div>

                          <p className="text-muted-dark text-xs sm:text-sm leading-relaxed max-w-3xl">
                            {task.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-dark">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} className="mr-1" />
                              <span>Due: {task.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>•</span>
                              <span>Assigned to: {task.assignee}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Actions */}
                        <div className="flex lg:flex-col gap-2">
                          {[
                            {
                              icon: CheckCircle2,
                              color: "text-green-600",
                              action: () => console.log("Mark complete", task.id),
                              tooltip: "Mark as complete"
                            },
                            {
                              icon: Edit2,
                              color: "text-blue-600",
                              action: () => console.log("Edit task", task.id),
                              tooltip: "Edit task"
                            },
                            {
                              icon: Trash2,
                              color: "text-red-600",
                              action: () => console.log("Delete task", task.id),
                              tooltip: "Delete task"
                            },
                          ].map(({ icon: Icon, color, action, tooltip }, idx) => (
                            <motion.button
                              key={idx}
                              onClick={action}
                              variants={hoverButton}
                              whileHover="hover"
                              whileTap="tap"
                              className={`p-2 rounded-lg cursor-pointer transition-all duration-100 ${color} hover:shadow-md   hover:border-transparent bg-white`}
                              title={tooltip}
                            >
                              <Icon size={16} />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No tasks found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TasksPage;