//Mapbox IDs
var mapStyle = "mapbox://styles/d-miller/cjry6bv1a2dvy1ftegyvp6753";
//var stateSource = "mapbox://d-miller.9kxhea4q";
//var distSource = "mapbox://d-miller.2r746qu6";
var stateSource = "mapbox://d-miller.8sa9h84b";
var distSource = "mapbox://d-miller.dxv0zvpl";
var schlSource = "mapbox://d-miller.5h19yk8k";
var schlSourceLayer = "school-8i3ui3";

//maximum fill opacity of states & districts
var mapOpacity = .8;

//legend display properties
var legendW = 200;
var legendH = 53;
var legendPad = {left: 15, right: 15};
var blackNotes = [
  {x: -10, y: 18, text:"Black", textA: "start"}, 
  {x: -10, y: 29, text:"higher", textA: "start"}, 
  {x: legendW+10, y: 18, text:"White", textA: "end"}, 
  {x: legendW+10, y: 29, text:"higher", textA: "end"}
];
var hispNotes = [
  {x: -10, y: 18, text:"Hispanic", textA: "start"}, 
  {x: -10, y: 29, text:"higher", textA: "start"}, 
  {x: legendW+10, y: 18, text:"White", textA: "end"}, 
  {x: legendW+10, y: 29, text:"higher", textA: "end"}
];

//display properties for overall rates
//var allC = ['#dadaeb','#bcbddc','#9e9ac8','#756bb1','#54278f'];
var allC = ['#cbc9e2','#9e9ac8','#756bb1','#54278f'];
var all_enroll = {
  topTitle: "8th Grade Algebra Enrollment",
  //legendCuts: [.2, .4, .6, .8],
  legendCuts: [.2, .4, .7],
  legendEnds: [0, 1],
  legendAddEnds: true,
  legendTickFormat: d3.format("%"),
  legendTitle: "Overall Enrollment Rate",
  legendColors: allC,
  fill: ["case", ["has", "G08_alg_p"],
          ["step", ["get", "G08_alg_p"],
            "hsla(0, 57%, 36%, 0)", 
            0, allC[0], 
            0.2, allC[1], 
            0.4, allC[2], 
            0.7, allC[3]
            //0.6, allC[3],
            //0.8, allC[4]
            ],
          "hsla(0, 57%, 36%, 0)"]
};
all_enroll.school_fill = all_enroll.fill;

//display properties for overall access
var all_access = {
  topTitle: "Access to 8th Grade Algebra",
  //legendCuts: [.2, .4, .6, .8],
  legendCuts: [.2, .4, .7],
  legendEnds: [0, 1],
  legendAddEnds: true,
  legendTickFormat: d3.format("%"),
  legendTitle: "Overall Access Rate",
  legendColors: allC,
  fill: ["case", ["has", "G08_access_p"],
          ["step", ["get", "G08_access_p"],
            "hsla(0, 57%, 36%, 0)", 
            0, allC[0], 
            0.2, allC[1], 
            0.4, allC[2], 
            0.7, allC[3]
            //0.6, allC[3],
            //0.8, allC[4]
            ],
          "hsla(0, 57%, 36%, 0)"]
};
all_access.school_fill = all_access.fill;

//display properties for White-Black enrollment gap
var WB_enroll = {
  topTitle: "White – Black Gap in 8th Grade Algebra Enrollment",
  legendCuts: [-15, -5, 5, 15],
  legendEnds: [-27.5, 27.5],
  legendTitle: "Enrollment Gap",
  legendNotes: blackNotes,
  legendColors: ["#008837", "#a6dba0", "#bfbfbf", "#92c5de","#0571b0"],
    fill: ["case", ["has", "WB_n"], 
      ["case", [ ">", ["get", "WB_n"], 10],
        ["step", ["get", "WB_diff"],
          "hsla(0, 0%, 0%, 0)", 
          -1, "#008837", 
          -0.15, "#a6dba0",
          -0.05, "#bfbfbf",
          0.05, "#92c5de",
          0.15, "#0571b0"],
        "hsla(0, 0%, 0%, 0)"],
      "hsla(0, 0%, 0%, 0)"],
  school_fill: "#3b3b3b"
};

