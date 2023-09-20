window.addEventListener("DOMContentLoaded", function () {
  let x_posi = 0,
    y_posi = 0,
    x_current = -50,
    y_current = -50,
    masksize = 50,
    size_current = 0,
    acc = 0.11,
    acc2 = 0.15,
    afId,
    maskLayer = document.querySelectorAll(".maskLayer"),
    afState = false,
    mainPage = document.querySelector(".mainContents");

  // mouse move
  document.addEventListener("mousemove", function (e) {
    x_posi = e.pageX;
    y_posi = e.pageY;

    if (!afState) {
      afId = requestAnimationFrame(calEase);
      afState = true;
    }
  });

  document
    .querySelector(".section01 .hoverLayer")
    .addEventListener("mouseenter", function () {
      masksize = 250;
    });
  document
    .querySelector(".section01 .hoverLayer")
    .addEventListener("mouseleave", function () {
      masksize = 50;
    });

  // mask
  function calEase() {
    x_current = x_current + (x_posi - x_current) * acc;
    y_current = y_current + (y_posi - y_current) * acc;
    size_current = size_current + (masksize - size_current) * acc2;

    for (let i = 0; i < maskLayer.length; i++) {
      maskLayer[i].setAttribute(
        "style",
        "--mask-size:" +
          size_current +
          "px; --mask-x:" +
          x_current +
          "px; --mask-y:" +
          y_current +
          "px;"
      );
    }

    afId = requestAnimationFrame(calEase);

    if (Math.abs(x_posi - x_current) < 1 && Math.abs(y_posi - y_current)) {
      cancelAnimationFrame(afId);
      afState = false;
    }
  }
});
