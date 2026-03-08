// planet data
const theplanet = planets[planetID];
const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

// elements
const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");

// azimuth of the planet
let pointdeg = theplanet.planetAzimuth;

// place the planet before compass starts
function placePlanet(compass) {
  let difference = pointdeg - compass;
  let rad = difference * Math.PI / 180;
  let x = 75 * Math.sin(rad);
  let y = -30 * Math.cos(rad);
  orbit.style.transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;
}

// initial static placement (before compass runs)
let radplace = pointdeg * (Math.PI / 180);
let x = 75 * Math.sin(radplace);
let y = -30 * Math.cos(radplace);
orbit.style.transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;

const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// handler
function handler(e) {
  let rawComp = e.webkitCompassHeading ?? (360 - e.alpha);
  if (rawComp == null) return;
  let compass = rawComp % 360;

  compassCircle.style.transform = `rotate(${-compass}deg)`;
  placePlanet(compass);
}

function startListening() {
  // Try absolute first, fall back to regular deviceorientation
  window.addEventListener("deviceorientationabsolute", handler, true);
  window.addEventListener("deviceorientation", handler, true);
}

function init() {
  if (isIOS) {
    // iOS: MUST be triggered by a user gesture (button tap)
    const btn = document.createElement("button");
    btn.innerText = "🔭 Enable Compass";
    btn.style.cssText = `
      position: fixed; bottom: 30px; left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px; font-size: 16px;
      background: rgba(255,255,255,0.15);
      color: white; border: 1px solid white;
      border-radius: 20px; z-index: 9999; cursor: pointer;
    `;
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            startListening();
            btn.remove();
          } else {
            alert("Compass permission denied.");
          }
        })
        .catch(() => alert("Device not supported."));
    });
  } else {
    // Android & desktop: just start listening
    startListening();
  }
}

init();
//put the planet where needed 
//ye.
