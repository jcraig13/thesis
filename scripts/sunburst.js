// JSON data
var nodeData = {
    "name": "TOPICS", "children": [{
        "name": "natural",
        "children": [{"name": "cotton", "size": 24.4}, {"name": "other plant based", "size": 5.9}, {"name": "wool", "size" : 1}, {"name": "down", "size": 0.5},{"name": "silk", "size": 0.1} ]
    }, {
        "name": "synthetic",
        "children": [{"name": "polyester", "size": 52}, {"name": "polyamide", "size": 5}, {"name": "other acrylics", "size": 10.5}, {"name": "manmade cellulose", "size": 5.9}]
    }]
};



// Variables
var width = 650;
var height = 650;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

// Create primary <g> element
var g2 = d3.select('#material-graph')
    .append("svg")
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

// Data strucure
var partition = d3.partition()
    .size([2 * Math.PI, radius]);

// Find data root
var root = d3.hierarchy(nodeData)
    .sum(function (d) { return d.size});

// Size arcs
partition(root);
var arc = d3.arc()
    .startAngle(function (d) { return d.x0 })
    .endAngle(function (d) { return d.x1 })
    .innerRadius(function (d) { return d.y0 })
    .outerRadius(function (d) { return d.y1 });

// Put it all together
g2.selectAll('path')
    .data(root.descendants())
    .enter().append('path')
    .attr("display", function (d) { return d.depth ? null : "none"; })
    .attr("d", arc)
    .style('stroke', '#fff')
    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });