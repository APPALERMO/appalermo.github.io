const dvStarter = document.getElementById("starter")
const dvStarterContent = document.getElementById("starterContent")
const center = document.querySelector("center")

const TOKEN = location.hash.replace("#", "")

const repo = "APPALERMO/ServerSockets"
const path = "log.txt"
const branch = "main"
const url = `https://api.github.com/repos/${repo}/contents/${path}`

const headers = {"Authorization": `token ${TOKEN}`, "Accept": "application/vnd.github.v3+json"}


const githubWrite = (text) => {
    $.ajax({
        url: url,
        type: 'GET',
        headers: headers,
        success: function(data) {
            var sha = data.sha;
            var content = btoa(text);

            var updateData = {
                'message': 'Aggiornamento del file',
                'content': content,
                'sha': sha,
                'branch': branch
            };

            $.ajax({
                url: url,
                type: 'PUT',
                headers: headers,
                data: JSON.stringify(updateData),
                contentType: 'application/json',
                success: function(response) {;
                },
                error: function(error) {
                    console.error('Errore durante l\'aggiornamento del file');
                }
            });
        },
        error: function(error) {
            console.error('Errore durante il recupero del file');
        }
    });
}

const githubRead = () =>{
    githubContent = ""
    $.get(url, headers, (event)=>{
        githubContent = atob(event["content"])
    }).then(()=>{
        console.log(githubContent)
        if(githubContent === "accensione"){
            dvStarter.style.display = "block"
        }
        
    })
}

const confirmSi = () => {
    githubWrite("ok")
    dvStarterContent.style.display = "none"
    
    h1 = document.createElement("h1")
    h1.style.color = "green"
    
    h1.innerText = "Identità Confermata"
    
    dvStarter.appendChild(h1)
    
}

const confirmNo = () => {
    githubWrite("arresta")
    dvStarterContent.style.display = "none"
    
    h1 = document.createElement("h1")
    h1.style.color = "red"
    
    h1.innerText = "Arresto Computer"
    
    dvStarter.appendChild(h1)
}

window.onload = () =>{
    if(TOKEN && TOKEN !== "#"){
        githubRead()       
    }else alert("TOKEN NON RILEVATO")

}
