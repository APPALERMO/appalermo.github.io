let altezza = 100
const scale = 0.29

function cambiacontenuto(file) {
    const divContent = document.getElementById("contenuto");
    $.get(file, function(data){
        divContent.innerHTML = data;
    });   
}

window.onload = () => {
    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    
    if(location.hash == "#guicad") cambiacontenuto("Info-SoftwareCAD.html")
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
    const divContent = document.getElementById(id);
    $.get(file, (data) =>{
        divContent.innerHTML = data;
    });   
}

function reset(){
    const notifica = document.getElementById("notifica")
    
    notifica.style.left = "50%"
    notifica.style.paddingLeft = "10px"
}