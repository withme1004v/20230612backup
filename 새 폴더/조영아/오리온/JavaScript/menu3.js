let subMenu = document.querySelectorAll(".submenu");
let sub = document.querySelectorAll(".lnb");
let gnb = document.querySelectorAll(".menu ul li a");

gnb.forEach(function (item, keys) {
  item.addEventListener("mouseenter", function (e) {
    let j = Array.from(gnb).indexOf(e.target);
    //console.log(j);
    function others(item) {
      return item !== j;
    }

    let otherItem = Array.from(subMenu).filter(others);
    otherItem.forEach(function (item) {
      item.style.height = "0px";
      item.style.opacity = "0";
    });

    sub.forEach(function () {
      let j = Array.from(gnb).indexOf(e.target);
      console.log(j);
      let subht = sub[j].offsetHeight;
      //console.log("subht : " + subht);
      subMenu[j].style.height = subht + "px";
      subMenu[j].style.opacity = "1";
    });
  });
  item.addEventListener("mouseleave", function () {
    for (let i = 0; i <= 5; i++) {
      subMenu[i].style.height = 0 + "px";
    }
  });
});
subMenu.forEach(function (item, keys) {
  item.addEventListener("mouseenter", function (e) {
    let j = Array.from(subMenu).indexOf(e.target);
    console.log(j);
    sub.forEach(function () {
      let subht = sub[j].offsetHeight;
      //console.log("subht : " + subht);
      subMenu[j].style.height = subht + "px";
      subMenu[j].style.opacity = "1";
    });
    console.log(j);
    gnb[j].classList.add("on", "active");
  });

  item.addEventListener("mouseleave", function (e) {
    for (let i = 0; i <= 5; i++) {
      subMenu[i].style.height = 0 + "px";
    }
    gnb[keys].classList.remove("on", "active");
  });
});

document.getElementById("menu_bar").addEventListener("click", function () {
  this.classList.toggle("menu_bar01");
  document.getElementById("menu_bar_one").classList.toggle("bar1");
  document.getElementById("menu_bar_two").classList.toggle("bar2");
  document.getElementById("menu_bar_three").classList.toggle("bar3");
  document.getElementsByClassName("side_info")[0].classList.toggle("box");
});

let content = document.querySelectorAll(".intro_topbg > h1");
let btn = document.querySelectorAll(".intro > li");
let pro = document.querySelectorAll(".intro_position");
let ht = [
  pro[0].offsetHeight,
  pro[1].offsetHeight,
  pro[2].offsetHeight,
  pro[3].offsetHeight,
];
console.log(document.querySelector(".intro_main").offsetHeight);
for (let i = 0; i <= 3; i++) {
  pro[i].style.display = "none";
  content[i].style.display = "none";
}
pro[0].style.display = "block";
content[0].style.display = "block";

document.querySelector(".intro_main").style.height = ht[0] + "px";
btn.forEach(function (item, keys) {
  item.onclick = function (e) {
    e.preventDefault();
    let j = Array.from(btn).indexOf(e.target);
    function others(item) {
      return item !== j;
    }
    console.log(j);
    document.querySelector(".intro_main").style.height = ht[j] + "px";
    let otherItems = Array.from(pro).filter(others);
    otherItems.forEach(function (item) {
      item.style.display = "none";
    });
    for (let i = 0; i <= 3; i++) {
      pro[i].style.display = "none";
      content[i].style.display = "none";
    }
    content[j].style.display = "block";
    pro[j].style.display = "block";
    let otherItem = Array.from(btn).filter(others);

    otherItem.forEach(function (item) {
      item.classList.remove("on");
    });
    btn[j].classList.add("on");
  };
});

let site = true;
let family = document.querySelector(".site_home_list");
let family1 = document.querySelector(".sitehome p");

document.querySelector(".sitehome").onclick = function () {
  if (site) {
    family.classList.add("siteon");
    family1.classList.add("siteactive");
    document.querySelector(".sitehome").style.borderColor = "#d2d2d2";
  } else {
    family.classList.remove("siteon");
    family1.classList.remove("siteactive");
    document.querySelector(".sitehome").style.borderColor = "#777";
  }
  site = !site;
  console.log(site);
};
