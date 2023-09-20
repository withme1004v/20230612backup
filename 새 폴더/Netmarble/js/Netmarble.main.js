$(function () {
  var swiper = new Swiper(".mySwiper", {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "2",
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    coverflowEffect: {
      rotate: 50,
      stretch: 50,
      depth: 150,
      modifier: 1,
      slideShadows: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // 메뉴
  $(".sub_head").css("display", "none");
  $(".menu ul li a").hover(
    function () {
      $(".sub_head").css("display", "block");
    }, //호버하지 않을때
    function () {
      $(".sub_head").css("display", "none");
    }
  );
  $(".sub_head").hover(
    function () {
      $(this).css("display", "block");
    }, //호버하지 않을때
    function () {
      $(this).css("display", "none");
    }
  );

  // 메뉴 컬러
  $(".lnb > ul > li ").hover(
    function () {
      let i = $(this).index();
      $(".menu ul li").eq(i).find("a").css("color", "#7f4f21");
    },
    function () {
      $(".menu ul li a").css("color", "#333333");
    }
  );

  //넷마블 TV 클릭 시 색깔 바뀌게
  $(".test")
    .each(function (index) {
      $(this).attr("test-index", index);
    })
    .click(function () {
      let index = $(this).attr("test-index");
      $(".test[test-index=" + index + "]").addClass("clicked_p");
      $(".test[test-index!=" + index + "]").removeClass("clicked_p");
    });
  $("#move li").find("img:last").css("opacity", "0");
  //넷마블 TV 리스트 선택 시 메인창에 띄우기
  $(".movieList ul li").click(function (e) {
    e.preventDefault();
    let movSrc =
      "https://www.youtube.com/embed/" +
      $(this).find("a").data("url") +
      "?autoplay=1";
    $("#sampleMovie").attr("src", movSrc);

    $("#move li").find("img:last").css("opacity", "0");
    $(this).find("img:last").css("opacity", "1");
  });

  //스크롤 탑
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      $(".top").fadeIn();
    } else {
      $(".top").fadeOut();
    }
  });
  $(".top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});
