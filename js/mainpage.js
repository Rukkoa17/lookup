// Main/Selection page script//

/*Script for random positioning of the planets at opening/refresh*/

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.getElementsByClassName("sketch");
  const bigimgs = document.getElementsByClassName("bigsketch");


  for ( let i = 0 ; i < imgs.length ; i++){
   imgs[i].style.marginTop = `${randomBetween(2, 20)}vh`;
   imgs[i].style.marginLeft = `${randomBetween(2, 23)}vw`;

  }

  for ( let i = 0 ; i < bigimgs.length ; i++){
     //Jupiter & Saturn are bigger , so the image is clipped when too close to any border , fix
   bigimgs[i].style.marginTop= `${randomBetween(6, 20)}vh`;
   bigimgs[i].style.marginLeft= `${randomBetween(6.5, 16)}vw`; 
  }
});


/*Script for making the little panels pop beside the clicked planet*/

const clickonplanets = document.querySelectorAll('.sketch , .bigsketch')
const clickablezone = document.getElementById('carrousel-planets')

let currentpanel = null;

Array.from(clickonplanets).forEach(function(clickedonplanet) {
   clickedonplanet.addEventListener("click" , (x) => {
      x.stopPropagation();

      //Remove an already existing pannel to only keep one at a time
      if (currentpanel) {
         currentpanel.classList.remove("open");
      }

      const panel = clickedonplanet.parentElement.lastElementChild
      panel.classList.add("open");
      panelopen = true;
      
      currentpanel = panel
   })
});

clickablezone.addEventListener("click" , () => {
   if(currentpanel ){
      currentpanel.classList.remove("open")
      currentpanel = null;
   }
})


/*Script to assign the planet for the planet specific page


/*Script for scrolling trough the solar system on pc*/

const scrollwind = document.getElementById("carrousel-planets")

let isDragging = false;
let startX;
let scrollStart;

scrollwind.addEventListener("mousedown", e => {
   isDragging = true;
   startX = e.clientX;
   scrollStart = scrollwind.scrollLeft;
});

scrollwind.addEventListener("mousemove", e => {
   if (!isDragging) return;

   let distance = e.clientX - startX;
   scrollwind.scrollLeft = scrollStart - distance;
});

scrollwind.addEventListener("mouseup", () => {
   isDragging = false;
});

scrollwind.addEventListener("mouseleave", () => {
   isDragging = false;
});