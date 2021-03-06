$(function() {
  $(".reviews-slider").slick({
    infinite: true,
    arrows: false,
    dots: true
  });
  $(document).ready(function() {
    $("#top").on("click", "a", function(event) {
      event.preventDefault();
      var id = $(this).attr("href"),
        top = $(id).offset().top;
      $("body,html").animate({ scrollTop: top }, 1500);
    });
  });
  $(document).ready(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 0) {
        $("#scroller").fadeIn();
      } else {
        $("#scroller").fadeOut();
      }
    });
    $("#scroller").click(function() {
      $("body,html").animate(
        {
          scrollTop: 0
        },
        400
      );
      return false;
    });
  });
  new WOW().init();
});
