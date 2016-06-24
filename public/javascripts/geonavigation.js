$( document ).ready(function(){
  // Google map
  var map;
  function geo_success(position) {
    // update user location to server
    $.ajax({
      url: '/api/v1/users/getLocation',
      type: 'POST',
      data: { 
        lng: position.coords.longitude,
        lat: position.coords.latitude
      }
    });
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 14
      });
      var marker = new google.maps.Marker({
        position: {lat: position.coords.latitude, lng: position.coords.longitude},
        map: map
      });
    }
    initMap();
    var location_data = [];
    $('.locations').each(function(i ,val) { 
      var data = val.value.split('|');      
      location_data.push({
        name: data[0],
        geo: data[1].split(',')
      })
    })
    location_data.forEach(function(location) {
      var marker = new google.maps.Marker({
        position: {lat: +(location.geo[1]), lng: +(location.geo[0])},
        map: map
      });
      attachMarkerMessage(marker, location.name)
    })
  }
  function attachMarkerMessage(marker, placeName) {
    var infowindow = new google.maps.InfoWindow({
      content: placeName
    });
    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
  }
  function geo_error() {
    alert("Sorry, no position available.");
  }
  var geo_options = {
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 27000
  };
  navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
});