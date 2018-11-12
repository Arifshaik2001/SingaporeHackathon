
function livetracking(map, firebase, markers){
	var ref = firebase.database().ref("LiveLocations");
	ref.on('value', getLocations)



	function getLocations(data){
		// get all live tracks.
		if(data.val()==null){
			return;
		}
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
			var isInThreat = tracks[k].alert;

			console.log(lat, lon);
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat,lon),
				userid: userid,
				contact: contact,
				// animation: google.maps.Animation.DROP
			});
			if(isInThreat==true){
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
			}
			else{
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
			}
			marker.setMap(map);
			markers.push(marker);

			var infowindow = new google.maps.InfoWindow();
			google.maps.event.addListener(marker, 'click', toggleBounce, function(){
				console.log("clicked");
				infowindow.setContent('<div><strong>'+this.contact+'</strong></div>');
				infowindow.open(map, this);
			});
		}
	}
	
	function toggleBounce() {
		if (this.getAnimation() !== null) {
			this.setAnimation(null);
		} else {
			this.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
}

