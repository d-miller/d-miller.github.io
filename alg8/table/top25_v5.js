
//positioning settings
var width = 740;
var height = 2975;
var pad = { left: 10, right: 0, top: 60, bottom: 10 };
var vertSpace = 45;
var xName = 20;

var xMajor = 520;
var xResearch = 640;
var xExp = 260;
var xImp = 380;


var rectW = 80;
var rectH = 35;
var yHeader = 20;
var ySubHead = 40;

var panelW = 200;

//define scales
//var xScale = d3.scale.linear().domain([0,1]).range([0, panelW]);
var xScale = d3.scaleLinear().domain([0,1]).range([0, panelW]);
var padGraph1 = 300;
var padGraph2 = 600;

//create container elements
var svg = d3.select(".top25").append("svg")
            .attr("width", width + pad.left + pad.right)
            .attr("height", height + pad.top + pad.bottom);


//create header (background) tiles
var tileW = 140;
var headerTiles = svg.append("g").attr("class", "headerTile").attr("transform", "translate(0,0)");
headerTiles.append("rect")
           .attr("x", padGraph1-tileW/2)
           .attr("y", 7)
           .attr("width", tileW) 
           .attr("height", 43)
           .attr("fill", "white")
           .attr("class", "enroll")
           .on("click", rankAccess);
headerTiles.append("rect")
           .attr("x", padGraph2-tileW/2)
           .attr("y", 7)
           .attr("width", tileW) 
           .attr("height", 43)
           .attr("fill", "white")
           .attr("class", "access")
           .on("click", rankAccess);
headerTiles.selectAll("rect").style("cursor", "pointer");
var activeTile = d3.select(".headerTile .enroll");
activeTile.style("fill", "#eee");
rankEnroll();

//create header text
var header = svg.append("g").attr("class", "header").attr("transform", "translate(0," + yHeader + ")");
header.append("text").text("Enrollment Gap").attr("x", padGraph1).on("click", rankEnroll);
header.append("text").text("Access Gap").attr("x", padGraph2).on("click", rankAccess);
header.selectAll("text").style("cursor", "pointer");




//event handlers for resorting the rows
function rankEnroll() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .enroll");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(800)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.WB_diff_rank - 0.5) + ")"; });
}
function rankAccess() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .access");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(800)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.WB_access_rank - 0.5) + ")"; });
}

//create header line and content SVG group
svg.append("line").attr("x1", 0).attr("x2", width).attr("y1", 2).attr("y2", 2).style({"stroke-width": 2, stroke: "#222"});
svg.append("line").attr("x1", 0).attr("x2", width).attr("y1", pad.top-5).attr("y2", pad.top-5).style({"stroke-width": 2, stroke: "#222"});
var g = svg.append("g").attr("transform", "translate(" + pad.left + ", " + pad.top + ")");


//load data...
d3.csv("data.csv", function(data) {

  ///////////////////////////////
  //  FIXED POSITION ELEMENTS  //
  ///////////////////////////////

  //add lines in between
  g.selectAll("line.sep").data(data).enter().append("line")
    .attr("x1", -pad.left).attr("x2", width-pad.left).attr("class", "sep")
    .attr("y1", function(d) { return vertSpace*d.rank; })
    .attr("y2", function(d) { return vertSpace*d.rank; })
    .style("stroke-width", 0.5).style("stroke", "#888");

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

  //for each district...
  rows.each(function(d) {

    //get a D3 selection of the g SVG element
    var row = d3.select(this);

    //district name
    row.append("text")
      .attr("class", "name")
      .text(function(d) { return d.abbrev; })
      .attr("x", xName);

    //circle 1 - graph 1
    row.append("circle")
      //.attr("class", "prct")
      .attr("cx", function(d) { return padGraph1 + xScale(d.WH08_alg_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .style("fill", "#999999");

    //circle 2 - graph 1
    row.append("circle")
      //.attr("class", "prct")
      .attr("cx", function(d) { return padGraph1 + xScale(d.BL08_alg_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .style("fill", "#56B4E9");

    //circle 1 - graph 2
    row.append("circle")
      //.attr("class", "prct")
      .attr("cx", function(d) { return padGraph2 + xScale(d.WH08_access_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .style("fill", "#999999");

    //circle 2 - graph 2
    row.append("circle")
      //.attr("class", "prct")
      .attr("cx", function(d) { return padGraph2 + xScale(d.BL08_access_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .style("fill", "#56B4E9");

  });

});
