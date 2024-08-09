let altezza = 100
const scale = 0.29

const index = `<!DOCTYPE html>
<html>
<head>
    <title>Sito web di APPA</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="style.css">
    
</head>
<body>
    <div class="welcome">
        <center>
            Benvenuto <br>
            <button class="btn" onclick="location.href = 'https:\/\/appalermo.github.io/'">Home</button>
            <button class="btn" onclick="location.pathname = '/news/'">Novità</button>
            <button class="btn" onclick="modificaNotifica('contenutonotifica', 'social.html');social()">Social</button>
        </center>
    </div>
    
    <div style="position: absolute;" id="notifica">
        <p id="contenutonotifica">
            ciao bro
        </p>
    </div>
    
    
    <div class="contenuto" style="padding: 15px; font-family: Verdana, Geneva, Tahoma, sans-serif;" id="contenuto">
        <p> 
            Ho iniziato dalle basi il 27/09/2021, da lì è partito il mio percorso che mi ha aperto la mente. Da lì ho iniziato a capire molte cose sui programmi e quanto difficile potesse essere crearne uno. <br>
            Mi sono detto "Iniziamo questa nuova avventura". Ero tutto pronto, al tempo provavo felicità quando avviavo il programma con 
            scritto <span id="codice">print("Hello world")</span></code> e mi stampava nella console <span id="codice">"Hello world"</span> i bei momenti della vita. 
            Poi mi sono detto "Andiamo sul difficile" e dopo nemmeno un mese ho iniziato a creare Interfacce Grafiche. Anche lì i codici erano molto semplici, ma all'epoca avevo sbagliato nel non studiare una buona base di Python 
            prima di andare più in profondità. Invece, ho studiato solo un po' di base e ho proseguito direttamente. Tornando indietro, molte più idee mi sono passate per la testa. Ogni giorno un mini-progetto e quando vedevo che funzionava abbastanza bene, ero contentissimo. 
            Dopo circa 10 mesi di programmazione quotidiana, ho preso una pausa perché ero a corto di idee. Dopo essermi ritrovata l'ispirazione, ho scritto codici random per altri 3 mesi e poi di nuovo buio totale. Nell'ultimo periodo sono stato ricco di idee. 
            Infatti, ho creato un SecurePower Bot che, quando accendo il computer, mi invia una notifica su Telegram dicendomi che è stato acceso. Da lì posso scattare foto, fare screenshot, registrare uno schermo per 20 secondi o posso spegnere il computer a distanza nel caso non sia io. 
            Un giorno ho ritrovato vecchi codici che avevo scritto e mi sono detto "Quante belle idee avevo all'epoca". <br>
            Ora sono passato dallo scrivere codici random allo sviluppo di questo sito web al creare un Software di disegno...
            
        </p>
        
        <ul>
            <li> <a class="passami-sopra" href="Info-AI.html">Jarvis LM</a> </li>
            <li> <a class="passami-sopra" href="Info-SoftwareCAD.html">Software CAD</a> </li>
            <li> <a class="passami-sopra" href="Info-SecurePower-Bot.html">SecurePower Bot </a></li>
            <li> <a class="passami-sopra" href="Info-APPABot.html">APPA Supporto Bot</a></li>
            <li> <a class="passami-sopra" href="Info-PasswordGenerator.html">Password Generator</a></li>
            <li> <a class="passami-sopra" href="Info-WordWideMap.html">WordWideMap</a> </li>
            <li> <a class="passami-sopra" href="informatica/">Diagramma a Blocchi Maker</a> </li>
            <li> <a class="passami-sopra" href="decoder/">Convertitore Binario-Testo/Testo-Binario</a> </li>
            <li> <a class="passami-sopra" href="tombola/">Tombola</a> </li>
            <li> <a class="passami-sopra" href="scf/">Sasso Carta Forbice</a> </li>
            <li> <a class="passami-sopra" href="7mezzo/">Gioco da Tavolo 7 e mezzo</a> </li>
            <li> <a class="passami-sopra" href="conversioni/">Conversioni numeriche</a> </li>
            <li> <a class="passami-sopra" href="parabola/">Grafico Equazioni di Secondo Grado</a> </li>
        </ul>
        
        <a href="supporto/" style="position:absolute;left:50%;color: white;padding-bottom: 2%;transform: translate(-50%, 50%);text-decoration: none;">Richiedi Assistenza</a>
        
    </div>
    
</body>
<script src="script.js"></script>
</html>`

function cambiacontenuto(file) {
    const divContent = document.getElementById("contenuto")
    $.get(file, function(data){
        divContent.innerHTML = data
    })   
}

window.onload = () => {
    
    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    // head.innerHTML += "<script src=\"https://code.jquery.com/jquery-3.6.0.min.js\"></script>"
    
    if(location.hash == "#guicad") cambiacontenuto("Info-SoftwareCAD.html")
    
        
    // cambiacontenuto('Info-SecurePower-Bot.html')
    
    let path = location.pathname.replace("/", "")
    if(path.includes(".html")){
        const pageContent = document.querySelector("body").innerHTML
        
        // $.get("index.html", function(data){
        //     document.querySelector("html").innerHTML = data
        //     document.getElementById("contenuto").innerHTML = pageContent
        // })
        
        document.querySelector("html").innerHTML = index
        document.getElementById("contenuto").innerHTML = pageContent
        
    }
}


function aboutG() {
    const contenuto = document.getElementById("contenuto")
    
    $(document).ready(()=>{
        altezza = $("#notifica").outerHeight()
    })
    
    
    if(contenuto.className == "contenuto" || contenuto.className == "contenuto-alzato") {
        contenuto.className = "contenuto-sceso"
        document.documentElement.style.setProperty("--altezza", `${altezza}px`)
    }else { 
        contenuto.className = "contenuto-alzato"
    }
    
}

function about(px) {
    const contenuto = document.getElementById("contenuto")
    
    if(contenuto.className == "contenuto" || contenuto.className == "contenuto-alzato") {
        contenuto.className = "contenuto-sceso"
        document.documentElement.style.setProperty("--altezza", `${px}px`)
        
        
    }else { 
        contenuto.className = "contenuto-alzato"
    }
    
}

function social(){
    
    const notifica = document.getElementById("notifica")
    
    // notifica.style.left = "32%"
    notifica.style.display = "!"    
    notifica.style.paddingLeft = "55px"
    
    try{
        document.getElementById("contenutonotifica").style.display = "flex"
        document.getElementById("contenutonotifica").style.marginLeft = "-6%"
    }catch{
        console.log(Error)
        location.reload()
    }
    
    about(185.7)
    
}


function modificaNotifica(id, file) {
    const divContent = document.getElementById(id)
    $.get(file, (data) =>{
        divContent.innerHTML = data
    })   
}

function reset(){
    const notifica = document.getElementById("notifica")
    
    notifica.style.left = "50%"
    notifica.style.paddingLeft = "10px"
}
