let currentPort // location.port | questa sarà poi presa da un paragrafo nascosto

let counterCarteGiocatore = 0,
    counterCartePC = 0

const server = new WebSocket(`wss://serversecurepowerappalermo.onrender.com/`)

const divPlayerDate = document.getElementById("playerDate")
const divChoiseLobby = document.getElementById("choiseLobby")
const divContent = document.getElementById("contenuto")


const inpUsername = document.getElementById("username")
const btconfirm = document.getElementById("confirmName")

const btConfirmLobby = document.getElementById("confirmLobby")
const btCreateLobby = document.getElementById("createLobby")
const inpLobbyCode = document.getElementById("lobby_id")

var lobbyCode = ""

inpUsername.addEventListener("input", ()=>{ inpUsername.value = inpUsername.value.replace(" ", "-") })

const btconfirmPress = () => {
    value = inpUsername.value
    if(value && value !== " ") {
        document.getElementById("port").innerText = value
        
        divPlayerDate.style.display = "none"
        currentPort = value
        
        document.getElementById("testoGiocatore").innerText = value
        
        server.send(JSON.stringify({
            data: "7mezzoGame",
            message: {
                data: "joinLobby",
                username: value, //valore dell'input di testo
                lobbyCode
            }
        }))
        
        divContent.style.display = "unset"
        
    }
    else alert("Nome utente non valido!")
}

btCreateLobby.addEventListener("click", () => {
    server.send(JSON.stringify({
            data: "7mezzoGame",
            message: {
                data: "createLobby"
            }
        }))
    
    btCreateLobby.disabled = true
})

inpUsername.addEventListener("keydown", (event) => {if(event.keyCode === 13) btconfirmPress()})
btconfirm.addEventListener("click", btconfirmPress)

btConfirmLobby.addEventListener("click", () => {
    lobbyCode = inpLobbyCode.value
    
    if(!lobbyCode) {
        alert("Inserire il codice di una lobby")
        return
    }
    
    server.send(JSON.stringify({
        data: "7mezzoGame",
        message: {
            data: "joinLobby",
            lobbyCode: inpLobbyCode.value
        }
    }))
})


function daiCartaG(forceCarta=-1){
    counterCarteGiocatore++ 
    
    let r = 0
    let type = 0
    
    // 0 => coppe
    // 1 => soli
    // 2 => mazze
    // 3 => spade
    
    const divPadre = document.getElementById("carte-g")
    const newDiv = document.createElement("div")
    
    newDiv.classList.add("carta")
    if(counterCarteGiocatore > 4) newDiv.style.top = "-100%"
    const figliaDivCarta = document.createElement("p")
    
    figliaDivCarta.id = "testo-carta-g"
    
    let carta = (type !== 0) ? (r === 0.5) ? `${type}0`: `${type}${r}`     :     (r === 0.5) ? `10`: `${r}`
    
    if(forceCarta !== -1) carta = forceCarta
    
    
    figliaDivCarta.innerHTML = `<img src="https://demo.giocaonline.casino/assets/svg/carte/napoletane/${carta}.svg" height=180 width=120>`
    
    const divNoSpy = document.createElement("div")
    divNoSpy.style.height = "200px";
    divNoSpy.style.width = "125px";
    divNoSpy.style.position = "absolute";
    divNoSpy.style.top = "0";
    divNoSpy.style.left = "-2%";
    divNoSpy.style.backgroundColor = "transparent";
    
    figliaDivCarta.appendChild(divNoSpy)
    
    newDiv.appendChild(figliaDivCarta)
    divPadre.appendChild(newDiv)
    figliaDivCarta.classList.add("testo-carta")
    
    // counterG += Math.floor(Math.random() * 10)
}

