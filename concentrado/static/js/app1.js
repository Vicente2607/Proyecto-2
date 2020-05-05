
// create the svg 
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 80, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.000Z");
// // set x scale
var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

// set y scale
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// // set the colors
var z = d3.scaleOrdinal() 
        .range(["#009fff", "#d0743c", "#118000" , "#7b6888"])



d3.json("http://127.0.0.1:5000/api/v1.0/pp", function(data) {

  var d = data.data;

  d.forEach(d => {
    console.log(d);
    d.total = d.ingreso + d.egreso;
    return d;
  })

  // Define SVG area dimensions
  var svgWidth = 960;
  var svgHeight = 500;

  // Define the chart's margins as an object
  var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 100
  };

  // Define dimensions of the chart area
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;
    
  var keys = data.schema.fields.slice(1,3).map(f => f.name);
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(d, data => parseTime(data.fecha)))
    .range([0, chartWidth]);
  var formatTime = d3.timeFormat("%d/%m/%Y");

  d.sort(function(a, b) { return b.total - a.total; });
  x.domain(d.map(function(d) { return formatTime(parseTime(d.fecha)); }));
  y.domain([0, d3.max(d, function(d) { return d.total; })]).nice();
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(d))
    .enter().append("g")
    .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d) { return x(formatTime(parseTime(d.data.fecha))); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { var v = y(d[0]) - y(d[1]); return v > 0 ? v : -v ; })
    .attr("width", x.bandwidth())
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] - 5;
      var yPosition = d3.mouse(this)[1] - 5;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d[1]-d[0]);
    });

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks().pop()) + 0.5)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start");

  var legend = g.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 20)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

  legend.append("rect")
    .attr("x", width - 19)
    .attr("width", 29)
    .attr("height", 29)
    .attr("fill", z);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });
});

var marginl = {top: 20, right: 20, bottom: 30, left: 50},
    widthl = 960 - marginl.left - marginl.right,
    heightl = 500 - marginl.top - marginl.bottom;
// Append a group area, then set its margins
// set the ranges
var xl = d3.scaleTime().range([0, widthl]);
var yl = d3.scaleLinear().range([0, heightl]);
// define the line
var valueline = d3.line()
  .x(function(d) { return xl(d.fecha); })
  .y(function(d) { return yl(d.saldo); });
var svgl = d3.select("body").append("svg")
  .attr("width", widthl + marginl.left + marginl.right)
  .attr("height", height + marginl.top + marginl.bottom)
  .append("g")
  .attr("transform", "translate(" + (marginl.left + 10) + "," + (marginl.top) + ")");
// Define dimensions of the chart area
var chartWidth = widthl - marginl.left - marginl.right;
var chartHeight = heightl - marginl.top - marginl.bottom;
// parseTime = d3.timeParse("%d/%m/%y");

d3.json("http://127.0.0.1:5000/api/v1.0/pp", function(result) {
  var data = result.data;

  // format the data
  data.forEach(function(d) {
      d.fecha = parseTime(d.fecha);
      d.saldo = +d.saldo;
  });

  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.fecha))
    .range([0, chartWidth]);
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.saldo)])
    .range([chartHeight, 0]);
  
  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Scale the range of the data
  xl.domain(d3.extent(data, function(d) { return d.fecha; })).nice();
  
  yl.domain(d3.extent(data, function(d) { return d.saldo; })).nice();

  var drawLine = d3.line()
    .x(data => xTimeScale(data.fecha))
    .y(data => yLinearScale(data.saldo));

  // Add the valueline path.
  svgl.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", drawLine);

  // Add the X Axis
  svgl.append("g")
    .call(leftAxis);

  // Add the Y Axis
  svgl.append("g")
    .attr("transform", "translate(0," + heightl + ")")
    .call(bottomAxis);

});
    
  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
