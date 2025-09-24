const div_lista_materie = document.getElementById("materie")
const div_output = document.getElementById("output")

let materie = {}

let end_request = false

window.onload = () => {
    if(document.cookie == ""){
        document.getElementById("redirct").click()
        document.body.innerHTML = ""
    }else 
        get_materie()
}

const open_input = () => {
    if (end_request)
        document.getElementById('upload').click()
    else
        alert("Attendi il caricamento della pagina")
}

const get_materie = () => {
    fetch(`https://serversecurepowerappalermo.onrender.com/view`, {
        method: "post",
        body: JSON.stringify({ "read": "appunti_giaffreda" })
    })
        .then(event => event.json())
        .then(data => {
            try {
                materie = JSON.parse(data.result)
            } catch {
                materie = {}
            }

            let lista_materie = Object.keys(materie)

            for (let i = 0; i < lista_materie.length; i++) {
                let bt = document.createElement("button")
                bt.innerText = lista_materie[i]
                bt.onclick = () => {
                    div_output.innerHTML = materie[lista_materie[i]]
                }
                div_lista_materie.appendChild(bt)
            }

            end_request = true

        })
}

const set_materie = (name, content) => {
    materie[name] = content
    fetch(`https://serversecurepowerappalermo.onrender.com/write`, {
        method: "post",
        body: JSON.stringify(
            {
                "variable": "appunti_giaffreda", "value": JSON.stringify(materie)
            })
    })
}


document.getElementById('upload').addEventListener('change', (event) => {
    const reader = new FileReader();
    const file_name = event.target.files[0]

    reader.onload = (event) => {
        mammoth.convertToHtml({ arrayBuffer: event.target.result })
            .then((result) => {
                set_materie(file_name.name.replace(".docx", ""), result.value)
                setTimeout(get_materie, 1000)
            })

            .catch((err) => {
            });
    };

    // reader.readAsArrayBuffer(event.target.files[0]);
    reader.readAsArrayBuffer(file_name);

});