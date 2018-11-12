
function livetracking(map, firebase, markers){
	var ref = firebase.database().ref("LiveLocations");
	ref.on('value', getLocations)

	function getLocations(data){
		// get all live tracks.
		var tracks = data.val();
		var keys = Object.keys(tracks);

		for(var i=0; i<markers.length; i++){
			markers[i].setMap(null);
		}

		for(var i = 0; i < keys.length; i++) {
			var k = keys[i];
			var lat = tracks[k].lat;
			var lon = tracks[k].lng;
			var userid = tracks[k].uid;
			var contact = tracks[k].email;

			console.log(lat, lon);
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat,lon),
				userid: userid
			});
			marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
			marker.setMap(map);
			markers.push(marker);

			var infowindow = new google.maps.InfoWindow();
			google.maps.event.addListener(marker, 'click', function(){
				console.log("clicked");
				infowindow.setContent('<div><strong>'+contact+'</strong></div>');
				infowindow.open(map, this);
			});
		}

	}
}