//display properties for White-Black access gap
var WB_access = {
  topTitle: "White – Black Gap in Access to 8th Grade Algebra",
  legendCuts: [-15, -5, 5, 15],
  legendEnds: [-27.5, 27.5],
  legendTitle: "Access Gap",
  legendNotes: blackNotes,
  legendColors: ["#008837", "#a6dba0", "#bfbfbf", "#92c5de","#0571b0"],
  fill: ["case", ["has", "WB_n"], 
          ["case", [ ">", ["get", "WB_n"], 10],
            ["step", ["get", "WB_access"],
              "hsla(0, 0%, 0%, 0)", 
              -1, "#008837", 
              -0.15, "#a6dba0",
              -0.05, "#bfbfbf",
              0.05, "#92c5de",
              0.15, "#0571b0"],
            "hsla(0, 0%, 0%, 0)"],
          "hsla(0, 0%, 0%, 0)"],
  school_fill: "#3b3b3b"
  };

//display properties for White-Hisp. enrollment gap
var WH_enroll = {
  topTitle: "White – Hispanic Gap in 8th Grade Algebra Enrollment",
  legendCuts: [-15, -5, 5, 15],
  legendEnds: [-27.5, 27.5],
  legendTitle: "Enrollment Gap",  
  legendNotes: hispNotes,
  legendColors: ["#008837", "#a6dba0", "#bfbfbf", "#92c5de","#0571b0"],
  fill: ["case", ["has", "WH_n"], 
          ["case", [ ">", ["get", "WH_n"], 10],
            ["step", ["get", "WH_diff"],
              "hsla(0, 0%, 0%, 0)", 
              -1, "#008837", 
              -0.15, "#a6dba0",
              -0.05, "#bfbfbf",
              0.05, "#92c5de",
              0.15, "#0571b0"],
            "hsla(0, 0%, 0%, 0)"],
          "hsla(0, 0%, 0%, 0)"],
  school_fill: "#3b3b3b"
  };

//display properties for White-Hisp. access gap
var WH_access = {
  topTitle: "White – Hispanic Gap in Access to 8th Grade Algebra",
  legendCuts: [-15, -5, 5, 15],
  legendEnds: [-27.5, 27.5],
  legendTitle: "Access Gap",
  legendNotes: hispNotes,
  legendColors: ["#008837", "#a6dba0", "#bfbfbf", "#92c5de","#0571b0"],
  fill: ["case", ["has", "WH_n"], 
          ["case", [ ">", ["get", "WH_n"], 10],
            ["step", ["get", "WH_access"],
              "hsla(0, 0%, 0%, 0)", 
              -1, "#008837", 
              -0.15, "#a6dba0",
              -0.05, "#bfbfbf",
              0.05, "#92c5de",
              0.15, "#0571b0"],
            "hsla(0, 0%, 0%, 0)"],
          "hsla(0, 0%, 0%, 0)"],
  school_fill: "#3b3b3b"
  };

//combine display properties into one master object
var displayProps = {all_enroll: all_enroll, 
                    all_access: all_access, 
                    WB_enroll: WB_enroll, 
                    WB_access: WB_access,
                    WH_enroll: WH_enroll, 
                    WH_access: WH_access};

mapboxgl.accessToken = 'pk.eyJ1IjoiZC1taWxsZXIiLCJhIjoiVnlXU3Q2YyJ9.KCoT1vzItxIP3DEg_rgs8g';
var map = new mapboxgl.Map({
  container: 'map',
  style: mapStyle,
  center: [-97.7, 38],
  zoom: 3.1,
  pitchWithRotate: false
});

// disable map zoom when using scroll
//map.scrollZoom.disable();

//minimum # of students to display a gap
var gapMinN = 10;

//message to put at bottom of tooltip note
var tooltipEnd = "";

//use a pointer cursor
map.getCanvas().style.cursor = 'default';


//load data of schools' locations using D3 library
var geo_lat = [];
var geo_lon = [];
var geo_name = [];
var geo_schl = [];
d3.csv("https://raw.githubusercontent.com/d-miller/d-miller.github.io/master/alg8/data/geoLoc.csv", function(d) {
  d.forEach(function(d) {      //comment this line if using D3 version 5
    geo_lat.push(+d.lat);
    geo_lon.push(+d.lon);
    geo_schl.push(+d.school);
    geo_name.push(d.title);
  });                         //comment this line if using D3 version 5
});

