// Password toggle visibility micro-interaction
document.querySelectorAll('button[type="button"]').forEach((btn) => {
  btn.addEventListener("click", function () {
    const input = this.parentElement.querySelector("input");
    if (input.type === "password") {
      input.type = "text";
      this.textContent = "visibility_off";
    } else {
      input.type = "password";
      this.textContent = "visibility";
    }
  });
});

// Simple form focus interaction
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("form-focus-ring");
  });
  input.addEventListener("blur", () => {
    input.parentElement.classList.remove("form-focus-ring");
  });
});

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!document.getElementById("terms").checked) {
      alert("Bạn phải đồng ý điều khoản");
      return;
    }

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");

      return;
    }

    const formData = new FormData();

    formData.append("fullname", document.getElementById("fullname").value);

    formData.append("username", document.getElementById("username").value);

    formData.append("email", document.getElementById("email").value);

    formData.append("password", document.getElementById("password").value);

    try {
      const response = await fetch("../../backend/auth/register.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        window.location.href = "dangnhap.html";
      }
    } catch (error) {
      console.error(error);

      alert("Không kết nối được tới register.php");
    }
  });
}
