$(function() {
  $(".header-menu-cost__btnsumm").on("click", function() {
    $(".modal-summCash").addClass("modal-content-show");

    $(".overlay").addClass("modal-content-show");
  });
  $(".overlay").on("click", function() {
    $(".modal-summCash").removeClass("modal-content-show");
    $(".overlay").removeClass("modal-content-show");
  });
  $(".main-wrap-form__btn").on("click", function() {
    $(".modal-summCash").addClass("modal-content-show");

    $(".overlay").addClass("modal-content-show");
  });
});

$(document).ready(function() {
  //E-mail Ajax Send
  $("form").submit(function() {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
  $(window).on("load resize", function() {
    if ($(window).width() < 580) {
      $("#aboutUs-slider-wrap:not(.slick-initialized)").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 100,
        slidesToShow: 1
      });
    } else {
      $("#aboutUs-slider-wrap.slick-initialized").slick("unslick");
    }
  });
  $(".logo-btn").on("click", function() {
    $(".modal-inner").slideToggle();
    $(".main-wrap-form").toggleClass("main-wrap-form-del");
  });
});