//takes index position and outputs a Carmen geojson format
function getFeature(pos) {

  //figure out the offset for the bounding box based on if it's a school or not
  var off = geo_schl[pos] == 1 ? .01 : .25;
  var emoji = geo_schl[pos] == 1 ? '📚 ' : '🏫 ';

  //return as Carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
  return {
    center: [geo_lon[pos], geo_lat[pos]],
    bbox: [geo_lon[pos]-off, geo_lat[pos]-off, geo_lon[pos]+off, geo_lat[pos]+off],
    geometry: {
      type: "Point",
      coordinates: [geo_lon[pos], geo_lat[pos]]
    },
    place_name: emoji + geo_name[pos],
    place_type: ['school'],
    properties: {},
    type: "Feature"
  }
}

//takes a search string and returns Carmen geojson format of matches
//https://www.mapbox.com/mapbox-gl-js/example/forward-geocode-custom-data/
//https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-local-geocoder/
function forwardGeocoder(query) {
    var matchingFeatures = [];
    for (var i = 0; i < geo_name.length; i++) {
        // handle queries with different capitalization than the source data by calling toLowerCase()
        if (geo_name[i].toLowerCase().search(query.toLowerCase()) !== -1) {
            matchingFeatures.push(getFeature(i));
        }
    }
    return matchingFeatures;
}

//add geocoder search feature
map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  localGeocoder: forwardGeocoder,
  placeholder: "Search for a school or district"
}));

//move the geocoder outside the map div
var geocoderContent = document.getElementsByClassName("mapboxgl-ctrl-geocoder")[0];
document.getElementById("geocoderDiv").append(geocoderContent);

//the above code could be move elegant by using jQuery (commented line below)
//but I wanted to reduce the number of JS libraries/remove dependencies
//$("#geocoderDiv").append($(".mapboxgl-ctrl-geocoder"));

//add zoom controls
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

// disable map zoom when using scroll
map.scrollZoom.disable();

//add the horizontal legend


changeLegend(WB_enroll, true);
function changeLegend(props, draw) {

  if (draw) {

    //add SVG container and background rectangle
    d3.select("#mapLegendSVG")
      .append("svg")
        .attr("width", legendW + legendPad.left + legendPad.right)
        .attr("height", legendH)
      .append("rect")
        .attr("width", legendW + legendPad.left + legendPad.right)
        .attr("height", legendH)
        .attr("fill", "white")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill-opacity", 0.8);

    //add grouping element and text for the title
    d3.select("#mapLegendSVG svg")
      .append("g")
        .attr("class", "mapLegend")
        .attr("transform", "translate(" + legendPad.left + ", 20)")
      .append("text")
        .attr("class", "caption");
  }  

  var g = d3.select("#mapLegendSVG g");
  var cuts = props.legendCuts;
  var ends = props.legendEnds; 
  var colors = props.legendColors;

  const color = d3.scale.threshold()
    .domain(cuts)
    .range(colors)
  
  const x = d3.scale.linear()
      .domain(ends)
      .rangeRound([0, legendW]);

  //figure out the buckets of range values
  //use "ends" for the first bucket's start and last bucket's end
  var buckets = color.range().map(d => color.invertExtent(d))
  buckets[0][0] = ends[0];
  buckets[buckets.length-1][1] = ends[1];

  //add tick values for the end if requested
  var ticks = cuts.slice()
  if (props.legendAddEnds) {
    ticks.unshift(ends[0]);
    ticks.push(ends[1]);
  }

  //add the ticks
  g.select("g.axis").remove();
  g.append("g").attr("class", "axis")
    .call(d3.svg.axis()
          .tickFormat(props.legendTickFormat)
          .scale(x)
          .orient("bottom")
          .tickSize(13)
          .tickValues(ticks))
        .select(".domain")
      .remove();

  //add the color rectangle
  g.selectAll("rect.colorRect").remove();
  g.selectAll("rect.colorRect")
   .data(buckets)
   .enter()
   .append("rect")
    .attr("class", "colorRect")
    .attr("height", 8)
    .attr("x", d => x(d[0]))
    .attr("width", d => x(d[1]) - x(d[0]))
    .attr("fill", d => color(d[0]))
    .attr("fill-opacity", mapOpacity);

  //add legend title
  g.select("text.caption")
      .attr("y", -6)
      .attr("font-weight", "bold")
      .text(props.legendTitle);

  //add text notes
  g.selectAll("text.notes").remove();
  if (props.legendNotes) {
    g.selectAll("text.notes")
    .data(props.legendNotes).enter()
    .append("text")
      .attr("class", "notes")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", d => d.textA)
      .text(d => d.text);
  }
}


