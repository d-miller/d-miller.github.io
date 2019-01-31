
//positioning settings
var width = 880;
var vertSpace = 22;
var height = 101.5*vertSpace+5;
var pad = { left: 10, right: 0, top: 110, bottom: 10 };
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
var headerTiles = svg.append("g").attr("class", "headerTile").attr("transform", "translate(" + pad.left + ",2)");
var activeTile = headerTiles.append("rect").attr({x: padGraph1+panelW/2-tileW/2, y: 0, height: 55, width: tileW, fill: "#eee", class: "enroll"}).on("click", rankEnroll);
headerTiles.append("rect").attr({x: padGraph2+panelW/2-tileW/2, y: 0, width: tileW, height: 55, fill: "#eee", class: "access"}).on("click", rankAccess);
headerTiles.selectAll("rect").style("cursor", "pointer").attr("stroke", "#333").attr("stroke-width", ".75").attr("opacity",0);
activeTile.style("fill", "#eee");
rankEnroll();

//create header text
var header = svg.append("g").attr("class", "header").attr("transform", "translate(" + pad.left + "," + yHeader + ")");
header.append("text").text("Enrollment Gap").attr("x", padGraph1+panelW/2).on("click", rankEnroll);
header.append("text").text("Access Gap").attr("x", padGraph2+panelW/2).on("click", rankAccess);


//add text about ranking and re-ranking
var enrollRankText = header.append("text").text("(Ranked)").attr("x", padGraph1+panelW/2).attr("y", 22).attr("class", "rerankText").on("click", rankEnroll);
var accessRankText = header.append("text").text("(Click here to rerank)").attr("x", padGraph2+panelW/2).attr("y", 22).attr("class", "rerankText").on("click", rankAccess);

//use pointer cursor to suggest clickability
header.selectAll("text").style("cursor", "pointer");

//event handlers for resorting the rows
function rankEnroll() {

  //update the active tile
  activeTile.style("opacity", "0");
  activeTile = d3.select(".headerTile .enroll");
  activeTile.style("opacity", "1");

  //update the rank text at top
  if (enrollRankText) enrollRankText.text("(Ranked)");
  if (accessRankText) accessRankText.text("(Click here to rerank)");

  //figure out new ranking based on the active minority group
  var newRank;
  if (activeM === "BL") newRank = "WB_diff_rank";
  if (activeM === "HI") newRank = "WH_diff_rank";

  //update the ranks
  d3.selectAll("g.row")
    .transition().duration(1500)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d[newRank] + 0.5 + 0.5*(+d.rank!==0)) + ")"; });

  //once this code is run, the lines & dots have stopped transitioning
  transitioning = false;
}
function rankAccess() {

  //update the active tile
  activeTile.style("opacity", 0);
  activeTile = d3.select(".headerTile .access");
  activeTile.style("opacity", 1);

  //update the rank text at top
  if (accessRankText) accessRankText.text("(Ranked)");
  if (enrollRankText) enrollRankText.text("(Click here to rerank)");

  //figure out new ranking based on the active minority group
  var newRank;
  if (activeM === "BL") newRank = "WB_access_rank";
  if (activeM === "HI") newRank = "WH_access_rank";

  //update the ranks
  d3.selectAll("g.row")
    .transition().duration(1500)
    .attr("transform", function(d) { return "translate(0," + vertSpace*(+d[newRank] + 0.5 + 0.5*(+d.rank!==0)) + ")"; });

  //once this code is run, the lines & dots have stopped transitioning
  transitioning = false;
}


//updates the rank based on the active tile selection
function updateRank() {
	if (activeTile.attr("class") === "access") rankAccess();
	if (activeTile.attr("class") === "enroll") rankEnroll();
}


