const result = (text) => {  document.getElementById("risultati").innerHTML = text  }
const addResult = (text) => {  document.getElementById("risultati").innerHTML += text  }

let last_base,
    last_conver

const convert_to_ab = (number,base) => {  
    const n = Number(number).toString(parseInt(base)).toUpperCase()
    
    if(parseInt(base) === 2) {
        
        let rapporto = parseInt(n.length / 8)
        let n2 = n.padStart(8,"0")
        
        if(rapporto >= 1){
            n2 = n.split("").reverse().join("")
            n2 = n2.match(/.{1,8}/g)
            
            n2 = n2.reverse()
            
            for(let i = 0; i<n2.length; i++){
                n2[i] = n2[i].padStart(8,"0")
            }
            
            for(let i = 1; i<n2.length; i++){
                n2[i] = n2[i].split("").reverse().join("")
            }
            n2 = n2.join(" ")
            
        }
        
        return n2
    }
    
    return n

}


const number_to = (number,base) => {
    n = number
    b = base
    l = n.length
    s = [...n].reverse()
    n_d = 0
    pg = []
    for (var i=0; i<l; i++){
        if(b === 16){
            switch(s[i]){
                case "a": case "A": 
                    s[i] = "10"
                    break
                case "b": case "B":
                    s[i] = "11"
                    break
                case "c": case "C":
                    s[i] = "12"
                    break
                case "d": case "D":
                    s[i] = "13"
                    break
                case "e": case "E":
                    s[i] = "14"
                    break
                case "f": case "F":
                    s[i] = "15"
                    break
                
            }
        }
        n_d += parseInt((s[i])*b**i)
        if(s[i] != 0){
            pg.push(` ${(s[i])}*${b}<sup>${i}</sup>`)
        }
    }
    return [n_d, pg.reverse()]  

}


const convert_to = (number, base) => {
    n = number
    b = base
    var pg = []
    
    while(true){
        if(n === 0){
            pg.push([n,""])
            break
        }
        var r = n%b
        if(b === 16){
            switch(r){
                case 10:
                    r = "A"
                    break
                case 11:
                    r = "B"
                    break
                case 12:
                    r = "C"
                    break
                case 13:
                    r = "D"
                    break
                case 14:
                    r = "E"
                    break
                case 15:
                    r = "F"
                    break
                
            }
        
        }
        pg.push([n, r])
        n = parseInt(n/b)
    }
    
    return pg
}

function confirm(){
    let view_procedure = document.querySelector('input[name="view_procedure"]:checked')
    
    let input = document.getElementById("inputNumber").value
    let base = document.querySelector('input[name="base"]:checked').value
    let convert = document.querySelector('input[name="convert_to"]:checked').value
    
    if(input){
        
        if(base == 16) 
            document.getElementById("inputNumber").setAttribute("type", "text")
        else
            document.getElementById("inputNumber").setAttribute("type", "number")
        
        
        if(parseInt(base) === 10){
            if(convert === "allBase") result(`Binario: ${convert_to_ab(input,2)}<br>Ottale: ${convert_to_ab(input,8)}<br>Esadecimale: ${convert_to_ab(input,16)}`)
            else {
                convert = parseInt(convert)
                var pg = convert_to(input,convert)
                result("")
                if(view_procedure){
                
                    for(var i=0; i<pg.length; i++){
                        addResult(`${pg[i][0]} | ${pg[i][1]} <br>`)
                    }
                }
                addResult("<hr>")
                addResult(convert_to_ab(input,convert))
                
            }
        }else{
            base = parseInt(base)
            if(parseInt(convert) === 10){
                var pg = number_to(input, base)
                // result(`<hr/>${pg[1]} = ${pg[0]}`)
                result("")
                addResult("<hr/>")
                if(view_procedure) {
                    for(var i=0; i<pg[1].length; i++){
                        addResult(` + ${pg[1][i]}`)
                    }
                } 
                addResult(` = ${pg[0]}`)
            }else{
                var pg = convert_to_ab(number_to(input, base)[0], convert)
                result(`<hr/> ${pg}`)
            }
        }
        
    }
    
}

const seeChanges = () => {
    let base = document.querySelector('input[name="base"]:checked').value
    let convert = document.querySelector('input[name="convert_to"]:checked').value
    
    if(base == last_base) return
    
    if(base == last_conver || base == convert) 
        document.getElementById(`c${last_base}`).checked = true
    
    last_base = base
    last_conver = convert
    
}

document.getElementById("inputNumber").addEventListener("input", confirm)

window.onload = () => {
    // console.log(document.querySelectorAll("#base"))
    for(var i=0; i<4; i++){
        document.querySelectorAll("input[name='base']")[i].addEventListener("click",() => {
            seeChanges()
            confirm()
        })
        document.querySelectorAll("input[name='convert_to']")[i].addEventListener("click",() =>{
            seeChanges()
            confirm()
        })
    }
    
    // per dispositivi mobile
    if(screen.width < 800){
        const contenuto = document.querySelector(".contenuto")
        
        contenuto.style.transform = "scale(1.4) translate(0,15%)"
    }
    seeChanges()
} 
