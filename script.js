document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("audioFile").addEventListener("change", function () {
        if (this.files.length > 0) {
            console.log("File selected:", this.files[0].name);
        }
    });
});

function uploadAudio() {
    let fileInput = document.getElementById("audioFile");
    
    if (!fileInput.files.length) {
        alert("Please select an audio file before uploading!");
        return;
    }

    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append("audio", file);

    console.log("Uploading file:", file.name);

    fetch("http://localhost:5000/upload", { // Change to your Azure backend URL
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Server response:", data);
        if (data.transcript) {
            document.getElementById("transcript").innerText = data.transcript;
            document.getElementById("transcriptContainer").style.display = "block";
        } else {
            alert("Error: No transcript received!");
        }
    })
    .catch(error => {
        console.error("Upload error:", error);
        alert("Error uploading file. Please check console logs.");
    });
}
