// planet data
const theplanet = planets[planetID];
const theplanetimage = document.getElementById("image-of-planet");
theplanetimage.src = theplanet.planetimg;

// elements
const compassCircle = document.querySelector("#compass");
const orbit = document.querySelector("#image-section");

// azimuth of the planet (e.g. 90 = East)
let pointdeg = theplanet.planetAzimuth;

// --- Prevent double-firing from both event types ---
let listenerAttached = false;

function placePlanet(compass) {
  // Shortest angular difference, range -180 to +180
  let difference = ((pointdeg - compass + 540) % 360) - 180;

  let rad = difference * (Math.PI / 180);

  // x: sin(rad) → -1 at left, 0 at center, +1 at right
  // y: cos(rad) → -1 at top (facing it), +1 at bottom (behind)
  let x = 40 * Math.sin(rad);   // 40vw max offset left/right
  let y = -35 * Math.cos(rad);  // 35vh max offset top/bottom

  orbit.style.transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;
}

// Initial static placement (compass = 0, facing North by default)
placePlanet(0);

// --- Handler ---
function handler(e) {
  let rawComp = e.webkitCompassHeading ?? (360 - e.alpha);
  if (rawComp == null) return;

  let compass = rawComp % 360;

  // Rotate the compass rose
  compassCircle.style.transform = `rotate(${-compass}deg)`;

  // Move the planet
  placePlanet(compass);
}

// --- Start listening (only attach ONCE) ---
function startListening() {
  if (listenerAttached) return;
  listenerAttached = true;

  // Prefer absolute (true North), fall back to relative
  let useAbsolute = false;

  window.addEventListener("deviceorientationabsolute", (e) => {
    if (e.isTrusted) useAbsolute = true;
    handler(e);
  }, true);

  window.addEventListener("deviceorientation", (e) => {
    if (!useAbsolute) handler(e); // Only use this if absolute isn't firing
  }, true);
}

// --- iOS permission gate ---
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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
//put the planet where needed 
//ye.
