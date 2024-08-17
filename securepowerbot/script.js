const dvContent = document.getElementById("content") // contenuto generale
const dvStarter = document.getElementById("starter") // div che contiene il messaggio
const dvStarterContent = document.getElementById("starterContent") // div visualizza il messaggio che è stato acceso il computer
const footer = document.querySelector("footer") // footer di fine pagina

const TOKEN = location.hash.replace("#", "")

const repo = "APPALERMO/ServerSockets"
const path = "log.txt"
const branch = "main"
const url = `https://api.github.com/repos/${repo}/contents/${path}`

const headers = {"Authorization": `token ${TOKEN}`, "Accept": "application/vnd.github.v3+json"}

const githubWrite = (text, fzThen=undefined) => {
    console.log((fzThen) ? "SI": "NO")
    
    $.ajax({
        url: url,
        type: "GET",
        headers: headers,
        success: (data) => {
            var sha = data.sha
            var content = btoa(text)
            
            var updateData = {
                "message": "Aggiornamento del file",
                "content": content,
                "sha": sha,
                "branch": branch
            }
            
            $.ajax({
                url: url,
                type: "PUT",
                headers: headers,
                data: JSON.stringify(updateData),
                contentType: "application/json",
                error: (error) => {
                    console.error("Errore durante l\"aggiornamento del file")
                    alert("Errore durante l\"aggiornamento del file")
                }
            })
        },
        error: (error) => {
            console.error("Errore durante il recupero del file")
            alert("Errore durante il recupero del file")
        }
    }).then(() => {
        if(fzThen !== undefined) fzThen()
        
    })
}

const githubRead = () => {
    githubContent = ""
    $.get(url, headers, (event)=>{
        githubContent = atob(event["content"])
    }).then(()=>{
        console.log("githubContent =>",githubContent)
        
        if(githubContent === "accensione"){
            dvStarter.style.display = "block"
        }
        
    })
}



const confirmSi = () => {
    githubWrite("ok", () => {
        dvStarterContent.style.display = "none"
        h1 = document.createElement("h1")
        h1.style.color = "green"
        
        h1.innerText = "Identità Confermata"
        
        dvStarter.appendChild(h1)
    })
    
    
}

const confirmNo = () => {
    githubWrite("arresta", () => {
        dvStarterContent.style.display = "none"
        h1 = document.createElement("h1")
        h1.style.color = "red"
        
        h1.innerText = "Arresto Computer"
        
        dvStarter.appendChild(h1)
    })
}

function cambiacontenuto(file) {
    footer.style.top = "0"
    
    $.get(file, function(data){
        dvContent.innerHTML = data
    })
}

const openSettings = () => {
    /*
        "impostazioni" per dire, ci sarà:
        - se il computer è acceso (box verde se acceso, rosso se spento)
        (questi sarà utilizzato telegram)
        - inoltro del file excel di controllo
        - inoltro di foto in caso di controllo
        
    */
    
    cambiacontenuto("settings.html")
}

const setProms = () => {
    const prom = document.getElementById("prom")
    const text = prom.value
    
    if(text) 
        githubWrite(`APPunto|${text}`, () => {
            alert("Promemoria impostato con successo!\nAlla prossima accensione te lo ricorderò!")
            prom.value = ""
        })
}

window.onload = () =>{
    // document.getElementById("ciao").innerText = `${screen.width} x ${screen.height}`
    
    // footer.style.top = `${screen.width}px`
    
    
    if(TOKEN && TOKEN !== "#"){
        githubRead()
    }else alert("TOKEN NON RILEVATO")

}
