const db = require("../db");

// Create log entry
const createLog = (action, user_id, cb) => {
    const sql = `
        INSERT INTO logs (action, user_id)
        VALUES (?, ?)
    `;
    db.query(sql, [action, user_id], cb);
};

// Get all logs (admin)
const getAllLogs = (cb) => {
    const sql = `
        SELECT logs.*, users.name, users.email
        FROM logs
        LEFT JOIN users ON logs.user_id = users.id
        ORDER BY logs.created_at DESC
    `;
    db.query(sql, cb);
};

module.exports = {
    createLog,
    getAllLogs
};