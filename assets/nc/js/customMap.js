//color and radius scales for colleges
var scaleRB6 = [
  'rgb(255,255,255)', // $0
  'rgb(255,209,213)', // $1–$100K
  'rgb(255,155,164)', // $100K–$500K
  'rgb(244,99,111)',  // $500K–$1M
  'rgb(211,51,69)',   // $1M–$5M
  'rgb(178,24,43)'    // $5M+
];

var colors = d3.scale.threshold()
  .domain([1, 100000, 500000, 1000000, 5000000])
  .range(scaleRB6);

var radii = [4, 6.9, 8.9, 10.6];
var getRad = d3.scale.quantize().domain([1, 5]).range(radii);


/*mapboxgl.accessToken = 'pk.eyJ1IjoiZC1taWxsZXIiLCJhIjoiY212MzNiNzVhMGZ2dDJ5cHpjb3dxZzN2dyJ9.6FfP3qeSD6I8sPy7AD9BEw';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/d-miller/cjry6bv1a2dvy1ftegyvp6753',
	center: [-79.5, 35.7],
	zoom: 6
});*/


//create and initialize map
/*L.mapbox.accessToken = 'pk.eyJ1IjoiZC1taWxsZXIiLCJhIjoiY212MzNiNzVhMGZ2dDJ5cHpjb3dxZzN2dyJ9.6FfP3qeSD6I8sPy7AD9BEw';
//map = L.mapbox.map('map', 'mapbox://styles/d-miller/cjry6bv1a2dvy1ftegyvp6753');
map = L.mapbox.map("map");*/

    // Your Mapbox access token
    const token = 'pk.eyJ1IjoiZC1taWxsZXIiLCJhIjoiY212MzNiNzVhMGZ2dDJ5cHpjb3dxZzN2dyJ9.6FfP3qeSD6I8sPy7AD9BEw';

    // Initialize Leaflet map
    const map = L.map('map');

    // Add your custom Mapbox Studio style
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/d-miller/cjry6bv1a2dvy1ftegyvp6753/tiles/256/{z}/{x}/{y}?access_token=' + token,
      {
        tileSize: 256,
        maxZoom: 20,
        attribution: '&copy; OpenStreetMap &copy; Mapbox'
      }
    ).addTo(map);

var start = [35.46961797120201, -79.508056640625];
var startZoom = 7;
map.setView(start, startZoom);
//map.legendControl.addLegend(d3.select('#legend').html());

// Create a legend
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function(map) {
  const div = L.DomUtil.create('div', 'map-legend');

  div.innerHTML = d3.select('#legend').html();

  return div;
};

legend.addTo(map);

//zooming options
map.zoomControl.setPosition('bottomleft');
map.options.minZoom = 4;
map.options.maxZoom = 13;
//map.scrollWheelZoom.disable();

//helper functions for showing all/top25 schools
function showTop25() {
	buttonTop25.classed("active", true);
	buttonAll.classed("active", false);
	d3.selectAll(".leaflet-school-circle")
	  .transition().duration(500)
	  .style("opacity", function(d) { return (d.ate_5yr > 0) ? 1 : 0})
	  .each("end", function() {
	  	d3.select(this).style("display", function(d) { return (d.ate_5yr > 0) ? "" : "none"});
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
d3.csv("data/nc.csv", function(csv) {
	for (var i = 0; i < csv.length; i++) {

		//grab data for individual school
		var d = csv[i];

		//add circle for the school to the map
		var college = L.circleMarker([d.lat, d.lon], {
						color: "black",
						weight: 1.5,
						opacity: 0.8,
						fillColor: colors(d.ate_5yr),
						fillOpacity: 0.8,
						className: "leaflet-school-circle " + d.id,
						radius: getRad(d.ic2025size)});
		college.addTo(map);
		colleges[d.id] = college;

		//configure tooltip
  	var extremeColor = (colors(d.ate_5yr) == "rgb(178,24,43)") || (colors(d.ate_5yr) == "rgb(33,102,172)");
		var prctStyle = 'style="background: ' + colors(d.ate_5yr) + '; color: ' + (extremeColor ? "white" : "black") + ';"';
		var popupContent = 
		'<div class="tooltipLeaflet"><table><col style="width:90%"><col style="width:10%">' + 
		'<tr><td class="name">' + d.instnm + '</td>' + 
		'<td><span class="prctF" ' + prctStyle + '>' + d.ate_5yr_text + '</span></td></tr>' + 
		'<tr><td colspan="2" class="degreeText">' + d.ate_awards + '</td></tr></table></div>';
		
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
focal = [
	{num: 0, name: "Overall", lat: 35.146862906756304, lon: -79.51904296874999, zoom: 7},
  {num: 1, name: "Research Triangle", lat: 35.808904044068626, lon: -78.6181640625, zoom: 9},
  {num: 2, name: "Southeastern NC", lat: 34.538237527295756, lon: -77.882080078125, zoom: 8},
  {num: 3, name: "Eastern NC", lat: 35.782170703266075, lon: -76.6241455078125, zoom: 8},
  {num: 4, name: "Piedmont Triad", lat: 35.95021815265235, lon: -79.8211669921875, zoom: 10},
  {num: 5, name: "Charlotte Metro", lat: 35.263561862152095, lon:  -80.9088134765625, zoom: 9},
  {num: 6, name: "Western NC", lat: 35.65729624809628, lon: -81.91955566406249, zoom: 8}
];

//basic variables about the stepper regions
var region = d3.select(".g-step");
var regionNum = 0;
var regionMax = 6;

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

//helpfer function for changing the region based on the stepper
function changeRegion(next) {

	//update bookkeeping
	region.classed("g-selected", false);
	region = next;
	regionNum = +next.attr("data-num");

	//change region
	next.classed("g-selected", true);
	if (regionNum==0) reset();
	if (regionNum!=0) focus( +next.attr("data-num") );
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




