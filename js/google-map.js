var google;

function init() {
    // Basic options for a simple Google Map
    // Blush Beauty Salon Location: Dombivli, Maharashtra
    var myLatlng = { lat: 19.2210243, lng: 73.093806 };
    
    var mapOptions = {
        zoom: 15,
        center: myLatlng,
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    { "visibility": "simplified" },
                    { "hue": "#ff0000" }
                ]
            }
        ]
    };

    var mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Check if google maps is loaded and not showing error
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        mapElement.innerHTML = '<div style="padding: 20px; text-align: center; background: #eee;"><h3>Google Maps failed to load</h3><p>Please check your API key and Internet connection.</p></div>';
        return;
    }

    var map = new google.maps.Map(mapElement, mapOptions);
    
    // Address for Blush Beauty Salon
    var address = 'Shop No. 3, Joshi Shopping Centre, Chedda Road, Dombivli East, Maharashtra 421201';

    // Use the official Geocoder service instead of an external JSON call
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                icon: 'images/loc.png'
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
            // Fallback to the hardcoded coordinates if geocoding fails
            new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: 'images/loc.png'
            });
        }
    });
}

// Modern way to initialize the map
window.addEventListener('load', init);