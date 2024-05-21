const scale = 0

window.onload = () => {
    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    document.getElementById("inptFile").innerText = "Apri File"
}

const divItem = document.querySelector("div.items")
const schema = document.getElementById("schema")

let startTouch, endTouch, duration

const divMenu = document.getElementById("contextMenu")
const hideMenu = () => divMenu.style.display = "none"
document.onclick = hideMenu

let isadded=false,
    createArrow = false
    
let temp_x = -1 , temp_y = -1 //variabili per le coordinate temporanee
    
const partsOfArrow = [] //parti di una freccia

const temp = []
const create = (element) =>{
    switch (element){
        case "arrow":
            const bt = document.getElementById("arrow") //bottone che crea la freccia
            // bt.style.background = "gray"
            temp.length = 0
            
            const f = document.createElement("div") // freccia
            f.classList.add("freccia")
            
            const a = document.createElement("div") // arrow
            a.classList.add("punta")
            f.appendChild(a)
            
            partsOfArrow.push(f)
            partsOfArrow.push(a)
            
            const sePoint = (event)=>{
                createArrow = true
                if(event.target.classList != "item"){
                    // if(temp.length <= 1) temp.push([event.clientX, event.clientY])
                    if(temp.length == 2) {  
                        let x1 = temp[0][0],
                            y1 = temp[0][1]
                            
                        let x2 = temp[1][0],
                            y2 = temp[1][1]
                       
                        
                       // parte per fare le freccie normali                        
                       // let distance = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))
                       // let angle = Math.atan2((y2-y1),(x2-x1)) * (180/Math.PI) 
                       
                       
                       //parte per fare le linee perfettamente dritte
                        let distance = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))
                        let angle = Math.atan2((y2-y1),(x2-x1)) * (180/Math.PI)
                        angle = Math.round(angle/90) * 90
                        
                        temp_x = distance * Math.cos((angle * (Math.PI/180))) + x1
                        temp_y = distance * Math.sin((angle * (Math.PI/180))) + y1
                        
                        x2 = temp_x
                        y2 = temp_y
                        //
                        
                        
                        f.style.width = `${distance}px`
                        f.style.transform = `rotate(${angle}deg)`
                        f.style.top = `5px`
                        f.style.left = `0px`
                        
                        a.style.width = "0"
                        a.style.left = "99%"
                        a.style.top = "-150%"
                        
                        const eventArrow = (event)=>{
                            
                            (event.target.offsetParent).removeChild(event.target)
                            create("arrow")
                            
                            // a.removeEventListener("click", eventArrow, false)
                        }
                        bt.style.background = "white"
                        
                        a.addEventListener("click", eventArrow)
                        
                        temp.length = 0 //azzeramento array
                        partsOfArrow.length = 0
                        
                        const arrowContainer = document.createElement("div")
                        arrowContainer.appendChild(f)
                        arrowContainer.addEventListener("mousedown", (event) =>{
                            if(event.buttons === 2){
                                
                                x = event.target.offsetParent 
                                if(x === document.body) x = event.target
                                
                                if(x.id != "mover") divMenu.style.display = "flex"
                                
                                document.getElementById("bt-edit").style.display = (x.classList[0] === undefined) ? "none" : "unset"
                    
                                
                                divMenu.style.left = `${event.clientX + getScroll()[0]}px`
                                divMenu.style.top = `${event.clientY + getScroll()[1]}px`
                            }
                        })
                        
                        arrowContainer.style.height = "15px" 
                        arrowContainer.style.width = `${distance}px` 
                        arrowContainer.style.position = "absolute"
                        
                        arrowContainer.style.top = `${y1-5}px`
                        arrowContainer.style.left = `${x1}px`
                        
                        
                        schema.appendChild(arrowContainer)
                        document.removeEventListener("click", sePoint, false)
                        createArrow = false
                    } 
                    
                }
            }
            
            document.addEventListener("click", sePoint)
            break
        
        case "io":
            var text = ""
            
            const pIO = document.createElement("div") // div padre I/O
            pIO.classList.add("io")
            
            pIO.id = "mover"
            
            const inp = document.createElement("input") //input per testo
            pIO.appendChild(inp)
            
            inp.addEventListener("keypress" ,(event) =>{
                if(event.key === "Enter"){
                    text = inp.value
                    pIO.removeChild(inp)
                    
                    const p =  document.createElement("p") // paragraph
                    p.textContent = text
                    
                    pIO.appendChild(p)
                    let width = Math.round(p.offsetWidth) * 1.2
                    pIO.style.width = `${(width < 80)? 80 : width}px`
                }
            })
            
            schema.appendChild(pIO)
            
            break
        
        case "blocco_operativo":
            const blo = document.createElement("div")
            blo.classList.add("blo")
            
            const inpp = document.createElement("input")
            // inpp.style.transform = "skewX(0deg)"
            
            inpp.addEventListener("keypress", (event) =>{
                if(event.key === "Enter"){
                    text = inpp.value
                    blo.removeChild(inpp)
                    
                    const p =  document.createElement("p") // paragraph 
                    p.textContent = text
                    
                    blo.appendChild(p)
                    let width = Math.round(p.offsetWidth) * 1.2
                    blo.style.width = `${(width < 80)? 80 : width}px`
                    
                }
            })
            
            inpp.oninput = ()=>{inpp.value = inpp.value.replace(/=/g, "←")}
            
            blo.appendChild(inpp)
            
            blo.id = "mover"
            
            schema.appendChild(blo)
            break
        
        case "if":
            const Bif = document.createElement("div")
            Bif.classList.add("rombo")
            
            const inpIf = document.createElement("input")
            inpIf.style.transform = "rotate(45deg)"
            
            
            
            inpIf.addEventListener("keypress", (event) =>{
                if(event.key === "Enter"){
                    text = inpIf.value
                    Bif.removeChild(inpIf)
                    
                    const p =  document.createElement("p") // paragraph 
                    p.style.transform = "rotate(45deg)"
                    p.textContent = text
                    Bif.appendChild(p)
                }
            })
            
    
            Bif.appendChild(inpIf)
            Bif.id = "mover"
            
            schema.appendChild(Bif)
            
            break
        
        
        case "cancel":
            alert("Premere tasto destro su blocco da elmininare e selezionare cancella")
            break
        
        case "text":
            const textInput = document.createElement("input")
            textInput.style.border = "1px solid black"
            textInput.style.width = "10%"
            textInput.style.transform = "skewX(0deg)"
            textInput.style.color = "black"
            
            textInput.addEventListener("keypress", (event) =>{
                if(event.key === "Enter"){
                    textInput.disabled = true
                    textInput.style.border = "none"
                }
            })
            
            textInput.id = "mover"
            schema.appendChild(textInput)
            break
        
        case "inizio":
            start = document.createElement("div")
            start.style.width = "100px"
            
            p = document.createElement("p")
            p.style.textAlign = "center"
            p.style.border = "3px black solid"
            p.style.borderRadius = "50%"
            
            p.textContent  = "INIZIO"
            start.id = "mover"
            start.appendChild(p)
            
            schema.appendChild(start)
            
            break 
        
        case "fine":
            d = document.createElement("div")
            d.style.width = "100px" 
            
            p = document.createElement("p")
            p.style.textAlign = "center"
            p.style.border = "3px black solid"
            p.style.borderRadius = "50%"
            
            p.textContent  = "FINE"
            
            d.appendChild(p)
            
            schema.appendChild(d)
            
            d.id = "mover"
            break
            
        default:
            break
    
    }
    
}

