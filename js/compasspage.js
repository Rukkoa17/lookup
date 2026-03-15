window.addEventListener("planetsReady", () => { //Making the site wait for datas collection before starting compass resulting in error
  //planet data
  const theplanet = planets[planetID];
  const theplanetimage = document.getElementById("image-of-planet");
  const textdegrees = document.getElementById("showingDegrees");
  theplanetimage.src = theplanet.planetimg;

  const compassCircle = document.querySelector("#compass");
  const orbit = document.querySelector("#image-section");

  //planet azimuth , in datas.js
  let pointdeg = theplanet.azimuth;
  let pointdegtext = Math.round(pointdeg)
  let colorvisible = theplanet.visibility;

  //hiding planet until compass is ready for it to be accurate
  orbit.style.opacity = "0";
  orbit.style.transition = "opacity 0.6s ease, transform 0.15s ease";
  textdegrees.textContent = `${pointdegtext}° degrees`
  textdegrees.style.fontSize = `2em`

  //states
  let compassReady = false;
  let listenerAttached = false;
  let useAbsolute = false;


  function handler(e) {
    let rawComp = e.webkitCompassHeading ?? (360 - e.alpha);
    if (rawComp == null) return;
    
    let compass = rawComp % 360;
    
    //reveal planet already in correct position
    if (!compassReady) {
        compassReady = true;
        orbit.style.opacity = "1";
    }
    
    compassCircle.style.transform = `rotate(${-compass}deg)`;
    placePlanet(compass);
  }

  //place planet based on current compass heading
  function placePlanet(compass) {
    let difference = ((pointdeg - compass + 540) % 360) - 180;
    let rad = difference * (Math.PI / 180);
    let x = 75 * Math.sin(rad);
    let y = -35 * Math.cos(rad);
    orbit.style.transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh))`;
  }

  //listeners only once, prefer absolute else deviceorientation
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

  //Looking for IOS
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  function init() {
    if (isIOS) {
        const btn = document.createElement("button");
        btn.innerText = "Enable Compass";
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
})

//Sorry for using the help of Claude , I really understood everything but this thing was driving me insane because I couldn't test it on my pc... (22git pushes)