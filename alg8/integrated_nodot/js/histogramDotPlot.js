

/////////////////////////////////////////////////////////
// USE D3 and CROSSFILTER FOR THE FILTERING HISTOGRAMS //
/////////////////////////////////////////////////////////


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
    {varName: "WB_diff",   min: -70, max: 70, width: w, title: "White-Black Enrollment Gap"},
    {varName: "WH_diff",   min: -70, max: 70, width: w, title: "White-Hispanic Enrollment Gap"},
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




// (It's CSV, but GitHub Pages only gzip's JSON at the moment.)
d3.csv('data/table_all.csv', function(data) {

  // A little coercion, since the CSV is untyped.
  // todo: update how stats based on < 10 students is handled
  data.forEach(function(d) {

    //address the gaps first
    d.WB_diff = (+d.WH08_alg_p - +d.BL08_alg_p)*100;
    d.WH_diff = (+d.WH08_alg_p - +d.HI08_alg_p)*100;
    d.WB_access = (+d.WH08_access_p - +d.BL08_access_p)*100;
    d.WH_access = (+d.WH08_access_p - +d.HI08_access_p)*100;
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

    //then sample sizes
    d.BL08_log = logC(+d.BL08);
    d.HI08_log = logC(+d.HI08);
    d.WH08_log = logC(+d.WH08);
    d.G08_log = logC(+d.G08);
  });

  //remove the nation
  data.shift();

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

  //preselect on at least 10 students in each group
  //accessing the max histogram value is a bit hack-ish right now but works
  filter("BL08_log", [logC(10), histograms[varIndex["BL08_log"]].max], false);
  filter("HI08_log", [logC(10), histograms[varIndex["HI08_log"]].max], false);
  filter("WH08_log", [logC(10), histograms[varIndex["WH08_log"]].max], false);

  //preselect also based on top 100 largest districts
  var top100min = d3.min(G08_dim.top(100), function(d) { return d.G08_log; });
  filter("G08_log", [top100min, histograms[varIndex["WH08_log"]].max], false);

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
  /*var lastUpdate = new Date().getTime();
  function sendData() {
    lastUpdate = new Date().getTime();
    setTimeout(function() {
      var currTime = new Date().getTime();
      if ((currTime - lastUpdate) > 95) {
        updateDotplot(G08_dim.top(100));
      }
    }, 100);
  }*/

  // Whenever the brush moves, re-render everything
  function renderAll() {
    chart.each(render);
    d3.select("#active").text(formatNumber(all.value()));
    //sendData();
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
