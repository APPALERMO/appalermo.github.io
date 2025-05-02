const jarvisLog = document.querySelector(".jarvis-log")
const micIcon = document.querySelector(".mic")
const waveIcon = document.querySelector(".mic-wave")
const jarvisImage = document.getElementById("jarvis-image")

const server = new WebSocket("wss://serversecurepowerappalermo.onrender.com/")
// const server = new WebSocket("ws://localhost:8080")

let server_start = false

server.onopen = () => { 
    server.send(JSON.stringify({"data":"setWeb", "port":"web"}))
    
    server_start = true
}

server.onmessage = (event) => {
    let message = JSON.parse(event.data)
    
    // qui mi gestisco tutto
    // console.log(message)
    
    if(message.data == "sendJarvis") {
        if(message.ready)
            jarvisImage.style.border = "2px solid green"
        else
            addLog(`JARVIS: ${message.text}`)
        
        if(message.img) {
            const img = document.createElement("img")
            const center = document.querySelector("center")
            
            img.src = message.img
            img.style.margin = "1%"
            img.style.border = "2px solid black"
            
            img.addEventListener("click", () => {
                center.removeChild(img)
            })
            
            
            center.appendChild(img)
        }
    }
    
}

const addLog = (text) => {
    // let log = `<div>${text}</div>`
    let log = document.createElement("div")
    
    
    if (text.includes("JARVIS:")){
        const real_text = text.substring(7, text.length)
        const utterance = new SpeechSynthesisUtterance(real_text)
        utterance.lang = 'it-IT'
        
        
        const voices = window.speechSynthesis.getVoices()
        const italianVoice = voices.find(voice => voice.lang === "it-IT")
        if (italianVoice) {
            utterance.voice = italianVoice
        }
        
        window.speechSynthesis.speak(utterance)
        
        text = text.replace("JARVIS:", "<span style='color:red'>JARVIS:</span>")
    } 
    
    if (text.includes("ME:"))
        text = text.replace("ME:", "<span style='color:#142ab4'>ME:</span>")
    
    log.innerHTML = text
    // jarvisLog.innerHTML += log
    jarvisLog.appendChild(log)
    return log
}

window.onload = () => {
    addLog("JARVIS: Ciao Capo!")
}
// ------------------------------------------------------------------------ \\

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.lang = 'it-IT'
recognition.interimResults = true
recognition.continuous = false

let lastedLog = null

recognition.onstart = () => {
    waveIcon.style.display = "unset"
    lastedLog = addLog("ME: ")
}

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    const capitalizeTranscript = transcript[0].toUpperCase() + transcript.slice(1);
    lastedLog.innerHTML = "<span style='color:#142ab4'>ME:</span> " + capitalizeTranscript
}

recognition.onend = () => {
    waveIcon.style.display = "none" 
    let text = lastedLog.innerText
    text = text.substring(4, text.length)
    server.send(JSON.stringify({"data":"sendJarvis","text": text, "port":"web"}))
    lastedLog = null
}

micIcon.addEventListener('click', () => {
    recognition.start()
})
