// planet data
const theplanet = planets[planetID];
const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

// elements
const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");

// azimuth of the planet
let pointdeg = 90; 

const userisIOS =
navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
navigator.userAgent.match(/AppleWebKit/);

// start
function init(){

   start();

   if(!userisIOS){
      window.addEventListener("deviceorientation", handler, true);
   }
}

// ios permission
function start(){

   if(userisIOS){

      DeviceOrientationEvent.requestPermission()
      .then((response)=>{

         if(response === "granted"){
            window.addEventListener("deviceorientation", handler, true);
         }

      })
      .catch(()=> alert("device not supported"));
   }
}

// handler
function handler(e){

   let rawComp = e.webkitCompassHeading || (360 - e.alpha);
   let normalizedCompass = rawComp % 360;

   if(normalizedCompass < 0){
      normalizedCompass += 360;
   }

   // rotate compass
   compassCircle.style.transform =
   `rotate(${-normalizedCompass}deg)`;

   // difference user / planet
   let difference = pointdeg - normalizedCompass;

   let rad = difference * (Math.PI / 180);

   // orbit radius
   let radius = 120;

   let x = radius * Math.sin(rad);
   let y = -radius * Math.cos(rad);

   orbit.style.transform =
   `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

init();
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