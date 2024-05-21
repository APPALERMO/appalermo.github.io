function equazioneSecondoGrado(x, a, b, c) {
    return a * x * x + b * x + c;
}

function done(){
    
    var a = parseFloat(document.getElementById("a").value);
    var b = parseFloat(document.getElementById("b").value);
    var c = parseFloat(document.getElementById("c").value);
    

    var xVals = [];
    var yVals = [];

    for (var i = -10; i <= 10; i += 0.1) {
        xVals.push(i);
        yVals.push(equazioneSecondoGrado(i, a, b, c));
    }

    var data = [{
        x: xVals,
        y: yVals,
        type: 'scatter'
    }];

    var layout = {
        title: `Grafico dell'equazione: y = ${a}x^2 + ${b}x + ${c}`,
        xaxis: {
            title: 'Asse delle x',
            tickmode: 'linear',
            dtick: 1,
            range: [-10, 10]
        },
        yaxis: {
            title: 'Asse delle y',
            tickmode: 'linear',
            dtick: 1,
            range: [-5, 5]
        }
    };

    Plotly.newPlot('grafico', data, layout);
}