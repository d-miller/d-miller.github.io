
//positioning settings
var width = 740;
var height = 3100;
var pad = { left: 10, right: 0, top: 60, bottom: 10 };
var vertSpace = 45;
var xName = 20;

var xPrct = 520;
var xChange = 640;
var xNumF = 260;
var xTotal = 380;


var rectW = 80;
var rectH = 35;
var yHeader = 20;
var ySubHead = 40;

//define scales
var sizeNumF = d3.scale.linear().domain([10, 100]).range([11, 30]);
var sizeTotal = d3.scale.linear().domain([50, 500]).range([11, 30]);
var changeH = d3.scale.linear().domain([0, 13]).range([0, 18]);
var prctBar = d3.scale.linear().domain([0, 32]).range([0, 25]);


//create container elements
var svg = d3.select(".top25").append("svg")
            .attr("width", width + pad.left + pad.right)
            .attr("height", height + pad.top + pad.bottom);


//create header (background) tiles
var headerTiles = svg.append("g").attr("class", "headerTile").attr("transform", "translate(" + pad.left + ",0)");
var activeTile = headerTiles.append("rect").attr({x: xNumF-45, y: 7, width: 90, height: 43, fill: "white", class: "numF"}).on("click", rankNumF);
headerTiles.append("rect").attr({x: xTotal-45, y: 7, width: 90, height: 43, fill: "white", class: "total"}).on("click", rankTotal);
headerTiles.append("rect").attr({x: xPrct-60,  y: 7, height: 43, width: 120, fill: "white", class: "prct"}).on("click", rankPrct);
headerTiles.append("rect").attr({x: xChange-60, y: 7, width: 120, height: 43, fill: "white", class: "change"}).on("click", rankChange);
headerTiles.selectAll("rect").style("cursor", "pointer");
activeTile.style("fill", "#eee");
rankNumF();

//create header text
var header = svg.append("g").attr("class", "header").attr("transform", "translate(" + pad.left + "," + yHeader + ")");
header.append("text").text("Sci. Majors").attr("x", xPrct).on("click", rankPrct);
header.append("text").text("Researchers").attr("x", xChange).on("click", rankChange);
header.append("text").text("Explicit").attr("x", xNumF).on("click", rankNumF);
header.append("text").text("Implicit").attr("x", xTotal).on("click", rankTotal);
var subHead = svg.append("g").attr("class", "subHead").attr("transform", "translate(" + pad.left + "," + ySubHead + ")");
subHead.append("text").text("% Women").attr("x", xPrct).on("click", rankPrct);
subHead.append("text").text("% Women").attr("x", xChange).on("click", rankChange);
subHead.append("text").text("Stereotypes").attr("x", xNumF).on("click", rankNumF);
subHead.append("text").text("Stereotypes").attr("x", xTotal).on("click", rankTotal);
header.selectAll("text").style("cursor", "pointer");
subHead.selectAll("text").style("cursor", "pointer");

//event handlers for resorting the rows
function rankPrct() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .prct");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(800)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.rankPrct - 0.5) + ")"; });
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
d3.csv("data/top25.csv", function(data) {

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
    .attr("y", function(d) { return vertSpace*(d.rank - 0.5); })
    .attr("x", 5);

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

    //percent women text
    s.append("text")
      .attr("class", "prct")
      .text(function(d) { return d.prctStr; })
      .attr("x", xPrct)
      .style("fill", "#333")
      .style("font-size", 25);

    //change percent text
    s.append("text")
      .attr("class", "change")
      .text(function(d) { return d.changeStr; })
      .attr("x", xChange)
      .style("font-size", 25);

    //number women text
    s.append("text")
      .attr("class", "numF")
      .text(function(d) { return d.numF; })
      .attr("x", xNumF)
      .style("font-size", 25);
      //.style("font-size", function(d) { return sizeNumF(d.numF); });

    //total number text
    s.append("text")
      .attr("class", "total")
      .text(function(d) { return d.total; })
      .attr("x", xTotal)
      .style("font-size", 25);
      //.style("font-size", function(d) { return sizeTotal(d.total); });

  });

});
