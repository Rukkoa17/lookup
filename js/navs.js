const sidenav = document.getElementById("sidenav");
const header = document.getElementById("header");
const main = document.getElementById("carrousel-planets");
const menubtn = document.getElementById("menu-btn");
const hrline = document.getElementById("header-hr");

function openNav(){
   menubtn.style.display = "none";
   themeSwitch.style.display = "none";
   hrline.style.marginLeft = "40vw"
   sidenav.style.width = "40vw";
   sidenav.style.opacity = "0.7";
   header.style.marginLeft ="40vw";
   main.style.marginLeft ="40vw";

}

function closeNav(){
   menubtn.style.display = "block";
   themeSwitch.style.display = "block";
   hrline.style.marginLeft = "auto"
   sidenav.style.width = "0";
   header.style.marginLeft ="";
   main.style.marginLeft ="0";
}