const buttons = document.querySelectorAll("button")
const angleInput = document.getElementById("angleInput")
const btPartecipanti = document.getElementById("lpart")

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click",(event)=>{
        
        let tag = event.target.id
        if(tag !== "partecipanti"){
            const div = document.querySelector(`div#${tag}`)
            const localButton = document.querySelector(`button#${tag}`)
            console.log(tag)
            div.style.display = "unset"
            
            localButton.style.transform = "scale(1.5)"
        
        }else btPartecipanti.style.display = "unset"
        
    })
}

angleInput.addEventListener("input", ()=>{
    
    angle = angleInput.value
    

})