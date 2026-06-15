let drugs = [];
let diseases = [];

document.addEventListener("DOMContentLoaded", () => {
  loadDrugs();
  loadDiseases();
});

async function loadDrugs() {
  console.log("Dang load thuoc");
  const response = await fetch("../../backend/drugs/getAll.php");

  drugs = await response.json();

  console.log(drugs);
  const select = document.getElementById("drugInput");

  select.innerHTML = '<option value="">Chọn thuốc</option>';

  drugs.forEach((drug) => {
    select.innerHTML += `
          <option value="${drug.id}">
              ${drug.drug_name}
          </option>
      `;
  });
}

async function loadDiseases() {
  console.log("Dang load thuoc");
  const response = await fetch("../../backend/diseases/getAll.php");

  diseases = await response.json();

  console.log(drugs);
  const select = document.getElementById("diseaseInput");

  select.innerHTML = '<option value="">Chọn bệnh lý</option>';

  diseases.forEach((disease) => {
    select.innerHTML += `
          <option value="${disease.id}">
              ${disease.disease_name}
          </option>
      `;
  });
}

async function checkInteraction() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const drugId = document.getElementById("drugInput").value;
  const diseaseId = document.getElementById("diseaseInput").value;

  const response = await fetch("../../backend/interactions/check.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: currentUser.id,
      drug_id: drugId,
      disease_id: diseaseId,
    }),
  });

  const result = await response.json();

  console.log(result);

  const drugName = drugs.find((d) => d.id == drugId)?.drug_name;

  const diseaseName = diseases.find((d) => d.id == diseaseId)?.disease_name;

  renderResult(result.interaction, drugName, diseaseName);
}

function renderResult(interaction, drugName, diseaseName) {
  const area = document.getElementById("resultsArea");

  if (!interaction) {
    area.innerHTML = `
      <div class="bg-green-50 border border-green-500 rounded-xl p-6">
          <h3 class="text-green-700 text-xl font-bold">
              Không phát hiện tương tác
          </h3>

          <p>
              Thuốc:
              ${drugName}
          </p>

          <p>
              Bệnh:
              ${diseaseName}
          </p>
      </div>
      `;

    return;
  }

  let severityColor = "red";

  if (interaction.severity === "Trung bình") {
    severityColor = "yellow";
  }

  if (interaction.severity === "Nhẹ") {
    severityColor = "blue";
  }
  area.innerHTML = `
<div class="bg-white rounded-2xl shadow-lg border-l-8 border-red-600 p-6">

    <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">⚠️</span>

        <div>
            <h3 class="text-2xl font-bold text-${severityColor}-700">
                ${interaction.severity}
            </h3>

            <p class="text-gray-600">
                Phát hiện tương tác thuốc - bệnh
            </p>
            <p class="text-sm text-gray-500 mt-2">
    Thuốc: <b>${drugName}</b>
</p>

<p class="text-sm text-gray-500">
    Bệnh: <b>${diseaseName}</b>
</p>
        </div>
    </div>

    <div class="bg-red-50 rounded-xl p-4 mb-4">
        <h4 class="font-bold text-${severityColor}-700 mb-2">
            Cảnh báo
        </h4>

        <p>
            ${interaction.warning_message}
        </p>
    </div>

    <div class="grid md:grid-cols-2 gap-4">

        <div class="bg-blue-50 rounded-xl p-4">
            <h4 class="font-bold text-blue-700 mb-2">
                Cơ chế
            </h4>

            <p>
                ${interaction.mechanism}
            </p>
        </div>

        <div class="bg-yellow-50 rounded-xl p-4">
            <h4 class="font-bold text-yellow-700 mb-2">
                Khuyến nghị
            </h4>

            <p>
                ${interaction.recommendation}
            </p>
        </div>

        <div class="bg-green-50 rounded-xl p-4">
            <h4 class="font-bold text-green-700 mb-2">
                Tần suất
            </h4>

            <p>
                ${interaction.frequency}
            </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4">
            <h4 class="font-bold text-gray-700 mb-2">
                Nguồn tham khảo
            </h4>

            <p>
                ${interaction.reference_source}
            </p>
        </div>

    </div>

</div>
`;
}
