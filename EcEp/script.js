const massa = document.getElementById("massa").value;
const altezza = document.getElementById("altezza");
const velocita = document.getElementById("velocita").value;
const box = document.getElementById("corpo");
const pavimento = document.getElementById("pavimento");

function calcola() {
	const massa = document.getElementById("massa").value;
	const altezza = document.getElementById("altezza").value;
	const velocita = document.getElementById("velocita").value;

	const energiaCinetica = 0.5 * massa * velocita * velocita;
	const energiaPotenzialeGravitazionale = massa * 9.81 * altezza;
	const Lavoro = massa * 9.81 * altezza;

	const energia = document.getElementById("energia");
	energia.innerHTML = `
		<p><b>Lavoro Compiuto</b>: ${Lavoro.toFixed(2)}J</p>
		<p><b>Energia cinetica</b>: ${energiaCinetica.toFixed(2)} J</p>
		<p><b>Energia potenziale gravitazionale</b>: ${energiaPotenzialeGravitazionale.toFixed(2)} J</p>
	`;
	
}

function startSimulation(){
	var position = 0;
	var gravity = 9.81;
	const altezzaIniziale = altezza.value;
	var tempoCaduta = Math.sqrt((2 * altezza.value) / gravity)
	var velocity = gravity * tempoCaduta;
	// console.log(velocity)
	var time = 0.01;
	var maxHeight = pavimento.offsetTop - box.offsetTop;
	
	corpo.style.top = `${-altezzaIniziale * 10}px`;
	corpo.animate([
	    { top: `${-altezzaIniziale * 10}px` },
	    { top: "calc(100% - 20px)" }
	], {
	    duration: tempoCaduta * 1000,
	    easing: "linear"
	}).onfinish = () => {
	    corpo.style.position = "absolute";
	    corpo.style.left = "47%";
	    corpo.style.top = "87%";
	    
	    const risultati = document.getElementById("tempoVelocita");
		risultati.innerHTML = `
	        <p><b>Tempo di Caduta</b>: ${tempoCaduta} s</p>
	        <p><b>Velocità ottenuta</b>: ${velocity} m/s</p>
		`
	    
	};
	

}