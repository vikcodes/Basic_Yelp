(function(window, document, undefined) {
	var GoogleMapView = {};

  // zoom level for Google Map
  var DEFAULT_ZOOM = 14;
  var STATUS_OK = 200;

  /* Renders a map for the given entry into the provided $map element. */
  GoogleMapView.render = function($map, entryData) {
  	if(entryData !== null) {
  		var request = new XMLHttpRequest();
  		var address = makeCorrectAddress(entryData);
  		request.addEventListener('load', function(event) {
  			if (request.status == STATUS_OK) {
  				var theJSON = request.responseText;
  				var parsedJSON = JSON.parse(theJSON);
  				var location = parsedJSON.results[0].geometry.location;

  				displayGoogleMap(location, entryData, $map);
  			} else {
  				console.log('error');
  			}
  		});
  		request.open('GET', address);
  		request.send();
  	};
  }

  function makeCorrectAddress(entryData) {
  	var formattedAddress = entryData.address.split(' ');
  		var address = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  		for(var i = 0; i < formattedAddress.length; i++) {
  			if(i + 1 === formattedAddress.length) { //if it is the last element in the array
  				address += formattedAddress[i];
  			} else {
  				address += formattedAddress[i] + '+';
  			}
  		}
  		return address;
  }

  function displayGoogleMap(location, entryData, $map) {
  	var mapOptions = { //center and zoom on map
  					center: { lat: location.lat, lng: location.lng },
  					zoom: DEFAULT_ZOOM,
  				};
  				GoogleMapView = new google.maps.Map($map[0], mapOptions); //display map

  				var marker = new google.maps.Marker({ //create the marker
  					position: location,
  					map: GoogleMapView,
  					title: entryData.name,
  				});
  }
  
  window.GoogleMapView = GoogleMapView;
})(this, this.document);
