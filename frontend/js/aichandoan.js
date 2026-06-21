document.getElementById("analyzeBtn").addEventListener("click", () => {
  const symptoms = document.getElementById("symptoms").value.toLowerCase();

  let diseases = [
    {
      name: "Viêm loét dạ dày",
      keywords: ["đau bụng", "buồn nôn"],
    },

    {
      name: "Suy thận cấp",
      keywords: ["mệt mỏi", "phù"],
    },

    {
      name: "Đái tháo đường",
      keywords: ["khát", "tiểu"],
    },

    {
      name: "Viêm phổi",
      keywords: ["ho", "sốt", "khó thở"],
    },

    {
      name: "Tăng huyết áp",
      keywords: ["đau đầu", "chóng mặt"],
    },

    {
      name: "Hen phế quản",
      keywords: ["khó thở", "khò khè"],
    },

    {
      name: "Xuất huyết tiêu hóa",
      keywords: ["nôn ra máu"],
    },

    {
      name: "Suy gan",
      keywords: ["vàng da", "mệt mỏi"],
    },

    {
      name: "Loãng xương",
      keywords: ["đau nhức xương"],
    },

    {
      name: "Dị ứng",
      keywords: ["ngứa", "nổi mẩn"],
    },

    {
      name: "Viêm khớp",
      keywords: ["đau khớp"],
    },

    {
      name: "Rối loạn lipid máu",
      keywords: ["không triệu chứng"],
    },
  ];

  let results = [];

  diseases.forEach((d) => {
    let score = 0;

    d.keywords.forEach((k) => {
      if (symptoms.includes(k)) {
        score++;
      }
    });

    if (score > 0) {
      results.push({
        name: d.name,
        percent: Math.round((score / d.keywords.length) * 100),
      });
    }
  });

  results.sort((a, b) => b.percent - a.percent);

  let top3 = results.slice(0, 3);

  let html = "";

  if (top3.length === 0) {
    html = `
        <div class="bg-yellow-50 border border-yellow-300 p-5 rounded-xl">
            Không tìm thấy bệnh phù hợp.
        </div>
        `;
  } else {
    top3.forEach((item) => {
      html += `
            <div class="bg-white border rounded-2xl p-5 mb-4 shadow">

                <div class="flex justify-between">

                    <h3 class="font-bold text-lg">
                        ${item.name}
                    </h3>

                    <span class="font-bold text-blue-600">
                        ${item.percent}%
                    </span>

                </div>

                <div class="w-full bg-gray-200 rounded-full h-4 mt-3">

                    <div
                        class="bg-blue-600 h-4 rounded-full"
                        style="width:${item.percent}%">
                    </div>

                </div>

                <p class="mt-3 text-gray-600">
                    Độ phù hợp triệu chứng:
                    ${item.percent}%
                </p>

            </div>
            `;
    });
  }

  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("aiResult").innerHTML = html;
});
