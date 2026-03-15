const parameters = new URLSearchParams(window.location.search);
const planetID = parameters.get("planet");

let planets = {

   moon :{
      planetname : "Moon",
      planetimg: "../imglookup/webp/LUplanetswebp/terrelunesktch-Photoroom.webp",
      azimuth : undefined, //undefined until the API help us define it , else error on compass page.
      visibility : undefined // waiting for API
   },

   mercury : {
      planetname: "Mercury",
      planetimg: "../imglookup/assets/mercuresktch-Photoroom.png",
   },

   venus : {
      planetname : "Venus",
      planetimg: "../imglookup/assets/venustransp.png",
   },

   mars : {
      planetname : "Mars",
      planetimg: "../imglookup/assets/marstransp.png",
   },

   jupiter : {
      planetname : "Jupiter",
      planetimg: "../imglookup/assets/jupitertransp.png",
   },

   saturn : {
      planetname : "Saturn",
      planetimg: "../imglookup/assets/saturntransp.png",
   },

   uranus : {
      planetname : "Uranus",
      planetimg: "../imglookup/assets/uranustransp.png",
   },

   neptune : {
      planetname : "Neptune",
      planetimg: "../imglookup/assets/neptunetransp.png",
   }

}

async function azimuthsOfPlanets() {

   navigator.geolocation.getCurrentPosition((position) => {
      const latitudeuser = position.coords.latitude;
      const longitudeuser = position.coords.longitude;

      const now = new Date();
      const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
      const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
      
      fetch(
         "https://api.astronomyapi.com/api/v2/bodies/positions" +
         `?bodies=mercury,venus,mars,jupiter,saturn,uranus,neptune,moon` +
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
      for (let i = 1 ; i < 10 ; i++){
         let nameWithApi = data.data.table.rows[i].entry.id;
         let azimWithApi = parseFloat(data.data.table.rows[i].cells[0].position.horizontal.azimuth.degrees)

         if (!planets[nameWithApi]) continue;

         console.log(i, nameWithApi); //test

         let altitudeWithApi = parseFloat(data.data.table.rows[i].cells[0].position.horizontal.altitude.degrees);
         let magnitudeWithApi = (data.data.table.rows[i].cells[0].extraInfo.magnitude); //low magnitude = more shining & visible

         let visible = ""; // "red":not visible | "yellow":possible,depends on condition of user (naked eye) | "green": visible (naked eye) 

         if (nameWithApi !== "venus" && nameWithApi !== "jupiter"){ //Venus & Jupiter shine more , so other coditions for them !

            if (altitudeWithApi >= 15 && magnitudeWithApi < 4){ 
               visible = "green"; //For a GOOD visibility it needs >15° alt and <4° magnitude

            } else if (altitudeWithApi > 15 && magnitudeWithApi < 6 ){
               visible = "yellow"; //Depending on many conditions but here the planet can maybe be visible
            } else {
               visible = "red";
            }
         } else {
            if (altitudeWithApi > 10 && magnitudeWithApi < 0){
               visible = "green";
            } else if (altitudeWithApi > 5 && magnitudeWithApi < 2){
               visible = "yellow";
            } else {
               visible ="red";
            }
         }      

         planets[nameWithApi].azimuth = azimWithApi,
         planets[nameWithApi].visibility = visible
      }
      console.log(planets)
      window.dispatchEvent(new Event("planetsReady"));
      }
   ) 
})}

azimuthsOfPlanets()