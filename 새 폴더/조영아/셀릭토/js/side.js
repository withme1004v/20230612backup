let i = 0;
let slidContainer = document.querySelector(".slideShow");
let slides = document.querySelectorAll(".slide li");
let slideNext = document.getElementById("next");
let slidePrev = document.getElementById("prev");
slides[0].classList.add("on");
function slide() {
  slides[i].classList.remove("on");
  i++;
  if (i > 4) i = 0;
  slides[i].classList.add("on");
}
let interval;
function slideStart() {
  interval = setInterval(slide, 3000);
}
slideStart();

slidContainer.addEventListener("mouseenter", function () {
  clearInterval(interval);
});
slidContainer.onmouseleave = function () {
  slideStart();
};
slideNext.onclick = function () {
  slide();
};

slidePrev.onclick = function () {
  slides[i].classList.remove("on");
  i--;
  if (i < 0) i = 4;
  slides[i].classList.add("on");
};
$(function () {
  $(".topping li").hover(
    function () {
      $(this).css({
        width: "55%",
        backgroundSize: "60%",
        backgroundPosition: "center 10%",
      });
      $(this).siblings().css({
        width: "15%",
        backgroundSize: "100%",
        backgroundPosition: "center",
      });
      $(this).siblings().find("p").css("display", "none");
      $(this).find("p").css("display", "block");
    },
    function () {
      $(".topping li").css({
        width: "25%",
        backgroundSize: "100%",
        backgroundPosition: "center",
      });
      $(".topping li p").css("display", "block");
    }
  );
  $(".visual li").css("display", "none");
  $(".visual li").eq(0).css("display", "block");
  $(".center ul li").css("display", "none");
  $(".center ul li").eq(0).css("display", "block");
  $(".right_inner>ul").css("display", "none");
  $(".right_inner>ul").eq(0).css("display", "block");
  $(".probtn ul li").click(function () {
    let i = $(this).index();
    $(".visual li").css("display", "none");
    $(".visual li").eq(i).css("display", "block");
    $(".center ul li").css("display", "none");
    $(".center ul li").eq(i).css("display", "block");
    $(".right_inner>ul").css("display", "none");
    $(".right_inner>ul").eq(i).css("display", "block");
  });
});
