let i = 0;
let slidesContainer = document.querySelectorAll(".swiper mySwiper");
let slides = document.querySelectorAll(".swiper-slide content");
function slide() {
  slides[i].classList.remove("on");
  i++;
  if (i > 2) i = 0;
  slides[i].classList.add("on");
}
let interval;
interval = setInterval(slide, 4000); // 이미지 넘어가는 시간
