const buttons = document.querySelectorAll("button")
const btPartecipanti = document.getElementById("lpart")

const divCos = document.querySelector(".cos")
const divSin = document.querySelector(".sin")

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click",(event)=>{
        
        let tag = event.target.id
        if(tag !== "partecipanti"){
            const div = document.querySelector(`div#${tag}`)
            const localButton = document.querySelector(`button#${tag}`)
            // console.log(tag)
            div.style.display = (div.style.display === "unset") ? "none" : "unset"
            console.log(div.style.display)
            
            // div.style.display = (localButton.style.transform === "unset") ? "none" : "unset"
            localButton.style.transform = (localButton.style.transform === "scale(1.5)") ? "scale(1)" : "scale(1.5)"
        
        }else btPartecipanti.style.display = (btPartecipanti.style.display === "unset") ? "none" : "unset"
        
    })
}
