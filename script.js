document.getElementById("lostForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const desc = document.getElementById("itemDesc").value.trim();
  const imageInput = document.getElementById("itemImageFile");
  const student = localStorage.getItem("studentName") || "Unknown";

  const reader = new FileReader();

  reader.onload = function () {
    const imageBase64 = reader.result;

    const item = {
      name,
      desc,
      image: imageBase64,
      submittedBy: student // ✅ track student name
    };

    let items = JSON.parse(localStorage.getItem("lostItems")) || [];
    items.push(item);
    localStorage.setItem("lostItems", JSON.stringify(items));

    document.getElementById("lostForm").reset();
    alert("Item submitted successfully!");
  };

  // 👇 If image uploaded, read it
  if (imageInput.files.length > 0) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // 👇 If no image, still save the entry
    const item = {
      name,
      desc,
      image: "",
      submittedBy: student
    };

    let items = JSON.parse(localStorage.getItem("lostItems")) || [];
    items.push(item);
    localStorage.setItem("lostItems", JSON.stringify(items));

    document.getElementById("lostForm").reset();
    alert("Item submitted successfully!");
  }
});
