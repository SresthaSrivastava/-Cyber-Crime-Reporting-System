const mysql = require("mysql2");
console.log("DB FILE IS RUNNING");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Srestha@571",
    database: "cybercrime",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("❌ DB Connection Failed:");
        console.error(err);
    } else {
        console.log("✅ Database Connected Successfully");
    }
});

module.exports = db;
