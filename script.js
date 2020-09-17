function initMap() {

    var lat_string,lng_string,lat_lng_string;
    var location = {lat: 0, lng: 0};

    // Initialize map
    var map=new google.maps.Map(document.getElementById("map"),{
        zoom: 18,
        center: location

    }); 
    

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            // User's position
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Store user's position into varriables
            lat_string=String(pos['lat']);
            lng_string=String(pos['lng']);


            // Add Marker to users position
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Current Location'
            });
           
            // Set map to user's center position
            map.setCenter(pos);

            // Add listener to the marker that will open the modal
            marker.addListener('click', pop_up);

        }, function() {
            // Handle location error (i.e. if user disallowed location access manually)
            alert("Error: The location service failed. Please allow brower location service.")
            
        });
    } 
    else {
        // Browser doesn't support Geolocation
        alert("Browser doesn't support Geolocation")
    }
    
    function pop_up(){

        // Merge user's Latitude and Longitude to a string 
        lat_lng_string =String(lat_string)+","+String(lng_string);

        // Get the modal
        var modal = document.getElementById("myModal");
    
        // Get the send button
        var send = document.getElementById("send");

        // Modal's Display type
        modal.style.display = "block";
       
        // Assign the value of Lat and Lng in the first field
        document.getElementById("lat_long").value = lat_lng_string;
        var lat_long = document.getElementById("lat_long").value;

        // When the user clicks on send button
        send.onclick = function() {
            send_to_console(lat_long);
            modal.style.display = "none";
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

}
function send_to_console(lat_long) {

    // Get the Name field
    var name = document.getElementById("name").value;

    // Split the Latitude and Longitude
    var lat_long_val = lat_long.split(',');

    // Send to console
    console.log("Latitude: " + lat_long_val[0] + "\n" + "Longitude: " + lat_long_val[1]+"\nName: "+name);

}

