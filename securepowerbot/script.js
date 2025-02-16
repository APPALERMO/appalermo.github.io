const dvContent = document.getElementById("content") // contenuto generale
const dvStarter = document.getElementById("starter") // div che contiene il messaggio
const dvStarterContent = document.getElementById("starterContent") // div visualizza il messaggio che è stato acceso il computer
const footer = document.querySelector("footer") // footer di fine pagina

const divDoorControl = document.getElementById("doorControl") // div notifica messaggio che hanno aperto la porta
const textBuzState = document.getElementById("buzState") // testo che controlla lo stato del buzzer (on/off)
const textDoorState = document.getElementById("doorState") // stato porta (aperta chiusa)

const server = new WebSocket(`wss://serversecurepowerappalermo.onrender.com/`)

server.onopen = () => {
    
    server.send(JSON.stringify({"data":"setWeb", "port":"web"}))
    
    server.send(JSON.stringify({"data":"controlloPassword", "password": location.hash.replace("#", ""), "port":"web"}))

}  

const getDate = (date=undefined) => {
    const currentDate = date || new Date()
    
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1 
    const year = currentDate.getFullYear()
    
    return `${day}/${month}/${year}`
}

// se è caricata la sezione settings o no
let isSettings = false 

server.onmessage = (messaggio) => {
    
    let message = JSON.parse(messaggio.data)
    console.log(message)
    
    if(message.data == "passwordErrata") document.querySelector("body").innerHTML = ""
    
    if (message.data == "doorControl"){
        
        if(message.mess == "SENS ON"){
            textDoorState.innerText = "APERTA"
            textDoorState.style.color = "red"
        }else{
            textDoorState.innerText = "CHIUSA"
            textDoorState.style.color = "green"
        }
        
        if(message.mess == "BUZ ON"){
            textBuzState.innerText = "ON"
            textBuzState.style.color = "green"
        }
        else if(message.mess == "BUZ OFF"){
            textBuzState.innerText = "OFF"
            textBuzState.style.color = "red"
        }
    }
    else if(message.data == "accenzione") {
        
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
        
        prom.innerText = ""
    }
    else if(message.data == "setRememeber"){
        if(isSettings){
            setTimeout(() => {
                
                const prom = document.getElementById("prom")           
                
                prom.innerText = message.remember
                
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


const buzON = () => {
    server.send(JSON.stringify({"data": "doorControl", "mess":"BUZ ON", "port": "web"}))
}
const buzOFF = () => {
    server.send(JSON.stringify({"data": "doorControl", "mess":"BUZ OFF", "port": "web"}))
}


function cambiacontenuto(file) {
    footer.style.top = "0"
    
    $.get(file, function(data){
        dvContent.innerHTML = data
    })
}

const openSettings = (p) => {
    
    p.innerText = "Torna alla Home"
    
    if(isSettings) 
        p.onclick = location.reload()
    
    isSettings = !isSettings
    cambiacontenuto("settings.html")
    
    server.send(JSON.stringify({"data": "isAlive", "reply": "1", "port": "web"}))
    
    
}


const setProms = () => {
    
    const prom = document.getElementById("prom")
    const date = document.getElementById("dateProm")
    
    const text = prom.innerText
    let sendDate = date.valueAsDate
    
    if(text){
        
        if(sendDate) 
            sendDate = getDate(sendDate)
        
        server.send(JSON.stringify({"data": "setProms", "remember": text, "date": sendDate, "port": "web"}))
    }
    else 
        alert("Inserisci un testo valido")
}


const toggleViewDoorControl = () => {
    
    if(divDoorControl.style.display == "block"){
        divDoorControl.style.display = "none"
    }
    else if(divDoorControl.style.display == "none"){
        divDoorControl.style.display = "block"
    }
    
}
