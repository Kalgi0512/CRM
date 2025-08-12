import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ChevronDown, Edit2, Trash2, MoreVertical, User, Briefcase, Filter, Eye, Phone, Mail, Globe, Home, Calendar, Flag, Check, X, List, ScrollText } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import ClientsFilters from "../components/ClientFilters";

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  const navigate = useNavigate();

  const handleClientClick = (clientId) => {
    navigate(`/dashboard/clients/${clientId}`);
  };

  const handleEditClient = (client) => {
    setCurrentClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteClient = (client) => {
    // Delete logic 
    console.log("Deleting client:", client);
  };

  const handleAddClient = (newClient) => {
    // API
    console.log("New client added:", newClient);
    alert(`New client ${newClient.name} has been added successfully!`);
  };

  const handleSaveClient = (updatedClient) => {
    // API 
    console.log("Client updated:", updatedClient);
    alert(`Client ${updatedClient.name} has been updated successfully!`);
  };

  const clients = [
    {
      id: 1,
      name: 'James Wilson',
      type: 'Customer',
      profession: 'Software Engineer',
      country: 'Canada',
      contact: 'james.wilson@email.com',
      phone: '+1 (416) 123-4567',
      visaStatus: 'PR Approved',
      lastActivity: '2023-06-15',
      applications: 3
    },
    {
      id: 2,
      name: 'Tech Talent Inc.',
      type: 'Agent',
      profession: 'IT Recruitment',
      country: 'USA',
      contact: 'contact@techtalent.com',
      phone: '+1 (212) 987-6543',
      visaStatus: 'L1 Processing',
      lastActivity: '2023-06-18',
      applications: 12
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      type: 'Customer',
      profession: 'Healthcare Worker',
      country: 'Australia',
      contact: 'sophia.r@email.com',
      phone: '+61 2 4567 8910',
      visaStatus: 'Assessment',
      lastActivity: '2023-06-10',
      applications: 1
    },
    {
      id: 4,
      name: 'Global Health Partners',
      type: 'Agent',
      profession: 'Medical Staffing',
      country: 'UK',
      contact: 'info@globalhealth.com',
      phone: '+44 20 7123 4567',
      visaStatus: 'PR Approved',
      lastActivity: '2023-06-20',
      applications: 28
    },
    {
      id: 5,
      name: 'Mohammed Ali',
      type: 'Customer',
      profession: 'Construction Manager',
      country: 'UAE',
      contact: 'mohammed.ali@email.com',
      phone: '+971 50 123 4567',
      visaStatus: 'Visa Expired',
      lastActivity: '2023-05-17',
      applications: 2
    },
    {
      id: 6,
      name: 'Engineering Solutions Ltd.',
      type: 'Agent',
      profession: 'Engineering',
      country: 'Germany',
      contact: 'hr@engsolutions.de',
      phone: '+49 30 1234567',
      visaStatus: 'Blue Card',
      lastActivity: '2023-06-05',
      applications: 15
    },
    {
      id: 7,
      name: 'Emma Johnson',
      type: 'Customer',
      profession: 'Teacher',
      country: 'New Zealand',
      contact: 'emma.j@email.com',
      phone: '+64 9 123 4567',
      visaStatus: 'Work Visa',
      lastActivity: '2023-06-12',
      applications: 1
    },
  ];

  // Filter clients based on search and filters
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || client.type === typeFilter;
    const matchesCountry = countryFilter === 'All' || client.country === countryFilter;
    return matchesSearch && matchesType && matchesCountry;
  });

  // Pagination
  const clientsPerPage = 5;
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
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
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const getVisaStatusColor = (visaStatus) => {
    switch (visaStatus) {
      case 'PR Approved': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Work Visa': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Assessment': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Visa Expired': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-4 md:p-6"
    >
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 text-center md:text-left"
        >
          <div className="space-y-2">
            <motion.h1
              className="text-heading-lg font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              Clients Management
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">Manage your individual and corporate clients</p>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {filteredClients.length} Active Clients
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Real-time Updates
              </span>
            </div>
          </div>
          <motion.div
            className="flex gap-3 mx-auto md:mx-0"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              onClick={() => setIsAddClientOpen(true)}
              className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} className="sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="hidden sm:inline">Add New Client</span>
              <span className="sm:hidden">Add Client</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
<ClientsFilters 
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  typeFilter={typeFilter}
  setTypeFilter={setTypeFilter}
  countryFilter={countryFilter}
  setCountryFilter={setCountryFilter}
/>

        {/* Clients Table */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-description-lg font-semibold text-gray-800 flex items-center gap-2">
                <Filter size={18} className="sm:w-5 sm:h-5 text-[var(--color-secondary)]" />
                Client Overview
              </h3>
              <div className="text-xs sm:text-sm text-gray-500">
                {filteredClients.length} of {clients.length} clients
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {[
                    'Client Information',
                    'Type',
                    'Country',
                    'Visa Status',
                    'Applications',
                    'Last Activity',
                    'Actions'
                  ].map((header, index) => (
                    <motion.th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {header}
                    </motion.th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence mode="wait">
                  {paginatedClients.length > 0 ? (
                    paginatedClients.map((client, index) => (
                      <motion.tr
                        key={client.id}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-100"
                        onMouseEnter={() => setHoveredRow(client.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className={`p-2 rounded-xl ${client.type === 'Individual' ? 'bg-blue-100' : 'bg-indigo-100'}`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {client.type === 'Individual' ? (
                                <User className={`h-5 w-5 ${client.type === 'Individual' ? 'text-blue-600' : 'text-indigo-600'}`} />
                              ) : (
                                <Briefcase className="h-5 w-5 text-indigo-600" />
                              )}
                            </motion.div>
                            <div
                              onClick={() => handleClientClick(client.id)}
                              className="space-y-2 cursor-pointer">
                              <div className="text-sm font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                                {client.name}
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-muted-dark">
                                <Mail size={12} />
                                <span>{client.contact}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-muted-dark">
                                <Phone size={12} />
                                <span>{client.phone}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <motion.span
                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${client.type === 'Individual'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : 'bg-indigo-100 text-indigo-800 border-indigo-200'
                              }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {client.type}
                          </motion.span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Globe size={14} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">{client.country}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <motion.span
                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getVisaStatusColor(client.visaStatus)}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {client.visaStatus}
                          </motion.span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <ScrollText size={16} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">{client.applications}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-500">{client.lastActivity}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-2">
                            {[
                              {
                                icon: Eye,
                                color: 'text-blue-600 hover:text-blue-800',
                                action: () => handleClientClick(client.id)
                              },
                              {
                                icon: Edit2,
                                color: 'text-green-600 hover:text-green-800',
                                action: () => handleEditClient(client)
                              },
                              {
                                icon: Trash2,
                                color: 'text-red-600 hover:text-red-800',
                                action: () => handleDeleteClient(client)
                              }].map(({ icon: Icon, color, action }, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={action}
                                  className={`p-2 rounded-lg cursor-pointer transition-all duration-100 ${color} hover:bg-white hover:shadow-md`}
                                  whileHover={{ scale: 1.1, rotate: idx === 0 ? 0 : 15 }}
                                  whileTap={{ scale: 0.9 }}
                                  initial={{ opacity: 0.7 }}
                                  animate={{ opacity: hoveredRow === client.id ? 1 : 0.7 }}
                                >
                                  <Icon size={16} />
                                </motion.button>
                              ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Search size={24} className="text-gray-400" />
                          </div>
                          <div className="text-gray-500">
                            <p className="text-lg font-medium">No clients found</p>
                            <p className="text-sm">Try adjusting your search criteria</p>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              {paginatedClients.length > 0 ? (
                <div className="space-y-4 p-4">
                  {paginatedClients.map((client, index) => (
                    <motion.div
                      key={client.id}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`p-2 rounded-xl ${client.type === 'Individual' ? 'bg-blue-100' : 'bg-indigo-100'}`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {client.type === 'Individual' ? (
                              <User className={`h-4 w-4 ${client.type === 'Individual' ? 'text-blue-600' : 'text-indigo-600'}`} />
                            ) : (
                              <Briefcase className="h-4 w-4 text-indigo-600" />
                            )}
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{client.name}</h4>
                            <p className="text-xs text-gray-600">{client.type}</p>
                          </div>
                        </div>   
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Mail size={12} />
                          <span className="truncate">{client.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Phone size={12} />
                          <span>{client.phone}</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center space-x-2 text-xs">
                          <Globe size={12} className="text-gray-500" />
                          <span>{client.country}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Home size={12} className="text-gray-500" />
                          <span>{client.applications} applications</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Flag size={12} className="text-gray-500" />
                          <span>{client.visaStatus}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Calendar size={12} className="text-gray-500" />
                          <span>{client.lastActivity}</span>
                        </div>
                      </div>

                      {/* Bottom section */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <motion.span
                          className={`px-2 py-1 text-xs font-semibold rounded-full border ${getVisaStatusColor(client.visaStatus)}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {client.visaStatus}
                        </motion.span>
                        <div className="flex items-center space-x-1">
                          {[
                            {
                              icon: Eye,
                              color: 'text-blue-600',
                              action: () => handleClientClick(client.id)
                            },
                            {
                              icon: Edit2,
                              color: 'text-green-600',
                              action: () => handleEditClient(client)
                            },
                            {
                              icon: Trash2,
                              color: 'text-red-600',
                              action: () => handleDeleteClient(client)
                            },
                          ].map(({ icon: Icon, color, action }, idx) => (
                            <motion.button
                              key={idx}
                              onClick={action}
                              className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${color} hover:bg-gray-100`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Icon size={14} />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                      <p className="text-lg font-medium">No clients found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-white/70 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20 gap-4"
          >
            <div className="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left">
              Showing {(currentPage - 1) * clientsPerPage + 1} to {Math.min(currentPage * clientsPerPage, filteredClients.length)} of {filteredClients.length} clients
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-primary text-white hover:shadow-lg'
                  }`}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
              >
                Previous
              </motion.button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <motion.button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${currentPage === page
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-primary text-white hover:shadow-lg'
                  }`}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Modals */}
      {/* <AddClientModal 
        isOpen={isAddClientOpen} 
        onClose={() => setIsAddClientOpen(false)}
        onSave={handleAddClient}
      />
      
      <EditClientModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveClient}
        client={currentClient}
      /> */}
    </motion.div>
  );
};

export default ClientsPage;