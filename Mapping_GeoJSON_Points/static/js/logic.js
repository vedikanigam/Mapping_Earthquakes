// Create the map object with center at the San Francisco airport.t map = L.map('mapid').setView([37.5, -122.5], 10);


let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};
// Create the map object with center, zoom level and default layer.
let map = L.map("mapid", {
  center: [30, 30],
  zoom: 2,
  layers:[streets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/vedikanigam/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2>Airport Code " + feature.properties.faa + "</h2> <hr> <h3>Airport Name " + feature.properties.name + "</h3>");
       }
}).addTo(map);
});

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + " California</h3>");
//    }
//   }).addTo(map);

  // L.geoJSON(sanFranAirport, {
  //   onEachFeature: function(feature, layer) {
  //     console.log(layer);
  //     layer.bindPopup("<h2>Airport Code " + feature.properties.faa + "</h2> <hr> <h3>Airport Name " + feature.properties.name + "</h3>");
  //    }
  //   }).addTo(map);