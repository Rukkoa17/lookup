// planet data
const theplanet = planets[planetID];
const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

// elements
const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");


// azimuth of the planet
let pointdeg = theplanet.planetAzimuth;



let radplace = pointdeg  * (Math.PI / 180);

let x = 75 * Math.sin(radplace);
let y = -30 * Math.cos(radplace);

orbit.style.transform =
`translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;

const userisIOS =
   navigator.userAgent.match(/(iPod|iPhone|iPad)/) && 
   navigator.userAgent.match(/AppleWebKit/);

function init(){

   start();

   if(!userisIOS){
      window.addEventListener("deviceorientation", handler, true);         
   }
}

function start() {
   
   if(userisIOS){
      DeviceOrientationEvent.request.Permission()
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

//put the planet where needed 
//ye.
