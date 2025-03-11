function uploadAudio() {
    let fileInput = document.getElementById("audioFile");
    if (fileInput.files.length === 0) {
        alert("Please select an audio file!");
        return;
    }

    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append("audio", file);

    fetch("http://localhost:5000/upload", {  // Change this URL to your Azure backend
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.transcript) {
            document.getElementById("transcript").innerText = data.transcript;
            document.getElementById("transcriptContainer").style.display = "block";
        } else {
            alert("Error processing the audio!");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to upload audio. Check the console for details.");
    });
}
