// submenu 스크립트
let subMenu = document.querySelectorAll(".submenu");
let gnb = document.querySelectorAll(".gnb ul li a");
let lnb = document.querySelectorAll(".lnb");

gnb.forEach(function (item, keys) {
  item.onmouseenter = function (e) {
    let j = Array.from(gnb).indexOf(e.target);
    function others(item) {
      return item !== j;
    }
    let otherItem = Array.from(subMenu).filter(others);
    otherItem.forEach(function (item) {
      item.style.height = "0px";
      item.style.opacity = "0";
    });

    lnb.forEach(function () {
      let subht = lnb[j].offsetHeight;
      console.log("j : " + j);
      subMenu[j].style.height = subht + "px";
      subMenu[j].style.opacity = "1";
      subMenu[j].classList.add("active2");
    });

    item.onmouseleave = function () {
      for (let i = 0; i <= 6; i++) {
        subMenu[i].style.height = 0 + "px";
        subMenu[j].classList.remove("active2");
      }
    };
  };
});

subMenu.forEach(function (item, keys) {
  item.onmouseenter = function (e) {
    let j = Array.from(subMenu).indexOf(e.target);
    lnb.forEach(function () {
      let subht = lnb[j].offsetHeight;
      console.log("subht : " + subht);
      subMenu[j].style.height = subht + "px";
      subMenu[j].style.opacity = "1";
      subMenu[j].classList.add("active2");
    });

    gnb[j].classList.add("on", "active");
  };

  item.onmouseleave = function (e) {
    for (let i = 0; i <= 6; i++) {
      subMenu[i].style.height = 0 + "px";
      subMenu[i].classList.remove("active2");
    }
    gnb[keys].classList.remove("on", "active");
  };
});

// visual
$(function () {
  const progressLine = $(".autoplay-progress svg line");
  var swiper1 = new Swiper(".mySwiper1", {
    loop: true,
    autoplay: {
      delay: 5500,
      //disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
      },
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        console.log(this.realIndex);
        progressLine.eq(this.realIndex).css("--progress", 1 - progress);
        progressLine.eq(this.realIndex).siblings().css("--progress", 0);
        $(".txt").eq(this.realIndex).find("p").addClass("active");
      },
      slideChange: function () {
        $(".txt p").removeClass("active");
        $(".txt").eq(this.realIndex).find("p").addClass("active");
      },
    },
  });
  //swiper1.autoplay.start();
  let play = $(".slogan .control_w ul li").eq(0).find("a");
  let play_status = true;
  play.click(function (e) {
    e.preventDefault();
    const currentSlideIndex = swiper1.activeIndex;
    console.log("현재 슬라이드 번호:", currentSlideIndex);
    if (play_status) {
      swiper1.autoplay.stop();
      play.addClass("on");
      const currentSlide = swiper1.slides[currentSlideIndex];
      currentSlide.addEventListener("transitionend", function () {
        // 애니메이션이 끝나면 정지 유지
        swiper1.autoplay.stop();
      });
    } else {
      swiper1.autoplay.start();
      play.removeClass("on");
    }
    play_status = !play_status;
  });

  // Art & Culture
  var swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
// Art & Culture 이전 / 다음 버튼
document.getElementById("btn_prev").onmouseenter = function () {
  document.querySelectorAll(".control svg")[0].classList.add("on");
};
document.getElementById("btn_prev").onmouseleave = function () {
  document.querySelectorAll(".control svg")[0].classList.remove("on");
};
document.getElementById("btn_next").onmouseenter = function () {
  document.querySelectorAll(".control svg")[1].classList.add("on");
};
document.getElementById("btn_next").onmouseleave = function () {
  document.querySelectorAll(".control svg")[1].classList.remove("on");
};

// #Shinsegae Brand
var swiper3 = new Swiper(".mySwiper3", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// #Shinsegae Brand 이전 / 다음 버튼
document.getElementById("btn_prev2").onmouseenter = function () {
  document.querySelectorAll(".control_2 svg")[0].classList.add("on");
};
document.getElementById("btn_prev2").onmouseleave = function () {
  document.querySelectorAll(".control_2 svg")[0].classList.remove("on");
};
document.getElementById("btn_next2").onmouseenter = function () {
  document.querySelectorAll(".control_2 svg")[1].classList.add("on");
};
document.getElementById("btn_next2").onmouseleave = function () {
  document.querySelectorAll(".control_2 svg")[1].classList.remove("on");
};

// TOP 버튼
/*window.onscroll = function () {
  let ht = document.documentElement.scrollTop;
  console.log(ht);
  if (ht > 50) {
    document.getElementsByClassName("btn_top")[0].style.opacity = "1";
  } else {
    document.getElementsByClassName("btn_top")[0].style.opacity = "0";
  }
};
document.getElementsByClassName("btn_top")[0].onclick = function () {
  document.documentElement.scrollTop = "0";
};*/
