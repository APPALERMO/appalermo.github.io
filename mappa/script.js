var map;
var pushpin;
var ArrayPoint = [];
var ArrayTestoNotifica = [];
var apiKey = "An4rnDTS6ca4vLZlK0nDFgjxPnCUuRhVqsbg7QotgZXgo1b5Xa8QXHZU1S_Rc3Gf";

function GetMap() {
    map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(0, 0),
        zoom: 2,
        credential: "An4rnDTS6ca4vLZlK0nDFgjxPnCUuRhVqsbg7QotgZXgo1b5Xa8QXHZU1S_Rc3Gf"
    });

    pushpin = new Microsoft.Maps.Pushpin(map.getCenter());
    // map.entities.push(pushpin);

    Microsoft.Maps.Events.addHandler(map, 'mousemove', function(e) {
        document.getElementById("coordinates").innerHTML =
            "<b>Latitudine: </b>" + e.location.latitude + ", <b>Longitudine: </b>" + e.location.longitude;
        });
}

function moveToCoordinates() {
    var input = document.getElementById("coordinate-input").value;
    var coordinates = input.split(",");
    var lat = parseFloat(coordinates[0]);
    var lng = parseFloat(coordinates[1]);

    var center = new Microsoft.Maps.Location(lat, lng);
    map.setView({center: center, zoom: 13});
    
    var pushpin = new Microsoft.Maps.Pushpin(center);
    map.entities.push(pushpin);

    var popup;

    Microsoft.Maps.Events.addHandler(pushpin, "mouseover", function(){
        var onclickInfoCity = 'onclick="addtoDistance(' + pushpin.getLocation().latitude + ', ' + pushpin.getLocation().longitude + ')"';
        var content =  '<div style="display: block;" id="menuInfoLocalita" class="menuInfoLocalita">' +
                            '<h1>Coordinate</h1>' +
                            '<b>Latitudine: </b>' + pushpin.getLocation().latitude + '<br>' +
                            '<b>Longitudine: </b>' + pushpin.getLocation().longitude + '<br>' +
                            '<button class="bottoneInfoLocalita"' + onclickInfoCity + '>Aggiungi Punto</button>' +
                            '<button class="bottoneInfoLocalita" onclick="closePopUp()">Chiudi PopUp</button>' + 
                       '</div>';

        popup = new Microsoft.Maps.Infobox(pushpin.getLocation(), {
        htmlContent: content,
        visible: true
    });
    map.entities.push(popup);
});



    Microsoft.Maps.Events.addHandler(pushpin, "click", function(){  
        let menuInfoLocalitaID = document.getElementById("menuInfoLocalita");  
        menuInfoLocalitaID.remove()
        var PointCount = ArrayPoint.length;

        if(PointCount == 1){
            PointCount--;
        }
        var PointCount = ArrayPoint.length;
        PointCount--;
        //pushpin.getLocation().latitude
        // pushpin.getLocation().longitude
            
        var itemtofind = [pushpin.getLocation().latitude, pushpin.getLocation().longitude];
        
        for(var i = 0;ArrayPoint.length;i++){
            if(ArrayPoint[i][0] === itemtofind[0] && ArrayPoint[i][1] === itemtofind[1]){
                    ArrayPoint.splice(i,1);
                    break;
                    
            }
        
        }
        
        // ArrayPoint.splice(PointCount,1);

        try{
            if(PointCount < 2){
                let divF = document.getElementById("calcoladistanza");
                divF.remove();
            }
        }catch(error){}


        map.entities.remove(pushpin);
        
        
    });
    
    document.getElementById("coordinate-input").value = "";
}

function addtoDistance(lat, lon){
    ArrayPoint.push([lat, lon]);
    var PointCount = ArrayPoint.length;
    closePopUp();

    if(PointCount == 2){
        var newDiv = document.createElement("div");
        newDiv.innerHTML = "Calcola Distanza";
        newDiv.className = "pMappa";
        newDiv.id = "calcoladistanza";
        newDiv.setAttribute("onclick", "calculateDistance()");

        var divPadre = document.getElementById("rightClickMenu");
        divPadre.appendChild(newDiv);
    }

    Microsoft.Maps.Events.addHandler(pushpin, "click", function(){
        if(PointCount == 1){
            PointCount--;
        }
        PointCount--;
        
        if (PointCount<0) PointCount++;
        
        var itemtofind = [pushpin.getLocation().latitude, pushpin.getLocation().longitude];
        
        for(var i = 0;ArrayPoint.length;i++){
            if(ArrayPoint[i][0] === itemtofind[0] && ArrayPoint[i][1] === itemtofind[1]){
                    ArrayPoint.splice(i,1);
                    break;
            }
        
        }
        
        try{
            if(PointCount < 2){
                divPadre.removeChild(newDiv);
            }
        }catch(error){

        }

        map.entities.remove(pushpin);
    });

}

