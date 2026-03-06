const parameters = new URLSearchParams(window.location.search);
const planetID = parameters.get("planet");

const planets = {
   mercure : {
      planetname: "Mercure",
      planetimg: "../imglookup/assets/mercuresktch-Photoroom.png",
      planetAzimuth : 80
   },
   venus : {
      planetname : "Venus",
      planetimg: "../imglookup/assets/venustransp.png"
   }
}

