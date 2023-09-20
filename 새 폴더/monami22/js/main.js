let status = true;
document.getElementById("menu").onclick = function () {
  document.getElementById("bg").classList.toggle("bg");
  if (status) {
    document.getElementById("F1").classList.replace("sub", "sub1");
  } else {
    document.getElementById("F1").classList.replace("sub1", "sub");
  }
  status = !status;
};
