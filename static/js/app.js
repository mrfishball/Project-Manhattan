"use strict";
var mapDiv = document.getElementById("map");
var map;
var center = {lat: 40.7484, lng: -73.9857};
var image;
var infowindow;
var viewModel;
var client_id = "OCNGIDK3KNDHPSZS50KTNCNR3CHPHV0EX01AYV0RLDQXHNL2";
var secret = "WMH4A3QF0XS5221ZAYKTNFHMIJYXUNMCPSPLZHFVHEWUGD4C";

var collection = [
	{name: "Empire State Building", pos: {lat: 40.74843, lng: -73.98566}, type: "Attraction", description: "Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors."},
	{name: "Shack Shake", pos: {lat: 40.74152, lng: -73.98816}, type: "Dining", description: "Hip, counter-serve chain for gourmet takes on fast-food classics like burgers & frozen custard."},
	{name: "Central Park", pos: {lat: 40.7829, lng: -73.9654}, type: "Park", description: "Boasting historic hand-carved horses, this carousel is one of the largest in the country."},
	{name: "The Museum of Modern Art", pos: {lat: 40.76142, lng: -73.97764}, type: "Museum", description: "Works from van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The Modern restaurant."},
	{name: "High Line", pos: {lat: 40.74800, lng:	-74.00473}, type: "Park", description: "Popular park 30 feet above street level on an old rail line, with river & city views."},
	{name: "IPPUDO", pos: {lat: 40.73096, lng: -73.99029}, type: "Dining", description: "Ramen dishes & pork buns are the lures at this popular East Village Japanese eatery."},
	{name: "Governors Island", pos: {lat: 40.68945, lng: -74.01679}, type: "Attraction", description: "A historic military village and a tranquil scenic playground."},
	{name: "Le Bernardin", pos: {lat: 40.76169, lng: -73.98188}, type: "Dining", description: "Elite French restaurant offers chef Eric Ripert's refined seafood, expert service & luxurious decor."},
	{name: "One World observatory", pos: {lat: 40.71335, lng: -74.01337}, type: "Attraction", description: "Observatory located on floors 100-102 of One World Trade Center, with exhibits & restaurants."},
	{name: "Madison Square Garden", pos: {lat: 40.75051,lng: -73.99341}, type: "Arena", description: "Billed as the 'world's most famous arena', this icon hosts pro sports, concerts & other big events."},
	{name: "Gotham Bar and Grill", pos: {lat: 40.73420, lng: -73.99369}, type: "Dining", description: "A West Village fixture still serving standout New American plates in a stylish yet relaxed setting."},
	{name: "American Museum of Natural History", pos: {lat: 40.78131, lng: -73.97399}, type: "Museum", description: "From dinosaurs to outer space and everything in between, this huge museum showcases natural wonders."},
	{name: "St. Patrick's Cathedral", pos: {lat: 40.75847, lng: -73.97600}, type: "Attraction", description: "Towering Neo-Gothic church from 1879 with twin spires & storied history opposite Rockefeller Center."},
	{name: "Chinatown", pos: {lat: 40.71575, lng: -73.99703}, type: "Attraction", description: "With one of the densest populations of Chinese immigrants in the western hemisphere, Manhattan's Chinatown is a true New York story, the American Dream in action."},
	{name: "The Boil", pos: {lat: 40.73031, lng: -73.99429}, type: "Dining", description: "Sleek bar dishing up raw & cooked Cajun-style seafood by the pound along craft beer & cocktails."},
	{name: "Webster Hall", pos: {lat: 40.73177, lng: -73.98915}, type: "Entertainment", description: "This nightclub, in a circa-1886 space, has bars, stages & dance floors on several levels."},
	{name: "Dominique Ansel Bakery", pos: {lat: 40.72517, lng: -74.00296}, type: "Bakery", description: "Inventive made-to-order French pastries & savory bites in an airy bakery/cafe with outdoor tables."},
	{name: "Times Square", pos: {lat: 40.75890, lng: -73.98513}, type: "Attraction", description: "Bustling destination in the heart of the Theater District known for bright lights, shopping & shows."},
	{name: "Statue of Liberty", pos: {lat: 40.68926, lng: -74.04454}, type: "Attraction", description: "Iconic National Monument opened in 1886, offering guided tours, a museum & city views."},
	{name: "Rockefeller Center", pos: {lat: 40.75874, lng: -73.97870}, type: "Attraction", description: "Sights abound at this famous complex, home to an ice rink, TV studios & a giant Christmas tree."},
];

/**
 * Check if local storage feature is supposrted by the browser.
*/
// function isLocalStorage(){
//     var test = 'test';
//     try {
//         localStorage.setItem(test, test);
//         localStorage.removeItem(test);
//         return true;
//     } catch(e) {
//         return false;
//     }
// }

function initMap() {
  map = new google.maps.Map(mapDiv, {
    zoom: 12,
    center: center,
    disableDefaultUI: true,
    draggable: true,
    /**
		 * Custom map styles.
  	*/
    styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
  });
  /**
	 * Instantiate the infowindow object for later use.
  */
  infowindow = new google.maps.InfoWindow({
  	maxWidth: 250
  });
	/**
	 * Custom marker image and size.
  */
	image = {
    url: "static/img/dp_marker2.png",
    origin: new google.maps.Point(0, 0),
  	anchor: new google.maps.Point(23, 48),
  	scaledSize: new google.maps.Size(40, 48)
  };
  /**
	 * Check if map is loaded before creating the viewmodel
  */
  google.maps.event.addListenerOnce(map, "idle", function() {
		viewModel = new ViewModel(collection);
		ko.applyBindings(viewModel);
  });
}

