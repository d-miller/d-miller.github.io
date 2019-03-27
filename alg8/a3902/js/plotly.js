//helper function will be used to return an array of 
//variable values for a dataset formatted as JSON
Array.prototype.get = function(name) {
  var x = [];
  this.forEach(function(d) {
    x.push(d[name])
  });
  return x;
}

//functions that returns a tooltip HTML
var WB_enroll_tooltip = function(d) {
  return  '<h3>' + d.name + '</h3>' +
          '<table><tbody>' +
            '<tr><th>Group</th><th>Size</th><th>Rate</th></tr>' +
            '<tr><td>Black</td><td>' + d3.format(",")(+d.BL08) + '</td><td>' + Math.round(+d.BL08_alg_p*100) + '%</td></tr>' +
            '<tr><td>White</td><td>' + d3.format(",")(+d.WH08) + '</td><td>' + Math.round(+d.WH08_alg_p*100) + '%</td></tr>' + 
          '</tbody></table>';
};
var WB_access_tooltip = function(d) {
  return  '<h3>' + d.name + '</h3>' +
          '<table><tbody>' +
            '<tr><th>Group</th><th>Size</th><th>Rate</th></tr>' +
            '<tr><td>Black</td><td>' + d3.format(",")(+d.BL08) + '</td><td>' + Math.round(+d.BL08_access_p*100) + '%</td></tr>' +
            '<tr><td>White</td><td>' + d3.format(",")(+d.WH08) + '</td><td>' + Math.round(+d.WH08_access_p*100) + '%</td></tr>' + 
          '</tbody></table>';
};

d3.csv('data/table_top100.csv', function(data) {

  //remove the nation
  data.shift();

  //multiply by 100 to get percentages
  data.forEach(function(d) {
    d.WB_diff = +d.WB_diff * 100;
    d.WH_diff = +d.WH_diff * 100;
    d.WB_access = +d.WB_access * 100;
    d.WH_access = +d.WH_access * 100;
  });



  var WB_test_enroll = {
    data: data,
    tooltip: WB_enroll_tooltip,
    lines: [
      {func: function(x) { return 100*(.0196163 + .0575691*(+x)); }, 
      text: 'Prediction line'},
    ],
    xLim: [-1.1, 6.1],
    yLim: [-32, 52],
    xTitle: 'White — Black Test Score Gap',
    yTitle: 'White — Black Enrollment Gap',
    xVar: "mn_wbg_SEDA",
    yVar: "WB_diff",
    sizeFunc: function(d) { return Math.max(5, Math.sqrt(+d.BL08)/3); },
    dotColor: '#56B4E9',
    divName: 'plotly-div'
  };

  var WB_seg_access = {
    data: data,
    tooltip: WB_access_tooltip,
    lines: [
      {func: function(x) { return 100*(+x); }, 
      text: 'Maximum possible access gap'},
      {func: function(x) { return -100*(+x); }, 
      text: 'Maximum possible access gap'},
    ],
    xLim: [0, 1],
    //yLim: [-40, 70],
    yLim: [-100, 100],
    xTitle: 'White — Black Segregation',
    yTitle: 'White — Black Access Gap',
    xVar: "WB_dissim",
    yVar: "WB_access",
    sizeFunc: function(d) { return Math.max(5, Math.sqrt(+d.BL08)/3); },
    dotColor: '#56B4E9',
    divName: 'complexAccess'
  };

  var WB_seg_access_simp = {
    data: data,
    tooltip: WB_access_tooltip,
    lines: [],
    xLim: [0, 1],
    yLim: [-40, 70],
    //yLim: [-100, 100],
    xTitle: 'White — Black Segregation',
    yTitle: 'White — Black Access Gap',
    xVar: "WB_dissim",
    yVar: "WB_access",
    sizeFunc: function(d) { return Math.max(5, Math.sqrt(+d.BL08)/3); },
    dotColor: '#56B4E9',
    divName: 'simpleAccess'
  };


  scatterPlotly(WB_test_enroll);
  scatterPlotly(WB_seg_access);
  scatterPlotly(WB_seg_access_simp);

});


