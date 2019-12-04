const inputField = document.getElementById("inputField")
const earthquakesCount = document.getElementById("earthquakesCount")
const listaInfo = document.getElementById("listaInfo")

const defaultZoom = 3

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

let place = ""

const showEarthquakes = () => {
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
}

const updateCount = (num) => {
  earthquakesCount.innerText = "Ci sono stati " + num + " terremoti"
}

// Carica i dati dei terremoti
const LoadData = () => {
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

// Carica i dati delle placche tettoniche
const LoadTecPlates = () => {
  fetch("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
  .then(r => r.json())
  .then(b => {
    let plateData = b
    L.geoJSON(plateData, {color: 'orange',weight: 2}).addTo(map)
  })
}

/* Creo un gruppo per i marker che 
   viene usato per raggrupparli se troppo vicino
 */
let markers = L.markerClusterGroup({
  maxClusterRadius: 20
});

let icon = L.icon({iconUrl: 'earfquake.png',  iconSize: [38, 38]})

// Creo un layer esclusivamente per i marker, così posso gestirli meglio
let markersLayer = new L.LayerGroup()

// Dato un array di terremoti questa funzione li aggiunge alla mappa
const addToMap = (ter) => {
  if(terremoti.length == 0) {
    LoadData()
    return
  }
  // Qui controllo se l'utente vuole filtrare per luogo d'origine oppure magnitudo
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

    let marker = L.marker(latLon, {icon: icon}) 

    if(props && props.title)
      marker.bindTooltip(props.title)
    // Creo il popup che verrà mostrato alla pressione del click su di un marker
    let popupContent = "<p>Magnitudo: " + props.mag + "</p>"
    popupContent+= "<p>Luogo: " + props.place + "</p>"
    popupContent += "<p>Data: " + humanReadableDate + "</p>"
    marker.bindPopup(popupContent)
    if(!popupContent) 
      marker.openTooltip()
    
    marker.on('click', function(ev) {
      if(marker.isPopupOpen()) {
        marker.closeTooltip()
      }
    });
    markers.addLayer(marker)
  })
  map.addLayer(markers);
}

// Carichiamo i dati dei terremoti
LoadData()
// Carichiamo i dati delle placce tettoniche
LoadTecPlates()
// Mostriamo tutto su schermo
showEarthquakes()

