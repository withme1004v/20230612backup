$(function () {
  // language click event start
  let langBtn1 = true;
  $(".language li > a, .language li > i").click(function () {
    if (langBtn1) {
      $(".language_con").css("height", "90px");
      $(".language li > i").css("transform", "rotate(180deg)");
    } else {
      $(".language_con").css("height", "0px");
      $(".language li > i").css("transform", "rotate(0deg)");
    }
    langBtn1 = !langBtn1;
  });
  $(".language li > a, .language li > i").hover(
    function () {},
    function () {
      $(".language_con").css("height", "0px");
      $(".language li > i").css("transform", "rotate(0deg)");
    }
  );
  // language click event end

  // top_menu_lnb hover event start
  let lnbHt = $(".top_menu_lnb ul").height();
  console.log(lnbHt);
  $(".top_menu_gnb li, .top_menu_lnb > ul > li").hover(
    function () {
      let ht = $(window).scrollTop();
      $(".top_menu_lnb").css({ top: "144px", opacity: "1" });
      $(".top_menu_gnb li a").css("color", "#000");
      $(".top_logo a img:last, .site_map_btn img:last").addClass("on");
      $(".language li > a, .language li > i").css("color", "#000");
      $(".top_menu_gnb").css("top", "-5px");
    },
    function () {
      let ht = $(window).scrollTop();
      $(".top_menu_lnb").css({ top: "-410px", opacity: "0" });
      if (ht < 50) {
        $(".top_menu_gnb li a").css("color", "#fff");
        $(".top_logo a img:last, .site_map_btn img:last").removeClass("on");
        $(".language li > a, .language li > i").css("color", "#fff");
        $(".top_menu_gnb").css("top", "0px");
      } else {
        $(".top_menu_gnb li a").css("color", "#000");
        $(".top_logo a img:last, .site_map_btn img:last").addClass("on");
        $(".language li > a, .language li > i").css("color", "#000");
      }
    }
  );
  // top_menu_lnb hover event end

  // top_menu scroll event start
  $(window).scroll(function (e) {
    let ht = $(window).scrollTop();
    console.log(ht);
    if (ht > 50) {
      $(".top_menu").css({ height: "102px", backgroundColor: "#fff" });
      $(".top_menu_gnb li a").css({ color: "#000", lineHeight: "102px" });
      $(".top_logo a img:last, .site_map_btn img:last").addClass("on");
      $(".language li > a, .language li > i").css("color", "#000");
      $(".top_menu_gnb").css("top", "-5px");
      if ($(window).width() <= 1024) {
        $(".top_menu").css({ height: "102px", backgroundColor: "#fff" });
        $(".top_logo a img:last, .site_map_btn img:last").addClass("on");
        $(".language li > a, .language li > i").css("display", "none");
      }
    } else {
      $(".top_menu").css({ height: "144px", backgroundColor: "transparent" });
      $(".top_menu_gnb li a").css({ color: "#fff", lineHeight: "144px" });
      $(".top_logo a img:last, .site_map_btn img:last").removeClass("on");
      $(".language li > a, .language li > i").css("color", "#fff");
      $(".top_menu_gnb").css("top", "0px");
      if ($(window).width() <= 1024) {
        $(".top_menu").css({ height: "102px", backgroundColor: "#fff" });
        $(".top_logo a img:last, .site_map_btn img:last").addClass("on");
        $(".language li > a, .language li > i").css("display", "none");
      }
    }
  });
  // top_menu scroll event end
});
