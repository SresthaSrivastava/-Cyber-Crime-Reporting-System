const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Admin dashboard
router.get("/dashboard", verifyToken, isAdmin, adminController.getDashboard);

// Update complaint status
router.put("/complaints/status", verifyToken, isAdmin, adminController.changeStatus);

module.exports = router;