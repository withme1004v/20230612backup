document.getElementById("logo").addEventListener("click", function () {
  document.getElementsByClassName("game_series")[0].classList.toggle("box");
});

let site = true;
let languge = document.querySelector(".language_list");
let languge2 = document.querySelector(".language p");

document.querySelector(".language").onclick = function () {
  if (site) {
    languge.style.display = "block";
    languge2.classList.add("active");
  } else {
    languge.style.display = "none";
    languge2.classList.remove("active");
  }
  site = !site;
  console.log(site);
};
