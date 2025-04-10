// Various formatters.
var formatNumber = d3.format(",d"),
  formatChange = d3.format("+,d"),
  formatDate = d3.time.format("%B %d, %Y"),
  formatTime = d3.time.format("%I:%M %p");

// data across years
var extant = [];

var width = 960,
    height = 500;

var rateById = d3.map(),
  popById = d3.map(),
  nameById = d3.map();


//for computing colors
var quantize = d3.scale.threshold()
    .domain([.0001, .2001, .4001, .7001])
    .range(d3.range(5).map(function(i) { return "hasColor q" + i + "-9"; }));
/*colors = ["#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"];
var colorScale = d3.scale.threshold()
    .domain([.0001, .2001, .4001, .7001])
    .range(colors);*/


var projection = d3.geo.albers()
  .center([0, 41.83])
  .rotate([87.65, 0])
  .parallels([40, 45])
  .scale(70000)
  .translate([width / 2, height / 2])
var path = d3.geo.path().projection(projection);


var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .direction('n')
  .html(function(d) {
    return nameById.get(d.id) + "<br/>Enrollment rate: " + (rateById.get(d.id)*100).toFixed(1) + "%" +
    "<br/>Number of students: " + popById.get(d.id) 
 });
    
svg.call(tip);

/*var legend = d3.select("#map-legend").
  append("svg:svg").
  attr("width", 160).
  attr("height", 10)
for (var i = 0; i <= 7; i++) {
  legend.append("svg:rect").
  attr("x", i*20).
  attr("height", 10).
  attr("width", 20).
  attr("class", "q" + i + "-9 ");//color
};*/

var nation = crossfilter(),
  all = nation.groupAll(),
  per_cap = nation.dimension(function(d) { return d.alg8; }),
  per_caps = per_cap.group(),
  size = nation.dimension(function(d) { return d.size; }),
  sizes = size.group();



///////////////
///  legend  //
///////////////
var legW = 0.13*width;
var legH = 0.39*height;
var radius = 4;
var circleOutline = 0.5; 
var nums = [0, 1, 2, 3, 4, 5];
var legLabels = ["None (0%)", 
                 "Limited (>0–20%)", "Moderate (>20–40%)", 
                 "High (>40–70%)", "Universal (>70–100%)", "No data"];

var legend = svg.append("g")
                .classed("legend", true)
                .attr("transform", "translate(" + (width-legW-250) + "," + (height-legH-200) + ")");

/*legend.append("rect")
      .attr("width", legW)
      .attr("height", legH);*/

legend.append("text")
      .attr("class", "title")
      .text("% of 8th Graders")
      .attr("x", 5)
      .attr("y", 15);
legend.append("text")
      .attr("class", "title")
      .text("Taking Algebra")
      .attr("x", 5)
      .attr("y", 30);

legend.selectAll(".labels")
      .data(nums)
      .enter().append("text")
      .attr("class", "label")
      .attr("x", 20)
      .attr("y", function(i) { return 20*i+45;})
      .text(function (i) { return legLabels[i]; });

legend.selectAll("circle.gradient")
      .data(nums)
      .enter().append("circle")
      .attr("class", "gradient")
      .attr("cx", 15)
      .attr("r", radius)
      .attr("class", function(i) {
        return "hasColor q" + i + "-9"; 
      })
      //.style("fill", function(i) { 
      //  if (i == 5) { return "#fff"; }
      //  return colors[i]; 
      //})
      .style("stroke-width", circleOutline)
      .style("stroke", "black")
      .attr("cy", function(i) { return 20*i+45; });

//add national averages
/*legend.append("text")
      .attr("class", "title")
      .text("National Average")
      .attr("x", 5)
      .attr("y", 175);
legend.append("text")
      .attr("class", "label")
      .attr("x", 20)
      .attr("y", 190)
      .text("25%");
legend.append("circle")
      .attr("class", "gradient")
      .attr("cx", 15)
      .attr("cy", 190)
      .attr("r", radius)
      .style("fill", colors[2])
      .style("stroke-width", circleOutline)
      .style("stroke", "black");*/
      


var agg = "county";
//queue().defer(d3.json, "county.json")
//       .defer(d3.csv, "map_" + agg + ".csv")
queue().defer(d3.json, "Chicago.json")
       .defer(d3.csv, "map_Chicago.csv")
       .await(ready);