function daiCartaP(forceCarta=-1){
    counterCartePC++
    let r = 0
    let type = 0
    
    // 0 => coppe
    // 1 => soli
    // 2 => mazze
    // 3 => spade
    
    const divPadre = document.getElementById("carte-p")
    const newDiv = document.createElement("div")
    
    newDiv.classList.add("carta")
    if(counterCartePC > 4) newDiv.style.top = "-100%"
    const figliaDivCarta = document.createElement("p")
    
    figliaDivCarta.classList.add("testo-carta")
    figliaDivCarta.id = "testo-carta-p"
    
    let carta = (type !== 0) ? (r === 0.5) ? `${type}0`: `${type}${r}`     :     (r === 0.5) ? `10`: `${r}`
    if(forceCarta !== -1) carta = forceCarta
    
    
    figliaDivCarta.innerHTML = `<img src="https://demo.giocaonline.casino/assets/svg/carte/napoletane/${carta}.svg" height=180 width=120>`
    
    const divNoSpy = document.createElement("div")
    divNoSpy.style.height = "200px";
    divNoSpy.style.width = "125px";
    divNoSpy.style.position = "absolute";
    divNoSpy.style.top = "0";
    divNoSpy.style.left = "-2%";
    divNoSpy.style.backgroundColor = "transparent";
    
    figliaDivCarta.appendChild(divNoSpy)
    
    newDiv.appendChild(figliaDivCarta)
    divPadre.appendChild(newDiv)

}

const testoPunteggio = document.getElementById("testo-punteggio") // div che indica il punteggio


const carta = () => {
    server.send(JSON.stringify({
        data: "7mezzoGame",
        message: {
            data: "mossa",
            mossa: "carta",
            lobbyCode,
            port: currentPort,
        }
    }))
    
}

const stai = () => {
    server.send(JSON.stringify({
        data: "7mezzoGame", 
        message: {
            data: "mossa",
            mossa: "stai",
            lobbyCode,
            port: currentPort
        }
    }))
}

const setPoint = (point) => {
    testoPunteggio.innerText = point
    return
    let currentPoint = +testoPunteggio.innerText
    testoPunteggio.innerText = currentPoint + (+point)
}

const inizio = (bt) => {
    bt?.remove()
    
    server.send(JSON.stringify({
        data: "7mezzoGame", 
        message: {
            data: "start",
            port: currentPort,
            lobbyCode
        }
    }))
    
}

const staiCartaG1 = document.getElementById("stai-carta-i") // pulsanti stai o carta
const testoG1 = document.getElementById("stai-carta-g") // testo del primo giocatore
const testoG2 = document.getElementById("testo-pc") // testo del secondo giocatore che dice stai o carta

server.onmessage = (message) => {
    const messaggio = JSON.parse(message.data)
    
    if(messaggio.data == "error" || messaggio.data == "info") {
        swal(messaggio.message, " ")
        .then(() => {
            if(messaggio.data == "error")
                location.reload()
        }) 
        
        return
    }
    
    if(messaggio.data == "process") {
        if(messaggio.message == "setUsername") {
            divChoiseLobby.style.display = "none"
            divPlayerDate.style.display = "unset"
            
            let elmP = document.createElement("p")
            elmP.style.fontSize = "1.1em"
            elmP.style.textAlign = "center"
            elmP.innerHTML = `Codice Lobby: <b style="user-select:all">${lobbyCode}</b>`
            
            divPlayerDate.appendChild(elmP)
        }
        
        if(messaggio.message == "startGame") {
            let { playerName, turn } = messaggio
            
            playerName.forEach((player) => {
                if(player != currentPort) {
                    document.getElementById("testoPc").innerText = player
                    return
                }
            })
            
            if(turn == currentPort){
                staiCartaG1.style.display = "unset"
                testoG2.style.display = "unset"
            }
            else {
                testoG1.style.display = "unset"
            }
            
        }
        
    }
    
    if(messaggio.data == "lobbyCreated") {
        lobbyCode = messaggio.lobbyCode
        
        const dad = btCreateLobby.parentNode
        btCreateLobby.remove()
        
        let elmP = document.createElement("p")
        elmP.style.fontSize = "1.1em"
        elmP.innerHTML = `Ecco il codice della lobby: <b style="user-select:all">${lobbyCode}</b><br>Per iniziare inserisci il codice lobby sopra e/o condividilo con un'amico`
        
        dad.appendChild(elmP)
        
        inpLobbyCode.value = lobbyCode
        btConfirmLobby.click()   
    }
    
    if(messaggio.data == "carta") {
        if(messaggio.port == currentPort) {
            daiCartaG(messaggio.carta)
            setPoint(messaggio.point)
        } else {
            daiCartaP(messaggio.carta)
        }
    }
    
    
    if(messaggio.data == "stai") {
        staiCartaG1.style.display = "none"
        testoG2.style.display = "none"
        testoG1.style.display = "none"
        
        if(messaggio.port == currentPort){
            testoG1.style.display = "unset"
        }
        else {
            staiCartaG1.style.display = "unset"
            testoG2.style.display = "unset"
        }
    }
    
    
    
}