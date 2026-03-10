const parameters = new URLSearchParams(window.location.search);
const planetID = parameters.get("planet");

const planets = {
   mercure : {
      planetname: "Mercure",
      planetimg: "../imglookup/assets/mercuresktch-Photoroom.png",
      azimuth : 0 //Constant Azimuth so the planet is still showed on compasspage
   },
   venus : {
      planetname : "Venus",
      planetimg: "../imglookup/assets/venustransp.png",
      azimuth : 0
   }
}

const observables = {}; //dict filled by aimuthsOfPlanets function


async function azimuthsOfPlanets() {

   navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const now = new Date();
      const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
      
      fetch(`https://aa.usno.navy.mil/api/rstt/oneday?date=${date}&coords=${lat},${lng}&tz=0&body=3`)                     
   .then(response => response.json())
   .then(data => {
      console.log(data);

      }
   ) 
})}
   

/*
const dateUTC = new Date().toISOString().slice(0,19);
var offset = -(new Date().getTimezoneOffset() / 60);
console.log(offset);


console.log(dateUTC)
console.log(timezone)

console.log(Object.keys(planets).length)
*/

azimuthsOfPlanets()