//event handler for changing gap
var activeM = "BL";
var transitioning = false;
function WB_gap() {
	activeM = "BL";
	transitioning = true;
	d3.select(".legend rect.WB").attr("opacity", 1);
	d3.select(".legend rect.WH").attr("opacity", 0);

	//change the dot text (a mess I know - might clean up later)
	g.selectAll(".highlightText.mGrp.enroll").transition().duration(800)
		.attr("x", function(d) { return padGraph1 + textPlace(d.WH08_alg_p, d.BL08_alg_p)[1]; })
		.text(function(d) { return Math.round(d.BL08_alg_p*100) });
	g.selectAll(".highlightText.White.enroll").transition().duration(800)
		.attr("x", function(d) { return padGraph1 + textPlace(d.WH08_alg_p, d.BL08_alg_p)[0]; })
		.text(function(d) { return Math.round(d.WH08_alg_p*100) });
	g.selectAll(".highlightText.mGrp.access").transition().duration(800)
		.attr("x", function(d) { return padGraph2 + textPlace(d.WH08_access_p, d.BL08_access_p)[1]; })
		.text(function(d) { return Math.round(d.BL08_access_p*100) });
	g.selectAll(".highlightText.White.access").transition().duration(800)
		.attr("x", function(d) { return padGraph2 + textPlace(d.WH08_access_p, d.BL08_access_p)[0]; })
		.text(function(d) { return Math.round(d.WH08_access_p*100) });

	//change the dots
	g.selectAll("circle.mGrp.enroll").transition().duration(800)
		.attr("cx", function(d) { return padGraph1 + xScale(d.BL08_alg_p); })
		.style("fill", BL_color);
	g.selectAll("circle.mGrp.access").transition().duration(800)
		.attr("cx", function(d) { return padGraph2 + xScale(d.BL08_access_p); })
		.style("fill", BL_color);

	//change the lines
	g.selectAll(".row line.enroll").transition().duration(800)
		.attr("x1", function(d) { return padGraph1 + xScale(d.BL08_alg_p); })
	g.selectAll(".row line.access").transition().duration(800)
		.attr("x1", function(d) { return padGraph2 + xScale(d.BL08_access_p); })
		.each("end", updateRank)
}
function WH_gap() {
	activeM = "HI";
	transitioning = true;
	d3.select(".legend rect.WB").attr("opacity", 0);
	d3.select(".legend rect.WH").attr("opacity", 1);

	//change the dot text (a mess I know - might clean up later)
	g.selectAll(".highlightText.mGrp.enroll").transition().duration(800)
		.attr("x", function(d) { return padGraph1 + textPlace(d.WH08_alg_p, d.HI08_alg_p)[1]; })
		.text(function(d) { return Math.round(d.HI08_alg_p*100) });
	g.selectAll(".highlightText.White.enroll").transition().duration(800)
		.attr("x", function(d) { return padGraph1 + textPlace(d.WH08_alg_p, d.HI08_alg_p)[0]; })
		.text(function(d) { return Math.round(d.WH08_alg_p*100) });
	g.selectAll(".highlightText.mGrp.access").transition().duration(800)
		.attr("x", function(d) { return padGraph2 + textPlace(d.WH08_access_p, d.HI08_access_p)[1]; })
		.text(function(d) { return Math.round(d.HI08_access_p*100) });
	g.selectAll(".highlightText.White.access").transition().duration(800)
		.attr("x", function(d) { return padGraph2 + textPlace(d.WH08_access_p, d.HI08_access_p)[0]; })
		.text(function(d) { return Math.round(d.WH08_access_p*100) });

	//change the dots
	g.selectAll("circle.mGrp.enroll").transition().duration(800)
		.attr("cx", function(d) { return padGraph1 + xScale(d.HI08_alg_p); })
		.style("fill", HI_color);
	g.selectAll("circle.mGrp.access").transition().duration(800)
		.attr("cx", function(d) { return padGraph2 + xScale(d.HI08_access_p); })
		.style("fill", HI_color);

	//change the lines
	g.selectAll(".row line.enroll").transition().duration(800)
		.attr("x1", function(d) { return padGraph1 + xScale(d.HI08_alg_p); })
	g.selectAll(".row line.access").transition().duration(800)
		.attr("x1", function(d) { return padGraph2 + xScale(d.HI08_access_p); })
		.each("end", updateRank)
}


