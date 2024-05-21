var g = [];
var p = []


const sg = document.getElementById("SassoG")
const cg = document.getElementById("CartaG")
const fg = document.getElementById("ForbiceG")

sg.addEventListener("click", function(){
    cg.style.visibility = "hidden";
    fg.style.visibility = "hidden";
    g.push(1)
    start()
})

cg.addEventListener("click", function(){
    sg.style.visibility = "hidden";
    fg.style.visibility = "hidden";
    g.push(2)
    start()
})

fg.addEventListener("click", function(){
    sg.style.visibility = "hidden";
    cg.style.visibility = "hidden";
    g.push(3)
    start()
})


var r = parseInt(Math.random()*1000) % 3 + 1;

const sp = document.getElementById("SassoP") // 1
const cp = document.getElementById("CartaP") // 2
const fp = document.getElementById("ForbiceP") // 3

const notifica = document.getElementById("notifica");
const testoNotifica = document.getElementById("testoNotifica");

function Notifica(testo){

    notifica.style.visibility = "visible";
    testoNotifica.innerHTML = testo;
}


function start(){    

    console.log("Numero Estratto:",r);
    if(g[0] == r && r == 3) r = r - 2;
    if (g[0] == r && r == 2) r = r + 1;
    if (g[0] == r && r == 1) r = r + 1;
    console.log("Giocatore:", g[0]);
    console.log("PC:", r);
    
    if(r == 1) { // sasso
        cp.style.visibility = "hidden";
        fp.style.visibility = "hidden";
    }
    else if(r == 2){ // carta
        sp.style.visibility = "hidden";
        fp.style.visibility = "hidden";
    }else{ // forbice
        sp.style.visibility = "hidden";
        cp.style.visibility = "hidden";
    }
    g = g[0];
    p = r;
    // console.log(g,p);
    
    setTimeout(function(){
        
        if((p == 1 && g == 2) || (p == 2 && g == 3) || (p == 3 && g == 1)) Notifica("Hai vinto!");
        if((p == 1 && g == 3) || (p == 2 && g == 1) || (p == 3 && g == 2)) Notifica("Mi dispiace, hai perso");
        
    }, 500);
    
}