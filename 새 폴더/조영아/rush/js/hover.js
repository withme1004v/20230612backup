$(function () {
  $(".side_btn > a")
    .eq(1)
    .hover(
      function () {
        $(".side_QR").css("display", "block");
      },
      function () {
        $(".side_QR").css("display", "none");
      }
    );
});
