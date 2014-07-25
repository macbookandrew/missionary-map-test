/* Leaflet core and plugins combined into one file */

// set imagePath default
L.Icon.Default.imagePath = 'images';

// @codekit-prepend "leaflet.js";
// @codekit-prepend "missionary-list.js";
// @codekit-prepend "../bower_components/leaflet.markercluster/dist/leaflet.markercluster.js";
// @codekit-prepend "L.Control.Sidebar.js";

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([0,0], 1);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// cluster nearby markers
var markers = new L.MarkerClusterGroup();

for (var i = 0; i < missionaryPoints.length; i++) {
    var a = missionaryPoints[i];
    var title = a[2];
    var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
    marker.bindPopup(title);
    markers.addLayer(marker);
}

map.addLayer(markers);
