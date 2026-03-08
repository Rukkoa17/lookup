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

function handler(e) {

   let rawComp = e.webkitCompassHeading || Math.abs(e.alpha - 360);
   let normalizedCompass = rawComp % 360;

   if(normalizedCompass < 0){
      normalizedCompass += 360;
   }

   //rotation of compass
   compassCircle.style.transform =
   `rotate(${-normalizedCompass}deg)`;

   // différence planet/user
   let pointdiff = pointdeg - normalizedCompass;

   let rad = pointdiff * (Math.PI / 180);

   let x = rad * Math.sin(rad);
   let y = -rad * Math.cos(rad);

   orbit.style.transform =
   `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

//put the planet where needed 
//ye.


init();