function getCoordinates() {
    event.preventDefault();
    var city = document.getElementById("city").value;
    var bingMapsUrl = "https://dev.virtualearth.net/REST/v1/Locations?q=" + city + "&key=" + apiKey;

    fetch(bingMapsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var coordinates = data.resourceSets[0].resources[0].geocodePoints[0].coordinates;
        var latitude = coordinates[0];
        var longitude = coordinates[1];
        document.getElementById("coordinates").innerHTML = "<b>Latitudine:</b> " + latitude + ", <b>Longitudine: </b>" + longitude;
        document.getElementById("city").value = "";
        document.getElementById("coordinate-input").value = latitude + ", " + longitude;
    })
    .catch(function(error) {
        console.log(error);
    });
    
}

function copyToClipBoard(){
    const string = document.getElementById("coordinates").textContent;
    const coordinatectc = string.match(/[-\d.]+/g);
    let rightClickMenu = document.getElementById("rightClickMenu");
    navigator.clipboard.writeText(coordinatectc[0] + ", " + coordinatectc[1]);
    rightClickMenu.classList.toggle("hidden");
}

function setPoint(){
    const string = document.getElementById("coordinates").textContent;
    const coordinatesp = string.match(/[-\d.]+/g);


    var lat = parseFloat(coordinatesp[0]);
    var lon = parseFloat(coordinatesp[1]);
    ArrayPoint.push([lat, lon]);
    var PointCount = ArrayPoint.length;

    var center = new Microsoft.Maps.Location(lat, lon);

    var pushpin = new Microsoft.Maps.Pushpin(center);
    map.entities.push(pushpin);
    
    let rightClickMenu = document.getElementById("rightClickMenu");
    rightClickMenu.classList.toggle("hidden");
    
    if(PointCount == 2){
        var newDiv = document.createElement("div");
        newDiv.innerHTML = "Calcola Distanza";
        newDiv.className = "pMappa";
        newDiv.id = "calcoladistanza";
        newDiv.setAttribute("onclick", "calculateDistance()");

        var divPadre = document.getElementById("rightClickMenu");
        divPadre.appendChild(newDiv);
    }

    Microsoft.Maps.Events.addHandler(pushpin, "click", function(){
        var PointCount = ArrayPoint.length;

        if(PointCount == 1){
            PointCount--;
        }
        PointCount--;
        
        if (PointCount<0) {PointCount++;}
        var itemtofind = [pushpin.getLocation().latitude, pushpin.getLocation().longitude];
            
        for(var i = 0;ArrayPoint.length;i++){
            if(ArrayPoint[i][0] === itemtofind[0] && ArrayPoint[i][1] === itemtofind[1]){
                    ArrayPoint.splice(i,1);
                    break;
            }
        
        }
        // console.log(PointCount + " setPoint");
        

        try {
            if(PointCount < 2){
                var divPadre = document.getElementById("rightClickMenu");
                var newDiv = document.getElementById("calcoladistanza")
                divPadre.removeChild(newDiv);               
            }   
        } catch (error) {
            // var PointCount = ArrayPoint.length;
            // console.log(PointCount);
            
            // var itemtofind = [pushpin.getLocation().latitude, pushpin.getLocation().longitude];
            
            // for(var i = 0;ArrayPoint.length;i++){
            //     if(ArrayPoint[i][0] === itemtofind[0] && ArrayPoint[i][1] === itemtofind[1]){
            //             console.log(ArrayPoint[i]);
            //             ArrayPoint.splice(i,1);
                        
            //     }
            
            // }
        }
        
        var itemtofind = [pushpin.getLocation().latitude, pushpin.getLocation().longitude];
            
        try {
        
            for(var i = 0;ArrayPoint.length;i++){
                if(ArrayPoint[i][0] === itemtofind[0] && ArrayPoint[i][1] === itemtofind[1]){
                        ArrayPoint.splice(i,1);
                        break;
                }
            
            }
            
        } catch (error) {}    

        map.entities.remove(pushpin);
    });
    
    
}

function notificaions(text){
    let menuNotification = document.getElementById("notifica");
    let textNotification = document.getElementById("testoNotifica");
    
    textNotification.innerHTML = text;
    menuNotification.style.display = "block";
}


function closePopUp(){
    let menuInfoLocalitaID = document.getElementById("menuInfoLocalita");  
    menuInfoLocalitaID.remove()
}


async function calculateDistance() {
    var PointCount = ArrayPoint.length;
    if (PointCount == 2)
    {
        var origin = ArrayPoint[0][0] + "," + ArrayPoint[0][1];
        var destination = ArrayPoint[1][0] + "," + ArrayPoint[1][1];
        const API_KEY = "An4rnDTS6ca4vLZlK0nDFgjxPnCUuRhVqsbg7QotgZXgo1b5Xa8QXHZU1S_Rc3Gf";
        const URL = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origin}&destinations=${destination}&travelMode=driving&key=${API_KEY}`;
        try {
            rightClickMenu.classList.toggle("hidden");
            const response = await axios.get(URL);
            const data = response.data;
            const result = data.resourceSets[0].resources[0].results[0];
            var testoNotifics = `La distanza tra i due luoghi è circa: ${result.travelDistance} km`;
            ArrayTestoNotifica.push(testoNotifics);
            notificaions(testoNotifics);
    
        } catch (error) {
            console.error(error);
        }
    }else{
        let divF = document.getElementById("calcoladistanza");
        divF.remove();
    }

}