var Point = function(place) {
	var self = this;
	self.name = place.name;
	self.pos = place.pos;
	self.type = place.type;
	self.description = place.description;
	self.error = null;
	self.address = null;
	self.contact = null;
	self.url = null;
	self.id = null;
	self.isVisible = ko.observable(false);
	/**
	 * Create a marker for this destination.
  */
	self.marker = new google.maps.Marker({
		map: map,
		position: place.pos,
		title: place.name,
		icon: image,
		optimized: false,
		animation: google.maps.Animation.DROP
	});

	/**
	 * Toggle for the visibility of each marker on map.
  */
  self.isVisible.subscribe(function(currentState) {
    if (currentState) {
      self.marker.setMap(map);
    } else {
      self.marker.setMap(null);
    }
  });

  self.isVisible(true);
  
  /**
   * Fetch location info such as venue ID, address, contact etc using
   * Foursquare's Search Venue API. 
   * Callback to getPhotos function to fetch pictures of the  
   * location as venue ID from the first fetch is required.
  */
  self.getInfo = function(callback) {
  	var requestAPI = "https://api.foursquare.com/v2/venues/search?client_id="+client_id+"&client_secret="+secret+"&v=20161002"+"&ll="+place.pos.lat+","+place.pos.lng+"&query="+ place.name +"&limit=1";

  	$.getJSON(requestAPI).done(function(response) {

  			console.log(response.response.venues[0].id);
  			
  			self.id = response.response.venues[0].id;
  			self.address = response.response.venues[0].location.formattedAddress;
  			self.contact = response.response.venues[0].contact.formattedPhone;
  			self.url = response.response.venues[0].url;

  			localStorage.setItem(place.name, response.response.venues[0]);
  			callback(self.id);

  	}).fail(function() {
  			self.error = "Oops! Something is wrong :("
  		});
  }

  /**
   * Fetch photos of the location using the venue ID provided by 
   * getInfo.
  */
  self.getPhotos = function(venueID) {
  	var requestAPI = "https://api.foursquare.com/v2/venues/"+venueID+"/photos?client_id="+client_id+"&client_secret="+secret+"&v=20161002";

  	$.getJSON(requestAPI).done(function(response) {
  			console.log(response.response);

  	}).fail(function() {
  			self.error = "Oops! Something is wrong :("
  		});
  }
  
  self.getInfo(self.getPhotos);
  /**
   * To re position the target marker and the map view to compensate 
   * for the shifted map view panel when the search menu pushes in 
   * from the left when the location is being clicked on the menu.
  */
	self.focusSearch = function() {
		map.setZoom(16);
		map.setCenter(self.marker.position);
		map.panBy(200,0);
		self.open();
	}
	/**
	 * To re position the target marker and the map view to compensate 
	 * for the shifted map view panel when the menu slides in from the 
	 * left when the location is being clicked on the menu.
  */
	self.focus = function() {
		map.setZoom(16);
		map.setCenter(self.marker.position);
		map.panBy(-200, 0);
		self.open();
	}
	/**
	 * Display the name and a brief description of the location in a 
	 * infowindow for the corresponding marker. Also checks if the map 
	 * view, in this case the zoom level has changed, if so then 
	 * change the map view and re center it to the marker of the 
	 * loaction that is selected. Applies to only when the regular 
	 * menu is active.
	*/
	self.open = function() {
		var contentString = "<h2>" + place.name + "</h2><br>";
		infowindow.setContent(contentString + place.description);
		infowindow.open(map, self.marker);
	}
	/**
	 * Dismiss the infowindow.
	*/
	self.close = function() {
		infowindow.close();
		self.marker.setAnimation(null);
	}
	/**
	 * Additional event listeners for the marker.
	*/
	self.marker.addListener("mouseover", function() {
		self.open();
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
	});

	self.marker.addListener("mouseout", function() {
		self.marker.setAnimation(null);
	});

	self.marker.addListener("click", function() {
		/**
		 * Update the selected to the current Point object.
		*/
		viewModel.selected(self);
		// map.setZoom(16);
		// map.setCenter(self.marker.position);
		pushLeft.close();
		slideLeft.close();
		slideBottom.open();
		self.open();
	});
}
/**
		This is our ViewModel that handles displaying a menu of destinations, filter/search through the menu and finally displaying markers of these destinations on the map.
*/
var ViewModel = function(list) {
	var self = this;
	/**
	 * Create a Place object for each object in the initial array and
	 * place them in a new observable array.
	*/
	self.allPlaces = ko.observableArray(list.map(function(place) {
		return new Point(place);
	}));

	/**
	 * Preset the selected so that the view model doesn't throw error
	 * when the DOM is being loaded.
	 * The selected observable will be updated when a marker is
	 * clicked.
	*/
	self.selected = ko.observable(self.allPlaces()[0]);
	self.search = ko.observable("");
	/**
	 * Filter locations out of the menu view for any unmatched results.
	 * Filter by name, description and type.
	*/
	self.searchResult = ko.pureComputed(function() {
		var q = self.search().toLowerCase();
		return self.allPlaces().filter(function(place) {
			return ((place.name.toLowerCase().indexOf(q) >= 0) || (place.description.toLowerCase().indexOf(q) >= 0) || (place.type.toLowerCase().indexOf(q) >= 0));
		});
	});
	/**
	 * Filter markers out of the map view for any unmatched results.
	 * Filter by name, description and type.
	*/
	self.filterMarkers = ko.computed(function () {
    var q  = self.search().toLowerCase();
    return ko.utils.arrayFilter(self.allPlaces(), function (place) {
        var doesMatch = ((place.name.toLowerCase().indexOf(q) >= 0) || (place.description.toLowerCase().indexOf(q) >= 0) || (place.type.toLowerCase().indexOf(q) >= 0));
        place.isVisible(doesMatch);
        return doesMatch;
    });
});
}