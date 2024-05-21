function calcDelta(x = Array,y = Array) {

    x1 = x[0]
    x2 = x[1]
    
    y1 = y[0]
    y2 = y[1]
    
    r1 = x1 * y2
    r2 = x2 * y1
    
    delta = r1 - r2
    if(delta != 0) return [delta, `${r1} - ${r2}`]
    else return NaN

}

function calcX(y = Array,t = Array, delta) {
    
    y1 = y[0]
    y2 = y[1]
    
    t1 = t[0]
    t2 = t[1]
    
    r1 = y1 * t2
    r2 = y2 * t1
    r = (r1) - (r2)
    return [`${r}/(${delta[0]})`, r/delta[0]]

}

function calcY(x = Array, t = Array, delta) {
    
    x1 = x[0]
    x2 = x[1]
    
    t1 = t[0]
    t2 = t[1]
    
    r1 = x1 * t2
    r2 = x2 * t1
    r = (r1) - (r2)
    return [`${r}/(${delta[0]})`,r/delta[0]]

}

function convertiFrazione(input){
    // console.log(input)
    
    if(input.includes("/")){
        const [n,d] = input.split("/")
        return parseFloat(n/d)
    }
    
    return parseFloat(input)
}

  
function frazioneGen(decimal) {
    var sign = Math.sign(decimal);
    decimal = Math.abs(decimal);
    var numerator = 1;
    var denominator = 1;
    var tolerance = 1.0E-6;
    
    while (Math.abs(decimal - numerator / denominator) > tolerance && denominator <= 1000000) {
        if (decimal > numerator / denominator) {
            numerator++;
        } else {
            denominator++;
        }
    }
    
    numerator *= sign;
    return numerator + "/" + denominator;
  }

function start() {

    x1 = document.getElementById("x1")
    y1 = document.getElementById("y1")
    t1 = document.getElementById("t1")
    
    x2 = document.getElementById("x2")
    y2 = document.getElementById("y2")
    t2 = document.getElementById("t2")
    
    const risultati = document.getElementById("risultati")
    
    
    const x = [convertiFrazione(x1.value), convertiFrazione(x2.value)]
    const y = [convertiFrazione(y1.value), convertiFrazione(y2.value)]
    const t = [convertiFrazione(t1.value), convertiFrazione(t2.value)]
    // console.log(x,y,t)
    const cDelta = calcDelta(x,y)
    const valX = calcX(y,t,cDelta)
    const valY = calcY(x,t,cDelta)
    // console.log(cDelta, valX, valY)
    risultati.innerHTML = `<b>Δ = </b>${cDelta[0]} | ${frazioneGen(cDelta[0])} ≠ 0 <br><b>Δx =</b> ${frazioneGen(valX[1])} <br><b>Δy = </b> ${frazioneGen(valY[1])}`

}