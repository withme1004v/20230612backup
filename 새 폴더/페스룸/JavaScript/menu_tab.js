let content = document.querySelector(".all_menupro");
let btn = document.querySelectorAll(".tablink");
let pro = document.querySelectorAll(".product_info > ul > li");
let ht = [
  pro[0].offsetHeight,
  pro[1].offsetHeight,
  pro[2].offsetHeight,
  pro[3].offsetHeight,
  pro[4].offsetHeight,
  pro[5].offsetHeight,
  pro[6].offsetHeight,
];
for (let i = 0; i < 7; i++) {
  pro[i].style.display = "none";
}
pro[0].style.display = "block";
console.log(ht);
//console.log("ht : " + ht);
document.querySelector(".product").style.height = ht[0] + "px";

content.style.backgroundImage = "url(images2/slide1.gif)";
btn.forEach(function (item, keys) {
  //console.log("item :" + item + "\n" + "keys : " + keys);
  item.onclick = function (e) {
    e.preventDefault();
    let j = Array.from(btn).indexOf(e.target);
    function others(item) {
      return item !== j;
    }
    console.log(j);

    document.querySelector(".product").style.height = ht[j] + "px";
    let otherItems = Array.from(pro).filter(others);
    otherItems.forEach(function (item) {
      item.style.display = "none";
    });
    pro[j].style.display = "block";
    // console.log("j : " + j);
    content.style.backgroundImage = "url(images2/slide" + (j + 1) + ".gif)";
    let otherItem = Array.from(btn).filter(others);
    otherItem.forEach(function (item) {
      item.style.color = "#000";
    });

    this.style.color = "red";
  };
});
