let currentDiseaseId = null;

document.addEventListener("DOMContentLoaded", loadDiseases);

async function loadDiseases() {
  const tbody = document.getElementById("diseaseTableBody");

  try {
    const response = await fetch("../../backend/diseases/getAll.php");

    const diseases = await response.json();

    tbody.innerHTML = "";

    document.getElementById(
      "diseaseInfo"
    ).innerText = `Hiển thị 1 - ${diseases.length} trong số ${diseases.length} bệnh lý`;

    document.getElementById("totalDiseaseCount").innerHTML = `
    ${diseases.length}
    <span class="text-body-md font-normal">
     bệnh
    </span>
    `;

    const groups = [...new Set(diseases.map((d) => d.disease_group))];

    document.getElementById("groupDiseaseCount").innerHTML = `
    ${groups.length}
    <span class="text-body-md font-normal">
     nhóm
    </span>
    `;

    if (diseases.length === 0) {
      tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-4">
                        Chưa có dữ liệu bệnh
                    </td>
                </tr>
            `;

      return;
    }

    diseases.forEach((disease) => {
      tbody.innerHTML += `
                <tr>

                    <td class="px-lg py-4">
                        ${disease.disease_code}
                    </td>

                    <td class="px-lg py-4 font-semibold">
                        ${disease.disease_name}
                    </td>

                    <td class="px-lg py-4">
                        ${disease.description}
                    </td>

                    <td class="px-lg py-4">
                        ${disease.symptoms}
                    </td>

                    <td class="px-lg py-4">
                        ${disease.disease_group}
                    </td>

                    <td class="px-lg py-4 text-right">

                        <button
                            onclick="editDisease(${disease.id})"
                            class="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                            Sửa
                        </button>

                        <button
                            onclick="deleteDisease(${disease.id})"
                            class="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Xóa
                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteDisease(id) {
  if (!confirm("Bạn có chắc muốn xóa bệnh này?")) {
    return;
  }

  try {
    const response = await fetch("../../backend/diseases/delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Xóa thành công");
      loadDiseases();
    } else {
      alert("Xóa thất bại");
    }
  } catch (error) {
    console.error(error);
  }
}

const modal = document.getElementById("diseaseModal");

document.getElementById("btnAddDisease").addEventListener("click", () => {
  currentDiseaseId = null;

  document.getElementById("modalTitle").innerText = "Thêm bệnh mới";

  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

document.getElementById("saveDisease").addEventListener("click", async () => {
  const data = {
    id: currentDiseaseId,

    disease_code: document.getElementById("disease_code").value,

    disease_name: document.getElementById("disease_name").value,

    description: document.getElementById("description").value,

    symptoms: document.getElementById("symptoms").value,

    disease_group: document.getElementById("disease_group").value,
  };

  const url = currentDiseaseId
    ? "../../backend/diseases/update.php"
    : "../../backend/diseases/add.php";

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.success) {
    alert(currentDiseaseId ? "Cập nhật thành công" : "Thêm thành công");

    location.reload();
  } else {
    alert("Có lỗi xảy ra");
  }
});

async function deleteDisease(id) {
  if (!confirm("Bạn có chắc muốn xóa?")) return;

  const response = await fetch("../../backend/diseases/delete.php", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: id,
    }),
  });

  const result = await response.json();

  if (result.success) {
    alert("Xóa thành công");

    location.reload();
  }
}

function editDisease(id) {
  currentDiseaseId = id;

  const row = document
    .querySelector(`button[onclick="editDisease(${id})"]`)
    .closest("tr");

  document.getElementById("disease_code").value = row.cells[0].innerText;

  document.getElementById("disease_name").value = row.cells[1].innerText;

  document.getElementById("description").value = row.cells[2].innerText;

  document.getElementById("symptoms").value = row.cells[3].innerText;

  document.getElementById("disease_group").value = row.cells[4].innerText;

  document.getElementById("modalTitle").innerText = "Cập nhật bệnh";

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

document.getElementById("searchDisease").addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();

  const rows = document.querySelectorAll("#diseaseTableBody tr");

  rows.forEach((row) => {
    const text = row.innerText.toLowerCase();

    row.style.display = text.includes(keyword) ? "" : "none";
  });
});
