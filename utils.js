const userData = localStorage.getItem("user");

if (userData) {
    const user = JSON.parse(userData);

    const welcomeEl = document.getElementById("welcome");

    if (welcomeEl && user.name) {
        welcomeEl.innerText = `Welcome ${user.name}`;
    }
}