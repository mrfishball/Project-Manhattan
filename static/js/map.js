var mapDiv = document.getElementById('map');
var map;
var pos;
var infowindow;
var search_place;

$.get( "http://ip-api.com/json", function(data) {
    pos = new google.maps.LatLng(data.lat, data.lon);
    initMap();
  });

function initMap() {
  map = new google.maps.Map(mapDiv, {
    zoom: 15,
    center: pos,
    mapTypeControl: false
  });

  // Marker for the user's current location on the map
  var curr_marker = new google.maps.Marker({
    position: pos,
    map: map,
    draggable: false,
   animation: google.maps.Animation.DROP
  });
  
  // Info window for nearby places
  infowindow = new google.maps.InfoWindow();
  
  //Search nearby restaurants and display them on the map
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: {lat: pos.lat(), lng: pos.lng()},
    radius: 1000,
    type: ['restaurant']
  }, callback);

  // Auto complete for the search field
  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  // Marker for the place searched by the user
  var search_marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP
  });

  // Display the place searched and put a marker and info window on that spot
  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    search_marker.setVisible(false);
    search_place = autocomplete.getPlace();
    if (!search_place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (search_place.geometry.viewport) {
      map.fitBounds(search_place.geometry.viewport);
      map.setCenter(search_place.geometry.location);
      map.setZoom(17);
    } else {
      map.setCenter(search_place.geometry.location);
      map.setZoom(17);
    }
    // Custom marker icon
    // search_marker.setIcon(/** @type {google.maps.Icon} */({
    //   url: search_place.icon,
    //   size: new google.maps.Size(71, 71),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(17, 34),
    //   scaledSize: new google.maps.Size(35, 35)
    // }));
    search_marker.setPosition(search_place.geometry.location);
    search_marker.setVisible(true);

    var address = '';
    if (search_place.address_components) {
      address = [
        (search_place.address_components[0] && search_place.address_components[0].short_name || ''),
        (search_place.address_components[1] && search_place.address_components[1].short_name || ''),
        (search_place.address_components[2] && search_place.address_components[2].short_name || '')
      ].join(' ');
    }

    search_marker.addListener('click', function() {
      slideLeft.open();
      infowindow.setContent('<div><strong>' + search_place.name + '</strong><br>' + address);
      infowindow.open(map, search_marker);
    });
    infowindow.setContent('<div><strong>' + search_place.name + '</strong><br>' + address);
    infowindow.open(map, search_marker);
  });

  // Info window of user's current location
  var youAreHere = '<div id="content">'+
      '<h3>' + 'This is you!' + '</h3>' +
      '</div>';

  curr_marker.addListener('click', function() {
    infowindow.setContent(youAreHere);
    infowindow.open(map, curr_marker);
  });
  curr_marker.setMap(map);
  infowindow.setContent(youAreHere);
  infowindow.open(map, curr_marker);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    slideLeft.open();
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}