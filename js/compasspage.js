//Script for changing the planet that is displayed to match with the URL Parameter

const theplanet = planets[planetID];

const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

//Script for the compass (some datas included for easier readability)

const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-of-planet");
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

let current = 0;
let pointdeg = theplanet.planetAzimuth;

function handler(e) {

   let rawComp = e.webkitCompassHeading || Math.abs(e.alpha - 360);
   let normalizedCompass = rawComp % 360;

   if(normalizedCompass < 0){
      normalizedCompass += 360;
   }

   compassCircle.style.transform =
   `rotate(${-normalizedCompass}deg)`;

   let pointdiff = pointdeg - normalizedCompass;

   orbit.style.transform =
   `translate(-50%, -50%) rotate(${pointdiff}deg)`;
}

//put the planet where needed 
//ye.


init();