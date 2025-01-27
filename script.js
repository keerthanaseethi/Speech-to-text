// script.js
const transcriptArea = document.getElementById('transcript');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

let recognition;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
                transcriptArea.value += result[0].transcript;
            } else {
                interimTranscript += result[0].transcript;
            }
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert('An error occurred: ' + event.error);
    };
} else {
    alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
    startBtn.disabled = true;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', () => {
    if (recognition) {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
});

stopBtn.addEventListener('click', () => {
    if (recognition) {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
});
