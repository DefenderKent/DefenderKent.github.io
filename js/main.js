$(function() {
  particlesJS(
    "particles-js",

    {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 100,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true,
      config_demo: {
        hide_card: false,
        background_color: "#b61924",
        background_image: "",
        background_position: "50% 50%",
        background_repeat: "no-repeat",
        background_size: "cover"
      }
    }
  );
  $(document).ready(function() {
    $("#top").on("click", "a", function(event) {
      event.preventDefault();
      var id = $(this).attr("href"),
        top = $(id).offset().top;
      $("body,html").animate({ scrollTop: top }, 1500);
    });
  });
  $(document).ready(function() {
    $("#about").on("click", "a", function(event) {
      event.preventDefault();
      var id = $(this).attr("href"),
        top = $(id).offset().top;
      $("body,html").animate({ scrollTop: top }, 1500);
    });
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

  $(".works-slider").slick({
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1210,
        settings: { arrows: false, slidesToShow: 1 }
      },
      {
        breakpoint: 900,
        settings: { arrows: false, slidesToShow: 1 }
      },
      {
        breakpoint: 720,
        settings: { arrows: false, slidesToShow: 1, crnterMode: true }
      }

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  $(document).ready(function() {
    var navPos, winPos, navHeight;

    function refreshVar() {
      navPos = $("nav").offset().top;
      navHeight = $("nav").outerHeight(true);
    }

    refreshVar();
    $(window).resize(refreshVar);

    $('<div class="clone-nav"></div>')
      .insertBefore("nav")
      .css("height", navHeight)
      .hide();

    $(window).scroll(function() {
      winPos = $(window).scrollTop();

      if (winPos >= navPos) {
        $("nav").addClass("fixed shadow");
        $(".clone-nav").show();
      } else {
        $("nav").removeClass("fixed shadow");
        $(".clone-nav").hide();
      }
    });
  });
  $(document).ready(function() {
    var circleProgress = function(selector) {
      var wrapper = document.querySelectorAll(selector);
      Array.prototype.forEach.call(wrapper, function(wrapper, i) {
        var wrapperWidth,
          wrapperHeight,
          percent,
          innerHTML,
          context,
          lineWidth,
          centerX,
          centerY,
          radius,
          newPercent,
          speed,
          from,
          to,
          duration,
          start,
          strokeStyle,
          text;

        var getValues = function() {
          wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
          wrapperHeight = wrapperWidth;
          percent = wrapper.getAttribute("data-cp-percentage");
          innerHTML =
            '<span class="percentage"><strong>' +
            percent +
            '</strong> %</span><canvas class="circleProgressCanvas" width="' +
            wrapperWidth * 2 +
            '" height="' +
            wrapperHeight * 2 +
            '"></canvas>';
          wrapper.innerHTML = innerHTML;
          text = wrapper.querySelector(".percentage");
          canvas = wrapper.querySelector(".circleProgressCanvas");
          wrapper.style.height = canvas.style.width = canvas.style.height =
            wrapperWidth + "px";
          context = canvas.getContext("2d");
          centerX = canvas.width / 2;
          centerY = canvas.height / 2;
          newPercent = 0;
          speed = 1;
          from = 0;
          to = percent;
          duration = 1000;
          lineWidth = 25;
          radius = canvas.width / 2 - lineWidth;
          strokeStyle = wrapper.getAttribute("data-cp-color");
          start = new Date().getTime();
        };

        function animate() {
          requestAnimationFrame(animate);
          var time = new Date().getTime() - start;
          if (time <= duration) {
            var x = easeInOutQuart(time, from, to - from, duration);
            newPercent = x;
            text.innerHTML = Math.round(newPercent) + " %";
            drawArc();
          }
        }

        function drawArc() {
          var circleStart = 1.5 * Math.PI;
          var circleEnd = circleStart + (newPercent / 50) * Math.PI;
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.beginPath();
          context.arc(
            centerX,
            centerY,
            radius,
            circleStart,
            4 * Math.PI,
            false
          );
          context.lineWidth = lineWidth;
          context.strokeStyle = "#ddd";
          context.stroke();
          context.beginPath();
          context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
          context.lineWidth = lineWidth;
          context.strokeStyle = strokeStyle;
          context.stroke();
        }
        var update = function() {
          getValues();
          animate();
        };
        update();

        var btnUpdate = document.querySelectorAll(".btn-update")[0];
        btnUpdate.addEventListener("click", function() {
          wrapper.setAttribute(
            "data-cp-percentage",
            Math.round(getRandom(5, 95))
          );
          update();
        });
        wrapper.addEventListener("click", function() {
          update();
        });

        var resizeTimer;
        window.addEventListener("resize", function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            clearTimeout(resizeTimer);
            start = new Date().getTime();
            update();
          }, 250);
        });
      });

      //
      // http://easings.net/#easeInOutQuart
      //  t: current time
      //  b: beginning value
      //  c: change in value
      //  d: duration
      //
      function easeInOutQuart(t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
        return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
      }
    };

    circleProgress(".counter");

    // Gibt eine Zufallszahl zwischen min (inklusive) und max (exklusive) zurück
    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }
  });
  $(".row").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          crnterMode: true
        }
      }

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  $(".burger-menu").on("click", function() {
    $(".menu-list").slideToggle();
  });

  $(".popup-content2").on("click", function() {
    $(".popup-content2").addClass("pop-show");
    $(".popup-content").addClass("pop-show2");
  });
  $(".btn_popup").on("click", function() {
    $(".popup-content").removeClass("pop-show2");
  });

  new WOW().init();
});
