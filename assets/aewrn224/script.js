
//jQuery for smooth transitions
//https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700);
        return false;
      }
    }
  });
});

//jQuery for changing the active navigation link
$(document).on("ready", function() {

	//get scrolll positions of HTML sections
	var pos2 = $("#elite").position().top - 30;
	var pos3 = $("#top25rank").position().top - 30;

  	//whenever the scroll position changes...
	$(document).scroll(function() {
	
		//get current HTML section
		var curr = $(document).scrollTop();
		var section = 1;
		if (curr > pos2) section = 2;
		if (curr > pos3) section = 3;

		//change active class if there's a change in HTML section
		var currSection = +$(".nav").find(".active").attr("num");
		if (section != currSection) {
			$(".nav").find(".active").removeClass("active");
			if (section==1) $(".nav").find("#link1").addClass("active");
			if (section==2) $(".nav").find("#link2").addClass("active");
			if (section==3) $(".nav").find("#link3").addClass("active");
		}
	});
});







//scale
var scaleRB6 = ['rgb(178,24,43)','rgb(239,138,98)','rgb(253,219,199)','rgb(209,229,240)','rgb(103,169,207)','rgb(33,102,172)'];
var colors = d3.scale.quantize().domain([30, 0]).range(scaleRB6);
//var radii  = [3, 5, 7, 9, 11];
//var radii = [3, 5.2, 6.7, 7.9, 9];
//var radii = [4, 6.9, 8.9, 10.6, 12];
var radii = [4, 6.9, 8.9, 10.6];
var getRad = d3.scale.quantize().domain([0, 100]).range(radii);

//create map
L.mapbox.accessToken = 'pk.eyJ1IjoiZHVuZXIiLCJhIjoiaWkwMnJIZyJ9.2zMvIebbUOk9C5R2itT7Dg';
map = L.mapbox.map('map', 'duner.k778d658');
//L.mapbox.accessToken = 'pk.eyJ1IjoiZC1taWxsZXIiLCJhIjoiVnlXU3Q2YyJ9.KCoT1vzItxIP3DEg_rgs8g';
//map = L.mapbox.map('map', 'd-miller.lkca85b8');

var start = [37, -93.4];
map.setView(start, 4);
map.legendControl.addLegend(document.getElementById('legend').innerHTML);

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

var buttonAll = d3.select("label[for='all']");
var buttonTop25 = d3.select("label[for='top25']");
buttonAll.on("click", showAll).style("cursor", "pointer");
buttonTop25.on("click", showTop25).style("cursor", "pointer");

//add schools
var colleges = {};
d3.csv("data.csv", function(csv) {
	map.on('load', function(e) {
    	$('#map-ui').css({'display': 'block'});
	});

	for (var i = 0; i < csv.length; i++) {

		//grab data for individual school
		var d = csv[i];

		//add circle for the school to the map
		var college = L.circleMarker([d.lat, d.lon], {
						color: "black",
						weight: 1.5,
						opacity: 0.8,
						fillColor: colors(d.prct),
						fillOpacity: 0.8,
						className: "leaflet-school-circle " + d.id,
						radius: getRad(d.numF)});
		college.addTo(map);
		colleges[d.id] = college;

		//configure tooltip
  		var extremeColor = (colors(d.prct) == "rgb(178,24,43)") || (colors(d.prct) == "rgb(33,102,172)");
		var prctStyle = 'style="background: ' + colors(d.prct) + '; color: ' + (extremeColor ? "white" : "black") + ';"';
		var popupContent = 
		'<div class="tooltipLeaflet"><table><col style="width:90%"><col style="width:10%">' + 
		'<tr><td class="name">' + d.name + '</td>' + 
		'<td><span class="prctF" ' + prctStyle + '>' + d.prctStr + '</span></td></tr>' + 
		'<tr><td colspan="2" class="degreeText">' + d.numF + ' women (' + d.total + ' total), 2011-2013</td></tr></table></div>';
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

var region = d3.select(".g-step");
var regionNum = 0;
var regionMax = 9;
d3.select(".g-view-title").text(region.attr("data-title"));
d3.select(".g-view-text").text(region.attr("data-text"));
//changeRegion();

//add event listeners
d3.selectAll(".g-step").on("click", clickRegion);
d3.select(".g-prev").on("click", prevRegion);
d3.select(".g-next").on("click", nextRegion);

//define the event listeners
function prevRegion() { if (regionNum != 0) changeRegion(d3.select(d3.selectAll(".g-step")[0][regionNum-1])); }
function nextRegion() { if (regionNum != regionMax) changeRegion(d3.select(d3.selectAll(".g-step")[0][regionNum+1])); }
function clickRegion() { changeRegion(d3.select(this)); };

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
}

//helper function for highlighting school from stepper text
function highlightSchl() {
	colleges[d3.select(this).attr("schl")].openPopup();
}
function deselectSchl() {
	colleges[d3.select(this).attr("schl")].closePopup();
}

//data on "focal" cities
focal = [
  {num: 0, name: "Chicago", lat: 41.8369, lon: -87.6847, zoom: 5},
  {num: 1, name: "Boston", lat: 42.3601, lon: -71.0589-.08, zoom: 11},
  {num: 2, name: "New York City", lat: 40.7127, lon: -74.0059, zoom: 10},
  {num: 3, name: "Washington D.C.", lat: 38.9047, lon: -77.0164-.1, zoom: 11},
  {num: 4, name: "Atlanta", lat: 33.7550+.1, lon: -84.3900, zoom: 10},
  {num: 5, name: "Chicago", lat: 41.8369+.05, lon: -87.6847, zoom: 10},
  {num: 6, name: "Salt Lake City", lat: 40.7500+.2, lon: -111.8833, zoom: 8},
  {num: 7, name: "LA County", lat: 34.0500-0.1, lon: -118.2500+0.1, zoom: 9},
  {num: 8, name: "Bay area", lat: 37.6910+.1, lon: -122.3108+.25, zoom: 8},
  {num: 9, name: "Seattle", lat: 47.6097 - 0.14, lon: -122.3331, zoom: 9}
];

function focus(cityNum) {
	var d = focal[cityNum];
	map.setView([d.lat, d.lon], d.zoom);
}

function reset() {
	map.setView(start, 4, {animate: true});
}




