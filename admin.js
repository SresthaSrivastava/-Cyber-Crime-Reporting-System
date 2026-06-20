const API = "http://localhost:5000/api/admin";

// LOAD DASHBOARD
function loadDashboard() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        window.location.href = "login.html";
        return;
    }

    fetch(`${API}/dashboard`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const complaints = data.complaints || [];
        const logs = data.logs || [];

        // STATS
        document.getElementById("total").innerText = complaints.length;

        let pending = complaints.filter(c => c.status === "Pending").length;
        let resolved = complaints.filter(c => c.status === "Resolved").length;

        document.getElementById("pending").innerText = pending;
        document.getElementById("resolved").innerText = resolved;

        // COMPLAINT LIST
        let html = "";

        if (complaints.length === 0) {
            html = `<p class="section-text">No complaints available.</p>`;
        } else {
            complaints.forEach(c => {
                let statusClass = "status-low";

                if (c.status === "Pending") statusClass = "status-high";
                if (c.status === "In Progress") statusClass = "status-medium";
                if (c.status === "Resolved") statusClass = "status-success";

                html += `
                    <div class="complaint-card admin-complaint-card">
                        <h4>${c.title}</h4>
                        <p>${c.description}</p>

                        <div class="meta">
                            <span class="badge">${c.category || "General"}</span>
                            <span class="badge">${c.priority || "Low"}</span>
                        </div>

                        <p><b>User:</b> ${c.name} (${c.email})</p>

                        <p>
                            <b>Status:</b>
                            <span class="${statusClass}">${c.status}</span>
                        </p>

                        <div class="admin-action-row">
                            <select id="status-${c.id}" class="status-select">
                                <option value="Pending" ${c.status === "Pending" ? "selected" : ""}>Pending</option>
                                <option value="In Progress" ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
                                <option value="Resolved" ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
                            </select>

                            <button class="btn btn-primary" onclick="updateStatus(${c.id})">
                                Update
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        document.getElementById("complaints").innerHTML = html;

        // LOGS
        const logsContainer = document.getElementById("logs");
        if (logsContainer) {
            let logHtml = "";

            if (logs.length === 0) {
                logHtml = `<p class="section-text">No recent activity found.</p>`;
            } else {
                logs.forEach(log => {
                    logHtml += `
                        <div class="log-item">
                            <p><b>${log.name || "Admin"}</b>: ${log.action}</p>
                            <small>${new Date(log.created_at).toLocaleString()}</small>
                        </div>
                    `;
                });
            }

            logsContainer.innerHTML = logHtml;
        }
    })
    .catch(err => {
        console.log(err);
    });
}

// UPDATE STATUS
function updateStatus(id) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const status = document.getElementById(`status-${id}`).value;

    if (!token || !user) {
        window.location.href = "login.html";
        return;
    }

    fetch(`${API}/complaints/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            id,
            status,
            admin_id: user.id
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadDashboard();
    })
    .catch(err => {
        console.log(err);
    });
}

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

// AUTO LOAD
window.onload = loadDashboard;