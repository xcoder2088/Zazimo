(() => {
  "use strict";

  const canvas = document.getElementById("trace-canvas");
  const ctx = canvas.getContext("2d");
  const feedback = document.getElementById("feedback");
  const clearButton = document.getElementById("clear-button");
  const checkButton = document.getElementById("check-button");
  const calmToggle = document.getElementById("calm-toggle");
  const rewardStar = document.getElementById("reward-star");
  const rewardTitle = document.getElementById("reward-title");
  const rewardText = document.getElementById("reward-text");

  let drawing = false;
  let points = [];
  let strokes = [];
  let activeStroke = [];

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    const oldPoints = points.slice();
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawStrokes();
    if (oldPoints.length && !strokes.length) points = oldPoints;
  }

  function drawGuide() {
    const rect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.strokeStyle = "#b7c6d9";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 9]);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(rect.width * 0.53, rect.height * 0.26);
    ctx.lineTo(rect.width * 0.53, rect.height * 0.75);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rect.width * 0.44, rect.height * 0.34);
    ctx.lineTo(rect.width * 0.53, rect.height * 0.25);
    ctx.lineTo(rect.width * 0.62, rect.height * 0.34);
    ctx.stroke();
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
  }

  function position(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  canvas.addEventListener("pointerdown", event => {
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
    feedback.textContent = "Pas de souci. Essaie encore à ton rythme.";
    rewardStar.textContent = "★";
    rewardTitle.textContent = "Chaque essai compte !";
    rewardText.textContent = "Prends ton temps. Tu peux recommencer autant que tu veux.";
    drawStrokes();
  });

  checkButton.addEventListener("click", () => {
    const rect = canvas.getBoundingClientRect();
    if (points.length < 8) {
      feedback.textContent = "Trace un peu plus longtemps le long du chiffre.";
      return;
    }
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const xRange = Math.max(...xs) - Math.min(...xs);
    const yRange = Math.max(...ys) - Math.min(...ys);
    const centerX = rect.width * 0.53;
    const nearCenter = Math.abs((xs.reduce((a, b) => a + b, 0) / xs.length) - centerX) < rect.width * 0.24;
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
 })();