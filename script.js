// REGISTER FORM
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("Form submitted ✅");

    const Username = document.getElementById("Username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log({ Username, email, password }); // 👈 check values

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Username, email, password })
      });

      console.log("Request sent ✅");

      const data = await response.json();
      console.log("Response:", data);

      alert(data.message);

    } catch (error) {
      console.error("Error:", error);
    }
  });
}

// LOGIN FORM
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("Login form submitted ✅");

    const Username = document.getElementById("Username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Username, password })
      });

      const data = await response.json();
      console.log(data);

      alert(data.message);

      if (data.message === "Login successful") {
        window.location.href = "index.html"; // redirect after login
      }

    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  });
}