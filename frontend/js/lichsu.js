const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  document.getElementById("currentUser").innerText = user.fullname;
}
document.addEventListener("DOMContentLoaded", () => {
  loadHistory();
});
async function loadHistory() {
  const response = await fetch("../../backend/history/getAll.php");

  const data = await response.json();
  historyData = data;

  const tbody = document.getElementById("historyTableBody");

  const total = document.getElementById("total-history");

  const count = document.getElementById("history-count");

  total.innerText = data.length;
  const severe = data.filter((x) => x.result === "Nghiêm trọng").length;

  const normal = data.filter((x) => x.result === "Không có tương tác").length;

  document.getElementById("severe-count").innerText = `Nghiêm trọng: ${severe}`;

  document.getElementById(
    "normal-count"
  ).innerText = `Không tương tác: ${normal}`;

  count.innerText = `Tổng ${data.length} lịch sử`;

  renderTable(data);
}

let historyData = [];
let currentPage = 1;

const rowsPerPage = 5;

document.addEventListener("DOMContentLoaded", () => {
  loadHistory();
});

function openDetailModal(id) {
  const item = historyData.find((h) => h.id == id);

  if (!item) return;

  document.getElementById("modal-time").innerText = item.searched_at;

  document.getElementById("modal-user").innerText = item.fullname;

  document.getElementById("modal-content").innerHTML = `
  <b>Thuốc:</b> ${item.drug_name}
  <br>
  <b>Bệnh:</b> ${item.disease_name}
  `;

  document.getElementById("modal-result").innerHTML = `
  <b>Kết quả:</b> ${item.result}
  `;

  document.getElementById("detailModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("detailModal").classList.add("hidden");
}

function searchHistory() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const rows = document.querySelectorAll("#historyTableBody tr");

  rows.forEach((row) => {
    if (row.innerText.toLowerCase().includes(keyword)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

async function confirmClearHistory() {
  const ok = confirm("Bạn có chắc muốn xóa toàn bộ lịch sử?");

  if (!ok) return;

  await fetch("../../backend/history/deleteAll.php");

  loadHistory();
}

function filterByTime() {
  const value = document.getElementById("timeFilter").value;

  let filtered = [...historyData];

  const now = new Date();

  if (value === "Hôm nay") {
    filtered = historyData.filter((item) => {
      const d = new Date(item.searched_at);

      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });
  }

  if (value === "7 ngày qua") {
    filtered = historyData.filter((item) => {
      const d = new Date(item.searched_at);

      const diff = (now - d) / (1000 * 60 * 60 * 24);

      return diff <= 7;
    });
  }

  if (value === "Tháng này") {
    filtered = historyData.filter((item) => {
      const d = new Date(item.searched_at);

      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });
  }

  if (value === "Tất cả thời gian") {
    filtered = historyData;
  }

  currentPage = 1;

  renderTable(filtered);
}

function renderTable(data) {
  const tbody = document.getElementById("historyTableBody");

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5"
            class="text-center py-10">
          Không có dữ liệu
        </td>
      </tr>
    `;
    return;
  }

  const start = (currentPage - 1) * rowsPerPage;

  const end = start + rowsPerPage;

  const pageData = data.slice(start, end);

  pageData.forEach((item) => {
    tbody.innerHTML += `
      <tr>

        <td class="px-6 py-4">
          ${item.searched_at}
        </td>

        <td class="px-6 py-4">
          ${item.fullname}
        </td>

        <td class="px-6 py-4">
          ${item.drug_name}
          →
          ${item.disease_name}
        </td>

        <td class="px-6 py-4">
          ${item.result}
        </td>

        <td class="px-6 py-4 text-right">
            <button
              onclick="openDetailModal(${item.id})"
              class="text-blue-600 mr-3"
            >
              Xem
            </button>

            <button
              onclick="deleteHistory(${item.id})"
              class="text-red-600"
            >
              Xóa
            </button>
        </td>

      </tr>
    `;
  });
  renderPagination(data);
}

async function deleteHistory(id) {
  const ok = confirm("Bạn có chắc muốn xóa?");

  if (!ok) return;

  await fetch(`../../backend/history/delete.php?id=${id}`);

  loadHistory();
}

function renderPagination(data) {
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const container = document.getElementById("pagination-container");

  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");

    btn.innerText = i;

    btn.className = "px-3 py-1 border rounded";

    btn.onclick = () => {
      currentPage = i;

      renderTable(data);
    };

    container.appendChild(btn);
  }
}