//updates the legend given an object with display properties
/*function updateLegend(props) {
  var svg = d3.select("#extMapLegend svg")
  var g = svg.select("g");
  var width = svg.attr("width");
  const color = d3.scale.threshold()
    .domain(props.cuts)
    .range(props.colors);
  
  const x = d3.scale.linear()
      .domain(props.legendEnds)
      .rangeRound([0, width]);

  //figure out the buckets of range values
  //use "ends" for the first bucket's start and last bucket's end
  var buckets = color.range().map(d => color.invertExtent(d))
  buckets[0][0] = ends[0];
  buckets[buckets.length-1][1] = ends[1];
}*/

//helper function that takes two proportions as input and 
//outputs text describetion the difference between them
function textGap(props) {

  //determine variable names based on the chosen display variable
  if (displayVar === "WB_enroll") {
    var v1 = "BL08_alg_p";
    var v2 = "WH08_alg_p";
    var g1name = "Black";
    var g2name = "White";
  }
  if (displayVar === "WB_access") return "";
  if (displayVar === "WH_access") return "";
  if (displayVar === "WH_enroll") {
    var v1 = "HI08_alg_p";
    var v2 = "WH08_alg_p";
    var g1name = "Hispanic";
    var g2name = "White";
  }

  //get data
  var g1 = props[v1];
  var g2 = props[v2];

  //get percentage strings
  var g1perc = parseFloat((100*g1).toPrecision(2)) + "%";
  var g2perc = parseFloat((100*g2).toPrecision(2)) + "%";

  //these strings should be "N/A" if input proportion is -99 (missing)
  if (g1 == -99) g1perc = "N/A";
  if (g2 == -99) g2perc = "N/A";

  //handle special cases involving 0%
  if (g1==0 & g2==0) return "No " + g1name + " or " + g2name + " student took grade 8 algebra";
  if (g1==0) return "No " + g1name + " took grade 8 algebra, but " + g2perc + " of " + g2name + " students did";
  if (g2==0) return g1perc + " of " + g1name + " students took grade 8 algebra, but no " + g2name + " student did";

  //if the rates were equal
  if (g1 == g2) return g1name + " and " + g2name + " students were equally likely to grade 8 algebra (" + 
                       g1perc + " vs. " + g2perc + ")";

  //otherwise report the relative ratio
  var diff = Math.abs(Math.round(100*(g1/g2 - 1)));
  if (g1 < g2) diff = diff + "% less likely";
  if (g1 > g2) diff = diff + "% more likely";
  return g1name + " students were " + diff + " than " + g2name + 
         " students to take grade 8 algebra (" + g1perc + " vs. " + g2perc + ")";
}

//helper function that takes two proportions as input and 
//outputs a table HTML of them along with # of students
function tableGap(props, schoolLevel) {

  //determine variable names based on the chosen display variable
  if (displayVar === "WB_enroll") {
    var v1 = "BL08_alg_p";
    var v2 = "WH08_alg_p";
    var g1name = "Black";
    var g2name = "White";
    var g1n = props["BL08"];
    var g2n = props["WH08"];
  }
  if (displayVar === "WB_access") {
    var v1 = "BL08_access_p";
    var v2 = "WH08_access_p";
    var g1name = "Black";
    var g2name = "White";
    var g1n = props["BL08"];
    var g2n = props["WH08"];
  }
  if (displayVar === "WH_enroll") {
    var v1 = "HI08_alg_p";
    var v2 = "WH08_alg_p";
    var g1name = "Hisp.";
    var g2name = "White";
    var g1n = props["HI08"];
    var g2n = props["WH08"];
  }
  if (displayVar === "WH_access") {
    var v1 = "HI08_access_p";
    var v2 = "WH08_access_p";
    var g1name = "Hisp.";
    var g2name = "White";
    var g1n = props["HI08"];
    var g2n = props["WH08"];
  }

  //get data
  var all = props.G08_alg_p;
  var g1 = props[v1];
  var g2 = props[v2];
  var all_n = props.G08;


  //get percentage strings
  var all_perc = parseFloat((100*all).toPrecision(2)) + "%";
  var g1perc = parseFloat((100*g1).toPrecision(2)) + "%";
  var g2perc = parseFloat((100*g2).toPrecision(2)) + "%";

  //these strings should be "N/A" if input proportion is -99 (missing) or size is 0
  if (all == -99 | all_n == 0) g1perc = "N/A";
  if (g1 == -99 | g1n == 0) g1perc = "N/A";
  if (g2 == -99 | g2n == 0) g2perc = "N/A";

  //suppress if showing data for an individual school
  if (schoolLevel) g1perc = "-";
  if (schoolLevel) g2perc = "-";

  //also suppress if >0 but less than minimum reporting n
  if (all_n > 0 & all_n < gapMinN) all_perc = "-";
  if (g1n > 0 & g1n < gapMinN) g1perc = "-";
  if (g2n > 0 & g2n < gapMinN) g2perc = "-";

  //get HTML for each row
  var header = "<tr><th>Group</th><th>G8 Size</th><th>Rate</th></tr>";
  var all_row = "<tr><td>All</td><td>" + all_n + "</td><td>" + all_perc;
  var g1row = "<tr><td>" + g1name + "</td><td>" + g1n + "</td><td>" + g1perc;
  var g2row = "<tr><td>" + g2name + "</td><td>" + g2n + "</td><td>" + g2perc;

  //return the full table HTML
  if (schoolLevel) return "<table>" + header + all_row + g1row + g2row + "</table>";
  return "<table>" + header + g1row + g2row + "</table>"; 
}



