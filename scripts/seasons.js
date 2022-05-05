//script to build season donut chart with transition between fast and slow fashion
  var myDuration = 1200;
  var firstTime = true;

  var width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;

  var width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;
  // var color = d3.scaleOrdinal()
  var pie = d3.pie()
  .value(function(d) { return d.count; })
  .sort(null);

  var arc = d3.arc()
  .innerRadius(radius - 100)
  .outerRadius(radius - 20);

  var svg = d3.select("#fast-fashion").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//var color = d3.scaleOrdinal()
//.domain(keys)
//.range(["#A743AE","#6B40A9", "#E95585", "#EF804C", "#DDB842", "#CFCE4A", "#AFF066", "#83F372", "#64DBA6", "#4EB2D0", "#4787DD", "#5D54C4", "#6642AA"]);


  d3.tsv("./data/seasonsdata.tsv", type, function(error, data) {
    var regionsByFruit = d3.nest()
    .key(function(d) { return d.fruit; })
    .entries(data);


    var label = d3.select("form").selectAll("label")
    .data(regionsByFruit)
    .enter().append("label");

    var color = d3.scaleOrdinal()
    .domain(label)
    .range(["#A743AE","#6B40A9", "#E95585", "#EF804C", "#DDB842", "#CFCE4A", "#AFF066", "#83F372", "#64DBA6", "#4EB2D0", "#4787DD", "#5D54C4", "#6642AA"]);


    label.append("input")
    .attr("type", "radio")
    .attr("name", "fruit")
    .attr("value", function(d) { return d.key; })
    .attr("id", function(d){ return d.key})
    .on("change", change)
    .filter(function(d, i) { return !i; })
    .each(change)
    .property("checked", true);

    label.append("span")
    .text(function(d) { return d.key; });
    

    function change(region) {
      var path = svg.selectAll("path");
      var data0 = path.data(),
      data1 = pie(region.values);
      console.log("region", region);

      path = path.data(data1, key);

      path
      .transition()
      .duration(myDuration)
      .attrTween("d", arcTween)

      console.log("active change")
      path
      .enter()
      .append("path")
      .each(function(d, i) {
        var narc = findNeighborArc(i, data0, data1, key) ;
        if(narc) {          
          this._current = narc;
          this._previous = narc;
        } else {          
          this._current = d;
        }
      }) 
      .attr("fill", function(d,i) { 
       return color(d.data.region)
     })
      .transition()
      .duration(myDuration)
      .attrTween("d", arcTween)


      path
      .exit()
      .transition()
      .duration(myDuration)
      .attrTween("d", function(d, index) {

        var currentIndex = this._previous;
        var i = d3.interpolateObject(d,this._previous);
        return function(t) {
          return arc(i(t))
        }

      })
      .remove()


      firstTime = false;


    }
  });

  function key(d) {
    return d.data.region;
  }

  function type(d) {
    d.count = +d.count;
    return d;
  }

  function findNeighborArc(i, data0, data1, key) {
    var d;
    if(d = findPreceding(i, data0, data1, key)) {

      var obj = cloneObj(d)
      obj.startAngle = d.endAngle;
      return obj;

    } else if(d = findFollowing(i, data0, data1, key)) {

      var obj = cloneObj(d)
      obj.endAngle = d.startAngle;
      return obj;

    }

    return null


  }

// Find the element in data0 that joins the highest preceding element in data1.
function findPreceding(i, data0, data1, key) {
  var m = data0.length;
  while (--i >= 0) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

// Find the element in data0 that joins the lowest following element in data1.
function findFollowing(i, data0, data1, key) {
  var n = data1.length, m = data0.length;
  while (++i < n) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

function arcTween(d) {

  var i = d3.interpolate(this._current, d);

  this._current = i(0);

  return function(t) {
    return arc(i(t))
  }

}


function cloneObj(obj) {
  var o = {};
  for(var i in obj) {
    o[i] = obj[i];
  }
  return o;
}

// water js
  var water2=document.getElementById("water2");
  water2.style.transform='translate(0'+','+97+'%)';

  var water3=document.getElementById("water3");
  water3.style.transform='translate(0'+','+62+'%)';