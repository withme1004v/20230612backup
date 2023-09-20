$(function () {
  let x_posi = 0;
  let y_posi = 0;
  let x_current = -50;
  let y_current = -50;
  let masksize = 50;
  let maskx = -25;
  let masky = -25;
  let size_current = 0;
  let acc = 0.11;
  let acc2 = 0.15;
  $(".maskLayer").css({
    "clip-path":
      "circle(" + masksize + "px" + "at" + maskx + "px " + masky + "px)",
  });
  $(document).mousemove(function (e) {
    x_posi = e.pageX;
    y_posi = e.pageY;
    calEase();
  });
  $(".hoverLayer").hover(
    function () {
      masksize = 250;
    },
    function () {
      masksize = 50;
    }
  );
  function calEase() {
    //위치(x_current와 y_current) 및 크기(size_current) 값을 부드럽게 변화시키는 데 사용됩니다
    x_current = x_current + (x_posi - x_current) * acc;
    y_current = y_current + (y_posi - y_current) * acc;
    size_current = size_current + (masksize - size_current) * acc2;
    $(".maskLayer").css({
      "clip-path":
        "circle(" +
        size_current +
        "px" +
        "at" +
        x_current +
        "px " +
        y_current +
        "px)",
    });
  }
});
