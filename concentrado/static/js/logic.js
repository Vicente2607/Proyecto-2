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
//var data = "proveedores.json"
//var clientes = "clientes.json";

//console.log(data);
//console.log(clientes);

var suppliersmarkers = [];
var customersmarkers = [];
var Custtomap = new L.LayerGroup();
var Supptomap = new L.LayerGroup();


d3.json("http://127.0.0.1:5000/api/v1.0/proveedores").then( proveedores => {
  d3.json("http://127.0.0.1:5000/api/v1.0/clientes ").then ( client => {
    var proveedoresvar = proveedores.data;
    console.log(proveedoresvar);
    var clientesvar = client.data;
    console.log(clientesvar);
    
    // Loop through data for customers
    for (var i = 0; i < clientesvar.length; i++) {
      //console.log(clientesvar[i].no);
      if(clientesvar[i].lat != null && clientesvar[i].lon != null){
        var marker = L.marker([clientesvar[i].lat,clientesvar[i].lon], {
          icon: blueIcon,
          title: clientesvar[i].nombre
        }).bindPopup("<h1>"+clientesvar[i].nombre+"</h1> <hr> <h3>Monto "+ clientesvar[i].monto+"</h3>");
        if (clientesvar[i].monto>250000) {
          var marker = L.marker([clientesvar[i].lat,clientesvar[i].lon], {
            icon: greenIcon,
            title: clientesvar[i].nombre
          }).bindPopup("<h1>"+clientesvar[i].nombre+"</h1> <hr> <h3>Monto "+ clientesvar[i].monto+"</h3>");
        }
        //marker.addTo(myMap)
        customersmarkers.push(marker);
      }
    }
    
    // Loop through data for suppliers
    for (var i = 0; i < proveedoresvar.length; i++) {
      //console.log(proveedoresvar[i].no);
      if(proveedoresvar[i].lat != null && proveedoresvar[i].lon != null){
        var marker = L.marker([proveedoresvar[i].lat,proveedoresvar[i].lon], {
          icon: goldIcon, 
          title: proveedoresvar[i].nombre
        }).bindPopup("<h1>"+proveedoresvar[i].nombre+"</h1> <hr> <h3>Monto "+ proveedoresvar[i].monto+"</h3>");
        
        if (proveedoresvar[i].monto1>250000) {
          var marker = L.marker([proveedoresvar[i].lat,proveedoresvar[i].lon], {
            icon: redIcon,
            title: proveedoresvar[i].nombre
          }).bindPopup("<h1>"+proveedoresvar[i].nombre+"</h1> <hr> <h3>Monto "+ proveedoresvar[i].monto+"</h3>");
        }
        // Add the marker to the suppliersmarkers array
        suppliersmarkers.push(marker);
      }
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
      zoom: 8,
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
    
    //Set up the legend
    //var legend = L.control({ position: "bottomright" });
    //
    //// When the layer control is added, insert a div with the class of "legend"
    //legend.onAdd = function() {
    //  var div = L.DomUtil.create("div", "legend");
    //  var legendinfo = "<h1>Median Income</h1>";
    //  
    //  div.innerHTML = legendInfo;
    //  return div;
    //};
    //
    //// Adding legend to the map
    //legend.addTo(myMap);
  
  });
});





  



//});



