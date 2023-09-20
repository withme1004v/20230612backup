// IN THE NEWS
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  centeredSlides: true,
  // loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    // slideChange: function () {
    //   console.log("this.activeIndex " + this.activeIndex);
    //   if (this.activeIndex == 1) {
    //     swiper.params.centeredSlides = true; // centeredSlides를 true로 변경
    //     swiper.update();
    //   }
    // },
    // slideChangeTransitionEnd: function () {
    //   $(".inner-bottom").eq(this.activeIndex).addClass("move");
    // },
    // slideChangeTransitionStart: function () {
    //   $(".inner-bottom").removeClass("move");
    // },
  },
});
// 동영상 요소와 버튼 요소를 가져옵니다.
const video = document.getElementById("myVideo");
const pauseButton = document.getElementById("pauseButton");

// 버튼을 클릭할 때 동영상을 일시 정지 또는 다시 재생합니다.
pauseButton.addEventListener("click", function (e) {
  e.preventDefault();
  pauseButton.classList.toggle("on");
  if (video.paused) {
    video.play(); // 일시 정지된 동영상을 재생합니다.
    //pauseButton.classList.add("on");
  } else {
    video.pause(); // 동영상을 일시 정지합니다.
  }
});
