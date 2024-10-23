const textarea = document.querySelector("#textarea");
const voiceList = document.querySelector("#voiceList");
const speechBtn = document.querySelector("#speechBtn");

let synth = window.speechSynthesis;

// Load available voices into the dropdown
function loadVoices() {
    voiceList.innerHTML = ""; // Clear the voice list first
    const voices = synth.getVoices();
    
    voices.forEach(voice => {
        let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    });
}

// Load voices when they change
synth.addEventListener("voiceschanged", loadVoices);

// Function to convert text to speech
function textToSpeech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    
    // Find the selected voice
    const selectedVoice = voices.find(voice => voice.name === voiceList.value);
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    
    synth.speak(utterance);
}

// Button click event handler
speechBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (textarea.value.trim() !== "") {
        if (synth.speaking) {
            synth.cancel(); // Stop speaking if already speaking
        }
        textToSpeech(textarea.value);
    }
});

// Initial voice loading
loadVoices();
