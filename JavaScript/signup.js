
document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("btn-signup");
    const sendOtpBtn = document.getElementById("send-otp");
    const verifyOtpBtn = document.getElementById("verify-otp");
    const otpSection = document.getElementById("otp-section");
    const logoutBtn = document.getElementById("logout");

    // Function to send OTP
    sendOtpBtn.addEventListener("click", async () => {
        const fname = document.getElementById("fname").value.trim();
        const lname = document.getElementById("lname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!fname || !lname || !email || !password) {
            alert("⚠️ All fields are required!");
            return;
        }

        try {
            const response = await fetch("https://trendora-backend-1.onrender.com/sendotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fname, lname, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                otpSection.style.display = "block"; // Show OTP input fields
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("🚨 Something went wrong. Please try again.");
        }
    });

    // Function to verify OTP
    verifyOtpBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value.trim();
        const otpInputs = document.querySelectorAll(".otp-box");
        const otp = Array.from(otpInputs).map(input => input.value).join("");

        if (!otp || otp.length !== 4) {
            alert("⚠️ Please enter a valid 4-digit OTP.");
            return;
        }

        try {
            const response = await fetch("https://trendora-backend-1.onrender.com/verifyotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                localStorage.setItem("verifiedEmail", email); // Store verified email temporarily
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("🚨 Something went wrong. Please try again.");
        }
    });

    // Signup button - Calls signup API & redirects to index.html
    signupBtn.addEventListener("click", async () => {
        const fname = document.getElementById("fname").value.trim();
        const lname = document.getElementById("lname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!fname || !lname || !email || !password) {
            alert("⚠️ All fields are required!");
            return;
        }

        try {
            const response = await fetch("https://trendora-backend-1.onrender.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fname, lname, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("✅ Signup successful! Redirecting...");
                window.location.href = "index.html"; // Redirect to index.html
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error signing up:", error);
            alert("🚨 Signup failed. Please try again.");
        }
    });

    // Logout function
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });

});
