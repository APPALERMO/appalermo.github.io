const scale = 0.29

function cambiacontenuto(file) {
    const divContent = document.getElementById("contenuto");
    
    $.ajax({
        url: file,
        type: "GET",
        cache: false,
        success: (data) => {
            const copy = document.getElementById("copy")
            
            copy.innerHTML = data
            
            let spanDatas = document.querySelectorAll("#data")
            let divData = []
            
            spanDatas.forEach((element) => {
                divData.push(document.getElementById(element.innerText))
            })
            
            
            divData = divData.reverse()
            divData.forEach((element) => {
                divContent.innerHTML += element.innerHTML
                
                if(divData.indexOf(element) != divData.length-1)
                    divContent.innerHTML += "<hr>"
                
            })
            
        }
    })
}

window.onload = () => {
    const head = document.querySelector("head")
    head.innerHTML +=`<meta name="viewport" content="width=${screen.width}, initial-scale=${scale}"></meta>`
    cambiacontenuto("news.txt")
    
}
