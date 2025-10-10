const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })
console.clear()
console.log("|>--------------------------------------<|")
console.log("SERVER AVVIATO!")
console.log("|>--------------------------------------<|\n")

let userAccessed = 0

let usernameVett = [] // usernameV sarebbe un array di stinghe che tiene gli username
// porte dei giocatori
let G1Port // 8081
let G2Port // 8082 

const istructionList = () =>{
    const DIM = 90
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

const carteG1 = istructionList() // carte che verranno estratte (per non essere ripetute) per il giocatore 1
let G1pointer = 0 // somma delle carte del giocatore 1
let counterG1 = 0 // contatore dell'indice delle carte del gicocatore 1


const carteG2 = istructionList() // carte che verranno estratte (per non essere ripetute) per il giocatore 2
let G2pointer = 0 // somma dele carte del giocatore 2
let counterG2 = 0 // contatore dell'indidice delle carte del giocatore 2

let userConnected = 0 // quanti utenti non connessi
let r = -1 // numero di carta
let type = -1 // tipo di carta

const clients = []

const gamerCard = () =>{
    
    // scelta della carta per il giocatore 1
    r = parseInt(carteG1[counterG1]) % 7
    if(r === 0) r = 0.5
    
    type = Math.floor(Math.random() * 10) % 4
    
    choisedCard1 = (type !== 0) ? (r === 0.5) ? `${type}0`: `${type}${r}`     :     (r === 0.5) ? `10`: `${r}`
    
    
    // scelta della carta per il giocatore 2
    r = parseInt(carteG2[counterG2]) % 7
    if(r === 0) r = 0.5
    
    type = Math.floor(Math.random() * 10) % 4
    
    choisedCard2 = (type !== 0) ? (r === 0.5) ? `${type}0`: `${type}${r}`     :     (r === 0.5) ? `10`: `${r}`
    
    
    // incremento di un numero casuale il contatore
    counterG1 += Math.floor(Math.random() * 10)
    counterG2 += Math.floor(Math.random() * 10)
    
    return [choisedCard1, choisedCard2] // ritorno di un array che dice quale carta ha estratto
}

function controlla(){
    
    // posizione 0 => giocatore 1 
    // posizione 1 => giocatore 2
    
    const winner = new Array(2)
    
    if(G1pointer >= 7.5 || G2pointer >= 7.5){
    
        if(G1pointer > 7.5 && G2pointer > 7.5){
            winner[0] = "Avete perso!"
            winner[1] = "Avete perso!"
        }else if(G1pointer === G2pointer){
            winner[0] = "Avete pareggiato!"
            winner[1] = "Avete pareggiato!"
        }else if(G1pointer > 7.5){
            winner[0] = "Hai Perso!"
            winner[1] = "Hai vinto!"
        }else if(G2pointer > 7.5){
            winner[0] = "Hai vinto!"
            winner[1] = "Hai perso!"
        }else if(G1pointer == 7.5){
            winner[0] = "Hai vinto!"
            winner[1] = "Hai perso!"
        }else if(G2pointer == 7.5){
            winner[0] = "Hai perso!"
            winner[1] = "Hai vinto!"
        }
        
        clients.forEach((socket)=>{
            socket.send(JSON.stringify({
                gamer: "G1",
                carta: NaN,
                point: NaN,
                mossa: "notifica",
                message: winner[0],
                port: G1Port,
            }))
            
            socket.send(JSON.stringify({
                gamer: "G2",
                carta: NaN,
                point: NaN,
                mossa: "notifica",
                message: winner[1],
                port: G2Port,
            }))
        })
        
        // azzeramenti variabili 
        G1pointer = 0 // azzeramento dei punti del giocatore 1
        counterG1 = 1 // assegnamento di un valore (1) all'indice del vettore delle carte 
        
        G2pointer = 0 // azzeramento dei punti del giocatore 2
        counterG2 = 1 // assegnamento di un valore (1) all'indice del vettore delle carte 
    } 
}

const showCarta = (event) =>{

    if(event.data == "setUsername"){
        if(event.username && usernameVett.length < 2){
            usernameVett.push(event.username)
            if(usernameVett.length === 2){
                if(clients.length === 2){
                    clients.forEach((socket)=>{
                        G1Port = usernameVett[0]
                        G2Port = usernameVett[1]
                        
                        socket.send(JSON.stringify({
                            g1: usernameVett[0],
                            g2: usernameVett[1],
                        }))
                    })
                }
            }
        }
    }else if(event.data == "reload"){
        // reset
        usernameVett.length = 0
        G1Port = undefined
        G2Port = undefined
        userAccessed = 0
        userConnected = 0
        // ---------------------- // 
        clients.forEach((socket)=>{
            socket.send(JSON.stringify({
                data:"reload"
            }))
        })
        clients.length = 0
        console.log("|>--------------------------------------<|")
    }
    
    choisedCard = gamerCard()
    
    if(userConnected === 2 && event === "start") { // questo per lo start
        G1pointer += ((choisedCard[0]%10 === 0) ? 0.5 : choisedCard[0]%10)
        G2pointer += ((choisedCard[1]%10 === 0) ? 0.5 : choisedCard[1]%10)
        clients.forEach((socket)=>{
            
            socket.send(JSON.stringify({
                gamer: "G1",
                carta: choisedCard[0],
                point: G1pointer,
                mossa: "start",
                port: G1Port,
            }))
            
            
            socket.send(JSON.stringify({
                gamer: "G2",
                carta: choisedCard[1],
                point: G2pointer,
                mossa: "start",
                port: G2Port,
            }))
            
        })
        
        // G1pointer += ((choisedCard[0]%10 === 0) ? 0.5 : choisedCard[0]%10)
        // G2pointer += ((choisedCard[1]%10 === 0) ? 0.5 : choisedCard[1]%10)
    
    }else if(userConnected === 2 && event.data === "daiCarta"){ // questo per l'elaborazione
        if(event.port == G1Port){ G1pointer += ((choisedCard[0]%10 === 0) ? 0.5 : choisedCard[0]%10) }
        else{ G2pointer += ((choisedCard[0]%10 === 0) ? 0.5 : choisedCard[0]%10) }
        clients.forEach((socket)=>{
            socket.send(JSON.stringify({
                carta: choisedCard[0],
                point: (event.port == G1Port) ? G1pointer : G2pointer,
                mossa: event.mossa,
                port: (event.port == G1Port) ? G1Port : G2Port,
            }))
            
            socket.send(JSON.stringify({
                carta: NaN,
                point: NaN,
                mossa: "stai",
                port: (event.port == G1Port) ? G2Port : G1Port,
            }))  
        })
        
        // if(event.port == G1Port){ G1pointer += ((choisedCard[0]%10 === 0) ? 0.5 : choisedCard[0]%10) }
        // else{ G2pointer += ((choisedCard[0]%10 === 0) ? 0.5 : choisedCard[0]%10) }
        
    }else if(userConnected === 2 && event.data === "stai"){
        clients.forEach((socket)=>{
            socket.send(JSON.stringify({
                carta: NaN,
                point: NaN,
                mossa: "stai",
                port: (event.port == G1Port) ? G1Port : G2Port,
            }))
            
            socket.send(JSON.stringify({
                carta: NaN,
                point: NaN,
                mossa: "niente",
                port: (event.port == G1Port) ? G2Port : G1Port,
            }))
        })
        
        
    }else if(userConnected === 1 && clients.length === 2){
        clients.forEach((socket)=>{
        
            socket.send(JSON.stringify({
                gamer: "G1",
                carta: -1,
                port: G1Port
            }))
            
            socket.send(JSON.stringify({
                gamer: "G2",
                carta: -1,
                port: G2Port
            }))  
        })
    }else{
        // console.log("ERRORE", clients.length, userConnected, userAccessed)
    }
    
    controlla()
    
}

server.on('connection', socket => {
    userAccessed++
    console.log("Si è connesso un giocatore! Giocatori connessi:",userAccessed)
    clients.push(socket)
    console.log("Client connessi:", clients.length)
    
    socket.on('message', mess => {
        let messaggio = JSON.parse(mess)
        console.log(messaggio)
        if(messaggio.data === "INIZIO"){
            if(userConnected < 2) {
                userConnected++
                showCarta("start")
            }
            // console.log("CONTROLLO DI SERVIZIO",clients.length, userConnected, userAccessed)
        }else showCarta(messaggio)
    })

    
    socket.on('close', () => {
        if(userAccessed !== 0) userAccessed--
        clients.splice(clients.indexOf(socket), 1)
        if(userConnected !== 0) userConnected--
        
        if(userConnected < 2){
            usernameVett.length = 0
            G1Port = undefined
            G2Port = undefined
            userAccessed = 0
            userConnected = 0
            clients.length = 0
        }
        console.log("Si è disconnesso un utente. Utenti conenssi: ",userAccessed);
    })
})
