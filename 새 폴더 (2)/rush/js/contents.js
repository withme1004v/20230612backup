$(function () {
  /* main 카테고리소개 > 상품이미지 */
  const $lushProSwiper = $(".lush_pro_swiper");
  const lushProSwiperAllay = [];

  $lushProSwiper.each(function () {
    const autoSwiper = new Swiper(this, {
      slidesPerView: "auto",
      /* loop:true, */
      /* slidesPerGroup:3, */
      grabCursor: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      on: {
        reachEnd: function () {
          categorySwiper.slideNext();
        },
      },
    });
    $(".lush_pro_swiper .swiper-slide").on("mouseenter", function () {
      autoSwiper.autoplay.stop();
    });
    $(".lush_pro_swiper .swiper-slide").on("mouseleave", function () {
      autoSwiper.autoplay.start();
    });
    lushProSwiperAllay.push(autoSwiper);
  });

  // main 카테고리소개 > 상품이미지 초기화
  function lushProSwiperInitiator() {
    lushProSwiperAllay.forEach(function (eachSWiper) {
      eachSWiper.autoplay.stop();
    });
  }
  lushProSwiperInitiator();

  // main 카테고리소개
  const categorySwiper = new Swiper(".lush_category_swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 500,
    grabCursor: true,
    rewind: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        lushProSwiperInitiator();
        lushProSwiperAllay[categorySwiper.realIndex].slideTo(0, 0, false);
        lushProSwiperAllay[categorySwiper.realIndex].autoplay.start();
      },
    },
  });

  // main 카테고리 소개 상품이미지 클릭시 QR 코드 view
  const $lush_pro = $(".lush_pro_swiper .swiper-slide"),
    $lush_categoryQr = $lush_pro.parents(".lush_pro").siblings(".category_img");
  let qrStates = true;

  $lush_pro.on("click", function () {
    let that = $(this);

    if (qrStates == true) {
      that.parents(".lush_pro").siblings(".category_img").addClass("is_active");
      qrStates = false;
    } else {
      that
        .parents(".lush_pro")
        .siblings(".category_img")
        .removeClass("is_active");
      qrStates = true;
    }
  });
});
