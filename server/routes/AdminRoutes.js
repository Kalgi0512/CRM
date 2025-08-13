const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllAdmins,updateAdmin, deleteAdmin } = require('../controllers/AdminAuthController');
const { protectAdmin, authorizeAdmin } = require('../middlewares/AdminAuth');

// LOGIN (public)
router.post('/login', loginAdmin);

// REGISTER (only admin can create)
router.post('/register', protectAdmin, authorizeAdmin('Admin'), registerAdmin);

// PROTECTED ROUTES
router.get('/admin-dashboard', protectAdmin, authorizeAdmin('Admin'), (req, res) => {
  res.json({ message: 'Admin Dashboard' });
});

router.get('/sales-dashboard', protectAdmin, authorizeAdmin('Admin', 'Sales'), (req, res) => {
  res.json({ message: 'Sales Dashboard' });
});

router.get('/agent-dashboard', protectAdmin, authorizeAdmin('Admin', 'Agent'), (req, res) => {
  res.json({ message: 'Agent Dashboard' });
});

// Get all admins
router.get("/", protectAdmin, authorizeAdmin("Admin"), getAllAdmins);

// Update admin
router.put("/:id", protectAdmin, authorizeAdmin("Admin"), updateAdmin);

// Delete admin
router.delete("/:id", protectAdmin, authorizeAdmin("Admin"), deleteAdmin);

module.exports = router;
