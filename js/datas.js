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
      const latitudeuser = position.coords.latitude;
      const longitudeuser = position.coords.longitude;

      const now = new Date();
      const date = now.toISOString().split("T")[0];         // "2026-03-10"
      const time = now.toISOString().split("T")[1].slice(0,8); // "14:32:00"
      
      fetch(
         "https://api.astronomyapi.com/api/v2/bodies/positions" +
         `?bodies=mercury` +
         `&latitude=${latitudeuser}&longitude=${longitudeuser}&elevation=0` +
         `&from_date=${date}&to_date=${date}&time=${time}`,
         {
        headers: {
          "Authorization": "Basic " + btoa("YOUR_APP_ID:YOUR_APP_SECRET")
            }
         }                          // ← fetch options closes here
      )                     
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