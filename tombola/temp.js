const isIn = (array, item)=>{
    for(let i=0; i<array.length; i++){
        if(array[i] === item) return true
    }
    return false
}

let r
const carteEstratteG = []
setInterval(() => {
    do{
        r = parseInt(Math.random() * 1e20) % 8
        if(r>7 || r === 0) r = 0.5
        // console.log(r, isIn(carteEstratteG, r),carteEstratteG)
    }while(isIn(carteEstratteG, r));
    carteEstratteG.push(r)
    console.log(r)
}, 1000);
