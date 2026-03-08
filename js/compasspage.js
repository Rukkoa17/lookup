//Script for changing the planet that is displayed to match with the URL Parameter

const theplanet = planets[planetID];

const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

//Script for the compass (some datas included for easier readability)

const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");

const userisIOS =
   navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
   navigator.userAgent.match(/AppleWebKit/);

function init() {
   start();
   if (!userisIOS){
      window.addEventListener("deviceorientationabsolute", handler , true);
   }
}

function start() {
   if(userisIOS){
      DeviceOrientationEvent.requestPermission()
      .then((response) => {
         if (response === "granted"){
            window.addEventListener("deviceorientationabsolute" , handler , true);
         } else {
            alert("can't LookUP then...");
         }
      })
      .catch(() => alert("device isn't supported.."));
   }
}

let pointdeg = 90; // azimuth of planet in the sky
let radius = 120; // orbit R

function handler(e) {

   let rawComp = e.webkitCompassHeading || Math.abs(e.alpha - 360);
   let normalizedCompass = rawComp % 360;

   if(normalizedCompass < 0){
      normalizedCompass += 360;
   }

   // rotation compass
   compassCircle.style.transform =
   `rotate(${-normalizedCompass}deg)`;

   //difference User/Planet
   let difference = pointdeg - normalizedCompass;

   // degrees → radians
   let rad = difference * (Math.PI / 180);

   let x = radius * Math.sin(rad);
   let y = -radius * Math.cos(rad);

   theplanetimage.style.transform =
   `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

init();
//put the planet where needed 
//ye.