//helper function that takes a pair of values and determines the pixel values 
//for where they should be placed. If two values are too close (e.g., less than
//8 pp apart), then the text for val1 is displayed to the side of the dots rather than on
//top of each other
var smallGap = .065;
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


//event handler for highlighting a district
function highlightDistrict() {

	//change the rectangle opacity and circle radius
	var grp = d3.select(this.parentNode);
	grp.select("rect").attr("fill-opacity", 0.1);
	if (!transitioning) grp.selectAll("circle").transition().duration(150).attr("r", 10);
	if (!transitioning) grp.selectAll("line").transition().duration(150).style("stroke-width", 2);

	//make data point text visible
	grp.selectAll("text.highlightText").style("opacity", 1);

}
function unhighlightDistrict() {
	var grp = d3.select(this.parentNode);
	if (activeDistrict) if (grp.data()[0].id === activeDistrict.data()[0].id) return; 
	grp.select("rect").attr("fill-opacity", 0);
	if (!transitioning) grp.selectAll("circle").transition().duration(150).attr("r", 5);
	if (!transitioning) grp.selectAll("line").transition().duration(150).style("stroke-width", 1);
	grp.selectAll("text.highlightText").style("opacity", 0);
}

//helper function if someone clicks on a district rather than just hovers over it
var activeDistrict = null;
function clickDistrict() {

	//get the parent SVG group
	var grp = d3.select(this.parentNode)

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

//create header line and content SVG group
//svg.append("line").attr({ x1: 0, x2: width, y1: 2, y2: 2}).style({"stroke-width": 2, stroke: "#222"});
//svg.append("line").attr({ x1: 0, x2: width, y1: pad.top-5, y2: pad.top-5}).style({"stroke-width": 2, stroke: "#222"});
var g = svg.append("g").attr("transform", "translate(" + pad.left + ", " + pad.top + ")");


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
var xLegendGap = 100
var BL_color = "#56B4E9";
var WH_color = "#999999";
var HI_color = "#E69F00";
var legend = g.append("g").attr("class", "legend").attr("transform", "translate(100,-70)");
legend.append("rect").attr({x: -15, y: -15, width: xLegendGap+70, height: 30, fill: "#eee", opacity:1}).attr("stroke", "#333").attr("stroke-width", ".75").attr("class", "WB").on("click", WB_gap);
legend.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 5).style("fill", "#56B4E9").on("click", WB_gap);
legend.append("circle").attr("cx", xLegendGap).attr("cy", 0).attr("r", 5).style("fill", "#999999").on("click", WB_gap);
legend.append("text").text("Black").attr("x", 8).on("click", WB_gap);
legend.append("text").text("White").attr("x", xLegendGap+8).on("click", WB_gap);

var yLegendGap = 30;
legend.append("rect").attr({x: -15, y: -15+yLegendGap, width: xLegendGap+70, height: 30, fill: "#eee",opacity:0}).attr("stroke", "#333").attr("stroke-width", ".75").attr("class", "WH").on("click", WH_gap);
legend.append("circle").attr("cx", 0).attr("cy", yLegendGap).attr("r", 5).style("fill", "#E69F00").on("click", WH_gap);
legend.append("circle").attr("cx", xLegendGap).attr("cy", yLegendGap).attr("r", 5).style("fill", "#999999").on("click", WH_gap);
legend.append("text").text("Hispanic").attr("x", 8).attr("y", yLegendGap).on("click", WH_gap);
legend.append("text").text("White").attr("x", xLegendGap+8).attr("y", yLegendGap).on("click", WH_gap);

//add a mouse cursor for legend elements
legend.selectAll("text").style("cursor", "pointer");
legend.selectAll("circle").style("cursor", "pointer");
legend.selectAll("rect").style("cursor", "pointer");

//add legend title
legend.append("text").text("Gap (click to change):").attr("x", -15).attr("y", -28).attr("class", "title");


