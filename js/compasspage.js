// --- Planet data ---
const theplanet = planets[planetID];
const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

// --- Elements ---
const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");

// --- Planet azimuth (e.g. 90 = East) ---
let pointdeg = theplanet.planetAzimuth;

// --- Hide planet until compass is ready ---
orbit.style.opacity = "0";
orbit.style.transition = "opacity 0.6s ease, transform 0.15s ease";

// --- State ---
let compassReady = false;
let listenerAttached = false;
let useAbsolute = false;

// --- Place planet based on current compass heading ---
function placePlanet(compass) {
  let difference = ((pointdeg - compass + 540) % 360) - 180;
  let rad = difference * (Math.PI / 180);
  let x = 40 * Math.sin(rad);
  let y = -35 * Math.cos(rad);
  orbit.style.transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;
}

// --- Main handler ---
function handler(e) {
  let rawComp = e.webkitCompassHeading ?? (360 - e.alpha);
  if (rawComp == null) return;

  let compass = rawComp % 360;

  // First real reading — reveal planet already in correct position
  if (!compassReady) {
    compassReady = true;
    orbit.style.opacity = "1";
  }

  compassCircle.style.transform = `rotate(${-compass}deg)`;
  placePlanet(compass);
}

// --- Attach listeners only once, prefer absolute ---
function startListening() {
  if (listenerAttached) return;
  listenerAttached = true;

  window.addEventListener("deviceorientationabsolute", (e) => {
    useAbsolute = true;
    handler(e);
  }, true);

  window.addEventListener("deviceorientation", (e) => {
    if (!useAbsolute) handler(e);
  }, true);
}

// --- iOS detection ---
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// --- Init ---
function init() {
  if (isIOS) {
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
    startListening();
  }
}

init();