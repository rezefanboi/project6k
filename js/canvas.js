(function(){
  const cols = PROJECT_CONFIG.gridCols;
  const rows = PROJECT_CONFIG.gridRows;
  const cellPx = 64; // on-screen size per cell at zoom = 1
  const sectionPx = PROJECT_CONFIG.canvasSize / cols; // real px per section

  const stage = document.getElementById("cvStage");
  const world = document.getElementById("cvWorld");
  const gridEl = document.getElementById("cvGrid");
  const coordEl = document.getElementById("cvCoord");
  const progressBar = document.getElementById("cvProgressBar");
  const progressLabel = document.getElementById("cvProgressLabel");

  const byDay = new Map(ENTRIES.map(e => [e.day, e]));

  // build grid DOM (row-major, day 1 = top-left)
  gridEl.style.gridTemplateColumns = `repeat(${cols}, ${cellPx}px)`;
  gridEl.style.width = `${cols * cellPx}px`;
  gridEl.style.height = `${rows * cellPx}px`;

  let day = 1;
  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      const entry = byDay.get(day);
      const filled = day <= COMPLETED_DAYS && entry;
      const cell = document.createElement("div");
      cell.className = "cv-cell" + (filled ? " filled" : "");
      if (filled){
        const a = `hsl(${entry.hue}, 46%, 88%)`;
        const b = `hsl(${(entry.hue + 40) % 360}, 40%, 72%)`;
        cell.style.cssText = `--tile-a:${a}; --tile-b:${b};`;
        cell.title = `Day ${day} — ${entry.title}`;
        cell.addEventListener("click", () => {
          window.location.href = `collection.html?day=${day}`;
        });
      }
      const label = document.createElement("span");
      label.className = "cell-label";
      label.textContent = String(day).padStart(3, "0");
      cell.appendChild(label);
      cell.dataset.row = r;
      cell.dataset.col = c;
      gridEl.appendChild(cell);
      day++;
    }
  }

  const pct = Math.round((COMPLETED_DAYS / PROJECT_CONFIG.totalDays) * 100);
  progressBar.style.width = pct + "%";
  progressLabel.textContent = `Day ${COMPLETED_DAYS} / ${PROJECT_CONFIG.totalDays} — ${pct}% filled`;

  /* ---------------- pan + zoom ---------------- */
  let scale = 1, minScale = 0.35, maxScale = 3;
  let originX = 0, originY = 0; // translation
  let dragging = false, lastX = 0, lastY = 0;

  function applyTransform(){
    world.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
  }

  function fitToStage(){
    const stageRect = stage.getBoundingClientRect();
    const worldW = cols * cellPx, worldH = rows * cellPx;
    scale = Math.min(stageRect.width / worldW, stageRect.height / worldH) * 0.92;
    scale = Math.max(minScale, Math.min(maxScale, scale));
    originX = (stageRect.width - worldW * scale) / 2;
    originY = (stageRect.height - worldH * scale) / 2;
    applyTransform();
  }

  function zoomAt(clientX, clientY, factor){
    const rect = stage.getBoundingClientRect();
    const px = clientX - rect.left, py = clientY - rect.top;
    const worldX = (px - originX) / scale;
    const worldY = (py - originY) / scale;
    scale = Math.max(minScale, Math.min(maxScale, scale * factor));
    originX = px - worldX * scale;
    originY = py - worldY * scale;
    applyTransform();
  }

  stage.addEventListener("wheel", (ev) => {
    ev.preventDefault();
    const factor = ev.deltaY < 0 ? 1.12 : 0.89;
    zoomAt(ev.clientX, ev.clientY, factor);
  }, { passive: false });

  stage.addEventListener("pointerdown", (ev) => {
    dragging = true;
    stage.classList.add("is-dragging");
    lastX = ev.clientX; lastY = ev.clientY;
    stage.setPointerCapture(ev.pointerId);
  });
  stage.addEventListener("pointermove", (ev) => {
    const rect = stage.getBoundingClientRect();
    const worldX = Math.round(((ev.clientX - rect.left) - originX) / scale / cellPx * sectionPx);
    const worldY = Math.round(((ev.clientY - rect.top) - originY) / scale / cellPx * sectionPx);
    if (worldX >= 0 && worldX <= PROJECT_CONFIG.canvasSize && worldY >= 0 && worldY <= PROJECT_CONFIG.canvasSize){
      coordEl.innerHTML = `X <b>${worldX}</b> · Y <b>${worldY}</b> <span style="opacity:.5">/ ${PROJECT_CONFIG.canvasSize}</span>`;
    }
    if (!dragging) return;
    originX += ev.clientX - lastX;
    originY += ev.clientY - lastY;
    lastX = ev.clientX; lastY = ev.clientY;
    applyTransform();
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach(evt =>
    stage.addEventListener(evt, () => { dragging = false; stage.classList.remove("is-dragging"); })
  );

  document.getElementById("zoomIn").addEventListener("click", () => {
    const r = stage.getBoundingClientRect();
    zoomAt(r.left + r.width/2, r.top + r.height/2, 1.25);
  });
  document.getElementById("zoomOut").addEventListener("click", () => {
    const r = stage.getBoundingClientRect();
    zoomAt(r.left + r.width/2, r.top + r.height/2, 0.8);
  });
  document.getElementById("zoomReset").addEventListener("click", fitToStage);

  window.addEventListener("resize", fitToStage);
  fitToStage();
})();
