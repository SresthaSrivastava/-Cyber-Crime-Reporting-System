const complaintModel = require("../models/complaintModel");

// 🔹 Helper: Detect Category
const detectCategory = (text) => {
    text = text.toLowerCase();

    if (text.includes("bank") || text.includes("money") || text.includes("fraud"))
        return "Financial Fraud";

    if (text.includes("hack") || text.includes("account") || text.includes("password"))
        return "Hacking";

    if (text.includes("harass") || text.includes("threat"))
        return "Harassment";

    return "Other";
};

// 🔹 Helper: Detect Priority
const detectPriority = (text) => {
    text = text.toLowerCase();

    if (text.includes("urgent") || text.includes("money") || text.includes("fraud"))
        return "High";

    if (text.includes("hack") || text.includes("issue"))
        return "Medium";

    return "Low";
};

// ADD COMPLAINT
const addComplaint = (req, res) => {
    const { user_id, title, description } = req.body;

    if (!user_id || !title || !description) {
        return res.status(400).json({ message: "All fields required" });
    }

    const category = detectCategory(description);
    const priority = detectPriority(description);

    complaintModel.createComplaint(
        user_id,
        title,
        description,
        category,
        priority,
        (err) => {
            if (err) return res.status(500).json({ message: "Server error" });

            res.json({
                message: "Complaint submitted successfully",
                category,
                priority
            });
        }
    );
};

// USER COMPLAINTS
const getUserComplaints = (req, res) => {
    const user_id = req.params.id;

    complaintModel.getComplaintsByUser(user_id, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        res.json(results);
    });
};

// ALL COMPLAINTS (ADMIN)
const getAllComplaints = (req, res) => {
    complaintModel.getAllComplaints((err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        res.json(results);
    });
};

// UPDATE STATUS (ADMIN)
const updateStatus = (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ message: "Missing data" });
    }

    complaintModel.updateStatus(id, status, (err) => {
        if (err) return res.status(500).json({ message: "Server error" });

        res.json({ message: "Status updated successfully" });
    });
};

module.exports = {
    addComplaint,
    getUserComplaints,
    getAllComplaints,
    updateStatus
};