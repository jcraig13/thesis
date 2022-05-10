// set the dimensions and margins of the graph
var margin = {top: 30, right: 90, bottom: 0, left: 80},
width = 900 - margin.left - margin.right,
height = 850 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#stream-graph")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("./data/productioncountries.csv", function(data) {

// List of groups = header of the csv files
var keys = data.columns.slice(1)

// Add X axis
var x = d3.scaleLinear()
.domain(d3.extent(data, function(d) { return d.category; }))
.range([ 0, width ]);
svg2.append("g")
.attr("transform", "translate(0," + height*0.85 + ")")
.call(d3.axisBottom(x).tickSize(-height*.7).tickValues([1, 2, 3, 4, 5]))
.select(".domain").remove()
// Customization

svg2.select("g").selectAll("text").remove()
svg2.selectAll(".tick line").attr("stroke", "#b8b8b8").attr("z-index", "2")

// Add X axis label:
svg2.append("text")
  .attr("text-anchor", "end")
  .attr("x", width)
  .attr("y", height-30 )
  .text("Production Category");

svg2.append("text")
  .attr("text-anchor", "end")
  .attr("x", 80)
  .attr("y", height-105 )
  .text("Fiber Production");

svg2.append("text")
  .attr("text-anchor", "end")
  .attr("x", 255)
  .attr("y", height-105 )
  .text("Yarn Production");

svg2.append("text")
  .attr("text-anchor", "end")
  .attr("x", 433)
  .attr("y", height-105 )
  .text("Fabric Production");

  svg2.append("text")
  .attr("text-anchor", "end")
  .attr("x", 620)
  .attr("y", height-105 )
  .text("Dyeing & Finishing");

  svg2.append("text")
  .attr("text-anchor", "end")
  .attr("x", 770)
  .attr("y", height-105 )
  .text("Assembly");

  //add text labels
  svg2.append("text")
  .attr("x", 731)
  .attr("y", height-305 )
  .text("- China");

  svg2.append("text")
  .attr("x", 731)
  .attr("y", 250 )
  .text("- Rest of the");

  svg2.append("text")
  .attr("x", 739)
  .attr("y", 270)
  .text("World");

  svg2.append("text")
  .attr("x", 731)
  .attr("y", 355 )
  .text("- Vietnam");

  svg2.append("text")
  .attr("x", 731)
  .attr("y", 372 )
  .text("- Turkey");

  svg2.append("text")
  .attr("x", 731)
  .attr("y", 389 )
  .text("- India");

  svg2.append("text")
  .attr("x", 731)
  .attr("y", 425 )
  .text("- EU");

  svg2.append("text")
  .attr("x", 731)
  .attr("y", 605 )
  .text("- Bangledesh");

  svg2.append("text")
  .attr("x", -35)
  .attr("y", 277 )
  .text("USA -");

  svg2.append("text")
  .attr("x", -62)
  .attr("y", 289 )
  .text("Pakistan -");

  svg2.append("text")
  .attr("x", -42)
  .attr("y", 614 )
  .text("Brazil -");

  svg2.append("text")
  .attr("x", 160)
  .attr("y", 59 )
  .style("font-size", "30px")
  .text("Geographic manufacturing distribution");

  svg2.append("text")
  .attr("x", 236)
  .attr("y", 94 )
  .style("font-size", "30px")
  .text("grouped by process stage");

// Add Y axis
var y = d3.scaleLinear()
.domain([-100, 100])
.range([ height, 0 ]);

// color palette
var color = d3.scaleOrdinal()
.domain(keys)
.range(["#A743AE","#6B40A9", "#E95585", "#EF804C", "#DDB842", "#CFCE4A", "#AFF066", "#83F372", "#64DBA6", "#4EB2D0", "#4787DD", "#5D54C4", "#6642AA"]);

//stack the data?
var stackedData = d3.stack()
.offset(d3.stackOffsetSilhouette)
.keys(keys)
(data)

// document.addEventListener('mousemove', (event) => {
// 	// console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
//   var mouseX = event.clientX;
//   var mouseY = event.clientY;
// });

// Area generator
var area = d3.area()
.x(function(d) { return x(d.data.category); })
.y0(function(d) { return y(d[0]); })
.y1(function(d) { return y(d[1]); })

// create a tooltip
var Tooltip = svg2
.append("text")
.attr("x", 0)
.attr("y", 0)
.attr("class", "tip")
.style("opacity", 0)
.style("font-size", 17)


// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
Tooltip.style("opacity", 1)
d3.selectAll(".myArea").style("opacity", .2)
d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
  .style("zIndex", 1)
}
var mousemove = function(d,i) {
// grp = keys[i]
// Tooltip.text(grp)
// Tooltip.attr("x", (d3.event.pageX))
// .attr("y", (d3.event.pageY -  4000))
console.log( d3.event.pageX, d3.event.pageY )
}
var mouseleave = function(d) {
Tooltip.style("opacity", 0)
d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
}




// Show the areas
svg2
.selectAll("mylayers")
.data(stackedData)
.enter()
.append("path")
  .attr("class", "myArea")
  .style("fill", function(d) { return color(d.key); })
  .attr("d", area)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)

})