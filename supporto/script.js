const nome = document.getElementById("nome")
const mes = document.getElementById("messaggio")
const label = document.getElementById("labelModify")
const defaultLabel = "E-mail / @Telegram"
const title = "❗️<b>SUPPORTO SITO WEB</b>❗️"
let tipologia

const btFaq = document.getElementById("bt-faq")

const labelModifier = () =>{
    let text = nome.value
    
    if(text !== ""){
        text = text.split("@")
        
        if(text[0] === "") tipologia = "Telegram"
        else if(text.length >= 2 && text[1] !== "") tipologia = "Email"
        else tipologia = defaultLabel
    
    }else tipologia = defaultLabel
    
    label.innerText = tipologia
    
}

nome.addEventListener("keydown",(event)=>{
    if(event.keyCode === 13) mes.focus()
})

mes.addEventListener("keydown", (event) => {
    if(event.keyCode === 13) invia()
})


const invia = () => {
    const token = "5227713834:AAEYiz1HY3xTj6RfJN75KLFvkh73vgdCJAk"
    const chat_id = "1929254957"

    const username = nome.value
    const contenuto = mes.value
    
    const message = `${title}\n\nL'utente ${(tipologia === "Telegram") ? username: `<code>${username}</code>`} (<code>${tipologia}</code>)ha inviato la seguende richiesta di supporto!\n<pre>${contenuto}</pre>`
    
    if(contenuto && username && (tipologia !== defaultLabel)){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.telegram.org/bot${token}/sendMessage`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            "data": JSON.stringify({
                "chat_id": chat_id,
                "text": message,
                "parse_mode": "HTML",
            })
        }
        
        $.ajax(settings).done((response) => {
            if(response.ok) alert("Richiesta inviata con successo!")
            else alert("Si è verificato un errore, riprovare più tardi")
        });
        
        
        label.innerText = defaultLabel
        mes .value = ""
        nome.value = ""
    }else alert("Riempire correttamente i campi")
    
}


const cambiacontenuto = (file) =>{
    const divContent = document.querySelector(".contenuto");
        divContent.style.padding = "15px"
        divContent.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif"
        
        $.get(file, (data) =>{
            // console.log(data)
            divContent.innerHTML = data
            const h2 = document.querySelectorAll("h2")
            for(let i=0; i<h2.length; i++) {
                h2[i].style.textAlign = "start"
                h2[i].style.marginBottom = ""
                console.log(h2[i].style)
            }
        })
}

// function cambiacontenuto(file) {
//     const divContent = document.getElementById("contenuto");
//     $.get(file, function(data){
//         console.log(data);
//     }); 

btFaq.addEventListener("click", () => {
    cambiacontenuto("https://raw.githubusercontent.com/APPALERMO/appalermo.github.io/main/news/news.txt")
})
// prossimamente per vedere le faq
// function cambiacontenuto(file) {
//     const divContent = document.getElementById("contenuto");
//     $.get(file, function(data){
//         console.log(data);
//     });   
// }

// cambiacontenuto("https://raw.githubusercontent.com/APPALERMO/appalermo.github.io/main/news/news.txt")