//wrapper function that gets the entire describetion HTML
//calls the textGap and tableGap functions
function describeGap(props, schoolLevel) {

  //header name
  var headerHTML = "<h3>" + props.name + "</h3>";

  //get data
  var g1n = props.BL08;
  var g2n = props.WH08;
  var g1name = "Black";
  var g2name = "White";

  //don't compute gap for individual schools
  if (schoolLevel == true) return headerHTML + "Gap not computed for individual schools, but the " + 
                                  "overall rate and demographics are reported:<br>" +
                                  tableGap(props, true) + tooltipEnd;

  //check minimum sample sizes (for now only adjust the text, not table)
  if ((g1n < gapMinN) & (g2n < gapMinN)) return headerHTML + "Data reporting standards not met to estimate gap: too few " + 
                                                g1name + " and " + g2name + " students<br>" + tableGap(props) + tooltipEnd; 
  if (g1n < gapMinN) return headerHTML + "Data reporting standards not met to estimate gap: too few " + 
                            g1name + " students<br>" + tableGap(props) + tooltipEnd;
  if (g2n < gapMinN) return headerHTML + "Data reporting standards not met to estimate gap: too few " + 
                            g2name + " students<br>" + tableGap(props) + tooltipEnd;

  //otherwise combine the text and table HTML
  return headerHTML + textGap(props) + tableGap(props) + tooltipEnd;
}

//gives describetion of the overall rate
var alg8text = " of 8th graders were enrolled in Algebra I in the 2015-16 school year"
var alg8text_access = " of 8th graders had access to Algebra I in the 2015-16 school year"

function describeOverall(props) {

  //header name
  var headerHTML = "<h3 style='text-align: center;'>" + props.name + "</h3>";

  //get rate
  if (displayVar === "all_enroll") {
    var rate = Math.round(100*props.G08_alg_p) + "%";
    return headerHTML + rate + alg8text;
  }

  //get rate
  if (displayVar === "all_access") {
    var rate = Math.round(100*props.G08_access_p) + "%";
    return headerHTML + rate + alg8text_access;
  }
}

//wrapper function that calls describeGap() or describeOverall() depending on the display var
var displayVar = "all_enroll"; 
function tooltipHTML(props, schoolLevel) {
  if (displayVar === "all_enroll") return describeOverall(props);
  if (displayVar === "all_access") return describeOverall(props);
  if (displayVar === "WB_enroll") return describeGap(props, schoolLevel);
  if (displayVar === "WH_enroll") return describeGap(props, schoolLevel);
  if (displayVar === "WB_access") return describeGap(props, schoolLevel);
  if (displayVar === "WH_access") return describeGap(props, schoolLevel);
}

//helper functions for handling hover highlighting events
var hoveredState =  null;
var hoveredDistrict =  null;
function hoverState(newID) {
  if (hoveredState) map.setFeatureState({source: 'states', sourceLayer: "states", id: hoveredState}, { hover: false});
  hoveredState = newID;
  if (newID) map.setFeatureState({source: 'states', sourceLayer: "states", id: newID}, { hover: true});
}
function hoverDistrict(newID) {
  if (hoveredDistrict) map.setFeatureState({source: 'districts', sourceLayer: "districts", id: hoveredDistrict}, { hover: false});
  hoveredDistrict = newID;
  if (newID) map.setFeatureState({source: 'districts', sourceLayer: "districts", id: newID}, { hover: true});
}

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    //anchor: "left",
    offset: 10
});

