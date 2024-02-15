const urlImg = "bg.jpg"

const buttons = document.querySelectorAll("button")
const btPartecipanti = document.getElementById("lpart")

const divCos = document.querySelector(".cos")
const divSin = document.querySelector(".sin")

let bgImg = false // falso non c'è, vero c'è

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click",(event)=>{
        
        let tag = event.target.id
        if(tag !== "partecipanti" && tag !== "editStile"){
            const div = document.querySelector(`div#${tag}`)
            const localButton = document.querySelector(`button#${tag}`)
            // console.log(tag)
            div.style.display = (div.style.display === "unset") ? "none" : "unset"
            console.log(div.style.display)
            
            // div.style.display = (localButton.style.transform === "unset") ? "none" : "unset"
            localButton.style.transform = (localButton.style.transform === "scale(1.5)") ? "scale(1)" : "scale(1.5)"
        
        }else if(tag === "partecipanti")btPartecipanti.style.display = (btPartecipanti.style.display === "unset") ? "none" : "unset"
        else{
            if(bgImg){
                document.querySelector("body").style.background = "rgb(28, 27, 34)"
                document.documentElement.style.setProperty("--cl", "white")
                bgImg = false   
            }else{
                // document.documentElement.style.setProperty("--bg", bgImg)
                document.querySelector("body").style.background = "url(bg.jpg)"
                document.documentElement.style.setProperty("--cl", "black")
                bgImg = true
            }
        }
        
    })
}
