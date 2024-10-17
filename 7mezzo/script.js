window.onload = () => {
    if(screen.width < 800){
        const staccehtto = document.getElementById("stack")
        const buttons = document.querySelectorAll("button")
        const titolo = document.getElementById("titolo")
        
        staccehtto.style.transform = "translate(-50%, -1%)"
        staccehtto.style.height = "40%"
        
        buttons.forEach((button) => {
            button.style.fontSize = "60px"
            button.style.top = "25%"
            button.style.padding = "5%"
        })
        
        titolo.style.fontSize = "70px"
    }
}