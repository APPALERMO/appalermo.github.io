
const btEvent = (event) => {
    const btName = event.target.name
    const bt = event.target
    const divContent = document.getElementById(btName)
    
    console.log(divContent.offsetHeight)
    
    bt.style.marginBottom = `${divContent.offsetHeight}px`
    
    setTimeout(() => {
        if(divContent.style.visibility != "visible") {
            divContent.style.position = "relative"
            divContent.style.visibility = "visible"
        }
        else {
            divContent.style.position = "absolute"
            divContent.style.visibility = "hidden"
        }
        bt.style.marginBottom = "1%"
    }, 250)
    
    
    
}

window.onload = () => {
    let bts = document.querySelectorAll("button")
    console.log(bts)
    bts.forEach((bt) => { bt.onclick = btEvent })
}