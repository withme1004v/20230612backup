let subMenu = document.querySelectorAll(".submenu");
let sub = document.querySelectorAll(".lnb");
let gnb = document.querySelectorAll(".menu ul li a");
let Lnb = document.querySelectorAll(".lnb");
let ht = Lnb[2].offsetHeight;

/*for (let i = 0; i < 4; i++) {
  subMenu[i].style.opacity = "0";
}*/
gnb.forEach(function (item, keys) {
  item.addEventListener("mouseenter", function (e) {
    let j = Array.from(gnb).indexOf(e.target);
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

  item.addEventListener("mouseleave", function () {
    //subMenu.style.height = 0 + "px";
  });
});
subMenu.forEach(function (item, keys) {
  item.addEventListener("mouseenter", function () {
    //subMenu.style.height = ht + "px";
    gnb[keys].classList.add("on", "active");
  });
  item.addEventListener("mouseleave", function (e) {
    let j = Array.from(subMenu).indexOf(e.target);
    subMenu[j].style.height = 0 + "px";
    /* for (let i = 0; i <= 4; i++) {
      subMenu[i].style.height = 0 + "px";
    }*/
    gnb[keys].classList.remove("active");
  });
});

// 스크롤 내릴 시 이미지 로고 색깔 바뀌게
// window.onscroll = function () {
//   let sht = document.documentElement.scrollTop;
//   let im = document.querySelectorAll(".logo a img");
//   if (sht > 50) {
//     im[1].classList.add("active");
//   } else {
//     im[1].classList.remove("active");
//   }
// };
