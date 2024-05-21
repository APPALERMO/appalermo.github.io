const input = document.getElementById("inp")
const bt = document.getElementById("confirm")
const res = document.getElementById("resoult")
let arr
let resolut = []
const converter = () => {
    if(parseInt(input.value[0]) <= 1 && parseInt(input.value[0]) >= 0){ // se inzia per 0 o per 1, signfica che deve fare da binario a testo
        arr =input.value.split(" ")
        let copy = []
        for(var i=0; i<arr.length; i++){
            copy.push(parseInt(arr[i], 2))
        }  
        delete copy
        resolut = copy
        
        for(var i=0; i<resolut.length; i++){
            resolut[i] = String.fromCharCode(resolut[i]);
        }    
        res.innerText = resolut.join("")
    
    }else{ // altrimenti fa da testo a binario
        
        
        arr = input.value.split("")
        // console.log(arr)
        let copy = []
        for(var i=0; i<arr.length; i++){
            copy.push(arr[i])
        }  
        delete copy
        resolut = copy
        
        for(var i=0; i<resolut.length; i++){
            resolut[i] = resolut[i].charCodeAt(0).toString(2)
        }    
        res.innerText = resolut.join(" ")
    }
    
}
input.addEventListener("input", converter)