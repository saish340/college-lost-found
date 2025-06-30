function login() {
  const id = document.getElementById("studentID").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("login-error");

  if (id === "" || password === "") {
    errorEl.textContent = "Please enter Student ID and Password.";
    return;
  }

  // TEMP: Accept any credentials for now
  if (id && password) {
    localStorage.setItem("studentID", id);
    window.location.href = "dashboard.html";
  } else {
    errorEl.textContent = "Invalid credentials.";
  }
}
