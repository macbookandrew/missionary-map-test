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
        missionaryName: '',
        missionaryCountry: '',
        missionaryMinistries: '',
        missionaryPhone: '',
        missionaryEmail: '',
        missionaryWebsite: '',
        missionaryStreet: '',
        missionaryCity: '',
        missionaryState: '',
        missionaryZip: '',
        missionarySendingChurch: '',
        missionaryBirthdays: '',
        missionaryAnniversary: '',
        missionaryImage: ''
    }
});

// loop through missionaries and create markers
for (var i = 0; i < missionaryPoints.length; i++) {
    var a = missionaryPoints[i];
    var latitude = a[1];
    var longitude = a[2];
    var missionaryName = a[0];
    var missionaryCountry = a[3];
    var missionaryMinistries = a[4];
    var missionaryPhone = a[5];
    var missionaryEmail = a[6];
    var missionaryWebsite = a[7];
    var missionaryStreet = a[8];
    var missionaryCity = a[8];
    var missionaryState = a[10];
    var missionaryZip = a[11];
    var missionarySendingChurch = a[12];
    var missionaryBirthdays = a[13];
    var missionaryAnniversary = a[14];
    var missionaryImage = a[15];
    var marker = new customMarker([latitude, longitude], {
        missionaryName: missionaryName,
        missionaryCountry: missionaryCountry,
        missionaryMinistries: missionaryMinistries,
        missionaryPhone: missionaryPhone,
        missionaryEmail: missionaryEmail,
        missionaryWebsite: missionaryWebsite,
        missionaryStreet: missionaryStreet,
        missionaryCity: missionaryCity,
        missionaryState: missionaryState,
        missionaryZip: missionaryZip,
        missionarySendingChurch: missionarySendingChurch,
        missionaryBirthdays: missionaryBirthdays,
        missionaryAnniversary: missionaryAnniversary,
        missionaryImage: ''
    }).on('click', function () {
        var sidebarContent = '<h1>' + this.options.missionaryName + '</h1><img src="' + this.options.missionaryImage + '" />';
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