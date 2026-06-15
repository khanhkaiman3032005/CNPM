// Interactive tooltips for side nav
document.querySelectorAll("aside nav a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.classList.add("scale-110");
  });
  link.addEventListener("mouseleave", () => {
    link.classList.remove("scale-110");
  });
});

// Click effect on table rows
document.querySelectorAll("tbody tr").forEach((row) => {
  row.addEventListener("click", () => {
    console.log("Xem chi tiết bản ghi...");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop();
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("href") === current) {
      a.classList.add("bg-blue-100", "font-bold");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("current-date").innerText =
    new Date().toLocaleDateString("vi-VN");
});

document.addEventListener("DOMContentLoaded", loadDashboardStats);

async function loadDashboardStats() {
  const response = await fetch("../../backend/dashboard/stats.php");

  const data = await response.json();

  document.getElementById("total-drugs").innerText = data.drugs;

  document.getElementById("total-diseases").innerText = data.diseases;

  document.getElementById("total-interactions").innerText = data.interactions;

  document.getElementById("total-searches").innerText = data.searches;
}

document.addEventListener("DOMContentLoaded", loadRecentSearches);

async function loadRecentSearches() {
  const response = await fetch("../../backend/dashboard/recent.php");

  const data = await response.json();

  const tbody = document.getElementById("recent-search-table");

  tbody.innerHTML = "";

  data.forEach((item) => {
    tbody.innerHTML += `
<tr class="hover:bg-slate-50">

    <td class="px-xl py-md font-medium">
        ${item.drug_name} → ${item.disease_name}
    </td>

    <td class="px-xl py-md text-gray-600">
        ${new Date(item.searched_at).toLocaleString("vi-VN")}
    </td>

    <td class="px-xl py-md">
        ${item.fullname}
    </td>

    <td class="px-xl py-md text-right">

        ${
          item.result === "Nghiêm trọng"
            ? `<span class="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                Nghiêm trọng
             </span>`
            : `<span class="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                Không tương tác
             </span>`
        }

    </td>

</tr>
`;
  });
}

document.addEventListener("DOMContentLoaded", loadAlerts);

async function loadAlerts() {
  const response = await fetch("../../backend/dashboard/alerts.php");

  const data = await response.json();

  document.getElementById("critical-alert-title").innerText =
    "Cảnh báo tương tác";

  document.getElementById("critical-alert-count").innerText =
    data.total + " tương tác nghiêm trọng";
}

document.addEventListener("DOMContentLoaded", loadChart);

async function loadChart() {
  const response = await fetch("../../backend/dashboard/chart.php");

  const data = await response.json();

  const bars = {
    2: "bar-t2",
    3: "bar-t3",
    4: "bar-t4",
    5: "bar-t5",
    6: "bar-t6",
    7: "bar-t7",
    1: "bar-cn",
  };

  let max = 1;

  data.forEach((item) => {
    if (Number(item.total) > max) {
      max = Number(item.total);
    }
  });

  data.forEach((item) => {
    const percent = (item.total / max) * 100;

    const bar = document.getElementById(bars[item.weekday]);

    if (bar) {
      bar.style.height = percent + "%";

      bar.title = item.total + " lượt tra cứu";
    }
  });
}

document.getElementById("export-report-btn")?.addEventListener("click", () => {
  window.location.href = "../../backend/dashboard/export.php";
});

fetch("../../backend/dashboard/latest.php")
  .then((res) => res.json())
  .then((data) => {
    if (!data) return;

    document.getElementById("latest-title").innerText =
      data.drug_name + " → " + data.disease_name;

    document.getElementById("latest-time").innerText = data.searched_at;
  });
