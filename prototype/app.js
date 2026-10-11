(() => {
  "use strict";

  const canvas = document.getElementById("trace-canvas");
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
  const digitRoutes = {
    0:[{x:225,y:42},{x:190,y:46},{x:169,y:82},{x:164,y:126},{x:174,y:177},{x:198,y:207},{x:225,y:214},{x:252,y:207},{x:276,y:177},{x:286,y:126},{x:281,y:82},{x:260,y:46},{x:225,y:42}],
    1:[{x:176,y:78},{x:229,y:40},{x:229,y:218}],
    2:[{x:169,y:78},{x:183,y:49},{x:219,y:39},{x:254,y:48},{x:274,y:73},{x:270,y:96},{x:246,y:122},{x:215,y:151},{x:176,y:190},{x:273,y:190}],
    3:[{x:174,y:56},{x:209,y:40},{x:247,y:45},{x:270,y:67},{x:258,y:91},{x:229,y:112},{x:252,y:119},{x:273,y:143},{x:267,y:177},{x:242,y:202},{x:207,y:210},{x:173,y:193}],
    4:[{x:246,y:215},{x:246,y:40},{x:168,y:151},{x:282,y:151}],
    5:[{x:269,y:43},{x:184,y:43},{x:180,y:105},{x:211,y:96},{x:246,y:100},{x:271,y:123},{x:273,y:158},{x:253,y:190},{x:221,y:207},{x:186,y:196}],
    6:[{x:261,y:48},{x:225,y:42},{x:193,y:66},{x:174,y:105},{x:169,y:153},{x:185,y:188},{x:214,y:207},{x:247,y:199},{x:270,y:174},{x:271,y:143},{x:251,y:121},{x:222,y:117},{x:194,y:132},{x:178,y:157}],
    7:[{x:166,y:43},{x:282,y:43},{x:205,y:215}],
    8:[{x:225,y:126},{x:193,y:111},{x:178,y:87},{x:185,y:57},{x:210,y:41},{x:239,y:43},{x:263,y:61},{x:269,y:86},{x:251,y:111},{x:225,y:126},{x:194,y:143},{x:178,y:168},{x:187,y:194},{x:212,y:210},{x:239,y:208},{x:263,y:191},{x:270,y:167},{x:253,y:143},{x:225,y:126}],
    9:[{x:258,y:123},{x:235,y:140},{x:204,y:139},{x:181,y:119},{x:177,y:87},{x:191,y:57},{x:217,y:41},{x:246,y:48},{x:266,y:71},{x:272,y:109},{x:265,y:151},{x:245,y:188},{x:220,y:214}]
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
  let demoStart = 0;
  let demoFrame = 0;
  const demoDuration = reducedMotion.matches ? 0 : 1800;

  // The guide silhouette and this centerline share one SVG viewBox.
  // This keeps the dotted route geometrically tied to the visible numeral.
  function tracePath() {
    const rect = canvas.getBoundingClientRect();
    const viewWidth = 450;
    const viewHeight = 250;
    const scale = Math.min(rect.width / viewWidth, rect.height / viewHeight);
    const offsetX = (rect.width - viewWidth * scale) / 2;
    const offsetY = (rect.height - viewHeight * scale) / 2;
    const svgPoints = digitRoutes[selectedDigit];
    return svgPoints.map(point => ({
      x: offsetX + point.x * scale,
      y: offsetY + point.y * scale
    }));
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
    const path = tracePath();
    ctx.save();
    ctx.strokeStyle = document.body.classList.contains("calm") ? "#a8c5b6" : "#b7c6d9";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 8]);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
    ctx.stroke();
    ctx.restore();
  }

  function drawDemo(progress) {
    const path = tracePath();
    const lengths = [];
    let totalLength = 0;
    for (let i = 1; i < path.length; i++) {
      const length = Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
      lengths.push(length);
      totalLength += length;
    }

    let remaining = totalLength * Math.max(0, Math.min(1, progress));
    const drawn = [path[0]];
    let dot = path[0];
    for (let i = 0; i < lengths.length; i++) {
      const from = path[i];
      const to = path[i + 1];
      const length = lengths[i];
      if (remaining >= length) {
        drawn.push(to);
        remaining -= length;
        dot = to;
      } else {
        const t = length === 0 ? 0 : remaining / length;
        dot = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
        drawn.push(dot);
        break;
      }
    }

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = document.body.classList.contains("calm") ? "#6d9d87" : "#f16c91";
    ctx.lineWidth = Math.max(7, Math.min(12, canvas.clientWidth * 0.018));
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(drawn[0].x, drawn[0].y);
    for (let i = 1; i < drawn.length; i++) ctx.lineTo(drawn[i].x, drawn[i].y);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = document.body.classList.contains("calm") ? "#4e866d" : "#ec5f8c";
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
    ctx.fill();
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
  }
  canvas.addEventListener("pointerup", finishStroke);
  canvas.addEventListener("pointercancel", finishStroke);
  canvas.addEventListener("lostpointercapture", () => {
    drawing = false;
    activeStroke = [];
    drawStrokes();
  });

  clearButton.addEventListener("click", () => {
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
    selectedDigit = Number(value);
    numberTitle.textContent = "Le chiffre " + selectedDigit;
    guideGlyph.textContent = String(selectedDigit);
    digitButtons.forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.digit) === selectedDigit)));
    points = [];
    strokes = [];
    activeStroke = [];
    feedback.textContent = "Observe le chiffre " + selectedDigit + ", puis suis le chemin pointillé.";
    rewardStar.textContent = "★";
    rewardTitle.textContent = "Chaque essai compte !";
    rewardText.textContent = "Prends ton temps. Tu peux recommencer autant de fois que tu veux.";
    startDemo();
  }

  digitButtons.forEach(button => button.addEventListener("click", () => selectDigit(button.dataset.digit)));

  checkButton.addEventListener("click", () => {
    const rect = canvas.getBoundingClientRect();
    if (points.length < 8) {
      feedback.textContent = "Trace un peu plus longtemps le long du chiffre.";
      return;
    }
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const yRange = Math.max(...ys) - Math.min(...ys);
    const route = tracePath();
    const meanDistance = points.reduce((sum, point) => {
      let closest = Infinity;
      for (let i = 1; i < route.length; i++) {
        const a = route[i - 1], b = route[i];
        const dx = b.x - a.x, dy = b.y - a.y;
        const lengthSquared = dx * dx + dy * dy || 1;
        const t = Math.max(0, Math.min(1, ((point.x-a.x)*dx + (point.y-a.y)*dy) / lengthSquared));
        closest = Math.min(closest, Math.hypot(point.x - (a.x+t*dx), point.y - (a.y+t*dy)));
      }
      return sum + closest;
    }, 0) / points.length;
    if (yRange > rect.height * 0.22 && meanDistance < Math.min(rect.width, rect.height) * 0.2) {
      feedback.textContent = "Bravo ! Tu as essayé le chiffre " + selectedDigit + " !";
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