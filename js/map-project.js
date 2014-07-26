/* Leaflet core and plugins combined into one file */

// set imagePath default
L.Icon.Default.imagePath = 'images';

// @codekit-prepend "leaflet-src.js";
// @codekit-prepend "missionary-list.js";
// @codekit-prepend "../bower_components/leaflet.markercluster/dist/leaflet.markercluster.js";
// @codekit-prepend "L.Control.Sidebar.js";

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([0,0], 1);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// add sidebar
var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});
map.addControl(sidebar);

// cluster nearby markers and display markers
var markers = new L.MarkerClusterGroup();

// extend marker class with more information
customMarker = L.Marker.extend({
    options: {
        missionaryImgSrc: 'URL of image',
        missionaryAddress: 'city/country'
    }
});

// loop through missionaries and create markers
for (var i = 0; i < missionaryPoints.length; i++) {
    var a = missionaryPoints[i];
    var latitude = a[0];
    var longitude = a[1];
    var title = a[2];
    var missionaryImgSrc = a[3];
    var missionaryAddress = a[4];
    var marker = new customMarker([latitude, longitude], {
        title: title,
        missionaryImgSrc: missionaryImgSrc,
        missionaryAddress: missionaryAddress
    }).on('click', function () {
        var sidebarContent = '<h1>' + this.options.title + '</h1><img src="' + this.options.missionaryImgSrc + '" /><address>' + this.options.missionaryAddress + '</address>';
        sidebar.setContent( sidebarContent );
        sidebar.show();
    });
    markers.addLayer(marker);
}

// add markers to map
map.addLayer(markers);

// hide sidebar if map is clicked and sidebar is visible
map.on('click', function() {
    var sidebarVisible = sidebar.isVisible();
    if (sidebarVisible == true) {
        sidebar.hide();
    }
});