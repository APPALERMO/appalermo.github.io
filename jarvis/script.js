const jarvisLog = document.querySelector(".jarvis-log")
const micIcon = document.querySelector(".mic")
const waveIcon = document.querySelector(".mic-wave")

const server = new WebSocket("wss://serversecurepowerappalermo.onrender.com/")
let server_start = false

server.onopen = () => { 
    server.send(JSON.stringify({"data":"setWeb", "port":"web"}))
    server_start = true
}

server.onmessage = (event) => {
    let message = JSON.parse(event.data)
    
    // qui mi gestisco tutto
    console.log(message)
    
    if(message.data == "sendJarvis") {
        addLog(`JARVIS: ${message.text}`)
    }
    
}

const addLog = (text) => {
    // let log = `<div>${text}</div>`
    let log = document.createElement("div")
    
    
    if (text.includes("JARVIS:")) 
        text = text.replace("JARVIS:", "<span style='color:red'>JARVIS:</span>")
    
    if (text.includes("ME:"))
        text = text.replace("ME:", "<span style='color:#142ab4'>ME:</span>")
    
    log.innerHTML = text
    // jarvisLog.innerHTML += log
    jarvisLog.appendChild(log)
    return log
}

window.onload = () => {
    addLog("JARVIS: Ciao Capo!")
    // addLog("ME: Ciao Jarvis come stai?")
    // addLog("JARVIS: Molto bene Capo!")
    
}

// ------------------------------------------------------------------------ \\

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert("Mi dispiace, il tuo browser non supporta la Web Speech API.");
    throw new Error("Web Speech API non supportata");
}

const recognition = new SpeechRecognition();
recognition.lang = 'it-IT';
recognition.interimResults = true;
recognition.continuous = false;

let lastedLog = null

recognition.onstart = () => {
    waveIcon.style.display = "unset"
    lastedLog = addLog("ME: ")
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    lastedLog.innerHTML = "<span style='color:#142ab4'>ME:</span> " + transcript
};

recognition.onend = () => {
    waveIcon.style.display = "none" 
    let text = lastedLog.innerText
    text = text.substring(4, text.length)
    server.send(JSON.stringify({"data":"sendJarvis","text": text, "port":"web"}))
    lastedLog = null
};

micIcon.addEventListener('click', () => {
    recognition.start();
});
