// menu 버튼 움직임 스크립트
document.getElementById("menu").onclick = function () {
  document.getElementsByTagName("span")[0].classList.toggle("bar1");
  document.getElementsByTagName("span")[1].classList.toggle("bar2");
  document.getElementsByTagName("span")[2].classList.toggle("bar3");
  document.getElementsByTagName("nav")[0].classList.toggle("nav_bg");
};

$(function () {
  let bg = true;
  $("#menu").click(function () {
    if (bg) {
      $("header").css({
        background: "#122223",
        boxShadow: "none",
      });
      $("header ul li a").css("color", "#fff");
      $("header ul #menu a span").css("background", "#fff");
      $(".logo a img").attr("src", "images/logo_w.svg");
    } else {
      $("header").css({
        background: "#fff",
        boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.03)",
      });
      $("header ul li a").css("color", "#222");
      $("header .util_right ul li:nth-child(2) a").css("color", "#014d33");
      $("header ul #menu a span").css("background", "#000");
      $(".logo a img").attr("src", "images/logo.svg");
    }
    bg = !bg;
  });
});

// section 스크롤
$(document).ready(function () {
  $("#fullpage").fullpage({
    scrollingSpeed: 1000,
    normalScrollElements: ".main",
    scrollOverflow: true,
    onLeave: function (origin, destination, direction) {
      $("#fullpage").on("scroll touchmove mousewheel", function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
      swiper.mousewheel.disable();
    },
    afterLoad: function (anchorLink, index) {
      $("#fullpage").off("scroll mousewheel");
      if (!$(".fp-completely .swiper-wrapper").length > 0)
        $("#fullpage").off("touchmove"); // 모바일분기
      if (swiper) swiper.mousewheel.enable();
      if (!$(".sec2").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
    },
  });

  // swiper
  var length = $(".sec2 .swiper-slide").length;
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    freeMode: false,
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: true,
    on: {
      slideChange: function () {
        var idx = this.activeIndex;
        if (this.activeIndex != 0 && idx != length - 1)
          $.fn.fullpage.setAllowScrolling(false);
      },
      slideChangeTransitionEnd: function () {
        var idx = this.activeIndex;
        if (idx == 0 || idx == length - 1)
          $.fn.fullpage.setAllowScrolling(true);
      },
      touchMove: function (e) {
        var startY = e.touches.startY;
        setTimeout(function () {
          if (startY > e.touches.currentY) swiper.slideNext();
          else swiper.slidePrev();
        }, 100);
      },
    },
  });
});
