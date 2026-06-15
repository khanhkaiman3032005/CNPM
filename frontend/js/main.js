document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const nameElement = document.getElementById("currentUser");

    if (nameElement) {
      nameElement.textContent = user.fullname;
    }
  }
});
