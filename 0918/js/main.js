$(document).ready(function () {
  var numAc = $("article").length;
  var wd = $("article").width() + 20;
  console.log(wd);
  var widSec = wd * numAc;
  var widTotal = widSec + 600;
  $("section").width(widTotal);
  $("body").height(widSec);
  $("html,body").animate({ scrollTop: widSec }, 2000);

  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    console.log(scroll);
    $("section").stop().animate({ left: -scroll }, 600);
  });

  $("article h2").click(function (e) {
    e.preventDefault();
    var index = $(this).parent().index();
    var imgsrc = $(this).children("a").attr("href");
    var posAc = 200 * index;
    $("article").removeClass("on");
    $(this).parent().addClass("on");
    $("article p img").attr({ src: "" });
    $(this).siblings("p").children("img").attr({ src: imgsrc });
    $("html,body").scrollTop(posAc);
  });

  $("span").click(function () {
    $("article").removeClass("on");
  });
});
