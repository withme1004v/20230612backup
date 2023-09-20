$(function () {
  let status = true;
  $("#menu").click(function () {
    if (status) {
      $("nav").addClass("menuon");
      $("nav > ul > li > ul").addClass("on");
      $("nav .bg").addClass("on");
      $("nav ul li a").addClass("on");
      $("nav ul.sub a").addClass("on");
      $("nav > ul > li").addClass("on");
      $("#menu span").eq(0).addClass("bar1");
      $("#menu span").eq(1).addClass("bar2");
      $("#menu span").eq(2).addClass("bar3");
    } else {
      $("nav").removeClass("menuon");
      $("nav > ul > li > ul").removeClass("on");
      $("nav .bg").removeClass("on");
      $("nav ul li a").removeClass("on");
      $("nav ul.sub a").removeClass("on");
      $("nav > ul > li").removeClass("on");
      $("#menu span").eq(0).removeClass("bar1");
      $("#menu span").eq(1).removeClass("bar2");
      $("#menu span").eq(2).removeClass("bar3");
    }
    status = !status;
  });
  $(".page .tabitem>div").css("display", "none");
  $(".page .tabitem>div").eq(0).css("display", "block");

  $(".page .tabitem").css("height", $(".page .tabitem>div").eq(0).height());
  $(".rightwrap>div p").click(function () {
    let i = $(this).index();
    let ht = $(".page .tabitem>div").eq(i).height();
    console.log(ht);
    $(".page .tabitem>div").css("display", "none");
    $(".page .tabitem").css("height", ht);
    $(".page .tabitem>div").eq(i).css("display", "block");
  });
});
