var map;
var icons = ['green-dot', 'red-dot', 'grey-dot'];
var markers = [];
var own_marker;

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),{
        zoom: 19,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        panControl: false,
        rotateControl: true,
        zoomControlOptions: {
           position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });
    var icon = 'http://54.186.80.240/img/' + icons[0] + '.png';
    own_marker = new google.maps.Marker({position: {lat: -34.397, lng: 150.644}, icon: icon, map: map});
 }
google.maps.event.addDomListener(window, 'load', initialize);

var x;
var options = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError, options);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    $.post('/setposition', {
	uId: uId,
	lat: position.coords.latitude,
	lng: position.coords.longitude
    });
    own_marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
        default:
            x.innerHTML = "default."
            break;
    }
}

function getSubgroups() {
    $.post('/getsubgroups', {uId: uId, gId: 1}, function(data) {
        var html = '';
        for (var i = 0; i < data.rows.length; i++) {
	    html += '<li id="subgroup' + data.rows[i].gId + '" class="blue button geobutton">' + data.rows[i].Groupname + '</li>';
	}

	$('#groupslistul').html(html);
	$('.geobutton').on('click', function(e) {
	    var id = e.target.id;
	    var gId = id.substring('subgroup'.length);
	    $('.geobutton').removeClass('selected').addClass('blue');
	    $('#' + id).removeClass('blue').addClass('selected');
	    getOtherLocations(gId);
	});
    });
}

function getOtherLocations(gId) {
    for (var i = 0; i < markers.length; i++) {
	markers[i].setMap(null);
    }
    markers = [];
    $.post('/getcoloredsubgroups', {gId: 1}, function(data) {
        for (var i = 0; i < data.rows.length; i++) {
	    var obj = data.rows[i];
	    var icon = 'http://54.186.80.240/img/' + icons[i % 3] + '.png';
	    for (var j = 0; j < obj.length; j++) {
	        markers.push(new google.maps.Marker({position: {lat: obj[j].Latitude, lng: obj[j].Longitude}, icon: icon, map: map}));
	    }
	}
    });
}

$(document).ready(function() {
    x = document.getElementById("warning");
    //getSubgroups();
    getLocation();
});
