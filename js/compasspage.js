// planet data
const theplanet = planets[planetID];
const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

// elements
const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");

// azimuth of the planet
let pointdeg = 90;

// handler
function handler(e){

   let rawComp = e.webkitCompassHeading ?? (360 - e.alpha);

   if(rawComp == null) return;

   let compass = rawComp % 360;

   compassCircle.style.transform =
   `rotate(${-compass}deg)`;

   let difference = pointdeg - compass;

   let rad = difference * Math.PI / 180;

   let radius = 150;

   let x = radius * Math.sin(rad);
   let y = -radius * Math.cos(rad);

   orbit.style.transform =
   `translate(-50%, -50%) translate(${x}px, ${y}px)`;
}

window.addEventListener("deviceorientation", handler, true);

// test rotation
setInterval(()=>{
   pointdeg = (pointdeg + 2) % 360;
},50);
//put the planet where needed 
//ye.


/*let test = 0;

setInterval(()=>{
   test += 5;

   let rad = test  * (Math.PI / 180);

   let x = 75 * Math.sin(rad);
   let y = -35 * Math.cos(rad);

   theplanetimage.style.transform =
   `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;
},50);
*/