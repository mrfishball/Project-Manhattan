var mapDiv = document.getElementById('map');
var map;
var pos = {lat: 40.7484, lng: -73.9857};
var infowindow;

function initMap() {
  map = new google.maps.Map(mapDiv, {
    zoom: 13,
    center: pos,
    mapTypeControl: false,
    draggable: false
  });
}

// function createMarker(places) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location,
//     animation: google.maps.Animation.DROP
//   });

// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       nearby.push(results[i]);
//       createMarker(results[i]);
//     }
//   }
// }

// 

//   google.maps.event.addListener(marker, 'click', function() {
//     slideLeft.open();
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//     map.setCenter(marker.position);
//     map.setZoom(19);
//     map.panBy(-235, 0);
//   });
// }