function ready(error, shapes, data) {

  //process the data file
  data.forEach(function(d) {
    d.alg8 = +d.alg8;
    d.size = +d.size;
    d.id = +d.id;

    nation.add([d]);
    extant.push(d.id);
    rateById.set(d.id, d.alg8);
    popById.set(d.id, d.size);
    nameById.set(d.id, d.area);
  });


  //add to the SVG
    svg.insert("g", "#stateGrp")
      .attr("class", "counties")
    .selectAll("path")
      //.data(topojson.feature(shapes, shapes.objects.counties).features)
      .data(topojson.feature(shapes, shapes.objects.boundaries).features)
    .enter().append("path")
      .attr("class", function(d) { return quantize(rateById.get(d.id)); })
      .attr("id", function(d) { return d.id; })
      .attr("d", path)
      //.attr("d", d3.geo.path())
      .on('mouseover',tip.show)
      .on('mouseout', tip.hide);


  var charts = [
      
    barChart(false)
      .dimension(size)
      .group(sizes)
    .x(d3.scale.linear()
      .domain([0, 1000])
      .range([0, 900])),

    barChart(true)
      .dimension(per_cap)
      .group(per_caps)
    .x(d3.scale.linear()
      .domain([0, 1])
      .range([0, 900]))

  ];

  var chart = d3.selectAll(".chart")
    .data(charts)
    .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

  renderAll();

  // barChart
  function barChart(percent) {
    if (!barChart.id) barChart.id = 0;

    percent = typeof percent !== 'undefined' ? percent : false;
    //percent = false;
    var formatAsPercentage = d3.format(".0%");
    
    var axis = d3.svg.axis().orient("bottom");
    if (percent == true) {
      axis.tickFormat(formatAsPercentage);
    }

    var margin = {top: 10, right: 10, bottom: 20, left: 10},
      x,
      y = d3.scale.linear().range([50, 0]),
      id = barChart.id++,
      brush = d3.svg.brush(),
      brushDirty,
      dimension,
      group,
      round;

    function chart(div) {
      var width = x.range()[1],
          height = y.range()[0];

      try {
        y.domain([0, group.top(1)[0].value]);
      }
      catch(err) {
        window.reset
      } 

      div.each(function() {
        var div = d3.select(this),
            g = div.select("g");

        // Create the skeletal chart.
        if (g.empty()) {
          div.select(".title").append("a")
              .attr("href", "javascript:reset(" + id + ")")
              .attr("class", "reset")
              .text("reset")
              .style("display", "none");

          g = div.append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          g.append("clipPath")
              .attr("id", "clip-" + id)
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          g.selectAll(".bar")
              .data(["background", "foreground"])
            .enter().append("path")
              .attr("class", function(d) { return d + " bar"; })
              .datum(group.all());

          g.selectAll(".foreground.bar")
              .attr("clip-path", "url(#clip-" + id + ")");

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(axis);

          // Initialize the brush component with pretty resize handles.
          var gBrush = g.append("g").attr("class", "brush").call(brush);
          gBrush.selectAll("rect").attr("height", height);
          gBrush.selectAll(".resize").append("path").attr("d", resizePath);
        }

        // Only redraw the brush if set externally.
        if (brushDirty) {
          brushDirty = false;
          g.selectAll(".brush").call(brush);
          div.select(".title a").style("display", brush.empty() ? "none" : null);
          if (brush.empty()) {
            g.selectAll("#clip-" + id + " rect")
                .attr("x", 0)
                .attr("width", width);
          } else {
            var extent = brush.extent();
            g.selectAll("#clip-" + id + " rect")
                .attr("x", x(extent[0]))
                .attr("width", x(extent[1]) - x(extent[0]));
          }
        }

        g.selectAll(".bar").attr("d", barPath);
      });

      function barPath(groups) {
        var path = [],
            i = -1,
            n = groups.length,
            d;
        while (++i < n) {
          d = groups[i];
          path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
        }
        return path.join("");
      }

      function resizePath(d) {
        var e = +(d == "e"),
            x = e ? 1 : -1,
            y = height / 3;
        return "M" + (.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
      }
    }

    brush.on("brushstart.chart", function() {
      var div = d3.select(this.parentNode.parentNode.parentNode);
      div.select(".title a").style("display", null);
    });

    brush.on("brush.chart", function() {
      var g = d3.select(this.parentNode),
          extent = brush.extent();
      if (round) g.select(".brush")
          .call(brush.extent(extent = extent.map(round)))
        .selectAll(".resize")
          .style("display", null);
      g.select("#clip-" + id + " rect")
          .attr("x", x(extent[0]))
          .attr("width", x(extent[1]) - x(extent[0]));

      var selected = [];

      dimension.filterRange(extent).top(Infinity).forEach(function(d) {
        selected.push(d.id)
      });
      svg.attr("class", "counties")
        .selectAll("path")
          .attr("class", function(d) { if (selected.indexOf(d.id) >= 0) {return "q8-9"} else if (extant.indexOf(d.id) >= 0) {return "q5-9"} else {return null;}});

    });

    brush.on("brushend.chart", function() {
      if (brush.empty()) {
        var div = d3.select(this.parentNode.parentNode.parentNode);
        div.select(".title a").style("display", "none");
        div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
        dimension.filterAll();
      }
    });

    chart.margin = function(_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };

    chart.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      axis.scale(x);
      brush.x(x);
      return chart;
    };

    chart.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return chart;
    };

    chart.dimension = function(_) {
      if (!arguments.length) return dimension;
      dimension = _;
      return chart;
    };

    chart.filter = function(_) {
      if (_) {
        brush.extent(_);
        dimension.filterRange(_);
      } else {
        brush.clear();
        dimension.filterAll();
      }
      brushDirty = true;
      return chart;
    };

    chart.group = function(_) {
      if (!arguments.length) return group;
      group = _;
      return chart;
    };

    chart.round = function(_) {
      if (!arguments.length) return round;
      round = _;
      return chart;
    };

    return d3.rebind(chart, brush, "on");
  }

  // Renders the specified chart or list.
  function render(method) {
    d3.select(this).call(method);
  }

  // Whenever the brush moves, re-rendering everything.
  function renderAll() {
    chart.each(render);
  }

  window.filter = function(filters) {
    filters.forEach(function(d, i) { charts[i].filter(d); });
    renderAll();
  };

  window.reset = function(i) {
    charts.forEach(function (c) {
      c.filter(null);
    })
    renderAll();
    svg.attr("class", "counties")
      .selectAll("path")
        .attr("class", function(d) { return quantize(rateById.get(d.id)); });
  };

}