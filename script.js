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
            <div style="display: flex;width: 30%;justify-content: space-evenly;align-items: center;" id="btWelcome">
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
    
    
    let path = location.pathname.replace("/", "")
    if(path.includes(".html")){
        const pageContent = document.querySelector("body").innerHTML
        const pageTitle = document.getElementById("futureTitle")
        pageTitle.style.display = "unset"
        
        
        document.querySelector("html").innerHTML = index
        document.getElementById("contenuto").innerHTML = pageContent
        
        const HomeTitle = document.getElementById("bevnenutoTitle")
        
        HomeTitle.innerText = pageTitle.innerText
        
        const pageStyle = pageTitle.style
        
        for (let i = 0; i < pageStyle.length; i++) {
            let propertyName = pageStyle[i];
            HomeTitle.style[propertyName] = pageStyle.getPropertyValue(propertyName);
        }
        
        HomeTitle.style.padding = "0"
        HomeTitle.style.margin = "0"
        
    }
    
    // per dispositivi mobile
    if(screen.width <= 800){
        const contenuto = document.getElementById("contenuto")
        const welcome = document.querySelector(".welcome")
        const btn = document.querySelectorAll(".btn")
        const bottonetornaindietro = document.querySelector(".bottonetornaindietro")
        const btWelcome = document.getElementById("btWelcome")
        
        btWelcome.style.width = "50%"
        welcome.style.fontSize = "100px"
        welcome.style.width = `100%`
        
        btn.forEach(
            (bt) => {
                bt.style.marginBottom = "7%"
                bt.style.marginTop = "3%"
                bt.style.transform = "scale(1.6)"
            }
        )
        
        contenuto.style.width = "80%"
        // contenuto.style.paddingLeft = "10%"
        // contenuto.style.paddingRight = "3%"
        
        
        bottonetornaindietro.style.transform = "scale(0.5)"
        bottonetornaindietro.style.left = "-5%"
        bottonetornaindietro.style.margin = "0"
        
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
