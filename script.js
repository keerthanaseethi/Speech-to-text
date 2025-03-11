document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("audioFile").addEventListener("change", function () {
        if (this.files.length > 0) {
            console.log("✅ File selected:", this.files[0].name);
        }
    });
});

async function uploadAudio() {
    let fileInput = document.getElementById("audioFile");
    let transcriptContainer = document.getElementById("transcriptContainer");
    let transcriptText = document.getElementById("transcript");

    if (!fileInput.files.length) {
        alert("❌ Please select an audio file first!");
        return;
    }

    let file = fileInput.files[0];

    // Validate file type
    if (!file.type.startsWith("audio/")) {
        alert("❌ Please upload a valid audio file!");
        return;
    }

    let formData = new FormData();
    formData.append("audio", file);

    console.log("📤 Uploading:", file.name);

    try {
        let response = await fetch("http://localhost:5000/upload", { // Change to your backend URL
            method: "POST",
            body: formData
        });

        console.log("📥 Response received:", response);

        if (!response.ok) {
            throw new Error(`🚨 HTTP Error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("📜 Server response:", data);

        if (data.transcript) {
            transcriptText.innerText = data.transcript;
            transcriptContainer.style.display = "block";
        } else {
            alert("❌ No transcript received!");
        }
    } catch (error) {
        console.error("⚠️ Upload error:", error);
        alert("🚨 Error uploading file. See console logs for details.");
    }
}
