const inputField = document.getElementById("inputField")
/*const startDate = document.getElementById("startDate")
const endDate = document.getElementById("endDate")*/
const earthquakesCount = document.getElementById("earthquakesCount")
const listaInfo = document.getElementById("listaInfo")

const defaultZoom = 3

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

var today = new Date();
   var d = (today.getDate() < 10 ? '0' : '' )+ today.getDate();
   var m = ((today.getMonth() + 1) < 10 ? '0' :'') + (today.getMonth() + 1)
   var y = today.getFullYear();
   let endTime = String(y+"-"+m+"-"+d); 
   let startTime = String(y+"-"+String(m-1)+"-"+d); 

/*endDate.value = endTime
startDate.value = startTime*/

var map = L.map('mapid').setView([15, 5], 2);
map.setMaxBounds(map.getBounds());

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'EARFQUAKE&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 2,
    noWrap: true,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWNvcmFkIiwiYSI6ImNrM2U2bGxtZDFjdGozY3F0OGJ0cWtjaHEifQ.WGaxrSqR_XOs3_4EBmUTaA'
}).addTo(map);

let terremoti = []

// Contiene le info necessarie da mostrare su schermo
/*
  magnitudo
  luogo d'origine
  data origine
  link ad info più dettagliate
*/
let info = {}
let place = ""

const showEarthquakes = () => {
  //terremoti = []
  info = {}
  place = ""
  earthquakesCount.innerText = ""
  minMag = parseFloat(inputField.value)
  // Se nel campo di input non ho inserito un numero...
  if(isNaN(minMag)) {
    place = inputField.value
    minMag = 0
  }
  map.setZoom(defaultZoom)
  addToMap(terremoti)
  
  
  /*startTime = startDate.value
  endTime = endDate.value*/

  /*
  if(minMag > 0 && ) {
    LoadData()
  } else {
     console.log("FRA")
  }*/
}

const updateCount = (num) => {
  earthquakesCount.innerText = "Ci sono stati " + num + " terremoti"
}

const LoadData = async () => {
  if(terremoti.length > 0)
    return
  fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
  .then(r => {
    return r.json()
  })
  .catch(function(error) {
    alert("Errore durante la richiesta")
    console.log(error)
  })
  .then(b => {
    updateCount(b.metadata.count)
    terremoti = b.features
    addToMap(terremoti)
  })
}

const displayInfo = (ev) => {
  console.log(ev)
}



let markers = L.markerClusterGroup({
  maxClusterRadius: 50
});

let icon = L.icon({iconUrl: 'earfquake.png',  iconSize: [38, 38]})

let markersLayer = new L.LayerGroup()

const addToMap = (ter) => {
  if(terremoti.length == 0) {
    LoadData()
    return
  }
  if(place != "") {
    console.log(place)
    ter = terremoti.filter(t => {
      return t.properties.place.toLowerCase().includes(place.toLocaleLowerCase())
    })
  } else if(minMag > 0) {
    ter = terremoti.filter(t => {
      return t.properties.mag >= minMag
    })
  }
  updateCount(ter.length)
  
  markersLayer.clearLayers()
  markers.clearLayers()
  ter.forEach(t => {
    let latLon = [t.geometry.coordinates[1], t.geometry.coordinates[0]]
    let props = t.properties
    let utcMilliseconds = props.time // Sono i millisecondi questi
    let humanReadableDate = new Date(utcMilliseconds) // Li trasformo in una data normale
    info[latLon] = {mag: props.mag, place: props.place, time: humanReadableDate, url: props.url} // Creo una Map dove posso ottenere le info del terremoto usando come chiave le coordinate

    let marker = L.marker(latLon, {icon: icon}) 

    //let marker = L.circleMarker(latLon, {radius: props.mag * map.getZoom()})
    if(props && props.title)
      marker.bindTooltip(props.title)
    let popupContent = "<p>Magnitudo: " + props.mag + "</p>"
    popupContent+= "<p>Luogo: " + props.place + "</p>"
    popupContent += "<p>Data: " + humanReadableDate + "</p>"
    marker.bindPopup(popupContent)
    if(!popupContent) 
      marker.openTooltip()
    
    
    let content = props.title
    marker.on('click', function(ev) {
      if(marker.isPopupOpen()) {
        marker.closeTooltip()
      }
      
      let t = ev.latlng
      let key = [t.lat, t.lng]
      // Qua ottengo le info per il terremoto selezionato
      console.log(info[key])
    });
    markers.addLayer(marker)
  })
  map.addLayer(markers);
}

LoadData()
showEarthquakes()

