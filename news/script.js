const scale = 0.29

function cambiacontenuto(file) {
    const divContent = document.getElementById("contenuto");
    $.get(file, function(data){
        divContent.innerHTML = data;
    });   
}

window.onload = ()=> {
    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    cambiacontenuto("news.txt")
    
}
