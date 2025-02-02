let sommag = 0;
let sommap = 0;


const scale = 0.29
let changeLeftBtView = true

let counterCarteGiocatore = 0,
    counterCartePC = 0

let counterSto = 0

window.onload = (event) => {
    
    const head = document.querySelector("head")
    const body = document.querySelector("body")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    
}

const istructionList = (DIM = 90) =>{
    // const DIM = 90
    let v = new Array(DIM)
    let vet = new Array(DIM)
    let size = DIM - 1
    
    for(let i = 0; i<DIM; i++) v[i] = -i+DIM
    
    for(let i = 0; i<DIM; i++){
        let estratto, pos
        
        pos = parseInt(Math.random() * 1E10) % size
        estratto = v[pos]
        v[pos] = v[size]
        size --
        
        vet[i] = estratto
    }
    vet[DIM-1] = v[0]
    
    return vet
}

const carteG = istructionList()
let counterG = 0


const carteP = istructionList()
let counterP = 0



const inzio = (bt) =>{
    document.querySelector(".tavolo").removeChild(bt)
    
    document.getElementById("btSto").addEventListener("click", stai)
    document.getElementById("btCarta").addEventListener("click", carta)
    
} 

function notifica(testo){
    
    const notifica = document.getElementById("notifica");
    notifica.style.display = "unset"
    notifica.style.userSelect = "none"
    
    let btRiprova = document.createElement("button")
    btRiprova.style.position = "absolute"
    btRiprova.style.top = "70%"
    btRiprova.style.left = "40%"
    btRiprova.style.transform = "skew(20deg)"
    btRiprova.style.borderRadius = "10px"
    btRiprova.style.fontSize = "15px"
    btRiprova.onclick = () => {  location.reload()  }
    btRiprova.innerText = "Gioca Ancora"
    
    document.querySelector(".tavolo").appendChild(btRiprova)
    
    notifica.textContent = testo
    
    const carta = document.getElementsByClassName("testo-carta")
    for(var i = 0; i<carta.length; i++) carta[i].style.opacity = "1";
    
    
    const btCarta = document.getElementById("btCarta")
    const btStai = document.getElementById("btSto")
    const comandi_giocatore = document.getElementById("stai-carta-g")
    const staicarta = document.querySelectorAll(".stai-carta")
    
    btCarta.style.opacity = "0";
    btCarta.disabled = true
    
    btStai.style.opacity = "0"
    btStai.disabled = true
    
    comandi_giocatore.style.opacity = "0"
    
    staicarta.forEach((elem) => {
        elem.style.opacity = "0"
    })
    

}

function controlla(){
    // console.log("Punteggio Giocatore: " + sommag)
    // console.log("Punteggio PC: " + sommap)
    if(sommag > 7.5 && sommap > 7.5) notifica("Entrambi avete perso")
    else if (sommag == sommap) {
        if(counterCarteGiocatore > counterCartePC)
            notifica("Hai vinto!")
        else 
            notifica("Ha vinto il PC!")
        
    }
    else if (sommag > 7.5) notifica("Ha vinto il PC")
    else if (sommap > 7.5) notifica("Hai Vinto!")
    else if (sommag < sommap) notifica("Ha vinto il PC")
    else if (sommap < sommag) notifica("Ha vinto il Giocatore!")
    

}

function daiCartaG(){
    counterCarteGiocatore++ //incremento carte del giocatore
    
    let r = parseInt(carteG[counterG]) % 7 
    if(r>7 || r === 0) r = 0.5
    
    let type = Math.floor(Math.random() * 10) % 4
    // 0 => coppe
    // 1 => soli
    // 2 => mazze
    // 3 => spade
    
    const divPadre = document.getElementById("carte-g")
    const newDiv = document.createElement("div")
    
    newDiv.classList.add("carta")
    newDiv.id = "carta-g"
    newDiv.style.setProperty("--index-card", counterCarteGiocatore)
    
    
    const figliaDivCarta = document.createElement("p")
    
    let carta = (type !== 0) ? (r === 0.5) ? `${type}0`: `${type}${r}`     :     (r === 0.5) ? `10`: `${r}`
    
    figliaDivCarta.id = "testo-carta-g"
    figliaDivCarta.innerHTML = `<img src="https://demo.giocaonline.casino/assets/svg/carte/napoletane/${carta}.svg" height=180 width=120>`
    
    const divNoSpy = document.createElement("div")
    divNoSpy.style.height = "180px";
    divNoSpy.style.width = "120px";
    divNoSpy.style.position = "absolute";
    divNoSpy.style.top = "0";
    divNoSpy.style.backgroundColor = "transparent";
    
    figliaDivCarta.appendChild(divNoSpy)
    
    
    newDiv.appendChild(figliaDivCarta)
    divPadre.appendChild(newDiv)
    figliaDivCarta.classList.add("testo-carta")
    
    
    sommag += r
    document.getElementById("testo-punteggio").textContent = sommag    
    
    if(sommag >= 7.5 || counterSto >= 2) {
        controlla()
        return
    }
    
    
    let carte_g = document.querySelectorAll("#carta-g")
    
    carte_g.forEach((element) => {
        let index = element.style.getPropertyValue("--index-card")
        // console.log(index)
        // console.log(element)
        let angle = parseInt(30/counterCarteGiocatore)
        
        if(counterCarteGiocatore > 1){
            
            if(index <= counterCarteGiocatore/2){
                element.style.transform = `rotate(${-angle}deg)`
            }else {
                element.style.transform = `rotate(${angle}deg)`
            }
        }
        
    })
    
    
    
    counterG += Math.floor(Math.random() * 10)
    // turnoG()
}

