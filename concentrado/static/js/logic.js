//const API_KEY = "pk.eyJ1IjoidmlwbGljbyIsImEiOiJjazkwcGpyYzkwNGJhM2xud2liOThyYnVpIn0.EhlhAm1hxGnnD3MrUeqt_A";




//var layers = {
//    Customers: new L.LayerGroup(),
//    Suppliers: new L.LayerGroup()
//};

//console.log(layers);

var blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-gold.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-orange.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-yellow.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-violet.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greyIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-grey.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-black.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// Add a tile layer
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// importamos la basede datos
var data = "proveedores.json";
var clientes = "clientes.json";

var suppliersmarkers = [];
var customersmarkers = [];
var Custtomap = new L.LayerGroup();
var Supptomap = new L.LayerGroup();


d3.json(data).then( proveedores => {
    d3.json(clientes).then ( client => {
        //console.log(response);
        // Initialize an array to hold bike markers
    
            // Loop through data
        for (var i = 0; i < client.length; i++) {
            //console.log(client[i].NO);
        var marker = L.marker([client[i].Lat,client[i].Lon], {
          icon: blueIcon,
          title: client[i].Nombre
        }).bindPopup(client[i].Nombre+" "+ client[i].MONTO);

        if (client[i].MONTO>250000) {
          var marker = L.marker([client[i].Lat,client[i].Lon], {
            icon: greenIcon,
            title: client[i].Nombre
          }).bindPopup(client[i].Nombre+" "+ client[i].MONTO); 
        }
        //marker.addTo(myMap)
        customersmarkers.push(marker);
      }

    // Initialize an array to hold bike markers
    // Loop through data

        for (var i = 0; i < proveedores.length; i++) {
          //console.log(proveedores[i].NO);
          var marker = L.marker([proveedores[i].Lat,proveedores[i].Lon], {
            icon: goldIcon,
            title: proveedores[i].Nombre
          }).bindPopup(proveedores[i].Nombre+" "+ proveedores[i].MONTO);
      
          if (proveedores[i].MONTO1>250000) {
            var marker = L.marker([proveedores[i].Lat,proveedores[i].Lon], {
              icon: redIcon,
              title: proveedores[i].Nombre
            }).bindPopup(proveedores[i].Nombre+" "+ proveedores[i].MONTO); 
        
          }

          // Add the marker to the bikeMarkers array
          suppliersmarkers.push(marker);
        }
    
    // Create a layer group made from the bike markers array, pass it into the createMap function
        Supptomap = L.layerGroup(suppliersmarkers);
        //console.log(Supptomap);
        Custtomap = L.layerGroup(customersmarkers);
        //console.log(customersmarkers);
        //console.log(Custtomap);
        console.log("suppliersmarkers");
        console.log(suppliersmarkers);
        console.log("Supptomap");
        console.log(Supptomap);
        console.log("customersmarkers");
        console.log(customersmarkers);
        console.log("Custtomap");
        console.log(Custtomap);
        //console.log(layers);
        //console.log(Supptomap);


        // Create a map object
        var myMap = L.map("map", {
            center: [19.431371,-99.1326349],
            zoom: 4,
            layers: [Custtomap, Supptomap]
        });
      


          // Add our 'lightmap' tile layer to the map
          lightmap.addTo(myMap);

          // Create an overlays object to add to the layer control
        var overlays = {
            "Customers": Custtomap,
            "Suppliers": Supptomap//,
            //"lightmap" : lightmap
          };

        // Create a control for our layers, add our overlay layers to it
        L.control.layers(null, overlays).addTo(myMap);

     
    });

  
});





  



//});



