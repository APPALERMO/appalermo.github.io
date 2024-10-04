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

// se è caricata la sezione settings o no
let isSettings = false 

const githubWrite = (text, fzThen = undefined, defaultUrl = url) => {
    
    $.ajax({
        url: defaultUrl,
        type: "GET",
        cache: false,
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
                url: defaultUrl,
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
        if(fzThen !== undefined){
            fzThen()
        }
        
    })
}

const githubRead = () => {
    githubContent = ""
    
    $.ajax({
        url: url,
        type: "GET",
        cache: false,
        headers: headers,
        success: (data) => {
            githubContent = atob(data.content)
        },
        error: (error) => {
            console.error("Errore durante il recupero del file")
            alert("Errore durante il recupero del file")
        }
    })
    .then(() => {
        if(githubContent.includes("accensione")){
            dvStarter.style.display = "block"
        }
        
        if(isSettings){
            const computerState = document.getElementById("computerState")
            
            if(githubContent.includes("acceso")){
                computerState.style.backgroundColor = "lime"
            }
        
        }
        // console.log(githubContent)
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

const openSettings = (p) => {
    /*
        "impostazioni" per dire, ci sarà:
        - se il computer è acceso (box verde se acceso, rosso se spento)
        (questi sarà utilizzato telegram)
        - inoltro del file excel di controllo
        - inoltro di foto in caso di controllo
    */
    
    p.innerText = "Torna alla Home"
    
    if(isSettings) 
        p.onclick = location.reload()
    
    isSettings = !isSettings
    cambiacontenuto("settings.html")
    
    githubWrite("isAcceso")
    
    setTimeout(githubRead, 5000)
    
}

const setProms = () => {
    const prom = document.getElementById("prom")
    const text = prom.value
    
    if(text) 
        githubWrite(text, () => {
            alert("Promemoria impostato con successo!\nAlla prossima accensione te lo ricorderò!")
            prom.value = ""
        }, `https://api.github.com/repos/${repo}/contents/proms.txt`)
}

window.onload = () =>{
    // document.getElementById("ciao").innerText = `${screen.width} x ${screen.height}`
    // footer.style.top = `${screen.width}px`
    
    
    if(TOKEN && TOKEN !== "#"){
        githubRead()
    }else{
        document.querySelector("body").style.display = "none"
        location.href = "https://appalermo.github.io/"
    }

}
