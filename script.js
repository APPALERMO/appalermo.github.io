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
            <p style="margin:0;" id="bevnenutoTitle">Benvenuto</p>
            <button class="btn" onclick="location.pathname = '/'">Home</button>
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
        
    </div>
    
</body>
<script src="script.js"></script>
</html>
`

function cambiacontenuto(file) {
    const divContent = document.getElementById("contenuto")
    $.get(file, function(data){
        divContent.innerHTML = data
    })   
}

window.onload = () => {
    
    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    
    if(location.hash == "#guicad") cambiacontenuto("Info-SoftwareCAD.html")
    
    
    // cambiacontenuto('Info-SecurePower-Bot.html')
    
    let path = location.pathname.replace("/", "")
    if(path.includes(".html")){
        const pageContent = document.querySelector("body").innerHTML
        const pageTitle = document.getElementById("futureTitle")
        pageTitle.style.display = "unset"
        
        // $.get("index.html", function(data){
        //     document.querySelector("html").innerHTML = data
        //     document.getElementById("contenuto").innerHTML = pageContent
        // })
        document.querySelector("html").innerHTML = index
        document.getElementById("contenuto").innerHTML = pageContent
        
        const HomeTitle = document.getElementById("bevnenutoTitle")
        
        HomeTitle.innerText = pageTitle.innerText
        HomeTitle.style.color = pageTitle.style.color
        
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
    notifica.style.display = "unset"    
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
