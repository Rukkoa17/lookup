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
   bigimgs[i].style.marginTop= `${randomBetween(2, 3)}vh`;
   bigimgs[i].style.marginLeft= `${randomBetween(6.5, 7)}vw`; 
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


/*Script to assign the light color for each planet*/
const planetsdatas = JSON.parse(sessionStorage.getItem("planetsData"))

for (const current in planetsdatas){
   let current_light = document.getElementById(`${current}-light`);
   let current_status_text = document.getElementById(`${current}-status`);
   //Adding the class of color needed for the light , themes.css is helping here.
   current_light.classList.add(planetsdatas[current].visibility);   
   
   //Depending on the color of the light , changing the text next to it.
   if (String(current_light.classList).includes("green")){
      current_status_text.textContent = "Yeah Visible"
   } else if (String(current_light.classList).includes("yellow")){
      current_status_text.textContent = "Mhh Maybe"
   }
}




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
