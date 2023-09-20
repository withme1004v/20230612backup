let subMenu = document.querySelectorAll(".sub-menu");
let gnb = document.querySelectorAll(".menu ul li a");
let Lnb = document.querySelectorAll(".lnb");
let fl = document.querySelector("#wrap");
let hd = document.querySelectorAll("header");
let ht = Lnb[3].offsetHeight;
console.log("ht :" + ht);
for (let i = 0; i <= 9; i++) {
  subMenu[i].style.opacity = "0";
}
gnb.forEach(function (item, keys) {
  console.log(keys);
  item.addEventListener("mouseenter", function (e) {
    let j = Array.from(gnb).indexOf(e.target);
    function others(item) {
      return item !== j;
    }
    let othersItem = Array.from(subMenu).filter(others);
    othersItem.forEach(function (item) {
      item.style.height = "0px";
      item.style.opacity = "0";
    });
    Lnb.forEach(function () {
      let subht = Lnb[j].offsetHeight;
      console.log("j + " + j);
      //   subMenu[j].style.height = "auto"; 이렇게 하면 transition이 안됨
      subMenu[j].style.height = subht + "px";
      subMenu[j].style.opacity = "1";
    });
  });
});
hd.forEach(function (item) {
  item.addEventListener("mouseenter", function () {
    document.querySelector(".top-menu").style.backgroundColor = "#000";
    document.querySelector(".top-menu").style.transitionDelay = "0";
    /* for (let i = 0; i <= 2; i++) {
    fl[i].classList.add("on");
  } */
    fl.classList.add("on");
  });
  item.addEventListener("mouseleave", function () {
    document.querySelector(".top-menu").style.backgroundColor =
      "rgba(22,22,25,0.8)";
    document.querySelector(".top-menu").style.transitionDelay = "0.1s";

    /* for (let i = 0; i <= 2; i++) {
    fl[i].classList.remove("on");
  } */
    fl.classList.remove("on");
  });
});
subMenu.forEach(function (item, keys) {
  // let x = gnb[keys].querySelector("a");
  item.addEventListener("mouseenter", function () {
    //   subMenu.style.height = ht + "px";
    gnb[keys].classList.add("active");
  });
  item.addEventListener("mouseleave", function (e) {
    let j = Array.from(subMenu).indexOf(e.target);
    subMenu[j].style.height = 0 + "px";
    /* for (let i = 0; i <= 4; i++) {
            subMenu[i].style.height = 0 + "px";
          } */
    gnb[keys].classList.remove("active");
  });
});

$(function () {
  $(".contents .inner .inner-bottom").eq(0).addClass("move");
  var swiper = new Swiper(".mySwiper", {
    speed: 1000,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        console.log("this.activeIndex " + this.activeIndex);
      },
      slideChangeTransitionEnd: function () {
        $(".inner-bottom").eq(this.activeIndex).addClass("move");
      },
      slideChangeTransitionStart: function () {
        $(".inner-bottom").removeClass("move");
      },
    },
  });

  var currentSlide = $(swiper.slides[swiper.activeIndex]);
  var prevSlide;
  var nextSlide;
  currentSlide.removeClass("off");
  currentSlide = $(swiper.slides[swiper.activeIndex]);
  prevSlide = swiper.slides[swiper.activeIndex - 1];
  nextSlide = swiper.slides[swiper.activeIndex + 1];
  currentSlide.removeClass("off");

  if (!$(nextSlide).hasClass("off") || !$(prevSlide).hasClass("off")) {
    $(nextSlide).addClass("off");
    $(prevSlide).addClass("off");
  } else {
    $(currentSlide).removeClass("off");
  }
  swiper.on("slideChange", function () {
    currentSlide = $(swiper.slides[swiper.activeIndex]);
    prevSlide = swiper.slides[swiper.activeIndex - 1];
    nextSlide = swiper.slides[swiper.activeIndex + 1];
    currentSlide.removeClass("off");

    if (!$(nextSlide).hasClass("off") || !$(prevSlide).hasClass("off")) {
      $(nextSlide).addClass("off");
      $(prevSlide).addClass("off");
    } else {
      $(currentSlide).removeClass("off");
    }
  });
  $(".swiper-pagination-bullet").click(function () {
    $(".play").css({
      content: "url('images/ico_kv_play.png')",
      filter: "invert()",
    });
  });
  $(".play").click(function () {
    if ($(this).hasClass("off")) {
      $(this).removeClass("off").addClass("on");
      swiper.autoplay.stop();
      $(this).css({
        content: "url('images/ico_kv_play.png')",
        filter: "invert()",
      });
    } else {
      $(this).removeClass("on").addClass("off");
      swiper.autoplay.start();
      $(this).css({
        content: "url('images/ico_kv_pause.png')",
        filter: "invert()",
      });
    }
  });
});
