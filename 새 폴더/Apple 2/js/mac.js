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
    document.querySelector(".top-menu").style.backgroundColor = "#fff";
    document.querySelector(".top-menu").style.transitionDelay = "0";
    /* for (let i = 0; i <= 2; i++) {
    fl[i].classList.add("on");
  } */
    fl.classList.add("on");
  });
  item.addEventListener("mouseleave", function () {
    document.querySelector(".top-menu").style.backgroundColor = "#fff";
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
    // gnb[keys].classList.add("active");
  });
  item.addEventListener("mouseleave", function (e) {
    let j = Array.from(subMenu).indexOf(e.target);
    subMenu[j].style.height = 0 + "px";
    /* for (let i = 0; i <= 4; i++) {
            subMenu[i].style.height = 0 + "px";
          } */
    // gnb[keys].classList.remove("active");
  });
});

$(function () {
  /* var swiper = new Swiper(".mySwiper6", {
    speed: 14000,
    loop: true,
    spaceBetween: 50,
    slidesPerView: 3,
    // centeredSlides: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    oneWayMovement: true,
  });
  var swiper = new Swiper(".mySwiper7", {
    speed: 11500,
    loop: true,
    spaceBetween: 50,
    slidesPerView: 3,
    // centeredSlides: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    oneWayMovement: true,
  }); */

  let animationSpeed = 10; // 기본 슬라이더 속도 (초당 이동 거리)
  let sliderWidth = $(".slider").width() * $(".slider").length; //이미지 가로 값
  // $(".slider-container").append($(".slider").eq(0).clone());

  const tl = gsap.timeline({ repeat: -1 });
  tl.to(".slider-container1", {
    x: -sliderWidth,
    duration: animationSpeed,
    ease: "linear",
  });
  tl.play();
  $(".slider-container1").hover(
    function () {
      //tl.pause();
      animationSpeed = 200; // 원하는 속도로 조절합니다.
      tl.duration(animationSpeed);
    },
    function () {
      animationSpeed = 10; // 마우스를 떠난 후 기존 속도로 복구합니다.
      tl.duration(animationSpeed);
      tl.play();
    }
  );
  const t2 = gsap.timeline({ repeat: -1 });
  t2.to(".slider-container2", {
    x: -sliderWidth,
    duration: animationSpeed,
    ease: "linear",
  });
  t2.play();
  $(".slider-container2").hover(
    function () {
      //t2.pause();
      animationSpeed = 200; // 원하는 속도로 조절합니다.
      t2.duration(animationSpeed);
    },
    function () {
      animationSpeed = 10; // 마우스를 떠난 후 기존 속도로 복구합니다.
      t2.duration(animationSpeed);
      t2.play();
    }
  );
});