//variable that will store whether the popup was created
//by mouse hover or scrolling event
var hoverByMouse = false;

//helper function for hovering over a lat/lon point regardless 
//if initiated by a mouse or other trigger (e.g., scroll)
function hoverPoint(point, byMouse) {

  //reset if point is null
  if (point === null) {
    hoverDistrict(null);
    hoverState(null);
    popup.remove();
    return;
  }

  //update global variable
  hoverByMouse = byMouse;
  var xyCoord = map.project(point);

  //if a state is highlighted
  var states = map.queryRenderedFeatures(xyCoord, { layers: ['state'] });
  if (states.length > 0) {

    //but no district is highlighted
    var districts = map.queryRenderedFeatures(xyCoord, { layers: ['district'] });
    if (districts.length == 0) {

      //update the popup
      popup.setLngLat(point)
           .setHTML(tooltipHTML(states[0].properties))
           .addTo(map);

      //update hover effect
      hoverState(states[0].properties.id);
      hoverDistrict(null);

    //if a district is highlighted
    } else {

      //update hover effect
      hoverDistrict(districts[0].properties.id);
      hoverState(null);

      //update the popup
      popup.setLngLat(point)
           .setHTML(tooltipHTML(districts[0].properties))
           .addTo(map);

      //if a school is highlighted       
      if (map.getZoom() > 10.5) {
        var schools = map.queryRenderedFeatures(xyCoord, { layers: ['school']   });
        if (schools.length > 0) {

          //update the popup
          popup.setLngLat(schools[0].geometry.coordinates)
               .setHTML(tooltipHTML(schools[0].properties))
               .addTo(map);
        }
      }
    } 

  //if no states highlighted
  } else {

    //update hover effect
    hoverDistrict(null);
    hoverState(null);

    //remove the popup
    popup.remove();
  }
}


//helper function for changing the display variable

function changeDisplayVar(newVar) {

  //get the new display settings
  var newS = displayProps[ newVar ];

  //change the map title
  d3.select("#mapTitle").html(newS.topTitle);

  //redraw the colors
  map.setPaintProperty("state", "fill-color", newS.fill);
  map.setPaintProperty("district", "fill-color", newS.fill);
  map.setPaintProperty("school", "circle-color", newS.school_fill);

  //change the legend
  changeLegend(newS, false);

  //change the tooltip - changes what function tooltipHTML() uses
  displayVar = newVar;
}

