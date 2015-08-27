function resize() {
  var windowHeight = $(window).height();

  $("body").css('height', windowHeight);

  $(".slide_content").each(function() {
    var content = $(this);

    content.css({
      marginTop: ($("section").height()-content.height())/2+"px"
    })
  });

  $(".nano").nanoScroller();
}

$(document).ready(function() {
  var windowHeight = $(window).height(),
    pageNo = 0,
    lastSlide = 0,
    speed = 800,
    root = $('html, body');

  resize();

  // Adding the Cool Border
  $("section[data-slide]").prepend(
    
    '<!-- Cool Border -->'+
    '<div class="north"></div>'+
    '<div class="east"></div>'+
    '<div class="south"></div>'+
    '<div class="west"></div>'+
    '<!-- Cool Content -->'
    
  );

  // Adding slides to menu
  for (var i = 0; i < $("section[data-slide]").length; i++) {
    // console.log([i+1]+'. '+$($("section[data-slide]")[i]).data("slide"));
    $("nav ul").append(
      '<li><a href="#" data-slide-number="'+[i]+'">'+[i+1]+'. '+$($("section[data-slide]")[i]).data("slide")+'</a></li>'
    );
  };

  // Menu Button Click
  $("nav ul a").click(function(e) {
    var button = $(this);

    lastSlide = pageNo,
    pageNo = button.data('slide-number');

    root.stop().animate({
          scrollTop: $($("section[data-slide]")[pageNo]).offset().top
      }, speed,'easeInOutQuint');

      e.preventDefault();
  });

  $("#button_top").click(function(e) {
    var button = $(this);
    
    pageNo = 0;

    root.stop().animate({
          scrollTop: 0
      }, speed,'easeInOutQuint');

      e.preventDefault();
  });

  $("#button_last").click(function(e) {
    var button = $(this);
    
    pageNo = lastSlide;

    root.stop().animate({
          scrollTop: $($("section[data-slide]")[pageNo]).offset().top
      }, speed,'easeInOutQuint');

      e.preventDefault();
  });

  $(".slide_content").each(function() {
    var content = $(this);

    content.teopisto({
      child: "h2,p",
      effect: "fade",
      offset: "100%"
    });
  });

  $("section ul, section ol").each(function() {
    var content = $(this);

    content.teopisto({
      effect: "slideRight",
      offset: "100%"
    });
  });

  $(window).keyup(function (e) {

    // Down
    if (e.keyCode == 40 || e.keyCode == 39) {
      if (pageNo < ($("section[data-slide]").length)-1) {
        pageNo += 1;
      };

      root.stop().animate({
            scrollTop: $($("section[data-slide]")[pageNo]).offset().top
        }, speed,'easeInOutQuint');
    }

    // Up
    if (e.keyCode == 38 || e.keyCode == 37) {
      if (pageNo > 0) {
        pageNo -= 1;
      };

      root.stop().animate({
            scrollTop: $($("section[data-slide]")[pageNo]).offset().top
        }, speed,'easeInOutQuint');
    }

      e.preventDefault();

  });
});

$(window).load(function() {
  resize();
});

$(window).resize(function() {
  resize();
});