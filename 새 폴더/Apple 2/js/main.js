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
