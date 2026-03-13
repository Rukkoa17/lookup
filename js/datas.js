const parameters = new URLSearchParams(window.location.search);
const planetID = parameters.get("planet");

const planets = {
   mercure : {
      planetname: "Mercure",
      planetimg: "../imglookup/assets/mercuresktch-Photoroom.png",
      azimuth : 80 //Constant Azimuth so the planet is still showed on compasspage
   },
   venus : {
      planetname : "Venus",
      planetimg: "../imglookup/assets/venustransp.png",
      azimuth : 90
   }
}
/*
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
          "Authorization": "Basic " + btoa("fb69b7fb-fea6-4cc5-a336-6b14ce55faa7:43af20480582a4a90cc67032a86f8d66198bceb4c72e5866aaeaeb9fc12e7e28c308be7396f74ca0f701f2c7850fca8577cd0dbc73101affec1d3f8a2da65e06e20fe7c231023b01e1c2d783f39ca70cbf8c4f652351954d6adcf4d3824426390cb1e4bdf3f3e6b26216c91277a325af")
            }
         }                        
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


azimuthsOfPlanets()

*/