//when the map loads...
map.on('load', function() {

  //add the sources for states and districts
  map.addSource("states", {
      "type": "vector",
      "url": stateSource
  });
  map.addSource("districts", {
      "type": "vector",
      "url": distSource
  });
  map.addSource("schools", {
      "type": "vector",
      "url": schlSource
  });

  // The feature-state dependent fill-opacity expression will render the hover effect
  // when a feature's hover state is set to true.
  //var defaultProps = displayProps.all_enroll;
  var defaultProps = displayProps.WB_enroll;

  map.addLayer({
      "id": "state-borders",
      "type": "line",
      "source": "states",
      "source-layer": "states",
      "minzoom": 2,
      "filter": ["==", "$type", "Polygon"],
      "layout": {},
      "paint": {
          "line-color": [
              "interpolate", ["linear"], ["zoom"],
              0, "hsl(0, 0%, 60%)",
              6, "hsl(0, 0%, 60%)",
              10, "#666666"
          ],
          "line-width": [
              "interpolate", ["linear"], ["zoom"],
              0, 1,
              6, 1,
              10, 3
          ]
      }
  });
  map.addLayer({
    "id": "state-borders-hover",
    "type": "line",
    "source": "states",
    "source-layer": "states",
    "minzoom": 2,
    "filter": ["==", "$type", "Polygon"],
    "layout": {},
    "paint": {
        "line-color": "black",
        "line-width": ["case",
            ["boolean", ["feature-state", "hover"], false],
            3,
            0
        ]
    }
  });
  map.addLayer({
      "id": "state",
      "type": "fill",
      "source": "states",
      "source-layer": "states",
      "layout": {},
      "paint": {
          "fill-color": defaultProps.fill,
          "fill-outline-color": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, "hsl(0, 0%, 60%)",
              6, "hsl(0, 0%, 60%)",
              7, "#666"
          ],
          "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, mapOpacity,
              6, mapOpacity,
              7, 0
          ]
      }
  }, "admin-3-4-boundaries-bg");
  map.addLayer({
    "id": "district-borders",
    "type": "line",
    "metadata": {},
    "source": "districts",
    "source-layer": "districts",
    "minzoom": 6,
    "filter": ["==", "$type", "Polygon"],
    "layout": {},
    "paint": {
      "line-color": "#999999",
      "line-width": [
        "interpolate",
          ["linear"],
          ["zoom"],
            0, 0.5,
            8, 0.5,
            11, 4
        ],
      "line-opacity": 0.6
    }      
  });
  map.addLayer({
    "id": "district-borders-hover",
    "type": "line",
    "source": "districts",
    "source-layer": "districts",
    "minzoom": 6,
    "filter": ["==", "$type", "Polygon"],
    "layout": {},
    "paint": {
        "line-color": "black",
        "line-width": ["case",
            ["boolean", ["feature-state", "hover"], false],
            3,
            0
        ]
    }
  });

  map.addLayer({
      "id": "district",
      "type": "fill",
      "source": "districts",
      "source-layer": "districts",
      "minzoom": 6,
      "layout": {},
      "paint": {
          "fill-color": defaultProps.fill,
          "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 0,
              6, 0,
              7, mapOpacity,
              10, mapOpacity,
              12, 0.5
          ],
          "fill-outline-color": "hsla(0, 0%, 60%, 0)"
      }
  }, "admin-3-4-boundaries-bg");

  map.addLayer({
    "id": "school",
    "type": "circle",
    "source": "schools",
    "source-layer": schlSourceLayer,
    "minzoom": 8,
    "filter": ["==", "$type", "Point"],
    "layout": {},
      "paint": {
        "circle-opacity": [
          "interpolate",
            ["linear"],
            ["zoom"],
            0, 0,
            10, 0,
            11, 1
        ],
        "circle-radius": [
          "step",
          ["get", "G08"],
          3, 
          25, 5, 
          50, 6.5,
          75, 8,
          1574, 8
        ],
                "circle-stroke-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    "hsla(0, 4%, 32%, 0)",
                    10,
                    "hsla(0, 4%, 32%, 0)",
                    11,
                    "hsl(0, 4%, 32%)"
                ],
                "circle-stroke-width": 2,
                "circle-color": defaultProps.fill
            }
        });

  
  map.addLayer({
            "id": "schoolname",
            "type": "symbol",
            "source": "schools",
            "source-layer": schlSourceLayer,
            "minzoom": 8,
            "filter": ["==", "$type", "Point"],
            "layout": {
                "text-field": ["to-string", ["get", "name"]],
                "text-offset": [0, 2],
                "text-size": ["step", ["zoom"], 0, 11, 11],
                "text-allow-overlap": true
            },
            "paint": {"text-opacity": ["step", ["zoom"], 0, 12, 1]}
        });


  //initialize White-Blank enrollment gap
  changeDisplayVar("WB_enroll");

  //add event listeners to the map buttons
  d3.selectAll(".m-button.map-button").on("click", function() {

      //if the active button was pressed, do nothing
      if (d3.select(this).classed("active")) return;

      //update the active button under the relevant div
      var div = d3.select(this.parentElement.parentElement);
      div.select(".active").classed("active", false);
      d3.select(this).classed("active", true);

      //update the display variable
      var comp = d3.select(".map-button-wrapper.compare .active").attr("value");
      var meas = d3.select(".map-button-wrapper.measure .active").attr("value");
      changeDisplayVar(comp + "_" + meas);
    })


  //change display if another variable has been selected
  /*d3.select("select#displayVar").on("change", function() {
    var newVar = d3.select(this).node().value;
    changeDisplayVar(newVar);
  });*/

  //handle moving the mouse cursor over the map
  map.on('mousemove', function(e) { hoverPoint(e.lngLat, true); });

  //reset if mouse is moved over the document, but not map
  document.addEventListener("mouseover", function(){
    if (hoverByMouse) {
      hoverDistrict(null);
      hoverState(null);
      popup.remove();
    }
  });
});
