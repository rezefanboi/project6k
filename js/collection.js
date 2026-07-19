(function(){
  const grid = document.getElementById("colGrid");
  const empty = document.getElementById("colEmpty");
  const search = document.getElementById("colSearch");
  const countEl = document.getElementById("colCount");

  const detail = document.getElementById("detail");
  const detailArt = document.getElementById("detailArt");
  const detailEyebrow = document.getElementById("detailEyebrow");
  const detailTitle = document.getElementById("detailTitle");
  const detailDate = document.getElementById("detailDate");
  const detailStory = document.getElementById("detailStory");
  const detailClose = document.getElementById("detailClose");
  const detailPrev = document.getElementById("detailPrev");
  const detailNext = document.getElementById("detailNext");

  // only show real, non-placeholder entries by default in the archive —
  // flip to ENTRIES if you want placeholders visible too.
  const finished = ENTRIES.filter(e => !e.placeholder).reverse(); // newest first

  let activeIndex = 0;
  let visible = finished;

  function tileStyle(e){
    const a = `hsl(${e.hue}, 46%, 88%)`;
    const b = `hsl(${(e.hue + 40) % 360}, 40%, 72%)`;
    return `--tile-a:${a}; --tile-b:${b};`;
  }

  function render(list){
    grid.innerHTML = "";
    empty.style.display = list.length ? "none" : "block";
    countEl.textContent = `${list.length} of ${finished.length} entries`;

    list.forEach((e) => {
      const card = document.createElement("button");
      card.className = "card";
      card.style.cssText = tileStyle(e);
      card.setAttribute("aria-haspopup", "dialog");
      card.innerHTML = `
        <span class="tile">
          <span class="tile-day">DAY ${String(e.day).padStart(3,"0")}</span>
          ${e.image ? `<img src="${e.image}" alt="${e.title}" loading="lazy">` : ""}
        </span>
        <span class="card-body">
          <span class="card-date">${e.date}</span>
          <h3>${e.title}</h3>
        </span>`;
      card.addEventListener("click", () => openDetail(e));
      grid.appendChild(card);
    });
  }

  function openDetail(entry){
    activeIndex = visible.indexOf(entry);
    fillDetail(entry);
    detail.classList.add("is-open");
    document.body.style.overflow = "hidden";
    detailClose.focus();
  }

  function fillDetail(e){
    detailArt.style.cssText = tileStyle(e);
    detailArt.innerHTML = e.image ? `<img src="${e.image}" alt="${e.title}">` : "";
    detailEyebrow.textContent = `Day ${String(e.day).padStart(3,"0")} / ${PROJECT_CONFIG.totalDays}`;
    detailTitle.textContent = e.title;
    detailDate.textContent = e.date;
    detailStory.textContent = e.description;
    detailPrev.disabled = activeIndex <= 0;
    detailNext.disabled = activeIndex >= visible.length - 1;
  }

  function closeDetail(){
    detail.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  detailClose.addEventListener("click", closeDetail);
  detail.addEventListener("click", (ev) => { if (ev.target === detail) closeDetail(); });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") closeDetail();
    if (!detail.classList.contains("is-open")) return;
    if (ev.key === "ArrowRight" && !detailNext.disabled) step(1);
    if (ev.key === "ArrowLeft" && !detailPrev.disabled) step(-1);
  });

  function step(dir){
    activeIndex += dir;
    fillDetail(visible[activeIndex]);
  }
  detailPrev.addEventListener("click", () => step(-1));
  detailNext.addEventListener("click", () => step(1));

  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    visible = !q ? finished : finished.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      String(e.day).includes(q)
    );
    render(visible);
  });

  render(visible);
})();
