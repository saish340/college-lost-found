// Show logged-in student name
document.addEventListener("DOMContentLoaded", () => {
  const studentID = localStorage.getItem("studentID");
  const welcomeUser = document.getElementById("welcomeUser");
  if (studentID && welcomeUser) {
    welcomeUser.textContent = "Logged in as: " + studentID;
  }

  const form = document.getElementById("lostItemForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const itemName = document.getElementById("itemName").value.trim();
      const description = document.getElementById("description").value.trim();

      if (!itemName || !description) {
        alert("Please enter both fields.");
        return;
      }

      submitLostItemToFirestore(itemName, description, studentID);
      form.reset();
    });
  }

  if (studentID) {
    loadMyItems(studentID);
  }
});

// Submit lost item to Firestore
function submitLostItemToFirestore(itemName, description, studentID) {
  db.collection("lostItems").add({
    itemName,
    description,
    studentID,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Item submitted!");
    loadMyItems(studentID); // Refresh list
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
}

// Load submitted items by studentID
function loadMyItems(studentID) {
  db.collection("lostItems")
    .where("studentID", "==", studentID)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      const list = document.getElementById("itemsList");
      list.innerHTML = "";
      if (snapshot.empty) {
        list.innerHTML = "<p>No items submitted yet.</p>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
          <strong>${data.itemName}</strong><br>
          ${data.description}<br><hr>
        `;
        list.appendChild(itemDiv);
      });
    })
    .catch(err => {
      console.error("Error getting items:", err);
    });
}
function login() {
  const id = document.getElementById("studentID").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("login-error");

  if (id === "" || password === "") {
    errorEl.textContent = "Please enter Student ID and Password.";
    return;
  }

  localStorage.setItem("studentID", id);
  window.location.href = "dashboard.html";
}

// Make it accessible from HTML
window.login = login;
function showSection(section) {
  document.getElementById("submitSection").style.display = section === "submit" ? "block" : "none";
  document.getElementById("viewSection").style.display = section === "view" ? "block" : "none";

  if (section === "view") {
    const studentID = localStorage.getItem("studentID");
    if (studentID) {
      loadMyItems(studentID);
    }
  }
}