//s is shorthand for settings
function scatterPlotly(s) {

  //get a dataset with non-missing x and y values
  var filtered = [];
  s.data.forEach(function(d) {
    if ((d[s.xVar] !== "") && (d[s.yVar] !== "")) filtered.push(d);
  });

  //initialize variables
  var xLine = d3.range(s.xLim[0], s.xLim[1], (s.xLim[1] - s.xLim[0])/200);
  xLine.push(s.xLim[1]);
  var traces = [];

  //add the lines
  s.lines.forEach(function(line) {
    traces.push({
      x: xLine,
      y: xLine.map(line.func),
      hoverinfo: 'text',
      hovertext: line.text,
      hoverlabel: {
        bgcolor: 'white', 
        font: {
          color: 'black', 
          family: '"lato",Arial,Helvetica,sans-serif', 
          size: 12
        }
      }, 
      line: {
        color: 'darkgrey', 
        dash: 'dot'
      }, 
      mode: 'lines', 
      type: 'scatter', 
      xaxis: 'x', 
      yaxis: 'y' 
    })
  });

  //add the scatter points
  traces.push({
    x: filtered.get(s.xVar),
    y: filtered.get(s.yVar),
    hoverinfo: 'none',
    marker: {
      color: s.dotColor, 
      line: {color: '#222'}, 
      opacity: 0.5, 
      size: filtered.map(s.sizeFunc),
      sizemode: 'diameter'
    }, 
    mode: 'markers', 
    text: filtered.map(s.tooltip),
    type: 'scatter', 
    xaxis: 'x', 
    yaxis: 'y'
  });

  //specify the layout
  var layout = {
    annotations: [
      {
        x: 0.85, 
        y: 2.7+.3, 
        font: {size: 11}, 
        showarrow: false, 
        text: '↑ White higher', 
        xanchor: 'left', 
        xref: 'paper'
      }, 
      {
        x: 0.85, 
        y: -2.1-.4, 
        font: {size: 11}, 
        showarrow: false, 
        text: '↓ Black higher', 
        xanchor: 'left', 
        xref: 'paper'
      }
    ], 
    font: {
      color: 'black', 
      family: '"lato",Arial,Helvetica,sans-serif', 
      size: 14
    }, 
    hovermode: 'closest', 
    margin: {
      r: 10, 
      t: 25, 
      b: 40, 
      l: 10
    }, 
    showlegend: false, 
    xaxis: {
      automargin: true, 
      domain: [0, 1], 
      nticks: 14, 
      range: s.xLim, 
      showgrid: false, 
      showline: true, 
      ticks: 'outside', 
      title: s.xTitle, 
      titlefont: {
        color: 'black', 
        family: '"lato",Arial,Helvetica,sans-serif', 
        size: 18
      }, 
      zeroline: false
    }, 
    yaxis: {
      automargin: true, 
      domain: [0, 1], 
      fixedrange: true, 
      nticks: 14, 
      range: s.yLim, 
      showgrid: false, 
      showline: true, 
      ticks: 'outside', 
      title: s.yTitle, 
      titlefont: {
        color: 'black', 
        family: '"lato",Arial,Helvetica,sans-serif', 
        size: 18
      }, 
      zeroline: true
    }
  };

  //suppress elements from modebar
  var config = {
    displaylogo: false, 
    collaborate: false,
    modeBarButtonsToRemove: ["lasso2d", "toggleSpikelines", "hoverClosestCartesian",
                             "pan2d", "zoom2d", "hoverCompareCartesian", "select2d", 
                             "autoScale2d"]
  };

  //first plot using Plotly's functions
  Plotly.plot(s.divName, {
    data: traces,
    layout: layout,
    config: config
  });

  //customize using code written below
  customPlotly(s.divName);

  //wrapper function that adds custom JS to a specified plotly div
  function customPlotly(divName) {

    //get the div selection
    var div = document.getElementById(divName);
    var d3div = d3.select(div);

    //insert HTML elements where needed
    d3div.append("div").attr("class", "plotly-notifier");
    d3div.append("div").attr("class", "mapboxgl-popup")
         .append("div").attr("class", "mapboxgl-popup-content");

    //helper functions that make the interaction behavior panning after user 
    //zooms, and zooming once reset to the original axis ranges
    function makePan(e) {

      d3div.select(".modebar-btn[data-val=reset]").style("display", "inline-block");
      $(div).unbind('plotly_relayout');
      Plotly.relayout(divName, {dragmode: 'pan'});
      setTimeout(function() {
        $(div).on('plotly_relayout', makeZoom);
        d3div.selectAll("*").style('transition', "0s");
      }, 200);
    }

    var xRange = s.xLim.slice();
    function makeZoom(event, d) {

      //don't change back to zoom mode unless new axes are original
      if (typeof d['xaxis.range[0]'] === "undefined") return;
      if ((d['xaxis.range[0]'].toFixed(1) != xRange[0].toFixed(1)) || 
          (d['xaxis.range[1]'].toFixed(1) != xRange[1].toFixed(1))) return;

      d3div.select(".modebar-btn[data-val=reset]").style("display", "none");
      $(div).unbind('plotly_relayout');
      Plotly.relayout(divName, {dragmode: 'zoom'});
      setTimeout(function() {
        $(div).on('plotly_relayout', makePan);
        d3div.selectAll("*").style('transition', "opacity 0s, transform 0.5s, x 0.5s, y 0.5s");
      }, 200);
    }

    $(div).on('plotly_relayout', makePan);
    d3div.select(".modebar-btn[data-val=reset]").style("display", "none");


    //use my own formatting for the tooltip - a bit hackish
    function highlightPoint(data) { 

      //don't do anything if not hovered over a dot
      var d = data.points[0];
      if (d.data.mode !== "markers") return;

      //make hovered point more opaque, non-hovered less opaque
      var points = d3div.selectAll(".points path");
      var i = d.pointIndex;
      points.style("opacity", 0.2);
      d3.select(points[0][i]).style("opacity", 1);

      //change the tooltip HTML and then position it
      //we use the class mapboxgl-popup so we can borrow CSS rules
      //from the mapbox library, even though this visualization isn't
      //implemented in it (selecting within the d3div ensures that we
      //don't select a popup from other parts of the webpage such as the map)
      var tooltip = d3div.select(".mapboxgl-popup");
      tooltip.style("display", "block")
             .select(".mapboxgl-popup-content")
                .html(data.points[0].text);       //we smuggle in HTML through the text property

      //get the data point's pixel x & y position
      //see: https://plot.ly/javascript/hover-events/
      var x = d.xaxis.l2p(d.x);
      var y = d.yaxis.l2p(d.y);

      //translate by the plot container's starting position
      var container = d3.select(data.event.srcElement);

      x += +container.attr("x");
      y += +container.attr("y");

      //vertically center the tooltip based on 1/2 its height
      y -= tooltip[0][0].clientHeight/2;

      //place the tooltip 10 pixels away from the bubble's extent
      var padding = 10 + d["marker.size"]/2;

      //left align x position if there's not enough space to the right
      //to show the tooltip without going beyond the content div width
      var contentW = d3.select("#content")[0][0].clientWidth;
      var tooltipW = tooltip[0][0].clientWidth;
      var leftAlign = x + padding + tooltipW + 5 > contentW;

      //place to the right if left align isn't needed
      //subtract from the x position if left alignment is needed
      if (!leftAlign) {
        x += padding;         
      } else {
        x -= padding;
        x -= tooltipW;
      }

      //now finally change the position of the tooltip
      tooltip.style("left", Math.round(x) + "px")
             .style("top",  Math.round(y) + "px");
    }

    //bind the highlight point function to both hover and click events
    div.on('plotly_hover', highlightPoint);
    div.on('plotly_click', highlightPoint);

    //reset after hovering out
    div.on('plotly_unhover', function(data) { 
      d3div.selectAll(".points path")
            .style("opacity", 0.5)
      d3div.select(".mapboxgl-popup")
            .style("display", "none");
    });
  }
}