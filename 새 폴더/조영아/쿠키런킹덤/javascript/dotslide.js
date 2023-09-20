let slideani = document.getElementById("outer");
let slides = document.querySelector(".slides");
let slideImg = document.querySelectorAll(".slides li");
let dots = document.querySelectorAll(".dot");
let introactive = document.querySelectorAll(".cookie_intro span");
let currentIdx = 0;
let slideCount = slideImg.length;
console.log(slideCount);
dots[0].className += "dotactive";
let prev = document.querySelector(".prev"); //이전 버튼
let next = document.querySelector(".next"); //다음 버튼
let slideWidth = 760; //슬라이드이미지 넓이
makeClone(); // 처음이미지와 마지막 이미지 복사 함수
initfunction(); //슬라이드 넓이와 위치값 초기화 함수
function makeClone() {
  let cloneSlide_first = slideImg[0].cloneNode(true);
  let cloneSlide_last = slides.lastElementChild.cloneNode(true);
  slides.append(cloneSlide_first);
  slides.insertBefore(cloneSlide_last, slides.firstElementChild);
}
function initfunction() {
  slides.style.width = slideWidth * (slideCount + 2) + "px";
  slides.style.left = -slideWidth + "px";
}
function showSlide(n) {
  for (i = 0; i < slideImg.length; i++) {
    dots[i].className = dots[i].className.replace("dotactive", " ");
  }
  dots[n].className += "dotactive";
  slides.style.left = -(n + 1) * slideWidth + "px";
  slides.style.transition = "0.5s";
}
+function currentSlide(n) {
  showSlide((currentIdx = n));
};
next.onclick = function () {
  if (currentIdx <= slideCount - 1) {
    //슬라이드이동
    slides.style.left = -(currentIdx + 2) * slideWidth + "px";
    slides.style.transition = "0.5s";
  }
  if (currentIdx === slideCount - 1) {
    //마지막 슬라이드 일때
    setTimeout(function () {
      //0.5초동안 복사한 첫번째 이미지에서, 진짜 첫번째 위치로 이동
      slides.style.left = -slideWidth + "px";
      slides.style.transition = "0s";
    }, 500);
    currentIdx = -1;
  }
  currentIdx += 1;
  for (i = 0; i < slideImg.length; i++) {
    dots[i].className = dots[i].className.replace("dotactive", " ");
    introactive[i].className = introactive[i].className.replace(
      "cookieon",
      " "
    );
  }
  dots[currentIdx].className += "dotactive";
  introactive[currentIdx].className += "cookieon";
};
prev.onclick = function () {
  //이전 버튼 눌렀을때
  console.log(currentIdx);
  if (currentIdx >= 0) {
    slides.style.left = -currentIdx * slideWidth + "px";
    slides.style.transition = "0.5s";
  }
  if (currentIdx === 0) {
    setTimeout(function () {
      slides.style.left = -slideCount * slideWidth + "px";
      slides.style.transition = "0s";
    }, 500);
    currentIdx = slideCount;
  }
  currentIdx -= 1;
  for (i = 0; i < slideImg.length; i++) {
    dots[i].className = dots[i].className.replace("dotactive", "");
  }
  dots[currentIdx].className += "dotactive";
};
let interval = setInterval(function () {
  next.onclick();
}, 2000);
function slide_stop() {
  clearInterval(interval);
}
function slide_start() {
  interval = setInterval(function () {
    next.onclick();
  }, 2000);
}
slideani.addEventListener("mouseenter", function () {
  slide_stop();
});
slideani.addEventListener("mouseleave", function () {
  slide_start();
});
$(function () {
  $(".acter_info,.cookie_move li,.cookie_info li").css("display", "none");
  $(".acter_info").eq(0).css("display", "flex");
  $(".cookie_move li").eq(0).css("display", "block");
  $(".cookie_info li").eq(0).css("display", "block");
  $(".cookie_kind li").click(function () {
    let i = $(this).index();
    $(".cookie_kind li").removeClass("on");
    $(this).addClass("on");
    $(".acter_info").css("display", "none");
    $(".acter_info").eq(i).css("display", "flex");
    $(".acter_info")
      .eq(i)
      .find(".cookie_move li:first")
      .css("display", "block");
    $(".acter_info")
      .eq(i)
      .find(".cookie_info li:first")
      .css("display", "block");
  });
  $("ul.game_character_img li").click(function () {
    let n = $(this).parent().parent().index();
    let i = $(this).index();
    console.log("n" + n + "i" + i);
    $(".acter_info").eq(n).find(".cookie_move li").css("display", "none");
    $(".acter_info")
      .eq(n)
      .find(".cookie_move li")
      .eq(i)
      .css("display", "block");
    $(".acter_info").eq(n).find(".cookie_info li").css("display", "none");
    $(".acter_info")
      .eq(n)
      .find(".cookie_info li")
      .eq(i)
      .css("display", "block");
  });
  $(".Music_video").css("display", "none");
  $(".cookie_mv li").click(function (e) {
    e.preventDefault();
    let i = $(this).index();
    $(".Music_video").css("display", "none");
    $(".more_video ul li").eq(i).css("display", "block");
  });
  $(".cookie_vd").click(function () {
    $(this).parent().css({ display: "none" });
  });
});
