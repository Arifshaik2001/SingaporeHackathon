
function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

function selmar(event, markers){
	marker = markers[event.id];
	toggleBounce(marker);
}

function mapIncidents(map, firebase, markers){
	var ref = firebase.database().ref("Incidents");
	ref.on('value', getIncidents);

	function getIncidents(data){
		// get all incidents.
		var incidents = data.val();
		var keys = Object.keys(incidents);

		var inclist = document.getElementById("incidentsList");
		var str = "<div>";

		for(var i = keys.length-1; i>=0; i--) {
			var k = keys[i];
			var lat = incidents[k].incidentLat;
			var lon = incidents[k].incidentLon;
			var incidentId = keys[i];
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat,lon),
				markerId: incidentId
			});
			marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
			marker.setMap(map);
			markers.push(marker);

			var incidentType = incidents[k].incidentType;
			str += "<input type=\"radio\" name=\"incident\" id=\"" + incidentId + "\" onclick=\"selmar(this,markers)\"/> Type: "+ incidentType + ", Lat: "+ lat+ ", Lon: " + lon + "<br>";

			google.maps.event.addListener(marker, 'click', function(){
				$("#"+this.markerId).prop('checked',true);
			})
		}
		str += "</div>"
		inclist.innerHTML = str;
	}
}

