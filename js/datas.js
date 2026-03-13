const parameters = new URLSearchParams(window.location.search);
const planetID = parameters.get("planet");

async function azimuthsOfPlanets() {

   navigator.geolocation.getCurrentPosition((position) => {
      const latitudeuser = position.coords.latitude;
      const longitudeuser = position.coords.longitude;

      const now = new Date();
      const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
      const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
      
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
      for (let i = 1 ; i < 9 ; i++){
         console.log(data.data.table.rows[i].entry.id);
         console.log(parseFloat(data.data.table.rows[i].cells[0].position.horizontal.azimuth.degrees));/*transform str in int*/
         azims.push(parseFloat(data.data.table.rows[i].cells[0].position.horizontal.azimuth.degrees))
      }
      console.log(azims)
      }
   ) 
})}

azimuthsOfPlanets()

const azims = []; //list filled by aimuzthsOfPlanets function

const planets = {

   moon :{
      planetname : "Moon",
      planetimg: "../imglookup/webp/LUplanetswebp/terrelunesktch-Photoroom.webp",
      azimuth : azims[0]
   },

   mercure : {
      planetname: "Mercure",
      planetimg: "../imglookup/assets/mercuresktch-Photoroom.png",
      azimuth : undefined, //undefined until the API help us define it , else error on compass page.
   },
   venus : {
      planetname : "Venus",
      planetimg: "../imglookup/assets/venustransp.png",
      azimuth : undefined
   }
}
