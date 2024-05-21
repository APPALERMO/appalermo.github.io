const list = ["Ambo", "Terna", "Quanterna", "Cinquina", "Tombola"]

const mobile = (screen.width <= 1000) //vero se è un telefono falso se è un computer

let ambo = -1,
    terna = -1,
    quaterna = -1,
    cinquina = -1,
    tombola = false

let number_extracter = []


const isIn = (array, item)=>{

    for(let i=0; i<array.length; i++){
        if(array[i] === item) return true
    }
    return false
}

window.onload = () =>{
    const scale = 0.29

    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    
    const btInizio = document.querySelector(".start")
    if(mobile) {
        btInizio.style.left = "40%"
        btInizio.style.top = "40%"
        btInizio.style.transform = "scale(1.5)"
    }
}


const start = () =>{
    
    ddiv = document.createElement("div")
    
    h1 = document.createElement("h1")
    h1.innerText = "Inserire le quote"
    
    ddiv.appendChild(h1)
    
    for(i = 0; i<5; i++){
        div = document.createElement("div")
        div.style.display = "block ruby"
        
        inp = document.createElement("input")
        inp.style.width = "82px"
        inp.style.marginLeft = "10px"
        inp.type = "number"
        inp.value = "0"
        inp.id = `qt${i}`
        
        p = document.createElement("p")
        p.style.userSelect = "none"
        p.style.marginLeft = "35px"
        p.innerText = `${list[i]}: €`
        
        div.appendChild(p)
        div.appendChild(inp)
        
        ddiv.appendChild(div)
    }
    
    ddiv.style.position = "absolute"
    ddiv.style.left = "50%"
    ddiv.style.transform = "translate(-50%)"
    
    btConf = document.createElement("button")
    
    btConf.style.position = "absolute"
    btConf.style.left = "50%"
    btConf.style.transform = "translate(-50%)"
    btConf.style.borderRadius = "10px"
    
    btConf.innerText = "Conferma!"
    ddiv.appendChild(btConf)
    
    
    btConf.addEventListener("click",()=>{
    
        for(i = 0; i<5; i++){
            list[i] = parseFloat(document.getElementById(`qt${i}`).value)
        }
        
        div = document.createElement("div")
        div.classList.add("start")
        div.style.left = `${(mobile) ? 38 : 50}%`
        div.style.border = "2px solid black"
        div.style.backgroundColor = "white"
        div.style.display = "flex"
        div.style.justifyContent = "center"
        div.style.alignItems = "center"
        div.style.userSelect = "none"
        if(mobile) div.style.transform = "scale(1.6)"
        div.innerText = "Prendi una scheda per iniziare"
        
        isadded = false
        div.addEventListener("click", ()=>{
            if(!isadded){
                
                t = document.createElement("div")
                t.classList.add("carta")
                if(mobile) {
                    t.style.transform = "scale(1.6)"
                    t.style.left = "35%"
                }
                
                t2 = document.createElement("div")
                t2.classList.add("carta")
                t2.style.height = "107px"
                t2.style.width = "107px"
                t2.style.left = `${(mobile) ? 85 : 65}%`
                t2.style.background = "none"
                t2.style.display = "flex"
                t2.style.justifyContent = "center"
                t2.style.alignItems = "center"
                t2.style.userSelect = "none"
                
                const righe = 9, colonne = 3

                let v = new Array(righe).fill().map(() => new Array(colonne))

                function shuffle(array) {
                    let currentIndex = array.length, 
                        temporaryValue, 
                        randomIndex
                
                    while (currentIndex !== 0 ) {
                
                        randomIndex = Math.floor(Math.random() * currentIndex)
                        currentIndex -= 1
            
                        temporaryValue = array[currentIndex]
                        array[currentIndex] = array[randomIndex]
                        array[randomIndex] = temporaryValue
                    }
                
                    return array;
                }
                
                
                for(let i = 0; i < righe; i++) {
                    let numbers = Array.from({length: 10}, (_, j) => i * 10 + j + 1)
                    
                    numbers = shuffle(numbers);
                    for(let j = 0; j < colonne; j++) {
                        v[i][j] = numbers.pop()
                    }
                }
                
                for(let i=0; i<righe; i++){
                    let t
                    for(let j=0; j<colonne; j++){
                        for(let k=j+1; k<colonne; k++){
                            // if(v[i][j] === v[i][k]) v[i][k] += 1
                            if(v[i][j] > v[i][k]){
                                t = v[i][j]
                                v[i][j] = v[i][k]
                                v[i][k] = t
                            }
                        }
                    }
                }
                
                table = document.createElement("table")
                for(i=0; i<colonne; i++){
                    tr = document.createElement("tr")
                    tr.id = i
                    for(j=0; j<righe; j++){
                        td = document.createElement("td")
                        td.innerText = v[j][i]
                        td.id = i
                        td.addEventListener("click", (event)=>{
                            let number = parseInt(event.target.innerText) //numero premuto
                            if(isIn(number_extracter,number)){
                                event.target.classList.toggle("signet")
                                let selected = document.querySelectorAll(".signet") 
                                let cont = [0,0,0]
                                
                                for(let i=0; i<selected.length; i++) {
                                    if(i === 0) cont = [0,0,0]
                                    cont[selected[i].id]++    
                                }
                                
                                
                                for(let i=0; i<colonne; i++){
                                    if(cont[i] === 2 && ambo === -1) ambo = i
                                    else if(cont[i] === 3 && terna === -1 && ambo != i) terna = i
                                    else if(cont[i] === 4 && quaterna === -1 && terna != i ) quaterna = i
                                    else if(cont[i] === 5 && cinquina === -1 && quaterna != i ) cinquina = i
                                }
                                if((cont[0] + cont[1] + cont[2]) === 27) tombola = true
                                
                                // console.log("Ambo:",ambo,"\nTerna:",terna,"\nQuaterna:",quaterna,"\nCinquina:",cinquina,"\nTombola:",tombola,"\n",cont)                            
                                // t2.innerText = (ambo != -1) ? "AMBO!" : (terna != -1) ? "TERNA!" : (quaterna != -1) ? "QUATERNA!" : (cinquina != -1) ? "CINQUINA!" : (tombola) ? "TOMBOLA!": ""
            
                                t2.innerText = (tombola) ? "TOMBOLA!" : (cinquina != -1) ? "CINQUINA!" : (quaterna != -1) ? "QUATERNA!" : (terna != -1) ? "TERNA!" : (ambo != -1) ? "AMBO!" : ""
                            }
                        })       
                        tr.appendChild(td)
                    }
                    table.appendChild(tr)
                }
                t.appendChild(table)
                
                
                div.innerHTML = ""
                bt = document.createElement("button")
                bt.innerText = "INIZIA"
                bt.style.borderRadius = "10px"
                bt.onclick = () => {
                    document.body.appendChild(t2)
                    const DIM = 90
                    let v = new Array(DIM)
                    let vet = new Array(DIM)
                    let size = DIM - 1
                    
                    for(let i = 0; i<DIM; i++) v[i] = -i+DIM
                    
                    for(let i = 0; i<DIM; i++){
                        let estratto, pos
                        
                        pos = parseInt(Math.random() * 1E10) % size
                        estratto = v[pos]
                        v[pos] = v[size]
                        size --
                        
                        vet[i] = estratto
                    }
                    vet[DIM-1] = v[0]
                    
                    let i = 0
                    bt.style.position = "absolute"
                    bt.style.top = "10%"
                    bt.innerHTML = "Estrai"
                    
                    let paragraph = document.createElement("p")
                    paragraph.style.fontSize = "30px"
                    
                    bt.onclick = () =>{
                        if(i< 90){
                            document.getElementById(`tombolone-${vet[i]}`).classList.add("signet")
                            paragraph.innerHTML = vet[i]
                            number_extracter.push(vet[i])
                            i++
                        }else {
                            paragraph.style.textAlign = "center"
                            paragraph.innerHTML = "Numeri Tutti Estratti"
                        }
                        
                        
                    }
                    div.appendChild(paragraph)
                    
                }
                
                tdiv = document.createElement("div")
                tdiv.innerHTML += "<p style='text-align:center;margin-bottom:0%;margin-top:0%;user-select: none;'>TABELLONE</p>"
                table = document.createElement("table")
                
                tbody = document.createElement("tbody")
                
                for(let i=1; i<=90; i++){
                    if(i === 1){
                        tr = document.createElement("tr")
                        td = document.createElement("td")
                        td.innerText = i
                        td.id = `tombolone-${i}`
                        tr.appendChild(td)
                        
                    }
                    else if(i%10 == 0){
                        td = document.createElement("td")
                        td.innerText = i
                        td.id = `tombolone-${i}`
                        tr.appendChild(td)
                        
                        tr = document.createElement("tr")
                    }else{
                        td = document.createElement("td")
                        td.innerText = i
                        td.id = `tombolone-${i}`
                        tr.appendChild(td)
                    }
                    tbody.appendChild(tr)
                }
                
                table.appendChild(tbody)
                tdiv.appendChild(table)
                tdiv.style.position = "absolute"
                if(mobile){
                    tdiv.style.top = "9%"
                    tdiv.style.left = "8%"
                }else tdiv.style.top = "15%"  
                tdiv.style.width = "auto"
                tdiv.style.border = "1.5px solid black"
                tdiv.style.borderRadius = "10px"
                if(mobile) tdiv.style.transform = "scale(1.4)"
                
                document.body.appendChild(tdiv)
                div.appendChild(bt)
                document.body.appendChild(t)
                
                isadded = true
            }
            
        })
        
        document.body.removeChild(ddiv)
        document.body.appendChild(div)
        
    })
    
    document.body.appendChild(ddiv)
    document.body.removeChild(document.querySelector(".start"))
}