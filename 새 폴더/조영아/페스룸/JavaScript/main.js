$(function () {
  $(".light_btn li").eq(0).addClass("on");
  $(".light_btn li").eq(0).find("a").addClass("on");
  let arr = [
    $("#B").offset().top,
    $("#5F").offset().top + 10,
    $("#4F").offset().top + 100,
    $("#3F").offset().top + 100,
    $("#2F").offset().top + 100,
    $("#1F").offset().top + 100,
  ];

  $(".light_btn li").click(function (e) {
    e.preventDefault();
    let i = $(this).index();
    $("html, body").animate({ scrollTop: arr[i] }, 700, "swing");
    $(".light_btn li").removeClass("on");
    $(".light_btn li").find("a").removeClass("on");
    $(".light_btn li").eq(i).addClass("on");
    $(".light_btn li").eq(i).find("a").addClass("on");
  });
  //console.log(arr);
  let ht = $(window).scrollTop();
  console.log(ht);
  $(window).scroll(function () {
    let ht = $(window).scrollTop();
    console.log(ht);
    if (ht <= arr[0]) {
      $(".light_btn li").removeClass();
      $(".light_btn li").eq(0).addClass("on");
      $(".light_btn li a").removeClass();
      $(".light_btn li").eq(0).find("a").addClass("on");
    } else if (ht > arr[0] && ht <= arr[1]) {
      $(".light_btn li").removeClass();
      $(".light_btn li").eq(1).addClass("on");
      $(".light_btn li a").removeClass();
      $(".light_btn li").eq(1).find("a").addClass("on");
    } else if (ht > arr[1] && ht <= arr[2]) {
      $(".light_btn li").removeClass();
      $(".light_btn li").eq(2).addClass("on");
      $(".light_btn li a").removeClass();
      $(".light_btn li").eq(2).find("a").addClass("on");
    } else if (ht > arr[2] && ht <= arr[3]) {
      $(".light_btn li").removeClass();
      $(".light_btn li").eq(3).addClass("on");
      $(".light_btn li a").removeClass();
      $(".light_btn li").eq(3).find("a").addClass("on");
    } else if (ht > arr[3] && ht <= arr[4]) {
      $(".light_btn li").removeClass();
      $(".light_btn li").eq(4).addClass("on");
      $(".light_btn li a").removeClass();
      $(".light_btn li").eq(4).find("a").addClass("on");
    } else if (ht > arr[4] && ht <= arr[5]) {
      $(".light_btn li").removeClass();
      $(".light_btn li").eq(5).addClass("on");
      $(".light_btn li a").removeClass();
      $(".light_btn li").eq(5).find("a").addClass("on");
    }
  });
  $(".light_btn_updown li:first").click(function () {
    $(".light_btn li").each(function (index) {
      if ($(this).hasClass("on")) {
        let i = $(this).index();

        if (i == 0) {
          return false;
        } else {
          i--;
          $(".light_btn li").eq(i).trigger("click");
        }
      }
    });
  });
  $(".light_btn_updown li:last").click(function () {
    $(".light_btn li").each(function (index) {
      if ($(this).hasClass("on")) {
        let i = $(this).index();

        if (i == 5) {
          return false;
        } else {
          i++;
          $(".light_btn li").eq(i).trigger("click");
          return false;
        }
      }
    });
  });
});
