
//use jQuery to handle scroll events for the persistent navbar header
$(document).ready(function(){

  //get the IDs for each of the navigation links
  var navlinks = $(".navlinks a").get();
  var navIDs = [];
  navlinks.forEach(function(d) { navIDs.push($(d).attr("href")); });

  //check whether to show the sticky header or not
  function checkHeader() {

    //y = bottom position of the original header
    var h = $("header")[0].getBoundingClientRect();
    var y = h.height + h.top;

    //if the bottom of the original header is <50 pixels from the top,
    //then show the sticky header
    if (y < 50) {
      $("#stickyHeader").css("display", "block")
      $("header").css("visibility", "hidden")
    }

    //otherwise, don't show the sticky header
    if (y >= 50) {
      $("#stickyHeader").css("display", "none")
      $("header").css("visibility", "visible")
    }
  }

  //highlight the active navigation link in the navbar
  var section = 0;
  function checkActiveNav() {

    //get the positions of each section
    var navPos = [];
    navIDs.forEach(function(d) { navPos.push($(d).position().top - 100); });

    //determine the active section based on the scroll position
    var curr = $(document).scrollTop();
    var newSection = 0;
    for (var i = 0; i < navPos.length; i++) if (curr > navPos[i]) newSection = i;

    //update if the section has changed
    if (section !== newSection) {
      section = newSection;
      $(".navlinks a.active").removeClass("active");
      $(navlinks[section]).addClass("active"); 
    }
  }

  // Add smooth scrolling to all links
  $(".navlinks a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top - 65
      }, 600);
    } // End if
  });

  //check visiblity of header and active section & for every scroll event
  checkHeader();
  checkActiveNav();
  window.onscroll = function() {
    checkHeader();
    checkActiveNav();
  };
});