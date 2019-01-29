
//positioning settings
var width = 865;
var vertSpace = 30;
var height = 101*vertSpace+5;
var pad = { left: 10, right: 0, top: 90, bottom: 10 };
var xName = 20;

var xMajor = 520;
var xResearch = 640;
var xExp = 260;
var xImp = 380;


var rectW = 80;
var rectH = 35;
var yHeader = 20;
var ySubHead = 40;

var panelW = 230;

//define scales
var xScale = d3.scale.linear().domain([0,1]).range([0, panelW]); 

var padGraph1 = 350;
var padGraph2 = 615;

//create container elements
var svg = d3.select(".top25").append("svg")
            .attr("width", width + pad.left + pad.right)
            .attr("height", height + pad.top + pad.bottom);


//create header (background) tiles
var tileW = 200;
var headerTiles = svg.append("g").attr("class", "headerTile").attr("transform", "translate(" + pad.left + ",0)");
var activeTile = headerTiles.append("rect").attr({x: padGraph1+panelW/2-tileW/2,  y: 0, height: 40, width: tileW, fill: "white", class: "enroll"}).on("click", rankEnroll);
headerTiles.append("rect").attr({x: padGraph2+panelW/2-tileW/2, y: 0, width: tileW, height: 40, fill: "white", class: "access"}).on("click", rankAccess);
headerTiles.selectAll("rect").style("cursor", "pointer");
activeTile.style("fill", "#eee");
rankEnroll();

//create header text
var header = svg.append("g").attr("class", "header").attr("transform", "translate(" + pad.left + "," + yHeader + ")");
header.append("text").text("Enrollment Gap").attr("x", padGraph1+panelW/2).style("font-size", 24).on("click", rankEnroll);
header.append("text").text("Access Gap").attr("x", padGraph2+panelW/2).style("font-size", 24).on("click", rankAccess);
header.selectAll("text").style("cursor", "pointer");

//event handlers for resorting the rows
function rankEnroll() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .enroll");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(1500)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.WB_diff_rank + 0.5) + ")"; });
}
function rankAccess() {
  activeTile.style("fill", "white");
  activeTile = d3.select(".headerTile .access");
  activeTile.style("fill", "#eee");
  d3.selectAll("g.row")
    .transition().duration(1500)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d.WB_access_rank + 0.5) + ")"; });
}

//create header line and content SVG group
//svg.append("line").attr({ x1: 0, x2: width, y1: 2, y2: 2}).style({"stroke-width": 2, stroke: "#222"});
//svg.append("line").attr({ x1: 0, x2: width, y1: pad.top-5, y2: pad.top-5}).style({"stroke-width": 2, stroke: "#222"});
var g = svg.append("g").attr("transform", "translate(" + pad.left + ", " + pad.top + ")");


//add axis border lines
g.append("line").attr({ x1: padGraph1, x2: padGraph1, y1: -10, y2: height}).style({"stroke-width": 1, stroke: "#888"});
g.append("line").attr({ x1: padGraph1+panelW, x2: padGraph1+panelW, y1: -10, y2: height}).style({"stroke-width": 1, stroke: "#888"});
g.append("line").attr({ x1: padGraph2, x2: padGraph2, y1: -10, y2: height}).style({"stroke-width": 1, stroke: "#888"});
g.append("line").attr({ x1: padGraph2+panelW, x2: padGraph2+panelW, y1: -10, y2: height}).style({"stroke-width": 1, stroke: "#888"});


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
g.append("g").attr("transform", "translate(" + padGraph1 + ",-5)")
             .attr("class", "axis")
             .call(xAxis);
g.append("g").attr("transform", "translate(" + padGraph2 + ",-5)")
             .attr("class", "axis")
             .call(xAxis);


//add axis titles
g.append("text").attr("x", padGraph1 + panelW/2).attr("y", -30).text("Enrolled in Grade 8 Algebra")
g.append("text").attr("x", padGraph2 + panelW/2).attr("y", -30).text("Has Access to Early Algebra")

//add a legend
var legend = g.append("g").attr("class", "legend").attr("transform", "translate(200,-40)");
legend.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 5).style("fill", "#56B4E9");
legend.append("circle").attr("cx", 60).attr("cy", 0).attr("r", 5).style("fill", "#999999");
legend.append("text").text("Black").attr("x", 25).style("font-size",14)
legend.append("text").text("White").attr("x", 60+25).style("font-size",14)


//load data...
d3.csv("district_top100.csv", function(data) {

	//console.log(data)

  ///////////////////////////////
  //  FIXED POSITION ELEMENTS  //
  ///////////////////////////////

  //add lines in between
  /*g.selectAll("line.sep").data(data).enter().append("line")
    .attr({ x1: -pad.left, x2: width-pad.left, class: "sep"})
    .attr("y1", function(d) { return vertSpace*d.rank; })
    .attr("y2", function(d) { return vertSpace*d.rank; })
    .style({"stroke-width": 0.5, stroke: "#888"});*/

  //add line separating the nation
  /*g.append("line")
   .attr("x1", padGraph1)
   .attr("x2", padGraph1 + panelW)
   .attr("y1", vertSpace)
   .attr("y2", vertSpace)
   .style({"stroke-width": 1, stroke: "#888"});
  
  g.append("line")
   .attr("x1", padGraph2)
   .attr("x2", padGraph2 + panelW)
   .attr("y1", vertSpace)
   .attr("y2", vertSpace)
   .style({"stroke-width": 1, stroke: "#888"});*/

  //ranking text
  g.selectAll("text.rank").data(data).enter().append("text")
    .attr("class", "rank")
    .text(function(d) { if (d.rank!=="0") return d.rank + "."; })
    .attr("y", function(d) { return vertSpace*(+d.rank + 0.5); })
    .attr("x", 5)
    .style("font-size",14);

  /////////////////////////////////
  //  DYNAMIC POSITION ELEMENTS  //
  /////////////////////////////////

  //add grouping elements
  var rows = g.selectAll(".rows")
              .data(data).enter()
              .append("g")
              .attr("class", "row")
              .attr("transform", function(d) { 
                return "translate(0," + vertSpace*(+d.rank + 0.5) + ")"; 
              });

  //for each district...
  rows.each(function(d) {

    //get a D3 selection of the g SVG element
    var row = d3.select(this);

    //district name
    row.append("text")
      .attr("class", "name")
      .text(function(d) { return d.name; })
      //.attr("x", xName)
      .attr("x", padGraph1-10)
      .style("font-size",14)
      .style("text-anchor", "end");

    //line - graph 1
    row.append("line")
      //.attr("class", "prct")
      .attr("x1", function(d) { return padGraph1 + xScale(d.BL08_alg_p); })
      .attr("x2", function(d) { return padGraph1 + xScale(d.WH08_alg_p); })
      .attr("y1", 0)
      .attr("y2", 0)
      .style({"stroke-width": 1, stroke: "#888"});

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



    //line - graph 2
    row.append("line")
      //.attr("class", "prct")
      .attr("x1", function(d) { return padGraph2 + xScale(d.BL08_access_p); })
      .attr("x2", function(d) { return padGraph2 + xScale(d.WH08_access_p); })
      .attr("y1", 0)
      .attr("y2", 0)
      .style({"stroke-width": 1, stroke: "#888"});

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
