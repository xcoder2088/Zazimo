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
  const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
  const numberControls = document.getElementById("number-controls");
  const letterPicker = document.getElementById("letter-picker");
  const letterGrid = document.getElementById("letter-grid");
  let selectedType = "digits";
  const previousNumberButton = document.getElementById("previous-number");
  const nextNumberButton = document.getElementById("next-number");
  const numberWindow = document.getElementById("number-window");
  const numberWindowHint = document.getElementById("number-window-hint");
  let numberWindowStart = 1;
  const numberTitle = document.getElementById("number-title");
  const guideGlyph = document.querySelector(".guide-glyph");
  let selectedDigit = 1;
  let selectedValue = "1";
  const customNumberInput = document.getElementById("custom-number");
  const customNumberButton = document.getElementById("custom-number-button");
  let successState = false;
  const completedCharacters = new Set();
  const celebrationPalette = ["#ffd22f","#f0262e","#83c51c","#ff9228","#08a9c9","#ffb632","#e46ac0","#35a878","#9b55b7","#e23c83","#19b7b0","#5b8def"];
  let activeCharacterColor = celebrationPalette[0];
  let celebrationColors = [];
  let celebrationModes = [];
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
    const elapsed = performance.now() - celebrationStartedAt;
    const celebrating = successState || (celebrationActive && elapsed < 1800);
    // Always render the complete numeral; unfinished digits stay neutral.

    const viewWidth = 450, viewHeight = 250;
    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(rect.width / viewWidth, rect.height / viewHeight);
    const offsetX = (rect.width - viewWidth * scale) / 2;
    const offsetY = (rect.height - viewHeight * scale) / 2;
    const chars = selectedValue.split("");
    const digitScale = chars.length === 1 ? 1 : chars.length === 2 ? 0.82 : chars.length === 3 ? 0.64 : 0.56;

    const anchors = {
      0:{eyes:{x:225,y:26},mouth:{x:225,y:53}},
      1:{eyes:{x:229,y:39},mouth:{x:229,y:64}},
      2:{eyes:{x:224,y:28},mouth:{x:222,y:55}},
      3:{eyes:{x:224,y:28},mouth:{x:224,y:55}},
      4:{eyes:{x:239,y:29},mouth:{x:239,y:56}},
      5:{eyes:{x:260,y:32},mouth:{x:257,y:58}},
      6:{eyes:{x:231,y:29},mouth:{x:233,y:57}},
      7:{eyes:{x:193,y:31},mouth:{x:191,y:57}},
      8:{eyes:{x:225,y:27},mouth:{x:225,y:55}},
      9:{eyes:{x:226,y:29},mouth:{x:226,y:56}}
    };
    const transformPoint = (p, index) => {
      const shift = (index - (chars.length - 1) / 2) * 108;
      const localX = 225 + shift + (p.x - 225) * digitScale;
      const localY = 125 + (p.y - 125) * digitScale;
      return {x:offsetX + localX * scale, y:offsetY + localY * scale};
    };
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash([]);
    let routeIndex = 0;
    chars.forEach((char, index) => {
      const isCompleted = completedCharacters.has(index);
      const mode = celebrationModes[index] || celebrationMode;
      const phase = (elapsed + index * 310) / 230;
      const wave = (!isCompleted || reducedMotion.matches) ? 0 : Math.sin(phase);
      const bounce = mode === "bounce" ? Math.max(0, wave) * 12 * scale : 0;
      const wiggle = mode === "wiggle" ? wave * 0.055 : 0;
      const pulse = mode === "pulse" ? 1 + wave * 0.045 : 1;
      const centerX = offsetX + (225 + (index - (chars.length - 1) / 2) * 108) * scale;
      const centerY = offsetY + 125 * scale;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(wiggle);
      ctx.scale(pulse, pulse);
      ctx.translate(-centerX, -centerY - bounce);
      const pathCount = routesForCharacter(char).length;
      const ownRoutes = routes.slice(routeIndex, routeIndex + pathCount);
      routeIndex += pathCount;
      const color = isCompleted ? (celebrationColors[index] || "#c4cfdf") : "#c4cfdf";
      ctx.strokeStyle = "#243344";
      const baseDigitLineWidth = Math.max(42, Math.min(54, canvas.clientWidth * 0.09));
      ctx.lineWidth = baseDigitLineWidth * digitScale + 5 * digitScale;
      ownRoutes.forEach(path => {
        if (path.length < 2) return;
        ctx.beginPath(); ctx.moveTo(path[0].x, path[0].y);
        path.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = baseDigitLineWidth * digitScale;
      ownRoutes.forEach(path => {
        if (path.length < 2) return;
        ctx.beginPath(); ctx.moveTo(path[0].x, path[0].y);
        path.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      });

      // Keep the face hidden until the trace has been validated.
      if (!isCompleted) { ctx.restore(); return; }
      // Chaque visage est ancré sur son propre chiffre et partage sa transformation.
      const anchor = anchors[char] || (selectedType === "letters" ? {eyes:{x:225,y:36},mouth:{x:225,y:62}} : anchors[0]);
      const eyes = transformPoint(anchor.eyes, index);
      const mouth = transformPoint(anchor.mouth, index);
      const faceScale = scale * digitScale;
      const blink = ((elapsed + index * 370) % 2400) > 2200;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (blink) {
        ctx.strokeStyle = "#243344";
        ctx.lineWidth = 3 * faceScale;
        ctx.beginPath();
        ctx.moveTo(eyes.x - 20 * faceScale, eyes.y);
        ctx.quadraticCurveTo(eyes.x - 11 * faceScale, eyes.y + 5 * faceScale, eyes.x - 2 * faceScale, eyes.y);
        ctx.moveTo(eyes.x + 2 * faceScale, eyes.y);
        ctx.quadraticCurveTo(eyes.x + 11 * faceScale, eyes.y + 5 * faceScale, eyes.x + 20 * faceScale, eyes.y);
        ctx.stroke();
      } else {
        for (const ex of [eyes.x - 11 * faceScale, eyes.x + 11 * faceScale]) {
          ctx.beginPath(); ctx.ellipse(ex, eyes.y, 11 * faceScale, 14 * faceScale, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = "#243344"; ctx.lineWidth = 2.5 * faceScale; ctx.stroke();
        }
        for (const p of [{x:eyes.x - 9 * faceScale,y:eyes.y + 2 * faceScale},{x:eyes.x + 13 * faceScale,y:eyes.y + 2 * faceScale}]) {
          ctx.beginPath(); ctx.ellipse(p.x, p.y, 4 * faceScale, 7 * faceScale, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#243344"; ctx.fill();
          ctx.beginPath(); ctx.arc(p.x - faceScale, p.y - 3 * faceScale, 1.8 * faceScale, 0, Math.PI * 2);
          ctx.fillStyle = "#fff"; ctx.fill();
        }
      }
      ctx.beginPath();
      ctx.moveTo(mouth.x - 8 * faceScale, mouth.y);
      ctx.quadraticCurveTo(mouth.x, mouth.y + 6 * faceScale, mouth.x + 8 * faceScale, mouth.y);
      ctx.quadraticCurveTo(mouth.x + 6 * faceScale, mouth.y + 10 * faceScale, mouth.x, mouth.y + 10 * faceScale);
      ctx.quadraticCurveTo(mouth.x - 6 * faceScale, mouth.y + 10 * faceScale, mouth.x - 8 * faceScale, mouth.y);
      ctx.closePath(); ctx.fillStyle = "#243344"; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(mouth.x - 5 * faceScale, mouth.y + 2 * faceScale);
      ctx.quadraticCurveTo(mouth.x, mouth.y + 5 * faceScale, mouth.x + 5 * faceScale, mouth.y + 2 * faceScale);
      ctx.lineTo(mouth.x + 4 * faceScale, mouth.y + 5 * faceScale);
      ctx.lineTo(mouth.x - 4 * faceScale, mouth.y + 5 * faceScale);
      ctx.closePath(); ctx.fillStyle = "#fff"; ctx.fill();
      if ((index + (faceExpression === "tongue" ? 1 : 0)) % 2 === 1) {
        ctx.beginPath(); ctx.moveTo(mouth.x - 2 * faceScale, mouth.y + 7 * faceScale);
        ctx.quadraticCurveTo(mouth.x + 5 * faceScale, mouth.y + 7 * faceScale, mouth.x + 3 * faceScale, mouth.y + 13 * faceScale);
        ctx.quadraticCurveTo(mouth.x - faceScale, mouth.y + 14 * faceScale, mouth.x - 2 * faceScale, mouth.y + 7 * faceScale);
        ctx.fillStyle = "#f02670"; ctx.fill();
      }
      ctx.restore();
      ctx.restore();
    });
    ctx.restore();
  }

  const digitRoutes = {
    0:[{x:225,y:39},{x:205,y:43},{x:190,y:58},{x:180,y:83},{x:176,y:122},{x:180,y:160},{x:191,y:187},{x:207,y:203},{x:225,y:208},{x:243,y:203},{x:259,y:187},{x:270,y:160},{x:274,y:122},{x:270,y:83},{x:260,y:58},{x:245,y:43},{x:225,y:39}],
    1:[{x:190,y:76},{x:229,y:48},{x:229,y:204}],
    2:[{x:187,y:72},{x:194,y:55},{x:208,y:45},{x:227,y:42},{x:245,y:47},{x:259,y:59},{x:265,y:75},{x:263,y:91},{x:254,y:108},{x:239,y:126},{x:221,y:145},{x:204,y:162},{x:190,y:177},{x:188,y:188},{x:270,y:188}],
    3:[{x:194,y:61},{x:206,y:48},{x:224,y:42},{x:243,y:45},{x:257,y:57},{x:262,y:72},{x:257,y:86},{x:245,y:98},{x:229,y:108},{x:244,y:116},{x:257,y:130},{x:263,y:147},{x:260,y:164},{x:250,y:180},{x:234,y:192},{x:215,y:197},{x:196,y:193}],
    4:[{x:239,y:214},{x:239,y:43},{x:177,y:145},{x:278,y:145}],
    5:[{x:267,y:47},{x:246,y:47},{x:226,y:47},{x:206,y:47},{x:187,y:47},{x:185,y:63},{x:183,y:82},{x:183,y:102},{x:197,y:99},{x:211,y:98},{x:226,y:100},{x:240,y:105},{x:252,y:114},{x:260,y:126},{x:265,y:139},{x:265,y:151},{x:262,y:163},{x:255,y:175},{x:248,y:184},{x:237,y:191},{x:226,y:195},{x:213,y:196},{x:202,y:193},{x:192,y:190},{x:183,y:186}],
    6:[{x:250,y:49},{x:232,y:43},{x:214,y:45},{x:198,y:57},{x:186,y:77},{x:178,y:104},{x:175,y:134},{x:179,y:160},{x:190,y:181},{x:207,y:195},{x:227,y:200},{x:246,y:194},{x:260,y:181},{x:268,y:164},{x:269,y:147},{x:263,y:132},{x:251,y:121},{x:235,y:116},{x:218,y:118},{x:203,y:126},{x:192,y:140}],
    7:[{x:177,y:48},{x:273,y:48},{x:210,y:214}],
    8:[{x:225,y:121},{x:205,y:111},{x:191,y:96},{x:185,y:78},{x:190,y:60},{x:204,y:47},{x:225,y:42},{x:246,y:47},{x:260,y:60},{x:265,y:78},{x:259,y:96},{x:245,y:111},{x:225,y:121},{x:205,y:132},{x:190,y:148},{x:184,y:166},{x:189,y:184},{x:204,y:198},{x:225,y:204},{x:246,y:198},{x:261,y:184},{x:266,y:166},{x:260,y:148},{x:245,y:132},{x:225,y:121}],
    9:[{x:245,y:121},{x:230,y:132},{x:212,y:134},{x:196,y:127},{x:184,y:113},{x:179,y:95},{x:182,y:76},{x:192,y:59},{x:208,y:48},{x:228,y:44},{x:247,y:49},{x:262,y:62},{x:271,y:80},{x:275,y:103},{x:273,y:129},{x:267,y:155},{x:256,y:178},{x:241,y:197},{x:225,y:210}]
  };
  const letterRoutes = {"A":[[[155,205],[225,45],[295,205]],[[184,139],[266,139]]],"B":[[[170,205],[170,45]],[[170,48],[232,48],[265,64],[268,87],[251,105],[170,105]],[[170,105],[240,105],[270,126],[270,171],[244,201],[170,201]]],"C":[[[285,66],[264,48],[230,42],[194,52],[170,79],[160,119],[166,159],[188,188],[222,204],[258,197],[284,176]]],"D":[[[170,205],[170,45],[222,45],[259,62],[280,91],[286,125],[278,159],[256,187],[222,205],[170,205]]],"E":[[[270,48],[170,48],[170,202],[273,202]],[[171,124],[249,124]]],"F":[[[170,205],[170,48],[273,48]],[[171,124],[248,124]]],"G":[[[282,68],[260,49],[228,43],[195,54],[172,82],[162,119],[168,158],[190,188],[223,203],[258,196],[282,176],[282,133],[235,133]]],"H":[[[170,45],[170,205]],[[280,45],[280,205]],[[171,125],[279,125]]],"I":[[[190,48],[260,48]],[[225,48],[225,202]],[[190,202],[260,202]]],"J":[[[192,48],[278,48],[278,158],[266,190],[240,204],[210,200],[190,180]]],"K":[[[175,45],[175,205]],[[275,48],[178,125],[282,205]]],"L":[[[174,45],[174,202],[277,202]]],"M":[[[155,205],[170,45],[225,142],[280,45],[295,205]]],"N":[[[165,205],[165,45],[285,205],[285,45]]],"O":[[[225,42],[190,50],[168,79],[160,120],[168,161],[192,191],[225,204],[258,191],[282,161],[290,120],[282,79],[260,50],[225,42]]],"P":[[[172,205],[172,45],[235,45],[270,61],[279,86],[270,109],[239,124],[172,124]]],"Q":[[[225,42],[190,50],[168,79],[160,120],[168,161],[192,191],[225,204],[258,191],[282,161],[290,120],[282,79],[260,50],[225,42]],[[242,166],[291,211]]],"R":[[[172,205],[172,45],[235,45],[270,61],[279,86],[270,109],[239,124],[172,124]],[[225,124],[283,205]]],"S":[[[278,62],[253,47],[220,43],[188,55],[173,77],[182,99],[208,115],[244,128],[270,148],[272,173],[253,194],[220,204],[187,194],[168,178]]],"T":[[[160,48],[290,48]],[[225,48],[225,205]]],"U":[[[170,45],[170,151],[181,183],[205,201],[235,205],[261,192],[278,164],[280,45]]],"V":[[[160,45],[220,205],[290,45]]],"W":[[[150,45],[177,205],[225,128],[273,205],[300,45]]],"X":[[[170,45],[280,205]],[[280,45],[170,205]]],"Y":[[[160,45],[225,120],[290,45]],[[225,120],[225,205]]],"Z":[[[165,48],[285,48],[165,202],[285,202]]]};
  function routesForCharacter(char) {
    if (selectedType === "letters") return (letterRoutes[char] || letterRoutes.A).map(route => route.map(([x,y]) => ({x,y})));
    const digit = Number(char);
    return digit === 1 ? [[{x:190,y:76},{x:229,y:48}],[{x:229,y:48},{x:229,y:204}]] : [digitRoutes[digit]];
  }
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
    const digitCount = selectedValue.length;
    const digitScale = digitCount === 1 ? 1 : digitCount === 2 ? 0.82 : digitCount === 3 ? 0.64 : 0.5;
    const rawRoutes = [];
    const routeDigits = [];
    selectedValue.split("").forEach((digitChar, index) => {
      const base = routesForCharacter(digitChar);
      const shift = (index - (digitCount - 1) / 2) * 108;
      base.forEach(route => { routeDigits.push(selectedType === "letters" ? digitChar : Number(digitChar)); rawRoutes.push(route.map(point => ({x:225 + shift + (point.x - 225) * digitScale,y:125 + (point.y - 125) * digitScale}))); });
    });
    return rawRoutes.map((svgPoints, routeIndex) => {
    const routeDigit = routeDigits[routeIndex];
    const smooth = [];
    if (svgPoints.length < 3) {
      for (const point of svgPoints) smooth.push(point);
    } else if ([1, 4, 7].includes(routeDigit)) {
      smooth.push(...svgPoints);
    } else {
      // Smooth only the digits designed with curved strokes; keep angular digits angular.
      for (let i = 0; i < svgPoints.length - 1; i++) {
        const p0 = svgPoints[Math.max(0, i - 1)];
        const p1 = svgPoints[i];
        const p2 = svgPoints[i + 1];
        const p3 = svgPoints[Math.min(svgPoints.length - 1, i + 2)];
        const steps = selectedType === "letters" || routeDigit === 5 ? 20 : 12;
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
    // Remove dotted guides only for characters that have been completed.
    if (successState) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // Keep the colorful numeral visible; only the precise dotted centerline overlays it.
    ctx.strokeStyle = document.body.classList.contains("calm") ? "#6e9d87" : "#6686ad";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 8]);
    let guideRouteIndex = 0;
    selectedValue.split("").forEach((char, characterIndex) => {
      const pathCount = char === "1" ? 2 : 1;
      const characterRoutes = routes.slice(guideRouteIndex, guideRouteIndex + pathCount);
      guideRouteIndex += pathCount;
      if (completedCharacters.has(characterIndex)) return;
      for (const path of characterRoutes) {
      if (!path.length) continue;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
      ctx.stroke();
      }
    });
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
    feedback.textContent = selectedType === "letters" ? "Regarde le point suivre le tracé de la lettre " + selectedValue + "." : (selectedDigit === 1 ? "Regarde le point : il monte en diagonale, puis descend tout droit." : "Regarde le point suivre le chemin du chiffre " + selectedDigit + ".");
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
    completedCharacters.clear();
    celebrationColors = [];
    celebrationModes = [];
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

  function selectDigit(value, options = {}) {
    successState = false;
    completedCharacters.clear();
    celebrationColors = [];
    celebrationModes = [];
    selectedValue = String(value);
    const numericValue = Number(selectedValue);
    if (numericValue >= 1 && numericValue <= 100 && (numericValue < numberWindowStart || numericValue > Math.min(100, numberWindowStart + 9))) {
      numberWindowStart = Math.max(1, Math.min(91, numericValue - 4));
    }
    selectedDigit = Number(selectedValue[0]);
    numberTitle.textContent = selectedType === "letters" ? "La lettre " + selectedValue : (selectedValue.length === 1 ? "Le chiffre " + selectedValue : "Le nombre " + selectedValue);
    guideGlyph.textContent = selectedValue;
    digitButtons.forEach(button => button.setAttribute("aria-pressed", String(selectedValue === button.dataset.digit)));
    renderNumberWindow();
    if (previousNumberButton) previousNumberButton.disabled = Number(selectedValue) <= 0;
    if (nextNumberButton) nextNumberButton.disabled = Number(selectedValue) >= 100;
    if (customNumberInput && !options.preserveInput) customNumberInput.value = selectedValue;
    points = [];
    strokes = [];
    activeStroke = [];
    celebrationActive = false;
    celebrationStartedAt = 0;
    feedback.textContent = selectedType === "letters" ? "Observe la lettre " + selectedValue + ", puis suis le chemin pointillé." : "Observe le chiffre " + selectedDigit + ", puis suis le chemin pointillé.";
    rewardStar.textContent = "★";
    rewardTitle.textContent = "Chaque essai compte !";
    rewardText.textContent = "Prends ton temps. Tu peux recommencer autant de fois que tu veux.";
    if (options.demo !== false) startDemo();
    else drawStrokes();
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
    const routeGroups = [];
    let routeOffset = 0;
    selectedValue.split("").forEach((char, index) => {
      const count = routesForCharacter(char).length;
      routeGroups.push({ index, routes: routes.slice(routeOffset, routeOffset + count) });
      routeOffset += count;
    });
    const distanceForGroup = group => points.reduce((sum, point) => {
      let closest = Infinity;
      for (const route of group.routes) {
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
    const coverageForGroup = group => {
      const tolerance = Math.max(18, Math.min(rect.width, rect.height) * 0.035);
      let checked = 0, covered = 0;
      group.routes.forEach(route => route.forEach((point, index) => {
        if (index % 3 !== 0 && index !== route.length - 1) return;
        checked++;
        if (points.some(sample => Math.hypot(sample.x - point.x, sample.y - point.y) <= tolerance)) covered++;
      }));
      return checked ? covered / checked : 0;
    };
    const xRange = Math.max(...xs) - Math.min(...xs);
    const spread = Math.max(xRange, yRange);
    const candidate = routeGroups.filter(group => !completedCharacters.has(group.index))
      .map(group => ({...group, distance: distanceForGroup(group), coverage: coverageForGroup(group)}))
      .sort((a, b) => a.distance - b.distance)[0];
    if (candidate && spread > rect.height * 0.12 && candidate.distance < Math.min(rect.width, rect.height) * 0.12 && candidate.coverage >= 0.55) {
      points = [];
      strokes = [];
      activeStroke = [];
      completedCharacters.add(candidate.index);
      successState = completedCharacters.size === selectedValue.length;
      celebrationActive = true;
      if (!celebrationColors[candidate.index]) {
        const choices = celebrationPalette.filter(color => color !== celebrationColors.find(Boolean));
        celebrationColors[candidate.index] = choices[Math.floor(Math.random() * choices.length)];
      }
      celebrationModes[candidate.index] = ["bounce", "wiggle", "pulse"][Math.floor(Math.random() * 3)];
      celebrationMode = celebrationModes[candidate.index];
      chooseCelebrationColor();
      faceExpression = ["smile", "tongue"][Math.floor(Math.random() * 2)];
      celebrationStartedAt = performance.now();
      feedback.textContent = successState
        ? "Bravo ! Tu as réussi le nombre " + selectedValue + " !"
        : "Bravo ! Le chiffre " + selectedValue[candidate.index] + " est réussi. Continue avec le suivant !";
      drawStrokes();
      const celebrationLoop = () => {
        if (completedCharacters.size === 0) { celebrationActive = false; return; }
        drawStrokes();
        requestAnimationFrame(celebrationLoop);
      };
      requestAnimationFrame(celebrationLoop);
      rewardStar.textContent = "★";
      rewardTitle.textContent = successState ? "Super effort !" : "Un chiffre de réussi !";
      rewardText.textContent = successState
        ? "Tu as terminé ce nombre. Tu peux recommencer pour t'entraîner encore."
        : "Chaque chiffre se valide séparément. Continue avec le prochain.";
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
  if (customNumberButton && customNumberInput) {
    customNumberButton.addEventListener("click", () => {
      const value = (customNumberInput.value || "").trim();
      if (!/^[0-9]{1,4}$/.test(value)) { feedback.textContent = "Entre un nombre de 1 à 4 chiffres, sans espace."; customNumberInput.focus(); return; }
      selectDigit(value);
    });
    customNumberInput.addEventListener("input", () => {
      const value = customNumberInput.value.trim();
      if (/^[0-9]{1,4}$/.test(value)) selectDigit(value, { preserveInput: true, demo: false });
    });
    customNumberInput.addEventListener("keydown", event => { if (event.key === "Enter") customNumberButton.click(); });
  }

  digitButtons.forEach(button => {
    button.addEventListener("click", () => selectDigit(button.dataset.digit));
  });

  function selectLetter(letter) {
    selectedType="letters"; successState=false; completedCharacters.clear(); celebrationColors=[]; celebrationModes=[];
    selectedValue=letter; selectedDigit=0; points=[]; strokes=[]; activeStroke=[]; celebrationActive=false;
    numberTitle.textContent="La lettre "+letter; if(customNumberInput) customNumberInput.value="";
    letterGrid.querySelectorAll(".letter-choice").forEach(button=>button.setAttribute("aria-pressed",String(button.textContent===letter)));
    feedback.textContent="Observe la lettre "+letter+", puis suis le chemin pointillé.";
    rewardStar.textContent="★"; rewardTitle.textContent="Chaque essai compte !"; rewardText.textContent="Prends ton temps. Tu peux recommencer autant de fois que tu veux.";
    drawStrokes(); startDemo();
  }
  function renderLetterGrid(){if(!letterGrid||letterGrid.childElementCount)return;for(const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ"){const b=document.createElement("button");b.type="button";b.className="letter-choice";b.textContent=letter;b.setAttribute("aria-pressed","false");b.setAttribute("aria-label","Tracer la lettre "+letter);b.addEventListener("click",()=>selectLetter(letter));letterGrid.appendChild(b);}}
  modeButtons.forEach(button=>button.addEventListener("click",()=>{const letters=button.dataset.mode==="letters";modeButtons.forEach(option=>option.setAttribute("aria-pressed",String(option===button)));numberControls.hidden=letters;letterPicker.hidden=!letters;if(letters){renderLetterGrid();selectLetter("A");}else{selectedType="digits";selectDigit("1");}}));

  function renderNumberWindow() {
    if (!numberWindow) return;
    const windowEnd = Math.min(100, numberWindowStart + 9);
    numberWindow.innerHTML = "";
    for (let value = numberWindowStart; value <= windowEnd; value++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "number-choice";
      button.textContent = String(value);
      button.setAttribute("aria-pressed", String(selectedValue === String(value)));
      button.setAttribute("aria-label", "Tracer le nombre " + value);
      button.addEventListener("click", () => selectDigit(value));
      numberWindow.appendChild(button);
    }
    if (numberWindowHint) numberWindowHint.textContent = numberWindowStart + " à " + windowEnd + " · sélectionne un nombre";
    if (previousNumberButton) previousNumberButton.disabled = numberWindowStart <= 1;
    if (nextNumberButton) nextNumberButton.disabled = numberWindowStart >= 91;
  }

  if (previousNumberButton) previousNumberButton.addEventListener("click", () => {
    if (numberWindowStart > 1) { numberWindowStart--; renderNumberWindow(); }
  });
  if (nextNumberButton) nextNumberButton.addEventListener("click", () => {
    if (numberWindowStart < 91) { numberWindowStart++; renderNumberWindow(); }
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
  renderNumberWindow();
  startDemo();
})();