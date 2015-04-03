
//positioning settings
var width = 740;
var height = 1200;
var pad = { left: 10, right: 0, top: 60, bottom: 10 };
var vertSpace = 45;
var xName = 15;
var xPrct = 230;
var xChange = 350;
var xNumF = 550;
var xTotal = 670;
var rectW = 80;
var rectH = 35;
var yHeader = 20;
var ySubHead = 40;

//define scales
var scaleRB6 = ['rgb(178,24,43)','rgb(239,138,98)','rgb(253,219,199)','rgb(209,229,240)','rgb(103,169,207)','rgb(33,102,172)'];
var colors = d3.scale.quantize().domain([30, 0]).range(scaleRB6);
var sizeNumF = d3.scale.linear().domain([10, 100]).range([11, 30]);
var sizeTotal = d3.scale.linear().domain([50, 500]).range([11, 30]);
var changeH = d3.scale.linear().domain([0, 13]).range([0, 18]);

//create container elements
var svg = d3.select(".top25").append("svg")
    .attr("width", width + pad.left + pad.right)
    .attr("height", height + pad.top + pad.bottom);


//create headers
var header = svg.append("g").attr("class", "header").attr("transform", "translate(" + pad.left + "," + yHeader + ")");
header.append("text").text("% Women").attr("x", xPrct);
header.append("text").text("Change in %").attr("x", xChange);
header.append("text").text("Number Women").attr("x", xNumF);
header.append("text").text("Total").attr("x", xTotal);
var subHead = svg.append("g").attr("class", "subHead").attr("transform", "translate(" + pad.left + "," + ySubHead + ")");
subHead.append("text").text("(2011-2013)").attr("x", xPrct);
subHead.append("text").text("(compared to 2008-2010)").attr("x", xChange);
subHead.append("text").text("(2011-2013)").attr("x", xNumF);
subHead.append("text").text("(2011-2013)").attr("x", xTotal);

//create header line and content SVG group
svg.append("line").attr({ x1: 0, x2: width, y1: 2, y2: 2}).style({"stroke-width": 2, stroke: "#222"});
svg.append("line").attr({ x1: 0, x2: width, y1: pad.top-5, y2: pad.top-5}).style({"stroke-width": 2, stroke: "#222"});
var g = svg.append("g").attr("transform", "translate(" + pad.left + ", " + pad.top + ")");


//load data...
d3.csv("top25.csv", function(data) {

  //add lines in between
  g.selectAll("line.sep").data(data).enter().append("line")
    .attr({ x1: -pad.left, x2: width-pad.left, class: "sep"})
    .attr("y1", function(d) { return vertSpace*d.rank; })
    .attr("y2", function(d) { return vertSpace*d.rank; })
    .style({"stroke-width": 0.5, stroke: "#888"});

  //ranking text
  g.selectAll("text.rank").data(data).enter().append("text")
    .attr("class", "rank")
    .text(function(d) { return d.rank + "."; })
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5); });

  //college names
  g.selectAll("text.name").data(data).enter().append("text")
    .attr("class", "name")
    .text(function(d) { return d.abbrev; })
    .attr("x", xName)
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5); });

  //percent women background
  g.selectAll("rect.prct").data(data).enter().append("rect")
    .attr("class", "prct")
    .attr("x", xPrct - rectW/2)
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5) - rectH/2; })
    .attr("width", rectW)
    .attr("height", rectH)
    .style("fill", function(d) { return colors(d.prct); });

  //percent women text
  g.selectAll("text.prct").data(data).enter().append("text")
    .attr("class", "prct")
    .text(function(d) { return d.prctStr; })
    .attr("x", xPrct)
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5); })
    .style("fill", function(d) { return (d.prct > 25) ? "#fcfcfc" : "#333"; });
  
  //change percent text
  g.selectAll("text.change").data(data).enter().append("text")
    .attr("class", "change")
    .text(function(d) { return d.changeStr; })
    .attr("x", xChange)
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5); });

  //change percent bars
  g.selectAll("rect.change").data(data).enter().append("rect")
    .attr("class", "change")
    .attr("x", xChange+40)
    .attr("y", function(d) { 
      return (d.incr==0) ? 
        vertSpace*(d.rank - 0.5) : 
        vertSpace*(d.rank - 0.5) - changeH(Math.abs(d.change)); 
    })
    .attr("width", 5)
    .attr("height", function(d) { return changeH(Math.abs(d.change)); })
    .style("fill", function(d) { return (d.incr==1) ? scaleRB6[0] : scaleRB6[5]; });
  g.selectAll("line.change").data(data).enter().append("line")
    .attr("class", "change")
    .attr({x1: xChange+40-3, x2: xChange+40+8, class: "change"})
    .style({"stroke-width": 1, stroke: "#111"})
    .attr("y1", function(d) { return vertSpace*(d.rank - 0.5); })
    .attr("y2", function(d) { return vertSpace*(d.rank - 0.5); });




  //number women text
  g.selectAll("text.numF").data(data).enter().append("text")
    .attr("class", "numF")
    .text(function(d) { return d.numF; })
    .attr("x", xNumF)
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5); })
    .style("font-size", function(d) { return sizeNumF(d.numF); });

  //total number text
  g.selectAll("text.total").data(data).enter().append("text")
    .attr("class", "total")
    .text(function(d) { return d.total; })
    .attr("x", xTotal)
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5); })
    .style("font-size", function(d) { return sizeTotal(d.total); });

});