let timeout_renderict = 3
let countdown = 1000

window.onload = () => {
    if(true) {
        const p_renderict_timer = document.getElementById("renderict-timer")
        p_renderict_timer.innerText = `Stai per essere reindirizzato tra ${timeout_renderict}s`
        
        setInterval(() => {
            timeout_renderict--
            p_renderict_timer.innerText = `Stai per essere reindirizzato tra ${timeout_renderict}s`
            
            if(timeout_renderict <= 0) {
                window.location.href = `https://serversecurepowerappalermo.onrender.com${location.pathname}`
                countdown = 0
            }
            
        }, countdown)
    }else {
        window.location.href = `https://serversecurepowerappalermo.onrender.com${location.pathname}`
    }
    
}