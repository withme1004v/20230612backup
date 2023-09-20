// menu 버튼 움직임 스크립트
document.getElementById("menu").onclick = function () {
  document.getElementsByTagName("span")[0].classList.toggle("bar1");
  document.getElementsByTagName("span")[1].classList.toggle("bar2");
  document.getElementsByTagName("span")[2].classList.toggle("bar3");
  document.getElementsByTagName("nav")[0].classList.toggle("nav_bg");
};

// visual
$(function () {
  const progressLine = $(".autoplay-progress p");
  var swiper1 = new Swiper(".mySwiper1", {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        console.log("this.realIndex" + this.realIndex);
        progressLine.eq(this.realIndex).addClass("on");
        progressLine.eq(this.realIndex).siblings().removeClass("on");
      },
    },
  });
  // visual 재생/정지
  swiper1.autoplay.start();
  let play = $(".control_btn ul:nth-child(2) li").eq(0).find("a");
  let play_status = true;
  play.click(function (e) {
    e.preventDefault();
    if (play_status) {
      swiper1.autoplay.stop();
      play.addClass("on");
    } else {
      swiper1.autoplay.start();
      play.removeClass("on");
    }
    play_status = !play_status;
  });
});

// YOUR REST
var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 3, // 3 * 2=6개 이상 리스트는 무조건 있어야함
  spaceBetween: 160,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// MAYFIELD WELLNESS
var swiper = new Swiper(".mySwiper3", {
  slidesPerView: "auto", // 3 * 2=6개 이상 리스트는 무조건 있어야함
  spaceBetween: 50,
  slidesOffsetBefore: 50,
  loop: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// header, TOP 버튼
window.onscroll = function () {
  let ht = document.documentElement.scrollTop;
  console.log(ht);
  if (ht > 50) {
    document.getElementsByClassName("btn_top")[0].style.opacity = "1";

    document.getElementsByTagName("header")[0].style.background = "#fff";
    document.getElementsByTagName("header")[0].classList.add("header_active");
    document.getElementById("logo").setAttribute("src", "images/logo.svg");
    document.getElementsByClassName("point_g")[0].style.color = "#014D33";
    document.getElementsByTagName("span")[1].style.transform = "scaleX(0.8)";
    document.getElementsByTagName("span")[1].style.transformOrigin = "right";

    for (let i = 0; i <= 4; i++) {
      document
        .querySelectorAll("header ul li a")
        [i].classList.add("util_active");
    }

    for (let i = 0; i <= 2; i++) {
      document
        .querySelectorAll("header ul #menu a span")
        [i].classList.add("menu_active");
    }
  } else {
    document.getElementsByClassName("btn_top")[0].style.opacity = "0";

    document.getElementsByTagName("header")[0].style.background = "transparent";
    document
      .getElementsByTagName("header")[0]
      .classList.remove("header_active");
    document.getElementById("logo").setAttribute("src", "images/logo_w.svg");
    document.getElementsByClassName("point_g")[0].style.color = "#fff";
    document.getElementsByTagName("span")[1].style.transform = "scaleX(1)";

    for (let i = 0; i <= 4; i++) {
      document
        .querySelectorAll("header ul li a")
        [i].classList.remove("util_active");
    }

    for (let i = 0; i <= 2; i++) {
      document
        .querySelectorAll("header ul #menu a span")
        [i].classList.remove("menu_active");
    }
  }
};
document.getElementsByClassName("btn_top")[0].onclick = function () {
  document.documentElement.scrollTop = "0";
};
