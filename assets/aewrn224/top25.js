
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


//create header (background) tiles
var headerTiles = svg.append("g").attr("class", "headerTile").attr("transform", "translate(" + pad.left + ",0)");
var activeTile = headerTiles.append("rect").attr({x: xPrct-45, y: 7, width: 90, height: 43, class: "prct"}).style("fill", "#eee").on("click", rankPrct);
headerTiles.append("rect").attr({x: xChange-70, y: 7, width: 140, height: 43, fill: "white", class: "change"}).on("click", rankChange);
headerTiles.append("rect").attr({x: xNumF-65, y: 7, width: 130, height: 43, fill: "white", class: "numF"}).on("click", rankNumF);
headerTiles.append("rect").attr({x: xTotal-37, y: 7, width: 74, height: 43, fill: "white", class: "total"}).on("click", rankTotal);
headerTiles.selectAll("rect").style("cursor", "pointer");

//create header text
var header = svg.append("g").attr("class", "header").attr("transform", "translate(" + pad.left + "," + yHeader + ")");
header.append("text").text("% Women").attr("x", xPrct).on("click", rankPrct);
header.append("text").text("Change in %").attr("x", xChange).on("click", rankChange);
header.append("text").text("Number Women").attr("x", xNumF).on("click", rankNumF);
header.append("text").text("Total").attr("x", xTotal).on("click", rankTotal);
var subHead = svg.append("g").attr("class", "subHead").attr("transform", "translate(" + pad.left + "," + ySubHead + ")");
subHead.append("text").text("(2011-2013)").attr("x", xPrct).on("click", rankPrct);
subHead.append("text").text("(compared to 2008-2010)").attr("x", xChange).on("click", rankChange);
subHead.append("text").text("(2011-2013)").attr("x", xNumF).on("click", rankNumF);
subHead.append("text").text("(2011-2013)").attr("x", xTotal).on("click", rankTotal);
header.selectAll("text").style("cursor", "pointer");
subHead.selectAll("text").style("cursor", "pointer");
//event handlers for resorting the rows
function rankPrct() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .prct");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(800)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.rank - 0.5) + ")"; });
}
function rankChange() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .change");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(800)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.rankChange - 0.5) + ")"; });
}
function rankNumF() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .numF");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(800)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.rankNumF - 0.5) + ")"; });
}
function rankTotal() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .total");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(800)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.rankTotal - 0.5) + ")"; });
}

//create header line and content SVG group
svg.append("line").attr({ x1: 0, x2: width, y1: 2, y2: 2}).style({"stroke-width": 2, stroke: "#222"});
svg.append("line").attr({ x1: 0, x2: width, y1: pad.top-5, y2: pad.top-5}).style({"stroke-width": 2, stroke: "#222"});
var g = svg.append("g").attr("transform", "translate(" + pad.left + ", " + pad.top + ")");


//load data...
d3.csv("top25.csv", function(data) {

  ///////////////////////////////
  //  FIXED POSITION ELEMENTS  //
  ///////////////////////////////

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

  /////////////////////////////////
  //  DYNAMIC POSITION ELEMENTS  //
  /////////////////////////////////

  //add grouping elements
  var rows = g.selectAll(".rows")
              .data(data).enter()
              .append("g")
              .attr("class", "row")
              .attr("transform", function(d) { 
                return "translate(0," + vertSpace*(+d.rank - 0.5) + ")"; 
              });

  //for each school...
  rows.each(function(d) {

    //get a D3 selection of the g SVG element
    var s = d3.select(this);

    //school name
    s.append("text")
      .attr("class", "name")
      .text(function(d) { return d.abbrev; })
      .attr("x", xName);

    //percent women background
    s.append("rect")
      .attr("class", "prct")
      .attr("x", xPrct - rectW/2)
      .attr("y", -rectH/2)
      .attr("width", rectW)
      .attr("height", rectH)
      .style("fill", function(d) { return colors(d.prct); });

    //percent women text
    s.append("text")
      .attr("class", "prct")
      .text(function(d) { return d.prctStr; })
      .attr("x", xPrct)
      .style("fill", function(d) { return (d.prct > 25) ? "#fcfcfc" : "#333"; });

    //change percent text
    s.append("text")
      .attr("class", "change")
      .text(function(d) { return d.changeStr; })
      .attr("x", xChange);

    //number women text
    s.append("text")
      .attr("class", "numF")
      .text(function(d) { return d.numF; })
      .attr("x", xNumF)
      .style("font-size", function(d) { return sizeNumF(d.numF); });

    //total number text
    s.append("text")
      .attr("class", "total")
      .text(function(d) { return d.total; })
      .attr("x", xTotal)
      .style("font-size", function(d) { return sizeTotal(d.total); });

    //change percent bars
    s.append("rect")
      .attr("class", "change")
      .attr("x", xChange+40)
      .attr("y", function(d) { 
        return (d.incr==0) ?  0 : - changeH(Math.abs(d.change)); 
      })
      .attr("width", 5)
      .attr("height", function(d) { return changeH(Math.abs(d.change)); })
      .style("fill", function(d) { return (d.incr==1) ? scaleRB6[0] : scaleRB6[5]; });
    s.append("line")
      .attr("class", "change")
      .attr({x1: xChange+40-3, x2: xChange+40+8, class: "change"})
      .style({"stroke-width": 1, stroke: "#111"});
  });

});