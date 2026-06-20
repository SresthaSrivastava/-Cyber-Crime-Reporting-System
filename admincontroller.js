const complaintModel = require("../models/complaintModel");
const logModel = require("../models/logModel");

// GET DASHBOARD DATA
const getDashboard = (req, res) => {
    complaintModel.getAllComplaints((err, complaints) => {
        if (err) return res.status(500).json({ message: "Server error" });

        logModel.getAllLogs((err2, logs) => {
            if (err2) return res.status(500).json({ message: "Server error" });

            res.json({
                totalComplaints: complaints.length,
                complaints: complaints,
                logs: logs
            });
        });
    });
};

// CHANGE STATUS
const changeStatus = (req, res) => {
    const { id, status, admin_id } = req.body;

    if (!id || !status || !admin_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const validStatuses = ["Pending", "In Progress", "Resolved"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    complaintModel.updateStatus(id, status, (err) => {
        if (err) return res.status(500).json({ message: "Server error" });

        logModel.createLog(
            `Complaint ${id} status changed to ${status}`,
            admin_id,
            (logErr) => {
                if (logErr) {
                    console.log("Log error:", logErr);
                }

                res.json({ message: "Status updated & logged" });
            }
        );
    });
};

module.exports = {
    getDashboard,
    changeStatus
};