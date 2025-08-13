import { motion, AnimatePresence } from 'framer-motion';
import { X, ClipboardList, Calendar, User, AlertCircle, ChevronDown, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const AddTaskModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    assignee: '',
    category: 'Follow-up'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.assignee.trim()) newErrors.assignee = 'Assignee is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newTask = {
        ...formData,
        id: Date.now(), // Temporary ID
        createdAt: new Date().toISOString()
      };
      onSave(newTask);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const priorityOptions = ['High', 'Medium', 'Low'];
  const statusOptions = ['Pending', 'In Progress', 'Completed'];
  const categoryOptions = ['Follow-up', 'Documentation', 'Meeting', 'Assessment'];
  const assigneeOptions = ['Sarah Johnson', 'Mike Chen', 'David Wilson', 'Emma Davis'];

  const inputHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    focus: { scale: 1.03 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{
            background: 'rgba(27, 56, 144, 0.1)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#1B3890]/20 via-[#0F79C5]/10 to-transparent backdrop-blur-md" 
                onClick={onClose}
              />
            </motion.div>

            {/* Modal container */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="inline-block align-bottom bg-white/95 backdrop-blur-xl rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                boxShadow: '0 25px 50px -12px rgba(27, 56, 144, 0.25)'
              }}
            >
              <div className="relative p-8">
                {/* Decorative gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-primary">
                  <div className="h-full w-full rounded-3xl bg-white/95 backdrop-blur-xl" />
                </div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-between items-start mb-8"
                  >
                    <div className="space-y-1">
                      <motion.h2 
                        className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Create New Task
                      </motion.h2>
                      <motion.p 
                        className="text-muted-dark text-md"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Add a new task to your workflow
                      </motion.p>
                    </div>
                    <motion.button
                      onClick={onClose}
                      className="p-3 rounded-2xl hover:bg-red-50 transition-all duration-100 group cursor-pointer"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <X className="h-6 w-6 text-gray-600 group-hover:text-red-600 transition-colors duration-100" />
                    </motion.button>
                  </motion.div>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Task Title */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Task Title *
                        </label>
                        <motion.div 
                          className="relative"
                          variants={inputHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          animate={focusedField === 'title' ? 'focus' : 'rest'}
                        >
                          <motion.div 
                            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"                         
                          >
                            <ClipboardList className="h-5 w-5 text-[var(--color-secondary)] z-1" />
                          </motion.div>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('title')}
                            onBlur={() => setFocusedField(null)}
                            className={`pl-12 w-full py-3 rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                              errors.title 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-[var(--color-secondary)] focus:ring-[var(--color-secondary)]/20'
                            } focus:ring-4 focus:outline-none placeholder-gray-400`}
                            placeholder="Enter task title"
                          />
                        </motion.div>
                        <AnimatePresence>
                          {errors.title && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-2 text-sm text-red-600 font-medium"
                            >
                              {errors.title}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Description */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description *
                        </label>
                        <motion.textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('description')}
                          onBlur={() => setFocusedField(null)}
                          rows={4}
                          className={`w-full py-3 px-4 rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                            errors.description 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-[var(--color-secondary)] focus:ring-[var(--color-secondary)]/20'
                          } focus:ring-4 focus:outline-none placeholder-gray-400 resize-none`}
                          placeholder="Enter detailed task description..."
                          whileHover={{ scale: 1.01 }}
                          animate={focusedField === 'description' ? { scale: 1.02 } : { scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {errors.description && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-2 text-sm text-red-600 font-medium"
                            >
                              {errors.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Due Date */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Due Date *
                        </label>
                        <motion.div 
                          className="relative"
                          variants={inputHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          animate={focusedField === 'dueDate' ? 'focus' : 'rest'}
                        >
                          <motion.div 
                            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"                         
                          >
                            <Calendar className="h-5 w-5 text-[var(--color-secondary)] z-1" />
                          </motion.div>
                          <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('dueDate')}
                            onBlur={() => setFocusedField(null)}
                            className={`pl-12 w-full py-3 rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                              errors.dueDate 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-[var(--color-secondary)] focus:ring-[var(--color-secondary)]/20'
                            } focus:ring-4 focus:outline-none placeholder-gray-400`}
                          />
                        </motion.div>
                        <AnimatePresence>
                          {errors.dueDate && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-2 text-sm text-red-600 font-medium"
                            >
                              {errors.dueDate}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Grid of dropdowns */}
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                      >
                        {/* Priority */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Priority
                          </label>
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <select
                              name="priority"
                              value={formData.priority}
                              onChange={handleChange}
                              className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-secondary)]/20 focus:outline-none appearance-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                            >
                              {priorityOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <motion.div 
                              className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
                              animate={{ rotate: focusedField === 'priority' ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-5 w-5 text-[var(--color-secondary)]" />
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Status */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status
                          </label>
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-secondary)]/20 focus:outline-none appearance-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                            >
                              {statusOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                              <ChevronDown className="h-5 w-5 text-[var(--color-secondary)]" />
                            </div>
                          </motion.div>
                        </div>

                        {/* Category */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                          </label>
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-secondary)]/20 focus:outline-none appearance-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                            >
                              {categoryOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                              <ChevronDown className="h-5 w-5 text-[var(--color-secondary)]" />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Assignee */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Assignee *
                        </label>
                        <motion.div 
                          className="relative"
                          variants={inputHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          animate={focusedField === 'assignee' ? 'focus' : 'rest'}
                        >
                          <motion.div 
                            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"                         
                          >
                            <User className="h-5 w-5 text-[var(--color-secondary)] z-1" />
                          </motion.div>
                          <select
                            name="assignee"
                            value={formData.assignee}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('assignee')}
                            onBlur={() => setFocusedField(null)}
                            className={`pl-12 w-full py-3 rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                              errors.assignee 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-[var(--color-secondary)] focus:ring-[var(--color-secondary)]/20'
                            } focus:ring-4 focus:outline-none appearance-none`}
                          >
                            <option value="">Select assignee</option>
                            {assigneeOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-[var(--color-secondary)]" />
                          </div>
                        </motion.div>
                        <AnimatePresence>
                          {errors.assignee && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-2 text-sm text-red-600 font-medium"
                            >
                              {errors.assignee}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Form actions */}
                    <motion.div 
                      className="mt-8 flex justify-end gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group cursor-pointer"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 20px 40px rgba(15, 121, 197, 0.2)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                              />
                              Creating...
                            </>
                          ) : (
                            'Create'
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;