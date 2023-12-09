const invia = () => {
    const token = "5227713834:AAEYiz1HY3xTj6RfJN75KLFvkh73vgdCJAk"
    const chat_id = "1929254957"

    const contenuto = document.getElementById("messaggio").value
    const username = document.getElementById("nome").value

    const message = `L'utete <pre>${username}</pre> ha inviato una richiesta di supporto!\nEcco il contenuto:\n<i>${contenuto}</i>`

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + token + "/sendMessage",
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

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    
    document.getElementById("messaggio").value = ""
    document.getElementById("nome").value = ""

}