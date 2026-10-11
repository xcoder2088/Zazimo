(() => {
  "use strict";

  const canvas = document.getElementById("trace-canvas");
  const ctx = canvas.getContext("2d");
  const feedback = document.getElementById("feedback");
  const clearButton = document.getElementById("clear-button");
  const checkButton = document.getElementById("check-button");
  const demoButton = document.getElementById("demo-button");
  const calmToggle = document.getElementById("calm-toggle");
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

  // Centerline of the numeral: diagonal to the top, then straight down.
  function tracePath() {
    const rect = canvas.getBoundingClientRect();
    return [
      // Start inside the diagonal stroke, reach the top junction, then
      // move onto the center of the vertical stroke and trace downward.
      { x: rect.width * 0.50, y: rect.height * 0.39 },
      { x: rect.width * 0.70, y: rect.height * 0.25 },
      { x: rect.width * 0.66, y: rect.height * 0.25 },
      { x: rect.width * 0.66, y: rect.height * 0.78 }
    ];
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
    feedback.textContent = "Regarde le point : il monte en diagonale, puis descend tout droit.";
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

  checkButton.addEventListener("click", () => {
    const rect = canvas.getBoundingClientRect();
    if (points.length < 8) {
      feedback.textContent = "Trace un peu plus longtemps le long du chiffre.";
      return;
    }
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const yRange = Math.max(...ys) - Math.min(...ys);
    const centerX = rect.width * 0.515;
    const nearCenter = Math.abs((xs.reduce((a, b) => a + b, 0) / xs.length) - centerX) < rect.width * 0.2;
    if (yRange > rect.height * 0.22 && nearCenter) {
      feedback.textContent = "Bravo ! Tu as essayé le chiffre 1 !";
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