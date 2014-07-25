/* Leaflet core and plugins combined into one file */

// set imagePath default
L.Icon.Default.imagePath = 'images';

// @codekit-prepend "leaflet.js";
// @codekit-append "missionary-list.js";

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([0,0], 1);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
