// planet data
const theplanet = planets[planetID];
const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

// elements
const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");

// azimuth of the planet
let pointdeg = theplanet.planetAzimuth;

//placing the planet beofre running the compass
let radplace = pointdeg  * (Math.PI / 180);

let x = 75 * Math.sin(radplace);
let y = -30 * Math.cos(radplace);

orbit.style.transform =
`translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;

const userisIOS =
   navigator.userAgent.match(/(iPod|iPhone|iPad)/) && 
   navigator.userAgent.match(/AppleWebKit/);

function init() {
   start(); //Starting before trying for !IOS ; unsure that both cases are dealed with
   if (!userisIOS){
      window.addEventListener("deviceorientationabsolute", handler , true); //Pass to handler before the other functions
   }
}

function start() {
   if(userisIOS){
      DeviceOrientationEvent.requestPermission()
      .then((response) => {
         if (response === "granted"){
            window.addEventListener("deviceorientationabsolute" , handler , true); //Pass to handler before the other functions
         } else {
            alert("can't LookUP then...");
         }
      })
      .catch(() => alert("device isn't supported.."));
   }
}

// handler
function handler(e){

   let rawComp = e.webkitCompassHeading ?? (360 - e.alpha);

   if(rawComp == null) return;

   let compass = rawComp % 360;

   compassCircle.style.transform =
   `rotate(${-compass}deg)`;

   let difference = pointdeg - compass;

   let rad = difference * Math.PI / 180;

   let x = 75 * Math.sin(rad);
   let y = -30 * Math.cos(rad);

   orbit.style.transform =
   `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;
}

init();
//put the planet where needed 
//ye.
