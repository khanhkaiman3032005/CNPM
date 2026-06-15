let currentDrugId = null;
document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("drugTableBody");

  console.log("Đang tải dữ liệu thuốc...");

  try {
    const response = await fetch("../../backend/drugs/getAll.php");

    const drugs = await response.json();

    document.getElementById(
      "drugInfo"
    ).innerText = `Hiển thị 1 - ${drugs.length} trên tổng số ${drugs.length} thuốc`;

    document.getElementById("totalDrugCount").innerHTML = `
${drugs.length}
<span class="text-body-md font-normal text-on-surface-variant">
    thuốc
</span>
`;

    const today = new Date();

    document.getElementById("lastUpdate").innerHTML =
      today.toLocaleDateString("vi-VN");

    console.log(drugs);

    tbody.innerHTML = "";

    drugs.forEach((drug) => {
      tbody.innerHTML += `
<tr class="hover:bg-surface-container-low transition">

    <td class="p-md font-semibold text-primary">
        ${drug.drug_code}
    </td>

    <td class="p-md font-medium">
        ${drug.drug_name}
    </td>

    <td class="p-md">
        ${drug.active_ingredient}
    </td>

    <td class="p-md">
        <span
            class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
        >
            ${drug.drug_group}
        </span>
    </td>

    <td class="p-md max-w-[200px]">
        ${drug.indication}
    </td>

    <td class="p-md text-red-600">
        ${drug.contraindication}
    </td>

    <td class="p-md text-orange-600">
        ${drug.side_effect}
    </td>

    <td class="p-md text-center">

        <div class="flex justify-center gap-2">

             <button
        onclick="editDrug(${drug.id})"
        class="bg-yellow-500 text-white px-3 py-1 rounded"
    >
        Sửa
    </button>

    <button
        onclick="deleteDrug(${drug.id})"
        class="bg-red-500 text-white px-3 py-1 rounded"
    >
        Xóa
    </button>

        </div>

    </td>

</tr>
`;
    });
  } catch (error) {
    console.error("Lỗi:", error);
  }
});

const modal = document.getElementById("drugModal");

document.getElementById("btnAddDrug").addEventListener("click", () => {
  currentDrugId = null;

  document.getElementById("modalTitle").innerText = "Thêm thuốc mới";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

document.getElementById("saveDrug").addEventListener("click", async () => {
  const data = {
    id: currentDrugId,

    drug_code: document.getElementById("drug_code").value,

    drug_name: document.getElementById("drug_name").value,

    active_ingredient: document.getElementById("active_ingredient").value,

    drug_group: document.getElementById("drug_group").value,

    indication: document.getElementById("indication").value,

    contraindication: document.getElementById("contraindication").value,

    side_effect: document.getElementById("side_effect").value,
  };

  const url = currentDrugId
    ? "../../backend/drugs/update.php"
    : "../../backend/drugs/add.php";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.success) {
    alert(currentDrugId ? "Cập nhật thành công" : "Thêm thành công");

    location.reload();
  } else {
    alert("Có lỗi xảy ra");

    console.log(result);
  }
});

async function deleteDrug(id) {
  if (!confirm("Bạn có chắc muốn xóa thuốc này?")) {
    return;
  }

  try {
    const response = await fetch("../../backend/drugs/delete.php", {
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
    } else {
      alert("Xóa thất bại");

      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
}

function editDrug(id) {
  currentDrugId = id;

  const row = document
    .querySelector(`button[onclick="editDrug(${id})"]`)
    .closest("tr");

  document.getElementById("drug_code").value = row.cells[0].innerText;

  document.getElementById("drug_name").value = row.cells[1].innerText;

  document.getElementById("active_ingredient").value = row.cells[2].innerText;

  document.getElementById("drug_group").value = row.cells[3].innerText;

  document.getElementById("indication").value = row.cells[4].innerText;

  document.getElementById("contraindication").value = row.cells[5].innerText;

  document.getElementById("side_effect").value = row.cells[6].innerText;

  document.getElementById("modalTitle").innerText = "Cập nhật thuốc";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

document.getElementById("searchDrug").addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();

  const rows = document.querySelectorAll("#drugTableBody tr");

  rows.forEach((row) => {
    const text = row.innerText.toLowerCase();

    if (text.includes(keyword)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
