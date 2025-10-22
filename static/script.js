// Tab switching
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';

  const sidebarItems = document.querySelectorAll('.sidebar ul li');
  sidebarItems.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
}

// Sidebar toggle
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});


let currentCrop = '';

function showUpload(cropName) {
  currentCrop = cropName;
  document.getElementById('selectedCrop').innerText = `Upload Leaf for: ${cropName}`;
  document.getElementById('uploadSection').style.display = 'block';
}

async function uploadImage() {
  const fileInput = document.getElementById('imageUpload');
  if (!fileInput.files[0]) {
    alert("Please select an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("crop", currentCrop);

try {
  const response = await fetch("/predict", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  // Build prediction text
  let resultText = `Predicted: ${data.predicted_class} (${data.confidence.toFixed(2)}%)`;

  // Check if disease_info is included in the response
  if (data.disease_info) {
    const info = data.disease_info;

    resultText += `\n\n🦠 Disease: ${info.disease}\n`;

    if (info.solutions && info.solutions.length > 0) {
      resultText += `\n✅ Solutions:\n - ${info.solutions.join("\n - ")}`;
    }

    if (info.preventive_measures && info.preventive_measures.length > 0) {
      resultText += `\n\n🛡️ Preventive Measures:\n - ${info.preventive_measures.join("\n - ")}`;
    }
  }

  // Show the full result text
  document.getElementById('predictionResult').innerHTML = `
  <strong>Predicted:</strong> ${data.predicted_class} (${data.confidence.toFixed(2)}%)<br>
  <strong>Disease:</strong> ${data.disease_info?.disease || 'N/A'}<br><br>
  <strong>Solutions:</strong>
  <ul>${data.disease_info?.solutions?.map(s => `<li>${s}</li>`).join('') || '<li>N/A</li>'}</ul>
  <strong>Preventive Measures:</strong>
  <ul>${data.disease_info?.preventive_measures?.map(p => `<li>${p}</li>`).join('') || '<li>N/A</li>'}</ul>
`;


} catch (error) {
  console.error(error);
  alert("Error predicting the image");
}

}
// Accordion toggle
document.querySelectorAll(".accordion-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.style.display === "block";

    // Close all
    document.querySelectorAll(".accordion-answer").forEach(a => a.style.display = "none");

    // Toggle current
    answer.style.display = isOpen ? "none" : "block";
  });
});

