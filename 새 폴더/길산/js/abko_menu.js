$(function () {
  $(".submenu").css({ display: "none" });
  $(".menu ul li,.submenu").hover(
    function () {
      let i = $(this).index();
      //console.log(i);
      $(".submenu").eq(i).siblings().css({ display: "none" });
      $(".submenu").eq(i).stop().slideDown();
      $(".menu ul li").eq(i).find("a").addClass("bar");
    },
    function () {
      $(".submenu").stop().slideUp();
      $(".menu ul li a").removeClass("bar");
    }
  );
});
