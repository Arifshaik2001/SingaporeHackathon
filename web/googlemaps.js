var curLat = null; //user location
var curLon = null;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
        window.alert("no location");
    }
}
function showPosition(position) {
    curLat = position.coords.latitude;
    curLon = position.coords.longitude;
}
function initMap(){
  getLocation() //finds out user location to fomat the map
  if (curLat == null){
    curLat = 42.3601;   //if the user location cannot be found, set default ones
    curLon = -71.0589;   // of boston
    console.log("random locations");
  }
  var options = {
    zoom:10,
    center:{lat:curLat, lng:curLon}
  }
    var map = new google.maps.Map(document.getElementById("map"),options);
}