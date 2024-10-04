let vectorPort = [] // questo sarà riempito da un comando del server server
// NB: Anche se c'è il suffisso port, non è una porta, ma sarà il nome del giocatore
let G1Port // 8081
let G2Port // 8082
let currentPort // location.port | questa sarà poi presa da un paragrafo nascosto

let changeLeftBtView = true

let counterCarteGiocatore = 0,
    counterCartePC = 0

const server = new WebSocket("ws://localhost:8080/")
// const server = new WebSocket(`ws:${location.hostname}:8080`)
const divPlayerDate = document.getElementById("playerDate")
const divContent = document.getElementById("contenuto")


const inpUsername = document.getElementById("username")
const btconfirm = document.getElementById("confirmName")

inpUsername.addEventListener("input", ()=>{ inpUsername.value = inpUsername.value.replace(" ", "-") })

const btconfirmPress = () => {
    value = inpUsername.value
    if(value && value !== " ") {
        const body = document.querySelector("body")
        body.style.position = "unset"
        body.style.border = "none"
        
        document.getElementById("port").innerText = value
        divPlayerDate.style.display = "none"
        divContent.style.display = "unset"
        currentPort = value
        document.getElementById("testoGiocatore").innerText = value
        server.send(JSON.stringify({
            data: "setUsername",
            username: value, //valore dell'input di testo
        }))
    }
    else alert("Nome utente non valido!")
}
inpUsername.addEventListener("keydown", (event) => {if(event.keyCode === 13) btconfirmPress()})
btconfirm.addEventListener("click", btconfirmPress)

const scale = 0.29

window.onload = () => {
    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}, user-scalable=no"></meta>`
    //----------------------------------------------------------------------------------------------------//
    // alert(`H: ${screen.height} | W: ${screen.width}`)
    // document.getElementById("testoGiocatore").innerText = (currentPort == G1Port) ? "Giocatore 1"  : "Giocatore 2" 
    // document.getElementById("testoPc").innerText = (currentPort == G1Port) ? "Giocatore 2"  : "Giocatore 1" 
    
    if(screen.width <= 1000){
        
        const body = document.querySelector("body")
        body.style.border = "2px solid black"
    
        
        const containerTestoG = document.getElementById("containerTestoG")
        containerTestoG.style.width = "10%"
        
        const containerTestoP = document.getElementById("containerTestoP")
        containerTestoP.style.width = "10%"
        
        const playerDate = document.getElementById("playerDate")
        playerDate.style.marginTop = "10%"
        playerDate.style.transform += "scale(2)"
        
        
        
        const tavolo = document.querySelector(".tavolo")
        tavolo.style.left = "50%"
        tavolo.style.transform = "skew(-20deg) scale(2) translate(-25%)"
        
        const testoPC = document.getElementById("testo-pc")
        testoPC.style.left = "36%"
        testoPC.style.top = "21.5%"
        testoPC.style.fontSize = "40px"
        testoPC.style.transform = "scale(2)"
        
        
        const btSto = document.getElementById("btSto")
        btSto.style.fontSize = "35px"
        btSto.style.transform = "scale(0.9)"
        // btSto.style.padding= "10px 20px"
        
        const btCarta = document.getElementById("btCarta")
        btCarta.style.fontSize = "35px"
        btCarta.style.transform = "scale(0.9)"
        // btCarta.style.padding= "10px 20px"
        
        const staiCartaI = document.getElementById("stai-carta-i")
        staiCartaI.style.transform = "translate(-55%) scale(2)"
        
        const btView = document.getElementById("vedi-carte")
        btView.style.left = "5%"
        changeLeftBtView = false
        
        const testoGiocatore = document.getElementById("testoGiocatore")
        testoGiocatore.style.left = "2.5%"
        
        
        const punteggioG = document.getElementById("punteggio-g")
        punteggioG.style.top = "100%"
        punteggioG.style.left = "50%"
        punteggioG.style.overflow = "hidden"
        punteggioG.style.transform = "scale(2) translate(-25%, -85%)"
        
        const btInizio = document.getElementById("inizio")
        btInizio.style.position = "unset"
        btInizio.style.fontSize = "25px"
        btInizio.style.display = "flex"
        btInizio.style.alignItems = "center"
        
        const staiCartaG = document.getElementById("stai-carta-g")
        staiCartaG.style.fontSize = "40px"
        staiCartaG.style.top = "62%"
        staiCartaG.style.left = "37%"
        staiCartaG.style.transform = "scale(2)"
        
        const staiCartaP= document.getElementById("testo-pc")
        staiCartaP.style.fontSize = "40px"
        staiCartaP.style.top = "20%"
        staiCartaP.style.left = "37%"
        
        
        const tavoloGiocatore = document.getElementById("carte-g")
        tavoloGiocatore.style.transform = "scale(1.5) translate(-35%,-50%)"
        
        const tavoloPC = document.getElementById("carte-p")
        tavoloPC.style.transform = "scale(1.5) translate(-35%, 15%)"
    }
    
}

const inzio = (bt, sendToServer=true) =>{
    document.querySelector(".tavolo").removeChild(bt)
    if (sendToServer){
        server.send(JSON.stringify({
            data: "INIZIO",
            port: currentPort
        }))
    }
} 


