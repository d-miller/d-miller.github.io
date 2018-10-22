//color and radius scales for colleges
//var scaleRB6 = ['rgb(178,24,43)','rgb(239,138,98)','rgb(253,219,199)','rgb(209,229,240)','rgb(103,169,207)','rgb(33,102,172)'];
var scaleRB6 = ['rgb(33,102,172)', 'rgb(103,169,207)', 'rgb(209,229,240)', 'rgb(253,219,199)', 'rgb(239,138,98)', 'rgb(178,24,43)'];


//var colors = d3.scale.threshold().domain([0.01, 20.01, 40.01, 60.01, 80.01]).range(scaleRB6);
var colors = d3.scale.quantize().domain([0, 30]).range(scaleRB6);
//var radii = [4, 6.9, 8.9, 10.6];
var radii = [3, 5, 6.5, 8];
var getRad = d3.scale.quantize().domain([0, 100]).range(radii);

//create and initialize map
L.mapbox.accessToken = 'pk.eyJ1IjoiZHVuZXIiLCJhIjoiaWkwMnJIZyJ9.2zMvIebbUOk9C5R2itT7Dg';
map = L.mapbox.map('map', 'd-miller.62169c98');
//var start = [41.8369, -87.6847];
var start = [37, -93.4];
var startZoom = 4;
map.setView(start, startZoom);
map.legendControl.addLegend(d3.select('#legend').html());

//zooming options
map.zoomControl.setPosition('bottomleft');
map.options.minZoom = 4;
map.options.maxZoom = 13;
map.scrollWheelZoom.disable();

//helper functions for showing all/top25 schools
function showTop25() {
	buttonTop25.classed("active", true);
	buttonAll.classed("active", false);
	d3.selectAll(".leaflet-school-circle")
	  .transition().duration(500)
	  .style("opacity", function(d) { return (d.top25 == 1) ? 1 : 0})
	  .each("end", function() {
	  	d3.select(this).style("display", function(d) { return (d.top25 == 1) ? "" : "none"});
	  });
	  
}
function showAll() {
	buttonTop25.classed("active", false);
	buttonAll.classed("active", true);
	d3.selectAll(".leaflet-school-circle")
	  .style("display", "")
	  .transition().duration(500)
	  .style("opacity", 1);
}


//add event listeners
var buttonAll = d3.select("label[for='all']");
var buttonTop25 = d3.select("label[for='top25']");
buttonAll.on("click", showAll).style("cursor", "pointer");
buttonTop25.on("click", showTop25).style("cursor", "pointer");

//add schools
var colleges = {};
//d3.csv("data/all.csv", function(csv) {
d3.csv("data/map_school.csv", function(csv) {
	for (var i = 0; i < csv.length; i++) {

		//grab data for individual school
		var d = csv[i];

		//add circle for the school to the map
		var college = L.circleMarker([d.lat, d.lon], {
						color: "black",
						weight: 1.5,
						opacity: 0.75,
						fillColor: colors(d.prct),
						fillOpacity: 0.75,
						className: "leaflet-school-circle " + d.id,
						radius: getRad(d.total)});
		college.addTo(map);
		colleges[d.id] = college;

		//configure tooltip
		//todo: need to not hard code the extreme colors
  		var extremeColor = (colors(d.prct) == "rgb(178,24,43)") || (colors(d.prct) == "rgb(33,102,172)");
		var prctStyle = 'style="border-radius: 5px; background: ' + colors(d.prct) + '; color: ' + (extremeColor ? "white" : "black") + ';"';
		var popupContent = 
		'<div class="tooltipLeaflet"><table><col style="width:90%"><col style="width:10%">' + 
		'<tr><td class="name">' + d.name + '</td>' + 
		'<td><span class="prctF" ' + prctStyle + '>' + d3.round(d.prct, 1) + '%</span></td></tr>' + 
		'<tr><td colspan="2" class="degreeText">' + d.total + ' students in grade 8</td></tr></table></div>';
		
		//add event listeners for tooltip
		college.bindPopup(popupContent);
		college.on('mouseover', function (e) { this.openPopup();  });
		college.on('mouseout', function (e) {  this.closePopup(); });
	}

	//after circles have been added, bind data to them for using D3
	d3.selectAll(".leaflet-zoom-animated path").data(csv);

});

