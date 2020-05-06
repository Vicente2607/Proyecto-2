// console.clear()

// set the dimensions and margins of the graph
var margin = {top: 20, right: 60, bottom: 80, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");
var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.000Z");
var formatTime = d3.timeFormat("%d/%m/%Y");
// set the ranges
var xingreso = d3.scaleBand().range([0, width]).paddingInner(0.5).paddingOuter(0.25);
var xLine = d3.scalePoint().range([0, width]).padding(0.5);
var yingreso = d3.scaleLinear().range([height, 0]);
var yLine = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
    // .x(function(d) { return xLine(d.fecha); })
    .x(function(d) { return xLine(d.fecha); })
    .y(function(d) { return yLine(d.egreso); });

// define the 2nd line
var valuesaldo = d3.line()
    .x(function(d) { return xLine(d.fecha); })
    .y(function(d) { return yLine(d.saldo); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// // set the colors
var z = d3.scaleOrdinal() 
        .range(["#8BC34A", "#f44336", "#03A9F4"])

// Get the data
// d3.csv("PP.csv", function(error, data) {
//   if (error) throw error;
d3.json("http://127.0.0.1:5000/api/v1.0/pp", function(data) {
  var d = data.data;
  console.log(d);

  // format the data
  data.data.forEach(function(d) {
    //  d.fecha = parseTime(d.fecha)
      d.ingreso = +d.ingreso;
    	d.egreso = +d.egreso;
      d.saldo = +d.saldo;
  });
  var keys = ["ingreso", "egreso", "saldo"];
  console.log(keys);
	console.table(d);
  
  // Scale the range of the data
  xingreso.domain(data.data.map(function(d) { return d.fecha; }));
  xLine.domain(data.data.map(function(d) { return d.fecha; }));
  yingreso.domain([0, d3.max(data.data, function(d) { return d.ingreso; })]).nice();
  yLine.domain([0, d3.max(data.data, function(d) {return Math.max(d.egreso, d.saldo); })]).nice();
  z.domain(keys);

  // Add the valueline path.
  svg.append("path")
      .data([data.data])
      .attr("class", "line")
      .style("stroke", "steelblue")
      .attr("d", valueline);

  // Add the valuesaldo path.
  svg.append("path")
      .data([data.data])
      .attr("class", "line")
      .style("stroke", "#03A9F4")
      .attr("d", valuesaldo);

  var rect = svg.selectAll("rect")
      .data(data.data)
  		
  rect.enter().append("rect")
  	.merge(rect)
      .attr("class", "ingreso")
      .style("stroke", "none")
      .style("fill", "#8BC34A")
      .attr("x", function(d){ return xingreso(d.fecha); })
      .attr("width", function(d){ return xingreso.bandwidth(); })
      .attr("y", function(d){ return yingreso(d.ingreso); })
      .attr("height", function(d){ return height - yingreso(d.ingreso); });
  
  
  var points2 = svg.selectAll("circle.point2")
      .data(data.data)
  
  var points1 = svg.selectAll("circle.point1")
      .data(data.data)
  		
  points1.enter().append("circle")
  	.merge(points1)
      .attr("class", "point1")
      .style("stroke", "#f44336")
  		.style("fill", "#f44336")
      .attr("cx", function(d){ return xLine(d.fecha); })
      .attr("cy", function(d){ return yLine(d.egreso); })
      .attr("r", function(d){ return 5; });
  
  
  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xLine))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  // Add the Y0 Axis
  svg.append("g")
    .call(d3.axisLeft(yingreso))
      .selectAll("text")
      .style("fill", "#8BC34A")
        
  var legend = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 18)
    .selectAll("g")
    .data(keys)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

  legend.append("rect")
    .attr("x", width - 124)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", z);

  legend.append("text")
    .attr("x", width - 100)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { console.log(d); return d; });

  // Add the Y1 Axis
  svg.append("g")
    .attr("transform", "translate( " + width + ", 0 )")
    .call(d3.axisRight(yLine))
      .selectAll("text")
      .style("fill", "#03A9F4")

});
