var baseURL = "//d-miller.github.io/alg8/a3902/";

//detect if using Internet Explorer
//https://jsfiddle.net/alvaroAV/svvz7tkn/
var IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1;
  
/////////////////////////////////////////////////////////
// USE D3 and CROSSFILTER FOR THE FILTERING HISTOGRAMS //
/////////////////////////////////////////////////////////

//define in a global context so it can be accessed across code sections
var dotPlotResetStudentN;

//wrap all code inside a function to control namespace
//and prevent accidental overwriting of other JS code
(function() {

  //add event listeners to the collapsible content div holders for the charts
  var coll = document.getElementsByClassName("collapsible");
  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }

  //Internet Explorer doesn't support Math.log10, so define it here if not already done so
  Math.log10 = Math.log10 || function(x) {
    return Math.log(x) * Math.LOG10E;
  };  

  //for some reason, can't adjust the scale to anything different than d3.scale.linear(), so instead
  //create a hack by simply changing the input variables and tick format - more cumbersome, but
  //can't currently figure out how to change the scale, so this works for now
  var pwr10 = function(d) { return d3.format(",")( (d < 1) ? d*10 : Math.pow(10, d)); };
  var logC = function(x) { return (x < 10) ? x/10 : Math.log10(x)}

  //automate adding different variables
  var w = 310;
  //var w2 = 285;
  var w2 = w;
  var binI = 10;
  var binW = binI*.9;
  //height of each chart
  var height = 50;
  var margin = {top: 10, right: 10, bottom: 20, left: 10};
  
  var histograms = [
    {varName: "WB_enroll",   min: -70, max: 70, width: w, title: "White-Black Enrollment Gap"},
    {varName: "WH_enroll",   min: -70, max: 70, width: w, title: "White-Hispanic Enrollment Gap"},
    {varName: "WB_access", min: -70, max: 70, width: w, title: "White-Black Access Gap"},
    {varName: "WH_access", min: -70, max: 70, width: w, title: "White-Hispanic Access Gap"},
    //{varName: "BL08_log", min: 0, max: 10000, width: w, title: "Number of Black 8th Graders"},
    //{varName: "WH08_log", 100, min: 0, max: 10000, width: w, title: "Number of White 8th Graders"},
    {varName: "BL08_log", min: 0, max: 4.8, width: w, title: "Black Students", tickFormat: pwr10},
    {varName: "HI08_log", min: 0, max: 4.8, width: w, title: "Hispanic Students", tickFormat: pwr10},
    {varName: "WH08_log", min: 0, max: 4.8, width: w, title: "White Students", tickFormat: pwr10},
    {varName: "G08_log", min: 0, max: 4.8, width: w, title: "Total Number", tickFormat: pwr10},
    {varName: "BL_perc", min: 0, max: 100, width: w2, title: "Black Students (%)"},
    {varName: "HI_perc", min: 0, max: 100, width: w2, title: "Hispanic Students (%)"},
    {varName: "WH_perc", min: 0, max: 100, width: w2, title: "White Students (%)"},
    //{divID: "3", name: "BL08", interval: 100, min:0, max: 10000, width: 400, title: "Number of Black 8th Graders"},
    //{name: "WB_access", interval: 1, min: -70, max: 70, width: 210, title: "White-Black Access Gap"},
  ]




//load district-level data
d3.csv(baseURL + 'data/table_all.csv', function(data) {

  // A little coercion, since the CSV is untyped.
  // todo: update how stats based on < 10 students is handled
  data.forEach(function(d) {

    //address the gaps first
    d.WB_enroll = (+d.WH08_alg_p - +d.BL08_alg_p)*100;
    d.WH_enroll = (+d.WH08_alg_p - +d.HI08_alg_p)*100;
    d.WB_access = (+d.WH08_access_p - +d.BL08_access_p)*100;
    d.WH_access = (+d.WH08_access_p - +d.HI08_access_p)*100;
    d.WB_enroll_ratio = +d.WH08_alg_p / +d.BL08_alg_p;
    d.WH_enroll_ratio = +d.WH08_alg_p / +d.HI08_alg_p;
    d.WB_access_ratio = +d.WH08_access_p / +d.BL08_access_p;
    d.WH_access_ratio = +d.WH08_access_p / +d.HI08_access_p;

    /*d.WB_suppress = (+d.WH08 < 10) || (+d.BL08 >= 10);
    d.WH_suppress = (+d.WH08 < 10) || (+d.HI08 >= 10);
    d.WB_diff = d.WB_suppress ? null : (+d.WH08_alg_p - +d.BL08_alg_p)*100;
    d.WH_diff = d.WB_suppress ? null : (+d.WH08_alg_p - +d.HI08_alg_p)*100;
    d.WB_access = d.WB_suppress ? null : (+d.WH08_access_p - +d.BL08_access_p)*100;
    d.WH_access = d.WB_suppress ? null : (+d.WH08_access_p - +d.HI08_access_p)*100;*/

    //then individual percentages
    d.BL_perc = 100 * (+d.BL08 / +d.G08);
    d.HI_perc = 100 * (+d.HI08 / +d.G08);
    d.WH_perc = 100 * (+d.WH08 / +d.G08);

    //get the state name 
    d.state = d.name.slice(-2);

    //then sample sizes
    d.BL08_log = logC(+d.BL08);
    d.HI08_log = logC(+d.HI08);
    d.WH08_log = logC(+d.WH08);
    d.G08_log = logC(+d.G08);

    //get the enrollment rates for schools that offer it
    d.WH08_alg_p_adj = (+d.WH08_alg_p / +d.WH08_access_p);
    d.BL08_alg_p_adj = (+d.BL08_alg_p / +d.BL08_access_p);
    d.HI08_alg_p_adj = (+d.HI08_alg_p / +d.HI08_access_p);
    d.const1 = 1;
  });

  //create the histograms
  createCharts(data, histograms, "#charts");
});


//takes three arguments
//adapted from: http://square.github.io/crossfilter/
//    data: what data should be used?
//    chartSettings: what charts should be made?
var cf, G08_dim;
function createCharts(data, chartSettings) {

  // number formatter 
  var formatNumber = d3.format(",d");

  // Create the crossfilter for the relevant dimensions and groups.
  cf = crossfilter(data);
  const all = cf.groupAll();
  G08_dim = cf.dimension(function(d) { return +d.G08; });
  st_dim = cf.dimension(function(d) { return d.state; });

  //create array of charts
  const charts = [];
  var varIndex = {};
  for (var i = 0; i < chartSettings.length; i++) { 

    //var s has the information for this particular chart
    var s = chartSettings[i];

    //allows getting the chart index position based on the variable name
    varIndex[s.varName] = i;

    //determine the interval based on the width bins
    var interval =  (s.max - s.min) * (binI / s.width);

    //get other information to create the chart
    var dimFunc = function(d) {
      return Math.max(s.min + 0.5*interval, Math.min(s.max-0.5*interval, +d[s.varName]));
    }
    var groupFunc = function(d) {
      return Math.floor(d/interval) * interval;
    }
    var dim = cf.dimension(dimFunc);
    var group = dim.group(groupFunc);
    var xScale = d3.scale.linear().domain([s.min, s.max]).rangeRound([0, s.width]);

    //create the new chart
    var newChart = barChart()
                    .dimension(dim)
                    .group(group)
                    .x(xScale)


    //(optional) add custom tick format
    if (typeof s.tickFormat !== "undefined") newChart.tickFormat(s.tickFormat);

    //store its variable name (needed for data binding)
    newChart.varName = s.varName;

    //add the chart to the array of charts, add dimension to object of dimensions
    charts.push(newChart);

    //add title and bind the settings data
    d3.select("#" + s.varName + ".chart")
      .datum(s)
      .append("div").attr("class", "title")
      .html(s.title);
  }

  // Given our array of charts, bind the charts to the DOM and render them.
  // We also listen to the chart's brush events to update the display.
  var chart = d3.selectAll(".chart")
      .data(charts, function(d) { return d.varName; })
      .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

  window.filter = function(varName, filter, rerender) {
    charts[varIndex[varName]].filter(filter);
    if (rerender) renderAll();
  };

  //filter by state
  d3.select("#stateDotPlot").on("change", function() {
    var st = this.value;
    if (st === "all") {
      st_dim.filterAll();
      d3.select("#dotTitle").html("Top 100 Largest Districts");
    } else {
      st_dim.filter(st);
      d3.select("#dotTitle").html("Top 100 Largest Districts in " + this.selectedOptions[0].innerHTML);
    }
    renderAll();
  });

  //filters based on at least a minimum size per group 
  //(e.g., at least 10 Black and 10 White students)
  dotPlotResetStudentN = function(n, mGrp) {

    //accessing the max histogram value is a bit hack-ish right now but works
    filter(mGrp + "08_log", [logC(n), histograms[varIndex[mGrp + "08_log"]].max], false);
    filter("WH08_log", [logC(n), histograms[varIndex["WH08_log"]].max], false);

    //reset the other minority group filter
    var otherGrp = (mGrp === "BL") ? "HI" : "BL";
    filter(otherGrp + "08_log", [logC(0), histograms[varIndex[mGrp + "08_log"]].max], false);
    renderAll();
  }

  //preselect on at least 50 students in each group
  filter("BL08_log", [logC(50), histograms[varIndex["BL08_log"]].max], false);
  filter("WH08_log", [logC(50), histograms[varIndex["WH08_log"]].max], false);
  //filter("BL08_log", [logC(10), histograms[varIndex["BL08_log"]].max], false);

  //filter based on racial demographics dropdown
  dotPlotFilterDemograhics = function(selection, mGrp) {

    //reset the other minority group filter
    var otherGrp = (mGrp === "BL") ? "HI" : "BL";
    filter(otherGrp + "_perc", [0, 100], false);

    //if no restriction...
    filter("WH_perc", [0, 100], false);
    filter(mGrp + "_perc", [0, 100], false);

    //if filter based on %Black or %Hispanic...
    if (selection === "majorM" || selection === "predomM") {
      filter("WH_perc", [0, 100], false);
      var minlim = (selection === "majorM") ? 50 : 75;
      filter(mGrp + "_perc", [minlim, 100], false);
    }

    //if filter based on %White...
    if (selection === "majorW" || selection === "predomW") {
      filter(mGrp + "_perc", [0, 100], false);
      var minlim = (selection === "majorW") ? 50 : 75;
      filter("WH_perc", [minlim, 100], false);
    }

    //update dot plot
    renderAll();
  }

  //if the racial demographic drop-down changes...
  d3.select("#dotPlotRacialDemo").on("change", function() {

    //determine the active minority group and change the settings
    var mGrp = d3.select("#dotPlot g.legend rect.active").attr("value");
    dotPlotFilterDemograhics(this.value, mGrp);
  });


  //filter by at least 10 white students
  cf.dimension(function(d) { return +d.WH08; }).filterRange([10, 1e6]);

  //preselect also based on top 100 largest districts
  //var top100min = d3.min(G08_dim.top(100), function(d) { return d.G08_log; });
  //filter("G08_log", [top100min, histograms[varIndex["WH08_log"]].max], false);

  //render everything (and total)
  renderAll();
  d3.selectAll("#total")
      .text(formatNumber(cf.size()));

  // Renders the specified chart or list.
  function render(method) {
    d3.select(this).call(method);
  }


  //updating the dot plot is processor-heavy, so we want to update
  //sparingly. Hence, update if no new updates within the last 100 ms
  var lastUpdate = new Date().getTime();
  function sendData() {
    lastUpdate = new Date().getTime();
    setTimeout(function() {
      var currTime = new Date().getTime();
      if ((currTime - lastUpdate) > 95) {
        updateDotplot(G08_dim.top(100));
      }
    }, 100);
  }

  // Whenever the brush moves, re-render everything
  function renderAll() {
    chart.each(render);
    d3.select("#active").text(formatNumber(all.value()));
    sendData();
  }

  window.reset = function(i) {
    charts[i].filter(null);
    renderAll();
  };

  function barChart() {
    if (!barChart.id) barChart.id = 0;

    var x,
        tickFormat,
        y = d3.scale.linear().range([height, 0]),
        id = barChart.id++,
        axis = d3.svg.axis().orient("bottom").ticks(5),
        brush = d3.svg.brush(),
        brushDirty,
        dimension,
        group,
        round;

    function chart(div) {

      var width = x.range()[1];//,
      y.domain([0, group.top(1)[0].value]);

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
          path.push("M", x(d.key), ",", height, "V", y(d.value), "h" + binW + "V", height);
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
      dimension.filterRange(extent);
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

    chart.tickFormat = function(_) {
      if (!arguments.length) return tickFormat;
      tickFormat = _;
      axis.tickFormat(tickFormat);
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
}

})(); //ends the function wrapper for the entire code


/////////////////////////////
// USE D3 FOR THE DOT PLOT //
/////////////////////////////

//declare this function in a global context so that
//other parts of JS code can access it
var updateDotplot;

//wrap all code inside a function to control namespace
//and prevent accidental overwriting of other JS code
(function() {

///////////////////////////
//  PLOTTING PARAMETERS  //
///////////////////////////

//positioning settings
var width = 900;
var vertSpace = 20;
var height = 101.5*vertSpace;
var pad = { left: 10, right: 0, top: 110, bottom: 0 };
var xName = 20;

var rectW = 80;
var rectH = 35;
var yHeader = 20;

var panelW = 200;

//define scales
var xScale = d3.scale.linear().domain([0,1]).range([0, panelW]); 

var padGraph1 = 302;
var padGraph2 = 533;

//create container elements
/*var svg = d3.select(".top100").append("svg")
            .attr("width", width + pad.left + pad.right)
            .attr("height", height + pad.top + pad.bottom);*/

var w = width + pad.left + pad.right;
var h = height + pad.top + pad.bottom;
var svg = d3.select('.top100').append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 ' + w + ' ' + h)
    //.attr('preserveAspectRatio','xMinYMin')
    //.append("g")
    //.attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

//colors to for different groups 
//(BL = Black, WH = White, HI = Hispanic)
var grpColors = {
	BL: "#56B4E9",
	WH: "#999999",
	HI: "#E69F00"
}

//create content SVG group
var g = svg.append("g").attr("transform", "translate(" + pad.left + ", " + pad.top + ")");

//general function to update the hover class
function updateHover(selection, hovered) {
  d3.select(selection).classed("hover", hovered);
}

///////////////
//  HEADERS  //
///////////////

//event handlers & attribute properties
var updateEnroll = function() { updateRank("enroll"); };
var updateAccess = function() { updateRank("access"); };
//var tileAttr = 

//create header (background) tiles
//var tileW = 200;
var tileW = panelW;
var headerTiles = svg.append("g").attr("class", "headerTile").attr("transform", "translate(" + pad.left + ",2)");
var activeTile = headerTiles.append("rect").attr({x: padGraph1+panelW/2-tileW/2, y: 0, height: 55, width: tileW, class: "enroll active", value: "enroll"});
headerTiles.append("rect").attr({x: padGraph2+panelW/2-tileW/2, y: 0, width: tileW, height: 55, class: "access", value: "access"});

//create header text
var header = svg.append("g").attr("class", "header").attr("transform", "translate(" + pad.left + "," + yHeader + ")");
header.append("text").text("Enrollment Gap").attr("x", padGraph1+panelW/2).attr("class", "enroll");
header.append("text").text("Access Gap").attr("x", padGraph2+panelW/2).attr("class", "access");

//add text about ranking and re-ranking
var enrollRankText = header.append("text").text("(Ranked)").attr("x", padGraph1+panelW/2).attr("y", 20).attr("class", "rerankText enroll");
var accessRankText = header.append("text").text("(Click here to rerank)").attr("x", padGraph2+panelW/2).attr("y", 20).attr("class", "rerankText access");

//custom event handlers
function enrollHover()   { updateHover(".headerTile .enroll", true);  }
function enrollUnhover() { updateHover(".headerTile .enroll", false); }
function accessHover()   { updateHover(".headerTile .access", true);  }
function accessUnhover() { updateHover(".headerTile .access", false); }

//add event handlers
headerTiles.selectAll(".enroll").on("click", updateEnroll).on("mouseover", enrollHover).on("mouseout", enrollUnhover);
headerTiles.selectAll(".access").on("click", updateAccess).on("mouseover", accessHover).on("mouseout", accessUnhover);
header.selectAll(".enroll").on("click", updateEnroll).on("mouseover", enrollHover).on("mouseout", enrollUnhover);
header.selectAll(".access").on("click", updateAccess).on("mouseover", accessHover).on("mouseout", accessUnhover);

//use pointer cursor to suggest clickability
header.selectAll("text").style("cursor", "pointer");

//add axis border lines
g.append("line").attr({ x1: padGraph1, x2: padGraph1, y1: -10, y2: height}).attr("class", "axisBorder");
g.append("line").attr({ x1: padGraph1+panelW, x2: padGraph1+panelW, y1: -10, y2: height}).attr("class", "axisBorder");
g.append("line").attr({ x1: padGraph2, x2: padGraph2, y1: -10, y2: height}).attr("class", "axisBorder");
g.append("line").attr({ x1: padGraph2+panelW, x2: padGraph2+panelW, y1: -10, y2: height}).attr("class", "axisBorder");

//Create the axis
var xAxis = d3.svg.axis()
			  .scale(xScale)
			  .tickValues([0,1])
			  .outerTickSize(4)
			  .innerTickSize(4)
			  .tickPadding(8)
			  .orient("top")
			  .tickFormat(d3.format("%"));

//add the x axis to the SVG
g.append("g").attr("transform", "translate(" + padGraph1 + ",-3)")
             .attr("class", "axis")
             .call(xAxis);
g.append("g").attr("transform", "translate(" + padGraph2 + ",-3)")
             .attr("class", "axis")
             .call(xAxis);

//add axis titles
g.append("text").attr("x", padGraph1 + panelW/2).attr("y", -30).text("Enrolled in Grade 8 Algebra")
g.append("text").attr("x", padGraph2 + panelW/2).attr("y", -30).text("Has Access to Early Algebra")

////////////
// LEGEND //
////////////

//add a legend
var xLegendGap = 100
var legend = g.append("g").attr("class", "legend").attr("transform", "translate(105,-85)");
var updateBL = function() { updateGap("BL"); };
var updateHI = function() { updateGap("HI"); };

var boxH = 30;
legend.append("rect")
	.attr({x: -15, y: -boxH/2, width: xLegendGap+70, height: boxH})
	.attr("stroke", "#333")
	.attr("stroke-width", ".75")
  .attr("class", "BL")
	.attr("value", "BL")
  .classed("active", true);
legend.append("circle")
	.attr("r", 5)
  .attr("class", "BL")  
	.style("fill", grpColors["BL"]);
legend.append("circle")
	.attr("cx", xLegendGap)
  .attr("class", "BL")
	.attr("r", 5)
	.style("fill", grpColors["WH"]);
legend.append("text")
	.text("Black")
  .attr("class", "BL")
	.attr("x", 8);
legend.append("text")
	.text("White")
  .attr("class", "BL")
	.attr("x", xLegendGap+8);

var yLegendGap = 36;
legend.append("rect")
	.attr({x: -15, y: -boxH/2+yLegendGap, width: xLegendGap+70, height: boxH})
	.attr("value", "HI")
  .attr("class", "HI");
legend.append("circle")
	.attr("cy", yLegendGap)
  .attr("class", "HI")
	.attr("r", 5)
	.style("fill", grpColors["HI"]);
legend.append("circle")
	.attr("cx", xLegendGap)
	.attr("cy", yLegendGap)
  .attr("class", "HI")
	.attr("r", 5)
	.style("fill", grpColors["WH"]);
legend.append("text")
	.text("Hispanic")
  .attr("class", "HI")
	.attr("x", 8)
	.attr("y", yLegendGap);
legend.append("text")
	.text("White")
  .attr("class", "HI")
	.attr("x", xLegendGap+8)
	.attr("y", yLegendGap);

//custom event handlers
function BL_hoverGap()   { updateHover(".legend rect.BL", true);  }
function BL_unhoverGap() { updateHover(".legend rect.BL", false); }
function HI_hoverGap()   { updateHover(".legend rect.HI", true);  }
function HI_unhoverGap() { updateHover(".legend rect.HI", false); }

//add event handlers
legend.selectAll(".BL").on("click", updateBL).on("mouseover", BL_hoverGap).on("mouseout", BL_unhoverGap);
legend.selectAll(".HI").on("click", updateHI).on("mouseover", HI_hoverGap).on("mouseout", HI_unhoverGap);

//add legend title
legend.append("text").text("Select gap:").attr("x", -108).attr("y", 15).attr("class", "title");

//add text indicating numbers of students (x position will be set later)
var mSize = g.append("text").attr("y", vertSpace*(-.3)).attr("class", "size");
var wSize = g.append("text").attr("y", vertSpace*(0.3)).attr("class", "size");

///////////////////////////////
// RESPONSIVE DOT PLOT WIDTH //
///////////////////////////////

//hide the size text if the window width is too small (e.g., on mobile devices,
//we need as much width as possible)
var showTextWW = 500;
function showSizeText() {

  //need to resize the SVG, but need to know the current view box
  var box = svg.attr('viewBox').split(" ");
  
  //hide text and SVG x viewport for small window widths
  if (window.innerWidth < showTextWW) {
    g.selectAll("text.size").style("opacity", 0);
    box[2] = w-130;
    svg.attr('viewBox', box.join(" "));
  }

  //default for large window widths
  if (window.innerWidth >= showTextWW) {
    g.selectAll("text.size").style("opacity", 1);
    box[2] = w;
    svg.attr('viewBox', box.join(" "));
  }
}
showSizeText();

//annoying - IE needs me to also explicitly set the height 
//of the container height or else it will set it to 150px
function setDotDivH() {
  if (IE) {
    var dotP = d3.select("#dotPlot");
    var box = svg.attr('viewBox').split(" ");
    var dotW = dotP.style("width").slice(0,-2);
    var dotH = dotW * box[3] / box[2];
    dotP.style("height", dotH + "px");
  }
}

//allow the dot plot to be wide than the parent container div,
//but not larger than the window size
var maxW = 910;
function resizeDotplot() {

  //get the width of the parent div and window width
  var dotP = d3.select("#dotPlot");
  var parentDiv = dotP.node().parentNode;
  var pW = +d3.select(parentDiv).style("width").slice(0,-2);
  var ww = window.innerWidth;

  //margin = one half of the extra space beyond parent width
  var avail = (ww-pW)/2 + pW;
  var dotW = (avail > maxW) ? maxW : avail;
  dotP.style("width", dotW + "px");

  //annoying - IE needs me to also explicitly set the height 
  //of the container height or else it will set it to 150px
  setDotDivH();
}
resizeDotplot();

//add an event listener for resizing the dot plot based on 
//resizig the window
var oldFunc = d3.select(window).on('resize');
d3.select(window).on('resize', function() {
  oldFunc();
  showSizeText();;
  resizeDotplot();
});

///////////////////////////////////
//  FUNCTIONS FOR UPDATING DATA  //
///////////////////////////////////

//update the dataset that is displayed (public function)
updateDotplot = function(newData) {

	//reassign the global data
	//make sure data it's sorted alphabetically (breaks ties)
	data = newData
  data.sort(function(a, b){return 2*(a.name > b.name)-1;});

  //resize the SVG container
	//svg.attr("height", pad.top + vertSpace*(data.length + 1.5));
  var h = pad.top + vertSpace*(data.length + 1.5);
  var box = svg.attr('viewBox').split(" ");
  box[3] = h;
  svg.attr('viewBox',box.join(" "));
  setDotDivH();

	//rebind the data to the district rows
	var rows = g.selectAll("g.row.district")
				      .data(data, function(d) { return +d.id; });

  //make sure if there's matching elements, they aren't marked as exits
  rows.classed("tempExit", false);

	//grab the data for the enter selection data
	//this seems like a overly complicated way to do this, but I couldn't
	//easily find another way to do this. Usually, new SVG elements are appended
	//but I don't like that approach because SVG elements are needlessly removed 
	//and added. Instead simply bind the enter data to the exit DOM elements
	var enterDOM = rows.enter().append("g").attr("class", "tempEnter");
	var enterData = g.selectAll("g.tempEnter").data();
	enterDOM.remove();

	//bind the enter data to the exit DOM elements (again, seems hack-ish, but works)
	var exitRows = rows.exit().classed("tempExit", true);
	var newRows = g.selectAll("g.tempExit").data(enterData).classed("tempExit", false);

	//move the exit() selection off the SVG
	var delay = 500;
	exitRows.transition().duration(delay)
		.attr("transform", function(d) { return "translate(0," + (h + vertSpace) + ")"; });

	//after the exit() selection has moved off the SVG...
	setTimeout(function() {
		newRows.each(updateRow);
		updateRank(null, delay);
	}, delay);

	//this commented out code is more elegant but runs slower due to removing and 
	//adding SVG elements (rather than just updating them)
	/*rows.enter()
		.append("g")
		.attr("class", "row district")
		.attr("transform", function(d) { return "translate(0," + (+svg.attr("height") + vertSpace) + ")"; })
		.each(drawRow);

	//then update the ranks
	//brings the new rows into the container
	updateRank();

	//move the exit() selection off the SVG, then remove those DOM elements
	rows.exit()
		.transition().duration(1500)
		.attr("transform", function(d) { return "translate(0," + (+svg.attr("height") + vertSpace) + ")"; })
		.remove();*/
}

///////////////////////////////
//  FUNCTIONS FOR RERANKING  //
///////////////////////////////

//helper function that takes a dataset, variable name, and updates the ranks
function newRanks(data, varName) {

	//get the ranks
	var sorted = data.slice().sort(function(a,b){return b[varName]-a[varName]})
	var ranks = data.slice().map(function(v){ return sorted.indexOf(v)+1 });

	//most of the below code is to handle ties in the numeric rank text
	var textRanks = d3.selectAll("text.rank")[0];
	var currRank = 1;
	for (var i = 0; i < ranks.length; i++) {

		//update the rank variable in the original data
		data[i].rank = ranks[i];

		//skip first iteration because first numeric rank should always be 1
		if (i == 0) continue;

		//update the current rank if current value is different from the last
		if (sorted[i][varName] !== sorted[i-1][varName]) currRank = i + 1;

		//update the text
		d3.select(textRanks[i]).text(currRank + ".");
	}
}

//functions to sort by the risk ratio or risk difference
var rankRatio = false;
d3.select("#dotPlotRankMetric").on("change", function() {
  rankRatio = this.value === "ratio";
  updateRank();
});


//event handlers for reranking the districts
var rankedVar = "WB_enroll";
updateRank = function(varName, delay) {

	//if no update, update by the active tile (could happen after changing the gap)aa
	if (typeof varName === "undefined" || varName == null) varName = activeTile.attr("value");
	if (typeof delay   === "undefined" || delay == null)   delay = 1500;

	//update the active tile
	activeTile.classed("active", false);
	activeTile = d3.select(".headerTile ." + varName).classed("active", true);

  //update the rank text at top
  if (accessRankText) accessRankText.text((varName === "access") ? "(Ranked)" : "(Click here to rerank)");
  if (enrollRankText) enrollRankText.text((varName === "enroll") ? "(Ranked)" : "(Click here to rerank)");

  //change to sorting by the risk ratio if requested
  if (rankRatio) varName = varName + "_ratio";

  //figure out new ranking based on the active minority group
 	if (activeM === "BL") rankedVar = "WB_" + varName;
 	if (activeM === "HI") rankedVar = "WH_" + varName;
 	newRanks(data, rankedVar);

  //rebind the data, update the vertical translation of the districts
  d3.selectAll("g.row.district").data(data, function(d) { return +d.id; })
   	 .transition().duration(delay)
   	 .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.rank + 1) + ")"; });
}


//event handler for using adjusted enrollment rates
d3.select("#dotPlotSchoolPop").on("change", function() {
  updateGap(activeM, this.value === "offering");
})



//event handler for changing gap
var activeM = "BL";
function updateGap(mGrp, adj) {

	//update record keeping & legend
	activeM = mGrp;
	d3.selectAll(".legend rect").classed("active", false);
	d3.select(".legend rect." + mGrp).classed("active", true);


  //update the text for the ranking metric drop down
  if (mGrp === "BL") var mName = "Black";
  if (mGrp === "HI") var mName = "Hispanic";
  dropDownText = ["Rate difference (White − " + mName + " rate)",
                  "Rate ratio (White / " + mName + " rate)"];
  d3.selectAll("#dotPlotRankMetric option")
    .data(dropDownText)
    .text(function(d) { return d;});

  //update the minimum student size 
  var minN = +d3.select("#dotPlotMinN")[0][0].value;
  dotPlotResetStudentN(minN, mGrp);
  dropDownText = ["At least 10 " + mName + " students and 10 White students",
                  "At least 50 " + mName + " students and 50 White students",
                  "At least 250 " + mName + " students and 250 White students"];
  d3.selectAll("#dotPlotMinN option")
    .data(dropDownText)
    .text(function(d) { return d;});

	//helper function that updates one of the two graphs
	function updateOneGraph(classes, padding, varName1, varName2) {

		//update the position of the White dot text
		g.selectAll(".highlightText.White." + classes).transition().duration(800)
		 .attr("x", function(d) { return padding + textPlace(d[varName1], d[varName2])[0]})
     .text(function(d) { return Math.round(d[varName1]*100) });

		//update the position and value of the mGrp dot text
		g.selectAll(".highlightText.mGrp." + classes).transition().duration(800)
		 .attr("x", function(d) { return padding + textPlace(d[varName1], d[varName2])[1]})
		 .text(function(d) { return Math.round(d[varName2]*100) });

		//update the position and color of mGrp dot
		g.selectAll("circle.mGrp." + classes).transition().duration(800)
		 .attr("cx", function(d) { return padding + xScale(d[varName2]); })
		 .style("fill", grpColors[mGrp]);

    //update the position and color of White dot
    g.selectAll("circle.White." + classes).transition().duration(800)
     .attr("cx", function(d) { return padding + xScale(d[varName1]); });

		//update the x1 and x2 positions of the lines 
		g.selectAll(".row line." + classes).transition().duration(800)
     .attr("x1", function(d) { return padding + xScale(d[varName1]); })
		 .attr("x2", function(d) { return padding + xScale(d[varName2]); });
	}

	//update both graphs
  if (adj) {
    updateOneGraph("enroll", padGraph1, "WH08_alg_p" + "_adj", mGrp + "08_alg_p" + "_adj");
    updateOneGraph("access", padGraph2, "const1", "const1");
  } else {
    updateOneGraph("enroll", padGraph1, "WH08_alg_p",    mGrp + "08_alg_p");
    updateOneGraph("access", padGraph2, "WH08_access_p", mGrp + "08_access_p");
  }


	//then update the rank after a delay
	setTimeout(updateRank, 800);
}

d3.select("#dotPlotMinN").on("change", function() {
  dotPlotResetStudentN(+this.value, activeM);
});


////////////////////////////////////
//  FUNCTIONS FOR TEXT PLACEMENT  //
////////////////////////////////////

//helper function that takes a pair of values and determines the pixel values 
//for where they should be placed. If two values are too close (e.g., less than
//6.5 pp apart), then the text for val1 is displayed to the side of the dots 
var smallGap = .08;
function textPlace(val1, val2) {

	//get initial positions
	var smallGapOffset = 17;
	var pos1 = xScale(val1);
	var pos2 = xScale(val2);

	//simply return those positions if a large gap
	if (Math.abs(val2 - val1) >= smallGap) return [pos1, pos2];

	//if val1 rounds to 100, add to the smallGapOffset to account for the extra character
	if (Math.round(val1*100) === 100) smallGapOffset = 22

	//otherwise offset based on the smaller vs. larger value
	if (val2 > val1) return [Math.max(-10,pos1 - smallGapOffset), pos2];
	return [pos1 + smallGapOffset, pos2];
}

//////////////////////////////////
//  FUNCTIONS FOR HIGHLIGHTING  //
//////////////////////////////////

//event handler for highlighting a district
function highlightDistrict() {

	//get the SVG group element and add the highlighted CSS class
	var grp = d3.select(this.parentNode)
				.classed("highlighted", true);

	//add text about the size of the groups
	var d = grp.datum();
	if (activeM === "BL") var mText = d3.format(",")(d.BL08) + " Black students";
	if (activeM === "HI") var mText = d3.format(",")(d.HI08) + " Hisp. students";
	var wText = d3.format(",")(d.WH08) + " White students";

	//increase the size of the dots
	grp.selectAll("circle").attr("r", 9);

	//determine x position of group size text
	//var xPos = padGraph2 + panelW + 35;
	var xPos = Math.max(padGraph2 + panelW + 13,
					    +grp.select(".White.access.highlightText").attr("x") + 15);

	//update position and value of group size text
	mSize.attr("transform", grp.attr("transform")).attr("x", xPos).text(mText);
	wSize.attr("transform", grp.attr("transform")).attr("x", xPos).text(wText);
}
function unhighlightDistrict() {

	//remove the population size text to the right
	var grp = d3.select(this.parentNode);
	mSize.text("");
	wSize.text("");

	//if asking to unhighlight a clicked district, don't do it
	if (activeDistrict) if (grp.data()[0].id === activeDistrict.data()[0].id) return;
	grp.selectAll("circle").attr("r", 5);
	grp.selectAll("circle").attr("r", 5);

	grp.classed("highlighted", false);
}

//helper function if someone clicks on a district rather than just hovers over it
var activeDistrict = null;
function clickDistrict() {

	//get the parent SVG group and add the highlighted class
	var grp = d3.select(this.parentNode)
				.classed("highlighted", true);

	//if a second click on the same district, reset
	if (activeDistrict) if (grp.data()[0].id === activeDistrict.data()[0].id) {
		activeDistrict = null; 
		return;
	}

	//otherwise update the active district
	var oldDistrict = activeDistrict;
	activeDistrict = grp;

	//if a different district had been previously clicked, unhighlight it
	if (oldDistrict) if (grp.data()[0].id !== oldDistrict.data()[0].id) {
		oldDistrict.select("text").each(unhighlightDistrict);
	}	
}

//////////////////////////////////
//  FUNCTIONS FOR DRAWING ROWS  //
//////////////////////////////////

//helper function that draws the lines connecting the dots
function changeLine(row, varName1, varName2, padding, classes, draw) {
	if (draw) row.append("line").attr("class", classes.join(" "));
   	row.select("line." + classes.join("."))
      	.attr("x1", function(d) { return padding + xScale(d[varName1]); })
      	.attr("x2", function(d) { return padding + xScale(d[varName2]); });
}

//helper functions that draws the dots
function changeCircle(row, varName, color, padding, classes, draw) {
    if (draw) row.append("circle").attr("class", classes.join(" "));
    row.select("circle." + classes.join("."))
    	.attr("cx", function(d) { return padding + xScale(d[varName])})
    	.attr("r", 5)
    	.style("fill", color);
}

//helper function that adds the text for individual dots
function changeText(row, varName, pos, padding, classes, draw) {
	if (draw) row.append("text").attr("class", classes.join(" ") + " highlightText");
	row.select("text." + classes.join(".") + ".highlightText")
    	.attr("x", pos + padding)
    	.text(function(d) { return Math.round(+d[varName]*100); });
}

//helper function that uses the previous functions to draw one row for one graph
function drawRowGraph(row, varName1, varName2, padding, graphClass, draw) {

   	//draw lines and dots
    changeLine(row, varName1, varName2, padding, [graphClass], draw);
    changeCircle(row, varName1, grpColors["WH"], padding, ["White", graphClass], draw);
    changeCircle(row, varName2, grpColors[activeM], padding, ["mGrp", graphClass], draw);

    //add the text for dots (invisible for now) 
    var textPos = textPlace(row.datum()[varName1], row.datum()[varName2]);
    changeText(row, varName1, textPos[0], padding, ["White", graphClass], draw);
    changeText(row, varName2, textPos[1], padding, ["mGrp", graphClass], draw);
}

//helper function that uses all the previous functions to draw
//all the elements for a particular row given a row as the environment "this"
function changeRow(row, draw) {

    //get a D3 selection of the g SVG element
    var d = row.datum();

    //add name (separately position state name and the district name)
    if (+d.rank !== 0) {
    	//add district name
   		if (draw) row.append("text")
   					 .attr("class", "name district")
   					 .attr("x", padGraph1-30);
   		row.select("text.name.district")
      	   .text(d.name.slice(0,-2));

      	//add state name
    	if (draw) row.append("text")
    				 .attr("class", "name state")
    				 .attr("x", padGraph1-18);
    	row.select("text.name.state")
      	   .text(d.name.slice(-2));
    }

    //add hover rectangle
    if (draw) row.append("rect").attr({
			       	x: -pad.left, y: -vertSpace/2, 
			       	width: pad.left + padGraph2+panelW, 
			       	height: vertSpace
			       });

    //draw the row elements for both graphs
    drawRowGraph(row, "WH08_alg_p",    activeM + "08_alg_p",    padGraph1, "enroll", draw);
    drawRowGraph(row, "WH08_access_p", activeM + "08_access_p", padGraph2, "access", draw);

    //add event handlers to all child elements for highlighting rows
    if (draw) row.selectAll("*")
		    	.on("mouseover", highlightDistrict)
		    	.on("mouseout", unhighlightDistrict)
		    	.on("click", clickDistrict)
		    	.style("cursor", "pointer");
}

//wrapper functions
function drawRow(d) {
    var row = d3.select(this);
    changeRow(row, true);
}
function updateRow(d) {
    var row = d3.select(this);
    changeRow(row, false);
}

///////////////////////////////
// LOAD DATA AND DRAW GRAPHS //
///////////////////////////////

//hack because IE doesn't support dominant-baseline CSS
//https://github.com/openstreetmap/iD/issues/3020
d3.selectAll(".top100 text").attr("dy", "0.6ex");

//load data...
var data;
d3.csv(baseURL + "data/table_top100.csv", function(dataCSV) {

  	//make sure the data can be accessed globally
  	data = dataCSV;

    //get the enrollment rates for schools that offer it
    data.forEach(function(d) {
      d.WH08_alg_p_adj = (+d.WH08_alg_p / +d.WH08_access_p);
      d.BL08_alg_p_adj = (+d.BL08_alg_p / +d.BL08_access_p);
      d.HI08_alg_p_adj = (+d.HI08_alg_p / +d.HI08_access_p);

      //essentially rename from diff if needed (e.g., WB_diff -> WB_enroll)
      if (typeof d.WB_enroll === "undefined") d.WB_enroll = d.WB_diff;
      if (typeof d.WH_enroll === "undefined") d.WH_enroll = d.WH_diff;

      //calculate relative risk (also change name for diff vs. enroll)
      d.WB_enroll_ratio = +d.WH08_alg_p / +d.BL08_alg_p;
      d.WH_enroll_ratio = +d.WH08_alg_p / +d.HI08_alg_p;
      d.WB_access_ratio = +d.WH08_access_p / +d.BL08_access_p;
      d.WH_access_ratio = +d.WH08_access_p / +d.HI08_access_p;

      d.const1 = 1;
    });

  	//grab the national data and remove from district-level data
  	dataNation = data.shift();

  	//make sure data is sorted alphabetically by name (breaks ties)
  	data.sort(function(a, b){return 2*(a.name > b.name)-1;});

  	///////////////////////////////
  	//  FIXED POSITION ELEMENTS  //
  	///////////////////////////////

  	//add ranking text
    for (var i = 1; i <= data.length; i++) {
    	g.append("text")
    	 .attr("class", "rank")
    	 .text(i + ".")
    	 .attr("y", vertSpace*(i + 1))
    	 .attr("x", 5);
    }

    //add national SVG group and text
  	var nation = g.append("g")
  				.datum(dataNation)
  				.attr("class", "row")
  				.attr("transform", "translate(0," + vertSpace*.5 + ")");
  	nation.append("text").attr("class", "name").text("The Nation").attr("x", padGraph1-10);

  	/////////////////////////////////
  	//  DYNAMIC POSITION ELEMENTS  //
  	/////////////////////////////////

  	//add grouping elements
  	var rows = g.selectAll(".rows")
	  			  .data(data).enter()
	              .append("g")
	              .attr("class", "row district")
	              .attr("transform", function(d) { 
	                return "translate(0," + vertSpace*(+d.rank + 1) + ")"; 
	              });

    //add the national SVG group to the array of rows
  	rows[0].push(nation[0][0]);

  	//for each row, draw it
  	rows.each(drawRow);

    //hack because IE doesn't support dominant-baseline CSS
    //https://github.com/openstreetmap/iD/issues/3020
    d3.selectAll(".top100 text").attr("dy", "0.6ex");

}); //ends the loading data callback


})(); //ends the function wrapper for the entire code
