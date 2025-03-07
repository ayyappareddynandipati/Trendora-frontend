document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login_btn");
    const displayLogin = document.getElementById("display_login");

    // Get user session
    let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        if (displayLogin) displayLogin.style.display = "block"; // Show Sign Out
        if (loginBtn) loginBtn.style.display = "none"; // Hide Login
    } else {
        if (displayLogin) displayLogin.style.display = "none"; // Hide Sign Out
        if (loginBtn) loginBtn.style.display = "block"; // Show Login
    }
});

// Logout function
function logout() {
    sessionStorage.removeItem("loggedInUser");
    alert("🚪 You have been logged out!");
    window.location.href = "login.html"; // Redirect to login page
}
