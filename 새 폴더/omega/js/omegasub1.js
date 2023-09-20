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
$(function () {
  let status = true;
  $(".menu01").click(function () {
    if (status) {
      $("body").css({
        height: "100vh",
        overflow: "hidden",
      });
      $(".bg").css({
        filter: "brightness(50%)",
      });
    } else {
      $("body").css({
        height: "100%",
      });
      $(".bg").css({
        filter: "brightness(100%)",
      });
    }
    status = !status;
  });
  //네비게이션 어두운 배경
  $(".menu ul li").hover(function () {
    if (status) {
      $(".bg").css({
        filter: "brightness(50%)",
      });
    } else {
      $(".bg").css({
        filter: "brightness(100%)",
      });
    }
    status = !status;
  });
  $(".submenu").hover(function () {
    if (status) {
      $(".bg").css({
        filter: "brightness(50%)",
      });
    } else {
      $(".bg").css({
        filter: "brightness(100%)",
      });
    }
    status = !status;
  });
});
