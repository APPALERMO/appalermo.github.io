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
    
    // if (screen.width <= 1000) { 
    //     alert("E' stato rilevato un utilizzo da telefono, per garantire una grafica migliore si consiglia di girarlo")
    // }
    
    if(screen.width <= 1000 && false){
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
        punteggioG.style.transform = "scale(2) translate(-25%, -100%)"
        
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
} 

function notifica(testo){
    
    const notifica = document.getElementById("notifica");
    notifica.style.display = "unset"
    // notifica.style.top = "25%"
    // notifica.style.left = "28%"
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
    btRiprova.onclick = () => {  location.reload()  }
    btRiprova.innerText = "Gioca Ancora"
    
    document.querySelector(".tavolo").appendChild(btRiprova)
    
    notifica.textContent = testo
    
    const carta = document.getElementsByClassName("testo-carta")
    for(var i = 0; i<carta.length; i++) carta[i].style.opacity = "100%";
    
    
    document.getElementById("stai-carta-i").style.display = "none"

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
    
    // if(counterCarteGiocatore > 4) newDiv.style.top = "-100%"
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
    
    if(sommag >= 7.5 || counterSto >= 2) controlla()
    
    let carte_g = document.querySelectorAll("#carta-g")
    
    carte_g.forEach((element) => {
        let index = element.style.getPropertyValue("--index-card")
        // console.log(index)
        // console.log(element)
        let angle = parseInt(45/counterCarteGiocatore)
        
        if(counterCarteGiocatore > 1){
            
            if(index <= counterCarteGiocatore/2){
                element.style.transform = `rotate(${-angle}deg)`
            }else {
                element.style.transform = `rotate(${angle}deg)`
            }
        }
        
    })
    
    
    counterG += Math.floor(Math.random() * 10)
    turnoG()
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
    newDiv.style.top = "5%"
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
        let angle = parseInt(45/counterCartePC)
        
        if(counterCartePC > 1){
            if(index <= counterCartePC/2){
                element.style.transform = `rotate(${angle + 180}deg)`
            }else {
                element.style.transform = `rotate(${-angle + 180}deg)`
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
        
        if(changeLeftBtView){
            document.getElementById("stai-carta-g").style.top = "65.5%"
            document.getElementById("stai-carta-g").style.left = "42.5%"
        }
        
        document.getElementById("stai-carta-g").style.display = "none"
        document.getElementById("stai-carta-i").style.display = "unset"
        testo.innerHTML = "Ora Sto!"
        
        counterSto++
        if(sommap >= 7.5 || counterSto >= 2){   
            setTimeout(controlla,2000)    
            return
        }
        setTimeout(turnoG,2000)
        
    }

}


function turnoG(){
    const stai_carta_T = document.getElementsByClassName("stai-carta")
    
    for (var i = 0; i<stai_carta_T.length; i++){
        (stai_carta_T[i]).style.opacity = "100%";
    }
    
    try{
        const carta = document.getElementById("btCarta")
        carta.style.display = "unset"
        
        const stai = document.getElementById("btSto")
        stai.style.display = "unset"
    }catch {}
}

function stai(){
    
    counterSto++
    
    const carta = document.getElementById("btCarta")
    carta.style.display = "none";
    
    const stai = document.getElementById("btSto")
    stai.style.display = "none"
    
    document.getElementById("stai-carta-g").style.top = "60.5%"
    document.getElementById("stai-carta-g").style.display = "unset"
    if(sommag >= 7.5) controlla()
    turnoPC()
    
}

function carta(){
    if(sommag >= 7.5) controlla()
    daiCartaG()

}
