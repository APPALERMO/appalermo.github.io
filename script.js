let altezza = 100
const scale = 0.29

const index = `<!DOCTYPE html>
<html onscroll="scrollTo(0,0)">
<head>
    <title>Sito web di APPA</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="style.css">
    <style>li{margin:0}</style>
</head>
<body>
    
    <div class="welcome">
        <center>
            <p style="margin:0;" id="bevnenutoTitle">Benvenuto</p>
            <div class="btWelcome">
                <button class="btn" onclick="location.pathname = '/'">Home</button>
                <button class="btn" onclick="location.pathname = '/news/'">Novità</button>
                <button class="btn" onclick="modificaNotifica('contenutonotifica', 'social.html');social()">Social</button>
            </div>
        </center>
    </div>
    
    <div style="display: none;" id="notifica">
        <p id="contenutonotifica">
            ciao bro
        </p>
    </div>
    
    <center>
        <div class="contenuto" id="contenuto"> -|- </div>
    </center>
    
</body>
<script src="script.js"></script>
</html> 


`

// <iframe width="560" height="315" src="https://youtube.com/embed/wrB7YsRmpKc?feature=share" allowfullscreen></iframe>
const html_preview_jarvis = `<center>
    <iframe src="https://youtube.com/embed/wrB7YsRmpKc?feature=share" allowfullscreen></iframe>
</center>`

function cambiacontenuto(file) {
    const divContent = document.getElementById("contenuto")
    $.get(file, function(data){
        divContent.innerHTML = data
    })   
}

window.onload = () => {    
    // alert(`${screen.width}x${screen.height}`)
    let path = location.pathname.replace("/", "")
    if(path.includes(".html")){
        const pageContent = document.querySelector("body").innerHTML
        const pageTitle = document.getElementById("futureTitle")
        pageTitle.style.display = "unset"
        
        
        document.querySelector("html").innerHTML = index
        document.getElementById("contenuto").innerHTML = pageContent
        
        
        
        const HomeTitle = document.getElementById("bevnenutoTitle")
        const welcome = document.querySelector(".welcome")
        const html = document.querySelector("html")
        
        
        HomeTitle.innerText = pageTitle.innerText
        
        const pageStyle = pageTitle.style
        
        for (let i = 0; i < pageStyle.length; i++) {
            let propertyName = pageStyle[i]
            let proprietyValue = pageStyle.getPropertyValue(propertyName)
            HomeTitle.style[propertyName] = proprietyValue
            
            if(propertyName === "background-image" || propertyName === "color")
                html.style.setProperty("--border-welcome", proprietyValue)
            
        }
        
        HomeTitle.style.padding = "0"
        HomeTitle.style.margin = "0"
        
    }
    
    // riconoscere tema chiaro e scuro    
    let darkTeme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if(!darkTeme){
        const html = document.querySelector("html")
        
        html.style.setProperty("--bg-html", "rgb(245, 245, 247)")
        html.style.setProperty("--color-text-html", "rgb(28, 28, 30)")
        // html.style.setProperty("--bg-contenuto", "linear-gradient(180deg, darkgray -25%, white 100%)")
        // html.style.setProperty("--bg-notifica", "linear-gradient(180deg, white 0%,gray 22%, gray 55%, white)")
        html.style.setProperty("--bg-contenuto", "rgb(255, 255, 255)")
        html.style.setProperty("--bg-notifica","rgb(248, 249, 250)")
        
        html.style.setProperty("--bg-codice", "rgb(246, 248, 250)")
        html.style.setProperty("--color-codice", "#24292f")
        
    }
}


function aboutG() {
    const contenuto = document.getElementById("contenuto")
    const notifica = document.getElementById("notifica")
    
    $(document).ready(()=>{
        altezza = $("#notifica").outerHeight()
        
    })
    
    
    if(contenuto.className == "contenuto" || contenuto.className == "contenuto-alzato") {
        notifica.style.display = "unset"
        contenuto.className = "contenuto-sceso"
        document.documentElement.style.setProperty("--altezza", `${altezza}px`)
        
    }else { 
        contenuto.className = "contenuto-alzato"
        notifica.style.display = "none"
        
    }
    
}

function about(px) {
    const contenuto = document.getElementById("contenuto")
    
    if(contenuto.className == "contenuto" || contenuto.className == "contenuto-alzato") {
        contenuto.className = "contenuto-sceso"
        document.documentElement.style.setProperty("--altezza", `${px}px`)
        
        
    }else { 
        contenuto.className = "contenuto-alzato"
        
        setTimeout(() => {
            contenuto.className = "contenuto"
        }, 3000)
        
    }
    
}

function social(){
    
    const notifica = document.getElementById("notifica")
    
    // notifica.style.left = "32%"
    notifica.style.display = "unset"    
    // notifica.style.paddingLeft = "55px"
    
    try{
        document.getElementById("contenutonotifica").style.display = "flex"
        document.getElementById("contenutonotifica").style.gap = "2.5vw"
    }catch{
        console.log(Error)
        location.reload()
    }
    
    // about(185.7)
    // about(180)
    about(160)
    
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
