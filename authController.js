const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET || "cybercrime_secret_key";

// REGISTER
const register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    userModel.findUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const role = "user";

        userModel.createUser(name, email, hashedPassword, role, (err) => {
            if (err) return res.status(500).json({ message: "Server error" });

            res.json({ message: "User registered successfully" });
        });
    });
};

// LOGIN
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    userModel.findUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = results[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
};

module.exports = {
    register,
    login
};