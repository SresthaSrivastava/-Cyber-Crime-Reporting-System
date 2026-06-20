const API = "http://localhost:5000/api/complaints";

// ADD COMPLAINT
function addComplaint() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("User not logged in");
        return;
    }

    const msgEl = document.getElementById("msg");

    if (!title || !description) {
        if (msgEl) msgEl.innerText = "All fields required";
        return;
    }

    fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user.id,
            title,
            description
        })
    })
    .then(res => res.json())
    .then(data => {
        if (msgEl) msgEl.innerText = data.message || "Complaint submitted successfully";

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        loadComplaints();
    })
    .catch(err => {
        console.log(err);
        if (msgEl) msgEl.innerText = "Something went wrong";
    });
}

// LOAD COMPLAINTS
function loadComplaints() {
    const user = JSON.parse(localStorage.getItem("user"));
    const complaintsEl = document.getElementById("complaints");

    if (!user || !complaintsEl) return;

    fetch(`${API}/user/${user.id}`)
    .then(res => res.json())
    .then(data => {
        let html = "";

        if (!data.length) {
            complaintsEl.innerHTML = "<p>No complaints submitted yet.</p>";
            return;
        }

        data.forEach(c => {
            let statusClass = "status-low";

            if (c.status === "Pending") statusClass = "status-high";
            if (c.status === "In Progress") statusClass = "status-medium";
            if (c.status === "Resolved") statusClass = "status-success";

            html += `
                <div class="complaint-card" onclick="viewDetail(${c.id})">
                    <h4>${c.title}</h4>
                    <p>${c.description}</p>

                    <div class="meta">
                        <span class="badge">${c.category || "General"}</span>
                        <span class="badge">${c.priority || "Low"}</span>
                    </div>

                    <span class="${statusClass}">${c.status}</span>
                </div>
            `;
        });

        complaintsEl.innerHTML = html;
        localStorage.setItem("allComplaints", JSON.stringify(data));
    })
    .catch(err => console.log(err));
}

// VIEW DETAIL
function viewDetail(id) {
    const allComplaints = JSON.parse(localStorage.getItem("allComplaints")) || [];
    const complaint = allComplaints.find(c => c.id === id);

    if (complaint) {
        localStorage.setItem("selectedComplaint", JSON.stringify(complaint));
        window.location.href = "complaint-detail.html";
    }
}

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

// AUTO LOAD
window.onload = function () {
    loadComplaints();
};