const getScroll = () => {
    let scrollX = $(document).scrollLeft()
    let scrollY = $(document).scrollTop()
    
    return [scrollX,scrollY]
}

divItem.addEventListener("click", (event)=>{
    // console.log(event.target.id)
    tag = event.target.id
    if(tag === "saveFile"){
        const btSaveFile = document.querySelector("a#saveFile");
        
        const today = new Date()
        const data = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()} → ${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`
        
        let name = `Diagramma a Blocchi del ${data}`;
        
        let text = schema.innerHTML
        btSaveFile.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        
        btSaveFile.setAttribute('download', `${name}.txt`);
        
        btSaveFile.style.color = "black"
    }else if(tag === "openFile" || tag === "inptFile"){
        console.log(document.getElementById(tag))
        var file = document.getElementById(tag).files[0];
        if (file) {
            const reader = new FileReader()
            reader.readAsText(file, "UTF-8")
            reader.onload = (evt) => { schema.innerHTML = evt.target.result}
            reader.onerror = (evt) => { alert("File non riconosciuto, riprovare!") }
        }
    }
    else create(tag)
})

document.addEventListener("scroll", () =>{
    // divItem.style.left = `cacl(${getScroll()[0]}px -0.41%)` 
    divItem.style.top = `calc(${getScroll()[1]}px + 48%)`
})


const remvElement = (element) => element.remove()
const moveElement = (element) => element.id = "mover"

document.getElementById("bt-move").addEventListener("click", ()=>{ moveElement(x) }) // parte per muovere un elemento
document.getElementById("bt-canc").addEventListener("click", ()=>{ remvElement(x) }) // parte per rimuovere un elemento
document.getElementById("bt-edit").addEventListener("click", (
    )=>{
        const paragraph = x.children[0] 
        const oldText = paragraph.innerText
        
        x.removeChild(paragraph)
        const input = document.createElement("input")
        
        input.addEventListener("keypress", (event) =>{
            if(event.key === "Enter"){
                text = input.value
                x.removeChild(input)
                
                const p =  document.createElement("p") 
                p.textContent = text
                
                x.appendChild(p)
                
                if(x.classList[0] !== "rombo"){
                    let width = Math.round(p.offsetWidth) * 1.2
                    x.style.width = `${(width < 80)? 80 : width}px`
                }
                
                // console.log(x.offsetWidth)
                
            }
        })
        x.appendChild(input)
        input.value = oldText
        input.focus()
        
    })


document.addEventListener("click", (event)=>{
    if(event.target.classList != "item"){
        if(temp_x != -1 && temp_y != -1 && temp.length === 0) temp.push([temp_x, temp_y])
        else if(temp.length <= 1) temp.push([event.clientX + getScroll()[0], event.clientY + getScroll()[1]])
    }
})


document.addEventListener("mousemove", (event)=>{
    if(temp.length === 1){
        let x1 = temp[0][0],
            y1 = temp[0][1]
        
        let x2 = event.clientX + getScroll()[0],
            y2 = event.clientY + getScroll()[1]
        
        if(createArrow){
            const [f,a] = partsOfArrow
                
            // pezzo di codice per fare le linee normali            
            // let distance = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))
            // let angle = Math.atan2((y2-y1),(x2-x1)) * (180/Math.PI) 
            
            // codice per fare le linee dritte
            let angle = Math.atan2((y2-y1),(x2-x1)) * (180/Math.PI)
            angle = Math.round(angle/90) * 90
            let distance = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))
            
            let temp_x = distance * Math.cos((angle * (Math.PI/180))) + x1
            let temp_y = distance * Math.sin((angle * (Math.PI/180))) + y1
            
            x2 = temp_x
            y2 = temp_y
            //                
            
            f.style.width = `${distance}px`
            f.style.transform = `rotate(${angle}deg)`
            f.style.top = `${y1}px`
            f.style.left = `${x1}px`
            
            a.style.width = "0"
            a.style.left = "99%"
            a.style.top = "-150%"
            
            schema.appendChild(f)
        
        }
    } else if(temp.length === 2) temp.length = 0
    
    
    let s = document.getElementById("mover")
    
    if(s){
    
        s.style.position = "absolute"
        s.style.left = `${(event.clientX + getScroll()[0])-(s.offsetWidth/2)}px`
        s.style.top = `${(event.clientY + getScroll()[1])-(s.offsetHeight/2)}px`
        
        // console.log("MOVIMENTO: ",`${event.clientX-(s.offsetWidth/2)}px`, `${event.clientY-(s.offsetHeight/2)}px`)
        if(!isadded){
            t = true
            s.addEventListener("mousedown",(event)=>{
                if(event.buttons === 1){
                    s.id = "placed"
                    isadded = false
                    s.addEventListener("touchstart", ()=>{startTouch = new Date()})
                    s.addEventListener("touchend", (event)=>{
                        endTouch = new Date()
                        duration = endTouch - startTouch
                        
                        if(parseInt(duration) >= 500){
                            x = event.target.offsetParent 
                            if(x === document.body) x = event.target
                            
                            if(x.id != "mover") divMenu.style.display = `flex`
                            
                            divMenu.style.top = `${event.touches[0].screenY}px`
                            divMenu.style.left = `${event.touches[0].screenX}px`
                        }
                    })
                }
                
                if(event.buttons === 2){
                    
                    x = event.target.offsetParent 
                    if(x === document.body) x = event.target
                    
                    if(x.id != "mover") divMenu.style.display = `flex`
                    
                    document.getElementById("bt-edit").style.display = (x.classList[0] === undefined) ? "none" : "unset"
                    
                    divMenu.style.left= `${event.clientX + getScroll()[0]}px`
                    divMenu.style.top = `${event.clientY + getScroll()[1]}px`
                }
            })
            isadded = true
        }
    }
})
