

// Función para graficar (Bar, gauge, bubble)

function getPlot(id) {

    // obteniendo los datos the json file

    d3.json("http://127.0.0.1:5000/api/v1.0/proveedores").then((data)=> {
       
        // obtenemos los datos del proveedor
        var metadata = data.data;
        var result = metadata.filter(meta => meta.nombre === id);
        var MontoSup = result[0].monto1;
        var NomSup = result[0].nombre;
        //console.log(MontoSup);
       
        
        d3.json("http://127.0.0.1:5000/api/v1.0/cxp").then((cxp)=> {   
               //obtenemos los datos de las cxp
               var result = cxp.data;
               var Datos_cxp = cxp.data.filter(meta => meta.nombre === id);
               var nombre_su = [];
               var index;
               var fechas_pago=[];
               var montos_pago=[];
               var colores_pago=[];
               for ( index = 0; index < result.length ; ++index) {
                  //console.log(result[index].fecha_pago);
                  fechas_pago.push(result[index].fecha_pago);
                  montos_pago.push(parseFloat(result[index].monto));
                  nombre_su.push(result[index].nombre);

                  if (result[index].monto > 800000) {
                    colores_pago.push("#fe463d");
                  } else if (result[index].monto > 600000) {
                    colores_pago.push("#fe783d");
                  } else if (result[index].monto > 400000){
                    colores_pago.push("#febb3d");
                  } else if (result[index].monto > 200000){
                    colores_pago.push("#fefe3d");
                  } else if (result[index].monto > -1){
                     colores_pago.push("#fefeaf");};
               }
               //console.log(colores_pago); 
               var trace1 = {
                   x: fechas_pago,
                   y: montos_pago,
                   mode: "markers",
                   marker: {
                       size: 25,
                       color: colores_pago
                   },
                   text: nombre_su
               };
               // Layout for the Bubble plot
               var layout_b = {
                   xaxis:{title: "Fecha Pago"},
                   height: 600,
                   width: 1000
               };
               // Creamos la data variable 
               var data1 = [trace1];
               // Creamos la grafica de burbuja
               Plotly.newPlot("bubble", data1, layout_b); 
              });

        // The guage chart
      function buildGauge(wfreq) {

        // metemos el valor del wasing frecuency y lo normalizamos entre 0 y 180
        var level = parseFloat(wfreq) * 20;
        // Cálculo tigonometrico para ver donde queda el putno
        var degrees = 180 - level;
        var radius = 0.5;
        var radians = (degrees * Math.PI) / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
      
        // creamos el triángulo que marca
        var mainPath = "M -.0 -0.05 L .0 0.05 L ";
        var pathX = String(x);
        var space = " ";
        var pathY = String(y);
        var pathEnd = " Z";
        var path = mainPath.concat(pathX, space, pathY, pathEnd);
        var data = [
          {
            type: "scatter",
            x: [0],
            y: [0],
            marker: { size: 6, color: "850000" },
            showlegend: false,
            name: "Freq",
            text: level,
            hoverinfo: "text+name"
          },
      
          {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
              colors: [
                "rgba(254, 70, 61, .5)",
                "rgba(254, 120, 61, .5)",
                "rgba(254, 154, 61, .5)",
                "rgba(254, 187, 61, .5)",
                "rgba(254, 228, 61, .5)",
                "rgba(254, 254, 61, .5)",
                "rgba(254, 254, 142, .5)",
                "rgba(254, 254, 175,.5)",
                "rgba(240, 230, 215, .5)",
                "rgba(255, 255, 255, 0)"
              ]
            },
      
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
          }
      
        ];
      
        var layout = {
          shapes: [
            {
              type: "path",
              path: path,
              fillcolor: "850000",
              line: {
                color: "850000"
              }
            }
          ],
      
          title: "<b>Level of the Debt</b> ",
          height: 500,
          width: 500,
          xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
          },
      
          yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
          }
        };
        var GAUGE = document.getElementById("gauge");
        Plotly.newPlot(GAUGE, data, layout);
      }
      buildGauge(MontoSup/200000);
      });
  }  


// Funcion poara obtener la infromación del Json file
function getInfo(id) {
     //console.log(id)
    // leemos el json y obtenemos los datos en data
    d3.json("http://127.0.0.1:5000/api/v1.0/proveedores").then((data)=> {
        //  obtenemos los datos de metadata para el panel demográfico
        var metadata = data.data;
        //console.log(metadata)
        // filtramos el metadatada ppro id
        var result = metadata.filter(meta => meta.nombre === id);
        //console.log(result);
        var frecuencia = result[0].monto
        var tiposup = result[0].tipo
        //console.log(frecuencia);
        // seleccionamos el #sample-metadata 
        var demographicInfo = d3.select("#sample-metadata");
        // limpiemoa lo que hay
        demographicInfo.html("");
        // ponemos la información
        Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text("Monto: "+frecuencia );
              demographicInfo.append("h5").text("Tipo: "+tiposup );
        });
    });
}


function deploytable(id) {

  d3.json("http://127.0.0.1:5000/api/v1.0/cxp").then((cxp)=> {  
    console.log(cxp.data); 
    var result = cxp.data.filter(meta => meta.nomre === id);
    console.log(result);
    tbody = d3.select("tbody");
    function displayData(something){ 
             tbody.text("")
             something.forEach(function(et_sighting){
             new_tr = tbody.append("tr")
             Object.entries(et_sighting).forEach(function([key, value]){
             new_td = new_tr.append("td").text(value)	})
})
}


// función para limpiar tabla
function deleteTbody() {
    d3.select("tbody")
      .selectAll("tr").remove()
      .selectAll("td").remove();
  };


// desplegamos la tabla
displayData(result);






  });
}





// creamos la unfion pata cuando cambianmos el evento
function optionChanged(event) {
    //console.log("primer evento");  
    //console.log("1) ",d3.event.target.value);
    var supplier = d3.event.target.value;
    getInfo(supplier);
    getPlot(supplier);
    deploytable(supplier);
  }


// cramos la funcion de inicio
function init() {

    // selecionamos el  dropdown menu 
    var dropdown = d3.select("#selDataset");
    // leemos los  data 
    d3.json("http://127.0.0.1:5000/api/v1.0/proveedores").then((data)=> {
        //console.log(data)
        // obtenemos el id del data  y lo ponemos el en  dropdwown menu
        data.data.forEach(function(data) {
            dropdown.append("option").text(data.nombre).property("value");
        });
        // Llamamos a las funciones de obtencion de datso y grafica del primer elemento
        dropdown.on("change" , optionChanged);  
    });

}



init();