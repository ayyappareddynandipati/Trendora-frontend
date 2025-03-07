
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const newPasswordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const passwordInput = document.getElementById("password");
    const alertMessage = document.getElementById("alert-message");
    const resetButton = document.getElementById("btn-reset");
    const loginBtn = document.getElementById("btn-login");

    // ✅ Password Reset Functionality
    if (resetButton) {
        resetButton.addEventListener("click", async function () {
            const email = emailInput?.value.trim().toLowerCase();
            const newPassword = newPasswordInput?.value.trim();
            const confirmPassword = confirmPasswordInput?.value.trim();

            if (!email || !newPassword || !confirmPassword) {
                showAlert("⚠️ All fields are required!");
                return;
            }

            if (newPassword.length < 6) {
                showAlert("⚠️ Password must be at least 6 characters.");
                return;
            }

            if (newPassword !== confirmPassword) {
                showAlert("⚠️ Passwords do not match.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/reset-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, newPassword }),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Password reset failed!");

                alert("✅ Your password has been updated! Please log in.");
                window.location.href = "login.html";
            } catch (error) {
                showAlert(`❌ ${error.message}`);
            }
        });
    }

    // ✅ Login Functionality
    if (loginBtn) {
        loginBtn.addEventListener("click", async function (event) {
            event.preventDefault();

            const email = emailInput?.value.trim().toLowerCase();
            const password = passwordInput?.value.trim();

            if (!email || !password) {
                showAlert("⚠️ Please enter both email and password.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                    credentials: "include",
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Login failed!");

                sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
                alert(`✅ Welcome, ${data.user.fname}! Redirecting...`);
                window.location.href = "index.html"; // Redirect to home
            } catch (error) {
                console.error("❌ Login Error:", error);
                showAlert(`❌ ${error.message}`);
            }
        });
    }

    // ✅ Utility function to show alerts
    function showAlert(message) {
        if (alertMessage) {
            alertMessage.textContent = message;
            alertMessage.style.display = "block";
        } else {
            alert(message);
        }
    }
});