///////////////////////////
// stepper functionality //
///////////////////////////

//data on "focal" cities
//the name property isn't used later - here for the programmer instead
focal = [
  {num: 0, name: "The Nation", lat: 37, lon: -93.4, zoom: 4},
  {num: 1, name: "Chicago", lat: 41.8369, lon: -87.6847, zoom: 10},
  {num: 2, name: "Elk Grove", lat: 38.4088+.15, lon: -121.3716, zoom: 10},
  {num: 3, name: "Oakland", lat: 42.5922, lon: -83.3362, zoom: 10},
  {num: 4, name: "Washington D.C.", lat: 38.9047, lon: -77.0164-.1, zoom: 11},
  {num: 5, name: "New York City", lat: 40.7127+.04, lon: -74.0059+.1, zoom: 10},
  {num: 6, name: "LA County", lat: 34.0500-0.1, lon: -118.2500+0.1, zoom: 10},
  {num: 7, name: "Bay area", lat: 37.6910, lon: -122.3108+.25, zoom: 9},
  {num: 8, name: "Seattle", lat: 47.6097 - 0.14, lon: -122.3331, zoom: 9},
  {num: 9, name: "Minneapolis", lat: 44.9778, lon: -93.2650, zoom: 10},
];

//basic variables about the stepper regions
var region = d3.select(".g-step");
var regionNum = 0;
var regionMax = 9;

//initialize the view text
d3.select(".g-view-title").text(region.attr("data-title"));
d3.select(".g-view-text").html(region.attr("data-text"));
d3.selectAll(".g-view-text a").on("mouseover", highlightSchl);
d3.selectAll(".g-view-text a").on("mouseout", deselectSchl);
d3.select("#top25Link").on("mouseover", function() { $("#top25Button").click(); })
d3.select("#top25Link").on("mouseout", function() { $("#allButton").click(); })

//add event listeners to the prev/next buttons
d3.selectAll(".g-step").on("click", clickRegion);
d3.select(".g-prev").on("click", prevRegion);
d3.select(".g-next").on("click", nextRegion);

//define the event listeners
function prevRegion() { if (regionNum != 0) changeRegion(d3.select(d3.selectAll(".g-step")[0][regionNum-1])); }
function nextRegion() { if (regionNum != regionMax) changeRegion(d3.select(d3.selectAll(".g-step")[0][regionNum+1])); }
function clickRegion() { changeRegion(d3.select(this)); };

//helper function for changing the region based on the stepper
function changeRegion(next) {

	//update bookkeeping
	region.classed("g-selected", false);
	region = next;
	regionNum = +next.attr("data-num");

	//change region
	next.classed("g-selected", true);
	focus( +next.attr("data-num") );
	//if (regionNum==0) reset();
	//if (regionNum!=0) focus( +next.attr("data-num") );
	d3.select(".g-view-title").html(next.attr("data-title"));
	d3.select(".g-view-text").html(next.attr("data-text"));

	//enable highlighting from the stepper text
	d3.selectAll(".g-view-text a").on("mouseover", highlightSchl);
	d3.selectAll(".g-view-text a").on("mouseout", deselectSchl);

	//update the clicking buttons
	d3.select(".g-prev").classed("g-disabled", regionNum == 0);
	d3.select(".g-next").classed("g-disabled", regionNum == regionMax);

	//enable highlighting of top 25 programs
	d3.select("#top25Link").on("mouseover", function() { $("#top25Button").click(); })
	d3.select("#top25Link").on("mouseout", function() { $("#allButton").click(); })
}

//helper functions for highlighting school from stepper view text
function highlightSchl() { colleges[d3.select(this).attr("schl")].openPopup(); }
function deselectSchl() {  colleges[d3.select(this).attr("schl")].closePopup(); }

//how to focus in a particilar geographic region
function focus(cityNum) {
	var d = focal[cityNum];
	map.setView([d.lat, d.lon], d.zoom);
	//map.flyTo([d.lat, d.lon], d.zoom);
}

//how to reset to a national view
function reset() {
	map.setView(start, startZoom, {animate: true});
}




