"use strict";
var mapDiv = document.getElementById("map");
var map;
var center = {lat: 40.7454574, lng: -73.9998774};
// var isTouch = !('ontouchstart' in document.documentElement);
// var center = {lat: 40.7484, lng: -73.9857};
var image;
var infowindow;
var viewModel;
var client_id = "OCNGIDK3KNDHPSZS50KTNCNR3CHPHV0EX01AYV0RLDQXHNL2";
var secret = "WMH4A3QF0XS5221ZAYKTNFHMIJYXUNMCPSPLZHFVHEWUGD4C";

var collection = [
	{name: "9/11 Memorial & Museum", pos: {lat: 40.7115646, lng: -74.015363}, type: "Museum", description: "Plaza, pools & exhibits honoring victims of 1993 & 2001 WTC terrorist attacks. Free timed admission."},
	{name: "Brooklyn Bridge", pos: {lat: 40.7061, lng: -73.9969}, type: "Attraction", description: "Beloved, circa-1883 landmark connecting Manhattan & Brooklyn via a unique stone-&-steel design."},
	{name: "Empire State Building", pos: {lat: 40.74843, lng: -73.98566}, type: "Attraction", description: "Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors."},
	{name: "Shake Shack", pos: {lat: 40.74152, lng: -73.98816}, type: "Dining", description: "Hip, counter-serve chain for gourmet takes on fast-food classics like burgers & frozen custard."},
	{name: "Central Park", pos: {lat: 40.7829, lng: -73.9654}, type: "Park", description: "Boasting historic hand-carved horses, this carousel is one of the largest in the country."},
	{name: "The Museum of Modern Art", pos: {lat: 40.76142, lng: -73.97764}, type: "Museum", description: "Works from van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The Modern restaurant."},
	{name: "Grand Central Terminal", pos: {lat: 40.7527302, lng: -73.9794181}, type: "Train Station", description: "Iconic train station known for its grand facade & main concourse, also offering shops & dining."},
	{name: "High Line", pos: {lat: 40.74800, lng:	-74.00473}, type: "Park", description: "Popular park 30 feet above street level on an old rail line, with river & city views."},
	{name: "IPPUDO", pos: {lat: 40.73096, lng: -73.99029}, type: "Dining", description: "Ramen dishes & pork buns are the lures at this popular East Village Japanese eatery."},
	{name: "Governors Island", pos: {lat: 40.68945, lng: -74.01679}, type: "Attraction", description: "A historic military village and a tranquil scenic playground."},
	{name: "Le Bernardin", pos: {lat: 40.76169, lng: -73.98188}, type: "Dining", description: "Elite French restaurant offers chef Eric Ripert's refined seafood, expert service & luxurious decor."},
	{name: "One World Observatory", pos: {lat: 40.71335, lng: -74.01337}, type: "Attraction", description: "Observatory located on floors 100-102 of One World Trade Center, with exhibits & restaurants."},
	{name: "Madison Square Garden", pos: {lat: 40.75051,lng: -73.99341}, type: "Arena", description: "Billed as the 'world's most famous arena', this icon hosts pro sports, concerts & other big events."},
	{name: "Gotham Bar and Grill", pos: {lat: 40.73420, lng: -73.99369}, type: "Dining", description: "A West Village fixture still serving standout New American plates in a stylish yet relaxed setting."},
	{name: "American Museum of Natural History", pos: {lat: 40.78131, lng: -73.97399}, type: "Museum", description: "From dinosaurs to outer space and everything in between, this huge museum showcases natural wonders."},
	{name: "10Below Ice Cream", pos: {lat: 40.7140564, lng: -74.0007738}, type: "Ice Cream Shop", description: "Thai-inspired ice cream rolls made with fresh ingredients right in front of you."},
	{name: "Madame Tussauds New York", pos: {lat: 40.7564766, lng: -73.9910518}, type: "Museum", description: "Museum chain for life-size wax replicas of famous celebrities & historic icons in themed galleries."},
	{name: "St. Patrick's Cathedral", pos: {lat: 40.75847, lng: -73.97600}, type: "Attraction", description: "Towering Neo-Gothic church from 1879 with twin spires & storied history opposite Rockefeller Center."},
	{name: "Chelsea Market", pos: {lat: 40.7421258, lng: -74.0073127}, type: "Market", description: "Indoor marketplace renowned for its wide range of grocers (fish, produce, etc.), shops & eateries."},
	{name: "Chinatown", pos: {lat: 40.71575, lng: -73.99703}, type: "Attraction", description: "With one of the densest populations of Chinese immigrants in the western hemisphere, Manhattan's Chinatown is a true New York story, the American Dream in action."},
	{name: "Lady M Cake Boutique", pos: {lat: 40.775633, lng: -73.9643835}, type: "Bakery", description: "Decadent but refined desserts likes crêpes & eclairs distinguish this Upper East Side bakery."},
	{name: "Macy's", pos: {lat: 40.750545, lng: -73.988555}, type: "Shopping", description: "Department store chain providing brand-name clothing, accessories, home furnishings & housewares."},
	{name: "The Boil", pos: {lat: 40.73031, lng: -73.99429}, type: "Dining", description: "Sleek bar dishing up raw & cooked Cajun-style seafood by the pound along craft beer & cocktails."},
	{name: "Webster Hall", pos: {lat: 40.73177, lng: -73.98915}, type: "Entertainment", description: "This nightclub, in a circa-1886 space, has bars, stages & dance floors on several levels."},
	{name: "Dominique Ansel Bakery", pos: {lat: 40.72517, lng: -74.00296}, type: "Bakery", description: "Inventive made-to-order French pastries & savory bites in an airy bakery/cafe with outdoor tables."},
	{name: "Times Square", pos: {lat: 40.75890, lng: -73.98513}, type: "Attraction", description: "Bustling destination in the heart of the Theater District known for bright lights, shopping & shows."},
	{name: "Lincoln Center for the Performing Arts", pos: {lat: 40.7724681, lng: -73.9856776}, type: "Theater", description: "Multi-venue complex home to many prominent groups like Metropolitan Opera & New York City Ballet."},
	{name: "Statue of Liberty", pos: {lat: 40.68926, lng: -74.04454}, type: "Attraction", description: "Iconic National Monument opened in 1886, offering guided tours, a museum & city views."},
	{name: "Spot Dessert Bar", pos: {lat: 40.7293931, lng: -73.9911106}, type: "Dessert", description: "The sweets combine Asian & American flavors at this St. Marks Place dessert cafe."},
	{name: "Rockefeller Center", pos: {lat: 40.75874, lng: -73.97870}, type: "Attraction", description: "Sights abound at this famous complex, home to an ice rink, TV studios & a giant Christmas tree."},
]

