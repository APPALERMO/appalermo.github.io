const dvContent = document.getElementById("content") // contenuto generale
const dvStarter = document.getElementById("starter") // div che contiene il messaggio
const dvStarterContent = document.getElementById("starterContent") // div visualizza il messaggio che è stato acceso il computer
const footer = document.querySelector("footer") // footer di fine pagina


const server = new WebSocket(`ws://localhost:8080`)
// const server = new WebSocket(`wss://serversecurepowerappalermo.onrender.com/:8080`)

server.onopen = () => {
    
    server.send(JSON.stringify({"data":"setWeb", "port":"web"}))
    
    server.send(JSON.stringify({"data":"controlloPassword", "password": location.hash.replace("#", ""), "port":"web"}))
    
}  


// se è caricata la sezione settings o no
let isSettings = false 

server.onmessage = (messaggio) => {
    
    let message = JSON.parse(messaggio.data)
    console.log(message)
    
    if(message.data == "passwordErrata") document.querySelector("body").innerHTML = ""
    
    if(message.data == "accenzione") {
        
        dvStarter.style.display = "block"
        
        // if(message.remember) alert(`Ti ricordo di: "${message.remember}"`)
        
    }
    else if(message.data == "confirm"){
        
        dvStarterContent.style.display = "none"
        h1 = document.createElement("h1")
        h1.style.color = "green"
        
        h1.innerText = "Identità Confermata"
        
        dvStarter.appendChild(h1)
        
    } 
    else if(message.data == "arresta") {
        
        dvStarterContent.style.display = "none"
        h1 = document.createElement("h1")
        h1.style.color = "red"
        
        h1.innerText = "Arresto Computer"
        
        dvStarter.appendChild(h1)
        
    }
    else if(message.data == "isAlive"){
        if(isSettings){
            setTimeout(() => {
                
                const divComputerState = document.getElementById("computerState")                
                divComputerState.style.backgroundColor = "lime"
                
            }, 1000)
        }
    }
    
    else if(message.data == "setProms"){
        
        const prom = document.getElementById("prom")
        
        alert("Promemoria impostato con successo!")
        
        prom.value = ""
    }
    else if(message.data == "setRememeber"){
        if(isSettings){
            setTimeout(() => {
                
                const prom = document.getElementById("prom")           
                
                prom.value = message.remember
                
            }, 1000)
        }
    }
    else if(message.data == "showProms"){
    
        const textProm = document.getElementById("textProm")
        
        if(message.remember)
            textProm.innerText = message.remember
        
    }
    
}





const confirmSi = () => {
    
    server.send(JSON.stringify({"data": "confirm", "reply": "1", "port": "web"}))
    
}

const confirmNo = () => {
    
    server.send(JSON.stringify({"data": "arresta", "reply": "1", "port": "web"}))
    
}

function cambiacontenuto(file) {
    footer.style.top = "0"
    
    $.get(file, function(data){
        dvContent.innerHTML = data
    })
}

const openSettings = (p) => {
    /*
        "impostazioni" per dire, ci sarà:
        - se il computer è acceso (box verde se acceso, rosso se spento)
        (questi sarà utilizzato telegram)
        - inoltro del file excel di controllo
        - inoltro di foto in caso di controllo
    */
    
    p.innerText = "Torna alla Home"
    
    if(isSettings) 
        p.onclick = location.reload()
    
    isSettings = !isSettings
    cambiacontenuto("settings.html")
    
    server.send(JSON.stringify({"data": "isAlive", "reply": "1", "port": "web"}))
    
    
}

const setProms = () => {
    
    const prom = document.getElementById("prom")
    const text = prom.value
    
    if(text) 
        server.send(JSON.stringify({"data": "setProms", "remember": text, "port": "web"}))
    else 
        alert("Inserisci un testo valido")
}
