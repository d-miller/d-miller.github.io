
//jQuery for smooth transitions
//https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 60
        }, 700);
        return false;
      }
    }
  });
});

//jQuery for changing the active navigation link
$(document).on("ready", function() {

	//get scrolll positions of HTML sections
	//definately hack-ish, need to change...
	var pos2 = $("#enrollGap").position().top - 80;
	var pos3 = $("#accessGap").position().top - 80;
	var pos4 = $("#priorAch").position().top - 80;


  	//whenever the scroll position changes...
	$(document).scroll(function() {
	
		//get current HTML section
		var curr = $(document).scrollTop();
		var section = 1;
		if (curr > pos2) section = 2;
		if (curr > pos3) section = 3;
		if (curr > pos4) section = 4;

		//change active class if there's a change in HTML section
		var currSection = +$(".nav").find(".active").attr("num");
		if (section != currSection) {
			$(".nav").find(".active").removeClass("active");
			if (section==1) $(".nav").find("#link1").addClass("active");
			if (section==2) $(".nav").find("#link2").addClass("active");
			if (section==3) $(".nav").find("#link3").addClass("active");
			if (section==4) $(".nav").find("#link4").addClass("active");

		}
	});
});