function notifica(testo){
    const notifica = document.getElementById("notifica");
    notifica.style.display = "unset"
    notifica.style.userSelect = "none"
    
    document.getElementById("testo-pc").style.display = "none"
    document.getElementById("stai-carta-g").style.display = "none"
   
   
    let btRiprova = document.createElement("button")
    btRiprova.style.position = "absolute"
    btRiprova.style.top = "70%"
    btRiprova.style.left = "40%"
    btRiprova.style.transform = "skew(20deg)"
    btRiprova.style.borderRadius = "10px"
    btRiprova.style.fontSize = "15px"
    btRiprova.onclick = () => {
        server.send(JSON.stringify({
            data:"reload"
        }))
    }
    btRiprova.innerText = "Gioca Ancora"
    
    document.querySelector(".tavolo").appendChild(btRiprova)
    
    notifica.textContent = testo
    
    const carta = document.getElementsByClassName("testo-carta")
    for(var i = 0; i<carta.length; i++) carta[i].style.opacity = "100%";
    
    
    document.getElementById("stai-carta-i").style.display = "none"
    document.getElementById("vedi-carte").style.display = "none"
}



function mostraCarte(){
    const carta = document.querySelectorAll("#testo-carta-g")
    const bottone = document.getElementById("vedi-carte")
    
    if(bottone.textContent == "Vedi carte"){        
        document.documentElement.style.setProperty("--view", 1)
        
        bottone.textContent = "Nascondi carte"
        if(changeLeftBtView) bottone.style.left = "23%"
    }
    else if(bottone.textContent == "Nascondi carte"){
        document.documentElement.style.setProperty("--view", 0)
        
        bottone.textContent = "Vedi carte"
        if(changeLeftBtView) bottone.style.left = "25%"
    }
}

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
let pointer = 0 // punteggio del giocatore


const carta = () => {
    server.send(JSON.stringify({
        data: "daiCarta",
        mossa: "carta",
        gamerPoint: pointer,
        port: currentPort,
    }))
    
}

const stai = () => {
    server.send(JSON.stringify({
        data: "stai",
        mossa: "stai",
        port: currentPort
    }))
}

const setPoint = (point) => {
    testoPunteggio.innerText = point
}

const staiCartaG1 = document.getElementById("stai-carta-i") // pulsanti stai o carta
const testoG2 = document.getElementById("testo-pc") // testo del secondo giocatore che dice stai o carta
const testo_g2 = document.getElementById("stai-carta-g") // testo del primo giocatore

    
server.onmessage = message => {
    let messaggio = JSON.parse(message.data)
    console.log("MESSAGGIO:",messaggio)
    
    if(messaggio.g1 && messaggio.g2){   
        vectorPort.push(messaggio.g1)
        vectorPort.push(messaggio.g2)
    }
    if(messaggio.data == "reload") setTimeout(location.reload(), 75)
    
    if(vectorPort.length === 2){
        
        G1Port = vectorPort[0]
        G2Port = vectorPort[1]
        
        // modifica del nome dei giocatori
        document.getElementById("testoGiocatore").innerText = (currentPort == G1Port) ? G1Port  : G2Port 
        document.getElementById("testoPc").innerText = (currentPort == G1Port) ? G2Port  : G1Port
        
        // console.log di test
        // console.log("MESSAGGIO DAL SERVER", messaggio)
        
        if(messaggio.carta != -1){ // se è -1 non c'è una carta e quindi c'è un altra richiesta
            if(messaggio.port == currentPort){   
                if(messaggio.mossa == "carta" || messaggio.mossa == "start"){
                    daiCartaG(parseInt(messaggio.carta))
                    setPoint(messaggio.point)
                }
                
                if((messaggio.port == G1Port && messaggio.mossa != "stai") || (messaggio.port == G2Port && messaggio.mossa == "niente")){
                    testo_g2.style.display = "none"
                    staiCartaG1.style.display = "unset"
                    testoG2.style.display = "unset"
                       
                    // console.log di test
                    // if(messaggio.mossa == "niente") console.log("NULLA BRO")
                }
                
                if((messaggio.port == G2Port && (messaggio.mossa != "niente" && messaggio.mossa != "carta"))  || (messaggio.port == G1Port && messaggio.mossa == "stai")){
                    testo_g2.style.display = "unset"
                    staiCartaG1.style.display = "none"
                    testoG2.style.display = "none"
                    
                    // console.log di test
                    // if(messaggio.mossa == "stai") console.log("IO STO")
                    // if(messaggio.mossa == "carta") console.log("CARTA BROOOO")
                }
                
                if(messaggio.mossa == "notifica" && messaggio.message){
                    notifica(`${messaggio.message}`)
                }
                
            } else {
                if(messaggio.carta && messaggio.point) {
                    daiCartaP(parseInt(messaggio.carta))
                }
                
            }
        }else{ // in questo caso se la carta è -1, dice che la partita è iniziata
            try{
                if(messaggio.port == currentPort) inzio(document.querySelector("button#inizio"), false)
                
                server.send(JSON.stringify({
                    data: "INIZIO",
                    port: currentPort
                }))
            }catch{}
        }
        
    }
}