//load data...
d3.csv("table_top100.csv", function(data) {

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
    .attr("y", function(d) { return vertSpace*(+d.rank + 0.5 + 0.5*(+d.rank!==0)); })
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
                return "translate(0," + vertSpace*(+d.rank + 0.5 + 0.5*(+d.rank!==0)) + ")"; 
              });

  //for each district...
  rows.each(function(d) {

    //get a D3 selection of the g SVG element
    var row = d3.select(this);

    //add hover rectangle
    row.append("rect")
       .attr({
       	x: -pad.left, y: -vertSpace/2, 
       	width: pad.left + padGraph2+panelW, 
       	height: vertSpace, 
       	fill: "black", "fill-opacity": 0
       })

    //district name
    row.append("text")
      .attr("class", "name")
      .text(function(d) { return d.name; })
      .attr("x", padGraph1-12)
      .style("font-size",14)
      .style("text-anchor", "end");

    //line - graph 1
    row.append("line")
      .attr("x1", function(d) { return padGraph1 + xScale(d.BL08_alg_p); })
      .attr("x2", function(d) { return padGraph1 + xScale(d.WH08_alg_p); })
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("class","enroll")
      .style({"stroke-width": 1, stroke: "#888"});

    //circle 1 - graph 1
    row.append("circle")
      .attr("cx", function(d) { return padGraph1 + xScale(d.WH08_alg_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .style("fill", "#999999");

    //circle 2 - graph 1
    row.append("circle")
      .attr("cx", function(d) { return padGraph1 + xScale(d.BL08_alg_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .attr("class","mGrp enroll")
      .style("fill", "#56B4E9");


    //get text positions - graph 1
    var textGraph1 = textPlace(d.WH08_alg_p, d.BL08_alg_p);

    //text 1 - graph 1 (invisible for now)
    row.append("text").attr("class", "White enroll highlightText")
		.attr("x", function(d) { return textGraph1[0] + padGraph1; })
		.text(function(d) { return Math.round(d.WH08_alg_p*100) })
		.style("opacity", 0);

    //text 2 - graph 1 (invisible for now)
    row.append("text").attr("class", "mGrp enroll highlightText")
		.attr("x", function(d) { return textGraph1[1] + padGraph1; })
		.text(function(d) { return Math.round(d.BL08_alg_p*100) })
		.style("opacity", 0);

    //line - graph 2
    row.append("line")
      .attr("x1", function(d) { return padGraph2 + xScale(d.BL08_access_p); })
      .attr("x2", function(d) { return padGraph2 + xScale(d.WH08_access_p); })
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("class","access")
      .style({"stroke-width": 1, stroke: "#888"});

    //circle 1 - graph 2
    row.append("circle")
      .attr("cx", function(d) { return padGraph2 + xScale(d.WH08_access_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .style("fill", "#999999");

    //circle 2 - graph 2
    row.append("circle")
      .attr("cx", function(d) { return padGraph2 + xScale(d.BL08_access_p); })
      .attr("cy", 0)
      .attr("r", 5)
      .attr("class","mGrp access")
      .style("fill", "#56B4E9");

    //get text positions - graph 2
    var textGraph2 = textPlace(d.WH08_access_p, d.BL08_access_p);

    //text 1 - graph 2 (invisible for now)
    row.append("text").attr("class", "White access highlightText")
		.attr("x", function(d) { return textGraph2[0] + padGraph2; })
		.text(function(d) { return Math.round(d.WH08_access_p*100) })
		.style("opacity", 0);

    //text 2 - graph 2 (invisible for now)
    row.append("text").attr("class", "mGrp access highlightText")
		.attr("x", function(d) { return textGraph2[1] + padGraph2; })
		.text(function(d) { return Math.round(d.BL08_access_p*100) })
		.style("opacity", 0);

    //add event handlers to all child elements for highlighting rows
    row.selectAll("*")
    	.on("mouseover", highlightDistrict)
    	.on("mouseout", unhighlightDistrict)
    	.on("click", clickDistrict);

  });

});
