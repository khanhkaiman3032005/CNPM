function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.getElementById("passwordIcon");
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "visibility_off";
  } else {
    input.type = "password";
    icon.textContent = "visibility";
  }
}

const loginForm = document.getElementById("loginForm");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;

  const password = document.getElementById("password").value;

  toastMessage.textContent = "Đang xác thực thông tin...";

  toast.classList.remove("opacity-0", "scale-90");

  toast.classList.add("opacity-100", "scale-100");

  const formData = new FormData();

  formData.append("username", username);

  formData.append("password", password);

  try {
    const response = await fetch("../../backend/auth/login.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toastMessage.textContent = "Đăng nhập thành công";

      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => {
        window.location.href = "trangchu.html";
      }, 1000);
    } else {
      toastMessage.textContent = data.message;
    }
  } catch (error) {
    toastMessage.textContent = "Lỗi kết nối máy chủ";
  }
});

// Micro-interaction for input fields
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("shadow-sm");
  });
  input.addEventListener("blur", () => {
    input.parentElement.classList.remove("shadow-sm");
  });
});
