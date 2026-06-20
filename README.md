# -Cyber-Crime-Reporting-System

Cyber Secure –  A Cyber Crime Reporting System

📌 Overview
Cyber Secure is a full-stack web application designed to provide a secure and efficient platform for reporting cyber crimes online. It allows users to submit complaints, upload evidence, and track the status of their reports in real time.
The system is built using Node.js, Express.js, and MySQL, making it scalable, fast, and reliable for managing cyber crime reports digitally.

🎯 Objective
The main objective of Cyber Secure is to:

Simplify the cyber crime reporting process
Provide a centralized reporting platform
Reduce dependency on offline complaint filing
Improve transparency between users and administrators
Ensure secure handling of sensitive complaint data
💡 Problem Statement

Cyber crimes are increasing rapidly, but victims often face:

Complex offline reporting procedures
Delayed response from authorities
Lack of proper tracking system
No centralized complaint management system

Cyber Secure solves this by providing a digital reporting and tracking system.

🚀 Features
👤 User Features
User registration and login system
Submit cyber crime complaints online
Upload evidence (images/documents)
Track complaint status (Pending / In Progress / Resolved)

View complaint history
🧑‍💼 Admin Features
Secure admin login
View all complaints submitted by users
Update complaint status
Manage and delete invalid reports
Monitor system activity

⚙️ Tech Stack
💻 Frontend
HTML5
CSS3
JavaScript
Bootstrap (optional)
⚙️ Backend
Node.js
Express.js
🗄️ Database
MySQL
📦 Other Tools
Multer (file uploads)
Express-session (authentication)
Body-parser

📁 Project Structure
📦 cyber-secure
 ┣ 📂 public
 ┃ ┣ index.html
 ┃ ┣ login.html
 ┃ ┣ register.html
 ┃ ┣ dashboard.html
 ┃ ┣ style.css
 ┃ ┗ script.js
 ┣ 📂 routes
 ┃ ┣ authRoutes.js
 ┃ ┣ complaintRoutes.js
 ┣ 📂 controllers
 ┃ ┣ authController.js
 ┃ ┣ complaintController.js
 ┣ 📂 models
 ┃ ┗ db.js
 ┣ 📂 uploads
 ┣ 📜 server.js
 ┣ 📜 package.json
 ┣ 📜 database.sql
 ┗ 📜 README.md
 
🧠 Database Design
👤 Users Table
id (Primary Key)
username
email
password
📄 Complaints Table
id (Primary Key)
user_id (Foreign Key)
title
description
evidence_file
status
created_at

🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/cyber-secure.git
2️⃣ Move into Project Folder
cd cyber-secure
3️⃣ Install Dependencies
npm install
4️⃣ Setup MySQL Database

Create database:
CREATE DATABASE cyber_secure;
I
Run Server
node server.js

Open in Browser
http://localhost:3000

🔐 Security Features
Session-based authentication
Secure password storage (if bcrypt used)
Protected admin routes
File upload validation
Controlled access to complaint data

📈 Future Improvements
AI-based cyber crime detection system
Email/SMS notifications for status updates
OTP-based login system
Real-time chat with admin
Analytics dashboard with charts
Mobile application version

🏆 Impact
Cyber Secure helps in building a safer digital environment by:
Making cyber crime reporting easier
Improving response tracking
Providing transparency in complaint handling
Digitizing traditional reporting systems
