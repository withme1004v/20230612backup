$(function () {
  let i = 1;
  $("#btn_top").click(function () {
    if (i == 1) {
      for (let i = 0; i < 4; i++) {
        $(".square")
          .eq(i)
          .css({ background: "url(images/article" + (i + 2) + ".png)" });
        if (i == 3) {
          $(".square").eq(3).css({ background: "url(images/article1.png)" });
        }
      }
      $(".dot li a").removeClass();
      $(".dot li").eq(i).find("a").addClass("on");
      i++;
    } else if (i == 2) {
      for (let i = 0; i < 4; i++) {
        $(".square")
          .eq(i)
          .css({ background: "url(images/article" + (i + 3) + ".png)" });
        if (i == 2) {
          $(".square").eq(2).css({ background: "url(images/article1.png)" });
        }
        if (i == 3) {
          $(".square").eq(3).css({ background: "url(images/article2.png)" });
        }
      }
      $(".dot li a").removeClass();
      $(".dot li").eq(i).find("a").addClass("on");
      i++;
    } else if (i == 3) {
      $(".square").eq(0).css({ background: "url(images/article4.png)" });

      $(".square").eq(1).css({ background: "url(images/article1.png)" });

      $(".square").eq(2).css({ background: "url(images/article2.png)" });

      $(".square").eq(3).css({ background: "url(images/article3.png)" });

      $(".dot li a").removeClass();
      $(".dot li").eq(i).find("a").addClass("on");
      i = 0;
    } else if (i == 0) {
      $(".square").eq(0).css({ background: "url(images/article1.png)" });

      $(".square").eq(1).css({ background: "url(images/article2.png)" });

      $(".square").eq(2).css({ background: "url(images/article3.png)" });

      $(".square").eq(3).css({ background: "url(images/article4.png)" });

      $(".dot li a").removeClass();
      $(".dot li").eq(i).find("a").addClass("on");
      i++;
    }
  });
});
