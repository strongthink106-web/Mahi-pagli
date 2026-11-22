(() => {
  "use strict";

  const chapters = Array.from(document.querySelectorAll(".chapter"));
  const dots = Array.from(document.querySelectorAll(".chapter-dot"));
  const count = document.getElementById("chapter-count");
  const prev = document.getElementById("prev-button");
  const next = document.getElementById("next-button");
  let current = 0;

  function showChapter(index, updateHash = true) {
    const target = Math.max(0, Math.min(chapters.length - 1, index));
    current = target;
    chapters.forEach((chapter, i) => {
      const active = i === current;
      chapter.classList.toggle("active", active);
      chapter.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle("current", active);
      if (active) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
    count.textContent = String(current + 1).padStart(2, "0");
    prev.disabled = current === 0;
    next.disabled = current === chapters.length - 1;
    if (updateHash) {
      const id = chapters[current].id;
      history.replaceState(null, "", "#" + id);
    }
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => showChapter(current + 1));
  });
  prev.addEventListener("click", () => showChapter(current - 1));
  next.addEventListener("click", () => showChapter(current + 1));
  dots.forEach(dot => dot.addEventListener("click", () => showChapter(Number(dot.dataset.go) - 1)));
  document.getElementById("restart-button").addEventListener("click", () => showChapter(0));

  // Small keyboard shortcuts make the chapter experience easy to explore.
  document.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" && current < chapters.length - 1) showChapter(current + 1);
    if (event.key === "ArrowLeft" && current > 0) showChapter(current - 1);
  });

  // Balloon wishes.
  const balloonMessage = document.getElementById("balloon-message");
  document.querySelectorAll(".balloon").forEach(balloon => {
    balloon.addEventListener("click", () => {
      balloonMessage.textContent = balloon.dataset.message;
      balloon.classList.remove("popped");
      void balloon.offsetWidth;
      balloon.classList.add("popped");
      balloon.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.13) rotate(4deg)" }, { transform: "scale(1)" }],
        { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    });
  });

  // Grow a new flower each time Mahi plants a wish.
  const garden = document.getElementById("garden-scene");
  const flowerCount = document.getElementById("flower-count");
  let planted = 0;
  const flowers = ["✿", "❀", "✾", "✽", "✻", "✼"];
  document.getElementById("plant-button").addEventListener("click", () => {
    planted += 1;
    const flower = document.createElement("span");
    flower.className = "new-flower";
    flower.textContent = flowers[(planted - 1) % flowers.length];
    flower.style.left = (9 + Math.random() * 78) + "%";
    flower.style.bottom = (17 + Math.random() * 31) + "%";
    flower.style.fontSize = (27 + Math.random() * 17) + "px";
    garden.appendChild(flower);
    flowerCount.textContent = String(planted);
    if (planted === 1) {
      document.querySelector(".garden-message").innerHTML = "one wish, one little bloom<br><b>keep believing, Mahi.</b>";
    }
  });

  // Blow out the candle.
  const blowButton = document.getElementById("blow-button");
  const flame = document.getElementById("flame");
  const cakeFeedback = document.getElementById("cake-feedback");
  let candleOut = false;
  blowButton.addEventListener("click", () => {
    candleOut = !candleOut;
    flame.classList.toggle("out", candleOut);
    blowButton.innerHTML = candleOut ? "আবার জ্বালাও <span>✧</span>" : "মোমবাতি নেভাও <span>✧</span>";
    cakeFeedback.textContent = candleOut
      ? "ইচ্ছেটা আকাশের কাছে পাঠিয়ে দিলাম। ✨"
      : "আবার একটা ইচ্ছে করো, Mahi! 🤍";
    if (candleOut) burstConfetti(34);
  });

  // Celebration burst for the final chapter.
  const confettiLayer = document.getElementById("confetti-layer");
  function burstConfetti(amount = 70) {
    const palette = ["#f4c5cf", "#f3d99e", "#cdb9e8", "#c1deda", "#f5aa91", "#fff0dc"];
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti";
      piece.style.left = (Math.random() * 100) + "%";
      piece.style.background = palette[Math.floor(Math.random() * palette.length)];
      piece.style.setProperty("--fall", (2.4 + Math.random() * 2.4) + "s");
      piece.style.setProperty("--drift", ((Math.random() - .5) * 220) + "px");
      piece.style.setProperty("--rot", Math.floor(Math.random() * 160) + "deg");
      piece.style.animationDelay = (Math.random() * .55) + "s";
      confettiLayer.appendChild(piece);
      window.setTimeout(() => piece.remove(), 5600);
    }
  }
  document.getElementById("fireworks-button").addEventListener("click", () => {
    burstConfetti(120);
    const button = document.getElementById("fireworks-button");
    button.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.07)" }, { transform: "scale(1)" }],
      { duration: 500, easing: "ease-out" }
    );
  });

  // This button controls decorative motion only; the site remains fully usable.
  const sparkleToggle = document.getElementById("sparkle-toggle");
  sparkleToggle.addEventListener("click", () => {
    const enabled = sparkleToggle.getAttribute("aria-pressed") !== "true";
    sparkleToggle.setAttribute("aria-pressed", String(enabled));
    document.body.classList.toggle("no-sparkles", !enabled);
    sparkleToggle.querySelector("small").textContent = enabled ? "sparkles" : "quiet mode";
    sparkleToggle.querySelector("span").textContent = enabled ? "✧" : "·";
  });

  // Touch swipe navigation, excluding interactive controls.
  let touchStartX = null;
  document.addEventListener("touchstart", event => {
    if (event.touches.length === 1) touchStartX = event.touches[0].clientX;
  }, { passive: true });
  document.addEventListener("touchend", event => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 85) return;
    if (event.target.closest("button, a")) return;
    if (delta < 0 && current < chapters.length - 1) showChapter(current + 1);
    if (delta > 0 && current > 0) showChapter(current - 1);
  }, { passive: true });

  // Open the chapter referenced by a valid URL hash.
  const initialId = window.location.hash.slice(1);
  const initialIndex = chapters.findIndex(chapter => chapter.id === initialId);
  showChapter(initialIndex >= 0 ? initialIndex : 0, false);
})();