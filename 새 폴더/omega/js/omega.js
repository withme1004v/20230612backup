$(function () {
  let subMenu = document.querySelectorAll(".submenu");
  let sub = document.querySelectorAll(".lnb");
  let gnb = document.querySelectorAll(".menu ul li a");
  let Lnb = document.querySelectorAll(".lnb");

  gnb.forEach(function (item, keys) {
    item.addEventListener("mouseenter", function (e) {
      let j = Array.from(gnb).indexOf(e.target);
      console.log(j);
      function others(item) {
        return item !== j;
      }
      let otherItem = Array.from(subMenu).filter(others);
      otherItem.forEach(function (item) {
        item.style.height = "0px";
        item.style.opacity = "0";
      });
      sub.forEach(function () {
        let subht = sub[j].offsetHeight;
        console.log("subht : " + subht);
        subMenu[j].style.height = subht + "px";
        subMenu[j].style.opacity = "1";
      });
    });
    item.addEventListener("mouseleave", function () {});
  });
  subMenu.forEach(function (item, keys) {
    item.addEventListener("mouseenter", function () {
      gnb[keys].classList.add("on", "active");
    });
    item.addEventListener("mouseleave", function (e) {
      let j = Array.from(subMenu).indexOf(e.target);
      subMenu[j].style.height = 0 + "px";
      gnb[keys].classList.remove("on", "active");
    });
  });
  //사이드메뉴바 고정

  let status = true;
  $(".menu01").click(function () {
    if (status) {
      $("body").css({
        position: "fixed",
        overflow: "scroll",
      });
      $(".banner").css({
        filter: "brightness(50%)",
      });
    } else {
      $("body").css({
        height: "100%",
      });
      $(".banner").css({
        filter: "brightness(100%)",
      });
    }
    status = !status;
  });
  //네비게이션 어두운 배경
  $(".menu ul li").hover(function () {
    if (status) {
      $(".banner").css({
        filter: "brightness(50%)",
      });
    } else {
      $(".banner").css({
        filter: "brightness(100%)",
      });
    }
    status = !status;
  });
  $(".submenu").hover(function () {
    if (status) {
      $(".banner").css({
        filter: "brightness(50%)",
      });
    } else {
      $(".banner").css({
        filter: "brightness(100%)",
      });
    }
    status = !status;
  });

  $("section .category ul li a").click(function (e) {
    e.preventDefault();
    let i = $(this).parent().index();
    $(".item .swiper").eq(i).siblings().css("display", "none");
    $(".item .swiper").eq(i).css("display", "block");
    $(".item .swiper-slide").addClass("bestAni");
    $("section .category ul li a").removeClass("on");
    $("section .category ul li").eq(i).find("a").addClass("on");
  });
  $("section .category ul li").eq(0).find("a").addClass("on");

  $(".item .swiper").css("display", "none");
  $(".item .swiper").eq(0).css("display", "block");
  $(".item .swiper").each(function (index, element) {
    var $this = $(this);
    $this.addClass("mySwiper-" + index);

    var swiper = new Swiper(".mySwiper-" + index, {
      observer: true,
      observeParents: true,
      slidesPerView: 6,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },
    });
  });
  var swiper2 = new Swiper(".mySwiper", {
    effect: "fade",
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper3 = new Swiper(".mySwiper3", {
    effect: "fade",
    disableOnInteraction: false,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  AOS.init({
    offset: 50, //트리거 포인트에서 오프셋
    duration: 3000, //기본값 400 0~3000
    easing: "ease-in",
    once: true, //한번하면 true,아니면 false
  });
});
