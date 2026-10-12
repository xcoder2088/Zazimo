(() => {
  "use strict";

  const canvas = document.getElementById("trace-canvas");
  const characterFace = document.getElementById("character-face");
  const ctx = canvas.getContext("2d");
  const feedback = document.getElementById("feedback");
  const clearButton = document.getElementById("clear-button");
  const checkButton = document.getElementById("check-button");
  const demoButton = document.getElementById("demo-button");
  const calmToggle = document.getElementById("calm-toggle");
  const themeButtons = Array.from(document.querySelectorAll("[data-theme]"));
  const digitButtons = Array.from(document.querySelectorAll("[data-digit]"));
  const numberTitle = document.getElementById("number-title");
  const guideGlyph = document.querySelector(".guide-glyph");
  let selectedDigit = 1;
  let successState = false;
  const celebrationPalette = ["#ffd22f","#f0262e","#83c51c","#ff9228","#08a9c9","#ffb632","#e46ac0","#35a878","#9b55b7","#e23c83","#19b7b0","#5b8def"];
  let activeCharacterColor = celebrationPalette[0];
  let previousCharacterColor = "";
  function chooseCelebrationColor() {
    const choices = celebrationPalette.filter(color => color !== previousCharacterColor);
    activeCharacterColor = choices[Math.floor(Math.random() * choices.length)];
    previousCharacterColor = activeCharacterColor;
  }
  // Playful color is applied directly to the validated centerline routes.
  // This prevents decorative silhouettes from drifting away from the tracing path.
  const numeralPalette = ["#ffd22f","#f0262e","#83c51c","#ff9228","#08a9c9","#ffb632","#e46ac0","#35a878","#9b55b7","#e23c83"];
  function drawFriendlyNumeral() {
    const routes = tracePaths();
    const now = performance.now();
    const celebrationElapsed = now - celebrationStartedAt;
    const celebrating = successState || (celebrationActive && celebrationElapsed < 1800);
    const palette = ["#ffd22f","#f0262e","#83c51c","#ff9228","#08a9c9","#ffb632","#e46ac0","#35a878","#9b55b7","#e23c83"];
    const width = Math.max(42, Math.min(54, canvas.clientWidth * 0.09));
    // Trois mouvements complets : rebond, balancement et pulsation.
    // Le visage reçoit exactement la même transformation que le chiffre.
    const phase = celebrationElapsed / 230;
    const wave = celebrating && !reducedMotion.matches ? Math.sin(phase) : 0;
    const bounce = celebrationMode === "bounce" ? Math.max(0, wave) * 12 : 0;
    const wiggle = celebrationMode === "wiggle" ? wave * 0.055 : 0;
    const pulse = celebrationMode === "pulse" ? 1 + wave * 0.045 : 1;
    ctx.save();
    ctx.translate(225, 125);
    ctx.rotate(wiggle);
    ctx.scale(pulse, pulse);
    ctx.translate(-225, -125);
    ctx.translate(0, -bounce);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash([]);
    ctx.strokeStyle = celebrating ? "#243344" : "#c4cfdf";
    ctx.lineWidth = celebrating ? width + 5 : width;
    for (const path of routes) {
      if (path.length < 2) continue;
      ctx.beginPath(); ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
      ctx.stroke();
    }
    if (celebrating) {
      ctx.strokeStyle = activeCharacterColor;
      ctx.lineWidth = width;
      for (const path of routes) {
        if (path.length < 2) continue;
        ctx.beginPath(); ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
        ctx.stroke();
      }
      // Vector face overlay, manually calibrated per numeral.
      const eyeAnchors = {
        0:{x:225,y:18}, 1:{x:229,y:26}, 2:{x:224,y:19}, 3:{x:224,y:19},
        4:{x:239,y:20}, 5:{x:260,y:23}, 6:{x:231,y:19}, 7:{x:193,y:23},
        8:{x:225,y:18}, 9:{x:226,y:20}
      };
      const mouthAnchors = {
        0:{x:225,y:48}, 1:{x:229,y:56}, 2:{x:222,y:51}, 3:{x:224,y:50},
        4:{x:239,y:51}, 5:{x:257,y:53}, 6:{x:233,y:52}, 7:{x:191,y:51},
        8:{x:225,y:50}, 9:{x:226,y:51}
      };
      const eyes = eyeAnchors[selectedDigit];
      const mouth = mouthAnchors[selectedDigit];
      const blink = celebrationElapsed % 2400 > 2200;
      const wink = celebrationMode.includes("wink") && celebrationElapsed % 3200 > 2850;
      const eyeMarkup = blink
        ? '<path d="M '+(eyes.x-22)+' '+eyes.y+' q 7 5 14 0 M '+(eyes.x+8)+' '+eyes.y+' q 7 5 14 0" fill="none" stroke="#243344" stroke-width="3" stroke-linecap="round"/>'
        : '<ellipse class="face-eye" cx="'+(eyes.x-11)+'" cy="'+eyes.y+'" rx="11" ry="14"/><ellipse class="face-eye" cx="'+(eyes.x+11)+'" cy="'+eyes.y+'" rx="11" ry="14"/><ellipse class="face-pupil" cx="'+(eyes.x-9)+'" cy="'+(eyes.y+2)+'" rx="4" ry="7"/><ellipse class="face-pupil" cx="'+(eyes.x+13)+'" cy="'+(eyes.y+2)+'" rx="4" ry="7"/><circle class="face-glint" cx="'+(eyes.x-10)+'" cy="'+(eyes.y-2)+'" r="2"/><circle class="face-glint" cx="'+(eyes.x+12)+'" cy="'+(eyes.y-2)+'" r="2"/>';
      const mouthMarkup = faceExpression === "tongue"
        ? '<path class="face-mouth" d="M '+(mouth.x-8)+' '+mouth.y+' Q '+mouth.x+' '+(mouth.y+5)+' '+(mouth.x+8)+' '+mouth.y+' Q '+(mouth.x+8)+' '+(mouth.y+10)+' '+mouth.x+' '+(mouth.y+9)+' Q '+(mouth.x-8)+' '+(mouth.y+9)+' '+(mouth.x-8)+' '+mouth.y+' Z"/><path class="face-teeth" d="M '+(mouth.x-5)+' '+(mouth.y+2)+' Q '+mouth.x+' '+(mouth.y+4)+' '+(mouth.x+5)+' '+(mouth.y+2)+' L '+(mouth.x+4)+' '+(mouth.y+5)+' L '+(mouth.x-4)+' '+(mouth.y+5)+' Z"/><path class="face-tongue" d="M '+(mouth.x-2)+' '+(mouth.y+7)+' Q '+(mouth.x+5)+' '+(mouth.y+7)+' '+(mouth.x+3)+' '+(mouth.y+13)+' Q '+(mouth.x-1)+' '+(mouth.y+13)+' '+(mouth.x-2)+' '+(mouth.y+7)+' Z"/>'
        : '<path class="face-mouth" d="M '+(mouth.x-8)+' '+mouth.y+' Q '+mouth.x+' '+(mouth.y+6)+' '+(mouth.x+8)+' '+mouth.y+' Q '+(mouth.x+6)+' '+(mouth.y+10)+' '+mouth.x+' '+(mouth.y+10)+' Q '+(mouth.x-6)+' '+(mouth.y+10)+' '+(mouth.x-8)+' '+mouth.y+' Z"/><path class="face-teeth" d="M '+(mouth.x-5)+' '+(mouth.y+2)+' Q '+mouth.x+' '+(mouth.y+5)+' '+(mouth.x+5)+' '+(mouth.y+2)+' L '+(mouth.x+4)+' '+(mouth.y+5)+' L '+(mouth.x-4)+' '+(mouth.y+5)+' Z"/>';
      const winkMarkup = wink ? '<path d="M '+(eyes.x+5)+' '+eyes.y+' q 7 5 14 0" fill="none" stroke="#243344" stroke-width="3" stroke-linecap="round"/>' : '';
      characterFace.innerHTML = '<g class="face-group" transform="translate(0 '+(-bounce)+') translate(225 125) rotate('+wiggle+') scale('+pulse+') translate(-225 -125)">'+eyeMarkup+winkMarkup+mouthMarkup+'</g>';
      characterFace.classList.add("is-visible");
    }
    if (!celebrating) { characterFace.classList.remove("is-visible"); characterFace.innerHTML = ""; }
    ctx.restore();
  }

  const digitRoutes = {
    0:[{x:225,y:39},{x:205,y:43},{x:190,y:58},{x:180,y:83},{x:176,y:122},{x:180,y:160},{x:191,y:187},{x:207,y:203},{x:225,y:208},{x:243,y:203},{x:259,y:187},{x:270,y:160},{x:274,y:122},{x:270,y:83},{x:260,y:58},{x:245,y:43},{x:225,y:39}],
    1:[{x:190,y:76},{x:229,y:48},{x:229,y:204}],
    2:[{x:187,y:72},{x:194,y:55},{x:208,y:45},{x:227,y:42},{x:245,y:47},{x:259,y:59},{x:265,y:75},{x:263,y:91},{x:254,y:108},{x:239,y:126},{x:221,y:145},{x:204,y:162},{x:190,y:177},{x:188,y:188},{x:270,y:188}],
    3:[{x:194,y:61},{x:206,y:48},{x:224,y:42},{x:243,y:45},{x:257,y:57},{x:262,y:72},{x:257,y:86},{x:245,y:98},{x:229,y:108},{x:244,y:116},{x:257,y:130},{x:263,y:147},{x:260,y:164},{x:250,y:180},{x:234,y:192},{x:215,y:197},{x:196,y:193}],
    4:[{x:239,y:214},{x:239,y:43},{x:177,y:145},{x:278,y:145}],
    5:[{x:267,y:47},{x:187,y:47},{x:183,y:102},{x:211,y:98},{x:237,y:101},{x:257,y:116},{x:265,y:139},{x:262,y:163},{x:248,y:184},{x:226,y:195},{x:202,y:193},{x:183,y:186}],
    6:[{x:250,y:49},{x:232,y:43},{x:214,y:45},{x:198,y:57},{x:186,y:77},{x:178,y:104},{x:175,y:134},{x:179,y:160},{x:190,y:181},{x:207,y:195},{x:227,y:200},{x:246,y:194},{x:260,y:181},{x:268,y:164},{x:269,y:147},{x:263,y:132},{x:251,y:121},{x:235,y:116},{x:218,y:118},{x:203,y:126},{x:192,y:140}],
    7:[{x:177,y:48},{x:273,y:48},{x:210,y:214}],
    8:[{x:225,y:121},{x:205,y:111},{x:191,y:96},{x:185,y:78},{x:190,y:60},{x:204,y:47},{x:225,y:42},{x:246,y:47},{x:260,y:60},{x:265,y:78},{x:259,y:96},{x:245,y:111},{x:225,y:121},{x:205,y:132},{x:190,y:148},{x:184,y:166},{x:189,y:184},{x:204,y:198},{x:225,y:204},{x:246,y:198},{x:261,y:184},{x:266,y:166},{x:260,y:148},{x:245,y:132},{x:225,y:121}],
    9:[{x:245,y:121},{x:230,y:132},{x:212,y:134},{x:196,y:127},{x:184,y:113},{x:179,y:95},{x:182,y:76},{x:192,y:59},{x:208,y:48},{x:228,y:44},{x:247,y:49},{x:262,y:62},{x:271,y:80},{x:275,y:103},{x:273,y:129},{x:267,y:155},{x:256,y:178},{x:241,y:197},{x:225,y:210}]
  };
  const rewardStar = document.getElementById("reward-star");
  const rewardTitle = document.getElementById("reward-title");
  const rewardText = document.getElementById("reward-text");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let drawing = false;
  let points = [];
  let strokes = [];
  let activeStroke = [];
  let demoActive = false;
  let celebrationActive = false;
  let celebrationMode = "blink";
  let faceExpression = "smile";
  let celebrationStartedAt = 0;
  let demoStart = 0;
  let demoFrame = 0;
  const demoDuration = reducedMotion.matches ? 0 : 3200;

  // The guide silhouette and this centerline share one SVG viewBox.
  // This keeps the dotted route geometrically tied to the visible numeral.
  function tracePaths() {
    const rect = canvas.getBoundingClientRect();
    const viewWidth = 450;
    const viewHeight = 250;
    const scale = Math.min(rect.width / viewWidth, rect.height / viewHeight);
    const offsetX = (rect.width - viewWidth * scale) / 2;
    const offsetY = (rect.height - viewHeight * scale) / 2;
    const rawRoutes = selectedDigit === 1
      ? [[{x:190,y:76},{x:229,y:48}], [{x:229,y:48},{x:229,y:204}]]
      : [digitRoutes[selectedDigit]];
    return rawRoutes.map(svgPoints => {
    const smooth = [];
    if (svgPoints.length < 3) {
      for (const point of svgPoints) smooth.push(point);
    } else if ([1, 4, 5, 7].includes(selectedDigit)) {
      smooth.push(...svgPoints);
    } else {
      // Smooth only the digits designed with curved strokes; keep angular digits angular.
      for (let i = 0; i < svgPoints.length - 1; i++) {
        const p0 = svgPoints[Math.max(0, i - 1)];
        const p1 = svgPoints[i];
        const p2 = svgPoints[i + 1];
        const p3 = svgPoints[Math.min(svgPoints.length - 1, i + 2)];
        const steps = 8;
        for (let step = 0; step < steps; step++) {
          const t = step / steps, t2 = t * t, t3 = t2 * t;
          smooth.push({
            x: 0.5 * ((2*p1.x) + (-p0.x+p2.x)*t + (2*p0.x-5*p1.x+4*p2.x-p3.x)*t2 + (-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
            y: 0.5 * ((2*p1.y) + (-p0.y+p2.y)*t + (2*p0.y-5*p1.y+4*p2.y-p3.y)*t2 + (-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
          });
        }
      }
      smooth.push(svgPoints[svgPoints.length - 1]);
    }
    return smooth.map(point => ({
      x: offsetX + point.x * scale,
      y: offsetY + point.y * scale
    }));
    });
  }

  function tracePath() {
    return tracePaths().flat();
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawStrokes();
  }

  function drawGuide() {
    const routes = tracePaths();
    drawFriendlyNumeral();
    // Une fois le tracé réussi, retirer entièrement le guide pointillé.
    if (successState) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // Keep the colorful numeral visible; only the precise dotted centerline overlays it.
    ctx.strokeStyle = document.body.classList.contains("calm") ? "#6e9d87" : "#6686ad";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 8]);
    for (const path of routes) {
      if (!path.length) continue;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDemo(progress) {
    const routes = tracePaths();
    const lengths = routes.map(path => {
      let total = 0;
      for (let i = 1; i < path.length; i++) total += Math.hypot(path[i].x-path[i-1].x,path[i].y-path[i-1].y);
      return total;
    });
    let remaining = lengths.reduce((sum,n)=>sum+n,0) * Math.max(0,Math.min(1,progress));
    const drawnRoutes = [];
    let dot = routes[0][0];
    for (let r=0; r<routes.length; r++) {
      const path=routes[r], drawn=[path[0]];
      let routeRemaining = Math.min(remaining, lengths[r]);
      for (let i=1; i<path.length; i++) {
        const from=path[i-1], to=path[i];
        const length=Math.hypot(to.x-from.x,to.y-from.y);
        if (routeRemaining >= length) {
          drawn.push(to); routeRemaining-=length; dot=to;
        } else {
          const t=length===0?0:routeRemaining/length;
          dot={x:from.x+(to.x-from.x)*t,y:from.y+(to.y-from.y)*t};
          drawn.push(dot); routeRemaining=0; break;
        }
      }
      drawnRoutes.push(drawn);
      remaining=Math.max(0,remaining-lengths[r]);
      if (remaining<=0 && progress<1) break;
    }
    ctx.save();
    ctx.lineCap="round"; ctx.lineJoin="round";
    ctx.strokeStyle=document.body.classList.contains("calm")?"#6d9d87":"#f16c91";
    ctx.lineWidth=Math.max(7,Math.min(12,canvas.clientWidth*0.018));
    ctx.globalAlpha=0.8;
    for(const path of drawnRoutes){
      if(path.length<2) continue;
      ctx.beginPath(); ctx.moveTo(path[0].x,path[0].y);
      for(let i=1;i<path.length;i++)ctx.lineTo(path[i].x,path[i].y);
      ctx.stroke();
    }
    ctx.globalAlpha=1;
    ctx.fillStyle="#ffffff"; ctx.beginPath(); ctx.arc(dot.x,dot.y,9,0,Math.PI*2); ctx.fill();
    ctx.fillStyle=document.body.classList.contains("calm")?"#4e866d":"#ec5f8c";
    ctx.beginPath(); ctx.arc(dot.x,dot.y,6,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }

  function drawStrokes() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    drawGuide();
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = document.body.classList.contains("calm") ? "#5d9277" : "#f16c91";
    ctx.lineWidth = Math.max(8, Math.min(16, rect.width * 0.025));
    for (const stroke of strokes) {
      if (stroke.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y);
      ctx.stroke();
    }
    if (activeStroke.length > 1) {
      ctx.beginPath();
      ctx.moveTo(activeStroke[0].x, activeStroke[0].y);
      for (let i = 1; i < activeStroke.length; i++) ctx.lineTo(activeStroke[i].x, activeStroke[i].y);
      ctx.stroke();
    }
    ctx.restore();
    if (demoActive) {
      const elapsed = performance.now() - demoStart;
      drawDemo(demoDuration === 0 ? 1 : Math.min(1, elapsed / demoDuration));
    }
  }

  function startDemo() {
    if (demoFrame) cancelAnimationFrame(demoFrame);
    drawing = false;
    activeStroke = [];
    demoActive = true;
    demoStart = performance.now();
    feedback.textContent = selectedDigit === 1 ? "Regarde le point : il monte en diagonale, puis descend tout droit." : "Regarde le point suivre le chemin du chiffre " + selectedDigit + ".";
    demoButton.disabled = true;

    if (demoDuration === 0) {
      drawStrokes();
      demoActive = false;
      drawStrokes();
      feedback.textContent = "À toi de jouer ! Suis le chemin pointillé.";
      demoButton.disabled = false;
      return;
    }

    function frame(now) {
      const progress = Math.min(1, (now - demoStart) / demoDuration);
      drawStrokes();
      if (progress < 1) {
        demoFrame = requestAnimationFrame(frame);
      } else {
        demoActive = false;
        demoFrame = 0;
        drawStrokes();
        feedback.textContent = "À toi de jouer ! Suis le chemin pointillé.";
        demoButton.disabled = false;
      }
    }
    demoFrame = requestAnimationFrame(frame);
  }

  function position(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  canvas.addEventListener("pointerdown", event => {
    if (demoActive) return;
    celebrationActive = false;
    event.preventDefault();
    drawing = true;
    activeStroke = [position(event)];
    points.push(activeStroke[0]);
    canvas.setPointerCapture(event.pointerId);
    feedback.textContent = "Continue doucement, tu es capable !";
    drawStrokes();
  });

  canvas.addEventListener("pointermove", event => {
    if (!drawing) return;
    event.preventDefault();
    const p = position(event);
    activeStroke.push(p);
    points.push(p);
    drawStrokes();
  });

  function finishStroke(event) {
    if (!drawing) return;
    drawing = false;
    if (activeStroke.length) strokes.push(activeStroke);
    activeStroke = [];
    if (event && canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    drawStrokes();
    if (points.length >= 8) validateTrace();
  }
  canvas.addEventListener("pointerup", finishStroke);
  canvas.addEventListener("pointercancel", finishStroke);
  canvas.addEventListener("lostpointercapture", () => {
    drawing = false;
    activeStroke = [];
    drawStrokes();
  });

  clearButton.addEventListener("click", () => {
    successState = false;
    celebrationActive = false;
    points = [];
    strokes = [];
    activeStroke = [];
    feedback.textContent = "Pas de souci. Regarde la démonstration ou essaie encore.";
    rewardStar.textContent = "★";
    rewardTitle.textContent = "Chaque essai compte !";
    rewardText.textContent = "Prends ton temps. Tu peux recommencer autant de fois que tu veux.";
    drawStrokes();
  });

  demoButton.addEventListener("click", startDemo);

  function selectDigit(value) {
    successState = false;
    selectedDigit = Number(value);
    numberTitle.textContent = "Le chiffre " + selectedDigit;
    guideGlyph.textContent = String(selectedDigit);
    digitButtons.forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.digit) === selectedDigit)));
    points = [];
    strokes = [];
    activeStroke = [];
    celebrationActive = false;
    celebrationStartedAt = 0;
    feedback.textContent = "Observe le chiffre " + selectedDigit + ", puis suis le chemin pointillé.";
    rewardStar.textContent = "★";
    rewardTitle.textContent = "Chaque essai compte !";
    rewardText.textContent = "Prends ton temps. Tu peux recommencer autant de fois que tu veux.";
    startDemo();
  }

  function validateTrace() {
    const rect = canvas.getBoundingClientRect();
    if (points.length < 8) {
      feedback.textContent = "Trace un peu plus longtemps le long du chiffre.";
      return;
    }
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const yRange = Math.max(...ys) - Math.min(...ys);
    const routes = tracePaths();
    const meanDistance = points.reduce((sum, point) => {
      let closest = Infinity;
      for (const route of routes) {
        for (let i = 1; i < route.length; i++) {
          const a = route[i - 1], b = route[i];
          const dx = b.x - a.x, dy = b.y - a.y;
          const lengthSquared = dx * dx + dy * dy || 1;
          const t = Math.max(0, Math.min(1, ((point.x-a.x)*dx + (point.y-a.y)*dy) / lengthSquared));
          closest = Math.min(closest, Math.hypot(point.x - (a.x+t*dx), point.y - (a.y+t*dy)));
        }
      }
      return sum + closest;
    }, 0) / points.length;
    if (yRange > rect.height * 0.22 && meanDistance < Math.min(rect.width, rect.height) * 0.2) {
      // Successful tracing clears the temporary stroke before the character celebrates.
      points = [];
      strokes = [];
      activeStroke = [];
      successState = true;
      celebrationActive = true;
      chooseCelebrationColor();
      celebrationMode = ["bounce", "wiggle", "pulse"][Math.floor(Math.random() * 3)];
      faceExpression = ["smile", "tongue"][Math.floor(Math.random() * 2)];
      celebrationStartedAt = performance.now();
      feedback.textContent = "Bravo ! Tu as réussi le chiffre " + selectedDigit + " !";
      drawStrokes();
      const celebrationLoop = () => {
        if (!successState) { celebrationActive = false; return; }
        drawStrokes();
        // Keep subtle blinking and mouth movement alive until the child changes digit or restarts.
        requestAnimationFrame(celebrationLoop);
      };
      requestAnimationFrame(celebrationLoop);
      rewardStar.textContent = "★";
      rewardTitle.textContent = "Super effort !";
      rewardText.textContent = "Tu as terminé cet essai. Tu peux recommencer pour t'entraîner encore.";
      try {
        const audio = new AudioContext();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(660, audio.currentTime);
        oscillator.frequency.setValueAtTime(880, audio.currentTime + 0.12);
        gain.gain.setValueAtTime(0.0001, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audio.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.28);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start();
        oscillator.stop(audio.currentTime + 0.3);
        oscillator.onended = () => audio.close();
      } catch (_) {
        // L'activité reste utilisable si l'audio n'est pas disponible.
      }
    } else {
      feedback.textContent = "Bien essayé ! Regarde le chemin pointillé et tente encore.";
      rewardTitle.textContent = "On apprend en pratiquant";
      rewardText.textContent = "Tu peux effacer le tracé ou demander de l'aide à ton éducateur.";
    }
  }

  checkButton.addEventListener("click", validateTrace);

  digitButtons.forEach(button => {
    button.addEventListener("click", () => selectDigit(button.dataset.digit));
  });

  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedTheme = button.dataset.theme;
      document.body.classList.remove("theme-boy", "theme-girl", "theme-mix");
      document.body.classList.add("theme-" + selectedTheme);
      themeButtons.forEach(option => option.setAttribute("aria-pressed", String(option === button)));
    });
  });

  document.body.classList.add("theme-mix");

  calmToggle.addEventListener("click", () => {
    const calm = document.body.classList.toggle("calm");
    calmToggle.setAttribute("aria-pressed", String(calm));
    calmToggle.textContent = calm ? "Mode Énergie" : "Mode Sérénité";
    drawStrokes();
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  startDemo();
})();