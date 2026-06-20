const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "cybercrime_secret_key";

// VERIFY TOKEN
const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    // Handle "Bearer token"
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// ADMIN CHECK
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied (Admin only)" });
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin
};