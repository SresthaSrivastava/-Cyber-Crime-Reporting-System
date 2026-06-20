const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaintController");

// User routes
router.post("/", complaintController.addComplaint);
router.get("/user/:id", complaintController.getUserComplaints);

// Admin routes
router.get("/", complaintController.getAllComplaints);
router.put("/status", complaintController.updateStatus);

module.exports = router;