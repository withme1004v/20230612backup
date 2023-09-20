$(function () {
  $(".submenu").css({ display: "none" });
  $(".menu ul li,.submenu").hover(
    function () {
      let i = $(this).index();
      //console.log(i);
      $(".submenu").eq(i).siblings().css({ display: "none" });
      $(".submenu").eq(i).stop().slideDown();
      $(".menu ul li").eq(i).find("a").addClass("active bar");
    },
    function () {
      $(".submenu").stop().slideUp();
      $(".menu ul li a").removeClass("active bar");
      $(".right ul li a").removeClass("active");
    }
  );
  // fullpage
  $("#fullpage").fullpage({
    anchors: ["sec1", "sec2", "sec3", "sec4", "sec5"],
    menu: "#menu",
    scrollingSpeed: 1000,
    //scrollOverflow: true,
    onLeave: function (origin, destination, direction) {
      $("#fullpage").on("scroll touchmove mousewheel", function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
    },
    afterLoad: function (anchorLink, index) {
      // 전환이 끝난후 이벤트풀기
      $("#fullpage").off("scroll mousewheel");
      if (!$(".fp-completely .swiper-wrapper").length > 0)
        $("#fullpage").off("touchmove"); // 모바일분기

      $("#menu li").each(function (index) {
        if ($("#menu li").eq(0).hasClass("active")) {
          $("header").addClass("on");
          $(".menu ul li").removeClass();
          $(".logo img").eq(1).css({ opacity: "1" });
          $(".right ul li").eq(0).find("a").css({ color: "#fff" });
        } else {
          $("header").removeClass();
          $(".menu ul li").addClass("active1 bar");
          $(".logo img").eq(1).css({ opacity: "0" });
          $(".right ul li").eq(0).find("a").css({ color: "#181818" });
        }
        $(".menu ul li").hover(
          function () {
            if ($("#menu li").eq(0).hasClass("active")) {
              $("header").addClass("on");
              $(".menu ul li a").removeClass();
              $(this).find("a").addClass("active");
              $(".right ul li").eq(i).find("a").addClass("active");
            } else {
              $("header").removeClass();
              $(".menu ul li").addClass("active1");
            }
          },
          function () {
            if ($("#menu li").eq(0).hasClass("active")) {
              $("header").addClass("on");
              $(this).removeClass();
            } else {
              $("header").removeClass();
              $(this).addClass("active1");
            }
          }
        );
      });
    },
  });
  var swiper = new Swiper(".mySwiper", {
    autoplay: {
      delay: 3000,

      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 4,
    spaceBetween: 0,
    pagination: {},
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // 메인 상단 슬라이드 화면 3개

  var swiper = new Swiper(".mySwiper3", {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
  });
});
