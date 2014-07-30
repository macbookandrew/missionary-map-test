// set image path defaults
L.Icon.Default.imagePath = 'images'; // leaflet.js images
var missionaryImagePath = 'images/missionaries'; // missionary photos

// @codekit-prepend "leaflet-src.js";
// @codekit-prepend "missionary-list.js";
// @codekit-prepend "../bower_components/leaflet.markercluster/dist/leaflet.markercluster.js";
// @codekit-prepend "../bower_components/leaflet-sidebar/src/L.Control.Sidebar.js";
// @codekit-prepend "../bower_components/leaflet-fullscreen/Control.FullScreen.js";
// @codekit-prepend "L.Control.ZoomMin.js";

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map', {
    center: [0, -30],
    zoom: 1,
    minZoom: 1,
    zoomControl: false,
    fullscreenControl: true,
});

// add zoom-to-min button
map.addControl(new L.Control.ZoomMin());

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
    var missionaryCity = a[9];
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
        missionaryImage: missionaryImage
    }).on('click', function () {
        var sidebarContent;
        sidebarContent = '<h1 class="fn n">' + this.options.missionaryName + '</h1>';
        sidebarContent += '<img class="missionary-photo" src="' + missionaryImagePath + '/' + this.options.missionaryImage + '" title="' + this.options.missionaryName + '" alt="Photo of ' + this.options.missionaryName + '" />';
        if (this.options.missionaryCountry) { sidebarContent += '<h2 class="country">Field of Service: ' + this.options.missionaryCountry + '</h2>'; }
        if (this.options.missionaryMinistries) { sidebarContent += '<h2 class="ministries">Ministry Types: ' + this.options.missionaryMinistries + '</h2>'; }
        if (this.options.missionaryCity) {
            sidebarContent += '<h2 class="address">Address</h2><address class="vcard adr">';
            if (this.options.missionaryStreet) {sidebarContent += '<span class="street-address">' + this.options.missionaryStreet + '</span><br/>'; }
            sidebarContent += '<span class="locality">' + this.options.missionaryCity + '</span>';
            if (this.options.missionaryState) { sidebarContent += ' <span class="region">' + this.options.missionaryState + '</span>'; }
            if (this.options.missionaryZip) { sidebarContent += ', <span class="postal-code">' + this.options.missionaryZip + '</span>'; }
            sidebarContent += '<br/><span class="country-name">' + this.options.missionaryCountry + '</span>';
            if (this.options.missionaryEmail) { sidebarContent += '<br/><span class="email">Email: ' + this.options.missionaryEmail + '</span>'; }
            if (this.options.missionaryPhone) { sidebarContent += '<br/><span class="phone">Phone: ' + this.options.missionaryPhone + '</span>'; }
            sidebarContent += '</address>';
        }
        if (this.options.missionarySendingChurch) { sidebarContent += '<h2 class="sending-church">Sending Church</h2><p>' + this.options.missionarySendingChurch + '</p>'; }
        if (this.options.missionaryBirthdays) { sidebarContent += '<h2 class="birthdays">Birthdays</h2><p>' + this.options.missionaryBirthdays + '</p>'; }
        if (this.options.missionaryAnniversary) { sidebarContent += '<h2 class="anniversary">Anniversary</h2><p>' + this.options.missionaryAnniversary + '</p>'; }
        
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