function initMap() {
  map = new google.maps.Map(mapDiv, {
    zoom: 12,
    center: center,
    // disableDefaultUI: false,
    mapTypeControl: false,
    draggable: true,
    scrollwheel: false,
    /**
		 * Custom map styles.
  	*/
    styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}, {"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "transit.station","elementType": 'all',"stylers": [{ visibility: 'off' }]}]
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
  
	viewModel = new ViewModel(collection);
	ko.applyBindings(viewModel);
}

var Point = function(place) {
	var self = this;
	self.name = place.name;
	self.type = place.type;
	self.pos = place.pos;
	self.description = place.description;
	self.error = null;
	self.address = null;
	self.contact = null;
	self.url = null;
	self.categories = null;
	self.id = null;
	self.gallery = [];
	self.rating = null;
	self.isVisible = ko.observable(false);
	/**
	 * Create a marker for this destination.
  */
	self.marker = new google.maps.Marker({
		map: map,
		position: place.pos,
		title: place.name,
		icon: image,
		optimized: true,
		animation: google.maps.Animation.DROP
	});

	/**
	 * Toggle for the visibility of each marker on map.
  */
  self.isVisible.subscribe(function(currentState) {
    if (currentState) {
      self.marker.setVisible(true);
    } else {
      self.marker.setVisible(false);
    }
  });

  self.isVisible(true);
  
  /**
   * Get the venue ID using Foursquare's Search Venue API.
   * Calls back to getPhotos function to fetch pictures of the  
   * location and getInfo function to get details of location as
   * venue ID from the first fetch is required.
  */
  self.getVenueID = function(callback) {
  	var requestAPI = "https://api.foursquare.com/v2/venues/search?client_id="+client_id+"&client_secret="+secret+"&v=20161002"+"&ll="+place.pos.lat+","+place.pos.lng+"&query="+ place.name +"&limit=1";

  	$.getJSON(requestAPI).done(function(response) {  			
  			self.id = response.response.venues[0].id;
  			// console.log(self.id);
  			callback(self.id);
  	}).fail(function() {
  			self.error = swal(alertOptions, alertAction);
  		});
  }

  /**
   * Get details of location with an API call. Venue ID is required.
	*/
  self.getInfo = function(venueID) {
  	var requestAPI = "https://api.foursquare.com/v2/venues/"+venueID+"?client_id="+client_id+"&client_secret="+secret+"&v=20161002";
  	$.getJSON(requestAPI).done(function(response) {
  			self.categories = response.response.venue.categories.map(function(place) {
  				return place.name;
  			}).join(", ");
  			self.address = response.response.venue.location.formattedAddress;
  			self.contact = response.response.venue.contact.formattedPhone;
  			self.url = response.response.venue.url;
  			self.rating = response.response.venue.rating;
  			self.ratingStyle = response.response.venue.ratingColor;

  	}).fail(function() {
  			self.error = swal(alertOptions, alertAction);
  		});
  }

  /**
   * Fetch photos of the location using the venue ID provided by 
   * getInfo. Venue ID is required.
  */
  self.getPhotos = function(venueID) {
  	var requestAPI = "https://api.foursquare.com/v2/venues/"+venueID+"/photos?client_id="+client_id+"&client_secret="+secret+"&v=20161002";

  	// console.log(requestAPI);

  	$.getJSON(requestAPI).done(function(response) {
  			self.gallery = (response.response.photos.items.map(function(photo) {
  				return {"img": (photo.prefix + photo.height + "x" + photo.width + photo.suffix)};
  			}));
  	}).fail(function() {
  			self.error = swal(alertOptions, alertAction);
  		});
  	}

  	self.getVenueID(self.getPhotos);
  	self.getVenueID(self.getInfo);
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

	self.mobileFocus = function() {
		viewModel.setIsSelected();
		$("#pac-input-mobile").attr("value", self.name);
		map.setZoom(16);
		map.setCenter(self.marker.position);
		map.panBy(0, -200);
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
		infowindow.setContent(contentString + "<p class='info'>" + place.description + "<i><small>- Google</i></small></p><br><p class='helper'><i>Click or tap on the jumping marker to see more...</i></p>");
		infowindow.open(map, self.marker);
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
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
	});

	self.marker.addListener("mouseout", function() {
		self.marker.setAnimation(null);
	});

	/**
	 * As "tapping" on markers proved to be difficult on some mobile 
	 * devices. "mousedown" is used instead of "click" to optimize 
	 * usability across devices.
	*/
	self.marker.addListener("mousedown", function() {
		/**
		 * Update the selected to the current Point object.
		*/
		viewModel.selected(self);
		$("#fotorama").fotorama({data :self.gallery});
		pushLeft.close();
		// slideLeft.close();
		slideBottom.open();
		self.open();
	});
}
/**
		This is our ViewModel that handles the displaying of a menu of destinations, filter/search through the menu and finally displaying the markers of these destinations on the map.
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
	self.isSelected = ko.observable(false),
  
  self.setIsSelected = function () {
  	if (self.isSelected()) {
  		self.isSelected(false);
  	} else {
  		self.isSelected(true);
  	}
  	console.log(self.isSelected());
  }
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

	self.mobileSearch = function() {
		infowindow.close();
		map.setCenter(center);
	  map.setZoom(12);
	}

	/**
	 * Centers the map and return the zoom level to it's original 
	 * value.
	*/
	self.centerMe = function() {
	  map.setCenter(center);
	  map.setZoom(12);
	}

	/**
	 * Opens the left slide menu and re center the map 
	 * to fit the narrower map view.
	*/
	self.slideMenu = function() {
	  slideLeft.open();
	  map.panBy(-200, 0);
	}

	/**
	 * Opens the left push menu, re fit the map.
	 * If the slide menu is open, it will close it before the push
	 * menu is opened.
	*/
	self.pushMenu = function() {
		infowindow.close();
	  slideLeft.close();
	  pushLeft.open();
	  map.setCenter(center);
	  map.setZoom(12);
	  map.panBy(150, 0);
	}

	/**
	 * CLoses the bottom slide menu.
	*/
	self.closeMenu = function() {
	  slideBottom.close();
	}
}