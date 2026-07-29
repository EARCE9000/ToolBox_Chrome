(() => {
  const OVERLAY_ID = "sa-ext-overlay";
  const ARROW_SIZE = 48;
  const DRAG_THRESHOLD = 3;

  if (window.__saAnnotationInjected) return;
  window.__saAnnotationInjected = true;

  let overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    document.documentElement.appendChild(overlay);
  }

  /** @type {{ el: HTMLElement, badge: HTMLElement }[]} */
  const arrows = [];

  function renumberArrows() {
    arrows.forEach((arrow, index) => {
      arrow.badge.textContent = String(index + 1);
    });
  }

  function removeArrow(arrow) {
    const index = arrows.indexOf(arrow);
    if (index === -1) return;
    arrow.el.remove();
    arrows.splice(index, 1);
    renumberArrows();
  }

  function clearArrows() {
    arrows.forEach((arrow) => arrow.el.remove());
    arrows.length = 0;
  }

  function attachDrag(el) {
    el.addEventListener("mousedown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();

      const startX = event.clientX;
      const startY = event.clientY;
      const originLeft = parseFloat(el.style.left);
      const originTop = parseFloat(el.style.top);
      let dragged = false;

      const onMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        if (!dragged && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
          dragged = true;
          el.classList.add("sa-dragging");
        }
        if (dragged) {
          el.style.left = `${originLeft + dx}px`;
          el.style.top = `${originTop + dy}px`;
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        el.classList.remove("sa-dragging");
        if (!dragged) {
          const arrow = arrows.find((a) => a.el === el);
          if (arrow) removeArrow(arrow);
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  function addArrow() {
    const cascade = (arrows.length % 8) * (ARROW_SIZE / 4);
    const x = Math.max(0, window.innerWidth / 2 - ARROW_SIZE / 2 + cascade);
    const y = Math.max(0, window.innerHeight / 2 - ARROW_SIZE / 2 + cascade);

    const el = document.createElement("div");
    el.className = "sa-arrow";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const img = document.createElement("img");
    img.className = "sa-arrow-img";
    img.src = chrome.runtime.getURL("icons/arrow.png");
    img.draggable = false;
    img.alt = "annotation arrow";

    const badge = document.createElement("span");
    badge.className = "sa-arrow-badge";

    el.appendChild(img);
    el.appendChild(badge);
    overlay.appendChild(el);
    attachDrag(el);

    arrows.push({ el, badge });
    renumberArrows();
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === "sa-add-arrow") addArrow();
    if (message?.type === "sa-clear-arrows") clearArrows();
  });
})();
