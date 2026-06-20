const API = "http://localhost:5000/api/auth";

// REGISTER
function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorEl = document.getElementById("error");

    if (!name || !email || !password) {
        if (errorEl) errorEl.innerText = "All fields are required";
        return;
    }

    fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            if (errorEl) errorEl.innerText = data.message;

            // Redirect after small delay
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        }
    })
    .catch(err => {
        console.log(err);
        if (errorEl) errorEl.innerText = "Something went wrong";
    });
}


// LOGIN
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorEl = document.getElementById("error");

    if (!email || !password) {
        if (errorEl) errorEl.innerText = "All fields are required";
        return;
    }

    fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect based on role
            if (data.user.role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "dashboard.html";
            }
        } else {
            if (errorEl) errorEl.innerText = data.message || "Login failed";
        }
    })
    .catch(err => {
        console.log(err);
        if (errorEl) errorEl.innerText = "Something went wrong";
    });
}