function daiCartaP(){
    
    counterCartePC++
    let r = parseInt(carteP[counterP]) % 7 
    if(r>7 || r === 0) r = 0.5
    
    let type = Math.floor(Math.random() * 10) % 4
    // 0 => coppe
    // 1 => sole
    // 2 => mazze
    // 3 => spade
    
    const divPadre = document.getElementById("carte-p")
    const newDiv = document.createElement("div")
    
    newDiv.id = "carta-p"
    newDiv.classList.add("carta")
    // newDiv.style.top = "5%"
    newDiv.style.setProperty("--index-card", counterCartePC)
    
    // if(counterCartePC > 4) newDiv.style.top = "-100%"
    const figliaDivCarta = document.createElement("p")
    
    figliaDivCarta.classList.add("testo-carta")
    figliaDivCarta.id = "testo-carta-p"
    
    
    let carta = (type !== 0) ? (r === 0.5) ? `${type}0`: `${type}${r}`     :     (r === 0.5) ? `10`: `${r}`
    
    figliaDivCarta.innerHTML = `<img src="https://demo.giocaonline.casino/assets/svg/carte/napoletane/${carta}.svg" height=180 width=120>`
    
    const divNoSpy = document.createElement("div")
    divNoSpy.style.height = "180px";
    divNoSpy.style.width = "120px";
    divNoSpy.style.position = "absolute";
    divNoSpy.style.top = "0";
    divNoSpy.style.backgroundColor = "transparent";
    
    
    figliaDivCarta.appendChild(divNoSpy)
    newDiv.appendChild(figliaDivCarta)
    
    divPadre.appendChild(newDiv)
    sommap += r
    
    
    let carte_p = document.querySelectorAll("#carta-p")
    
    carte_p.forEach((element) => {
        let index = element.style.getPropertyValue("--index-card")
        // console.log(index)
        // console.log(element)
        let angle = parseInt(30/counterCartePC)
        
        if(counterCartePC > 1){
            if(index <= counterCartePC/2){
                element.style.transform = `rotate(${angle}deg)`
            }else {
                element.style.transform = `rotate(${-angle}deg)`
            }
        }
        
    })
    
    
    if(sommap >= 7.5 || counterSto >= 2) {
        controlla()
        return
    }
    
    // counterP += Math.floor(Math.random() * 10)

}

function turnoPC(){
    
    const testo = document.getElementById("testo-pc")
    
    let r = parseInt(carteP[counterP]) % 7 
    if(r>7 || r === 0) r = 0.5
    
    let incrase = Math.floor(Math.random() * 10)
    
    let nextCard = parseInt(carteP[counterP + incrase]) % 7 
    if(nextCard > 7 || nextCard === 0) nextCard = 0.5 
    
    if(!changeLeftBtView) testo.style.left = "30%"
    
    if((r + nextCard) <= 7.5){
        testo.textContent = "Fammi vedere...Carta!"
        daiCartaP()
        counterP += incrase
        
        if(sommap >= 7.5) {
            setTimeout(controlla,2000)    
            return
        }
        setTimeout(turnoPC,2000)
        
    }else{
        document.getElementById("stai-carta-g").style.opacity = "1"
        document.getElementById("stai-carta-i").style.display = "unset"
        testo.innerHTML = "Ora Sto!"
        
        counterSto++
        if(sommap >= 7.5 || counterSto >= 2){   
            setTimeout(controlla,2000)    
            return
        }
        // setTimeout(turnoG,2000)
        
    }

}


function turnoG(){
    const stai_carta_T = document.getElementsByClassName("stai-carta")
    
    for (var i = 0; i<stai_carta_T.length; i++){
        (stai_carta_T[i]).style.opacity = "1";
    }
    
}

function stai(){
    
    counterSto++
    
    const carta = document.getElementById("btCarta")
    carta.style.opacity = "0";
    carta.disabled = true
    
    const stai = document.getElementById("btSto")
    stai.style.opacity = "0"
    stai.disabled = true
    
    document.getElementById("stai-carta-g").style.opacity = "1"
    if(sommag >= 7.5) controlla()
    turnoPC()
    
}

function carta(){
    if(sommag >= 7.5) controlla()
    daiCartaG()

}
