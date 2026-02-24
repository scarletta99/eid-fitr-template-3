/* ============================================================
   Eid Al-Fitr Greeting Card — Floral Rose
   main.js
   ============================================================ */

/* ── Canvas Petal Rain ── */
(function initPetalCanvas() {
  const canvas = document.getElementById("petalCanvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = [
    "#bd8294",
    "#d4a0b4",
    "#e8c8d4",
    "#f0e0e8",
    "#8a9060",
    "#c8b890",
  ];
  const SYMBOLS = ["✿", "❀", "✾", "⁕", "❋", "✽"];

  const petals = Array.from({ length: 28 }, () => spawnPetal(true));

  function spawnPetal(randomY = false) {
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : -20,
      size: Math.random() * 14 + 8,
      speed: Math.random() * 0.7 + 0.3,
      drift: (Math.random() - 0.5) * 0.5,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 1.5,
      alpha: Math.random() * 0.35 + 0.15,
      sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.font = `${p.size}px serif`;
      ctx.fillStyle = p.color;
      ctx.fillText(p.sym, -p.size / 2, p.size / 2);
      ctx.restore();

      p.y += p.speed;
      p.x += p.drift;
      p.rot += p.rotV;

      if (p.y > window.innerHeight + 20) {
        Object.assign(p, spawnPetal(false));
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Rose Lanterns ── */
(function generateLanterns() {
  const container = document.getElementById("lanterns");
  const colorSets = [
    ["#bd8294", "#f0e0e8"],
    ["#d4a0b4", "#fdf0f5"],
    ["#8a9060", "#dde0c8"],
  ];
  for (let i = 0; i < 7; i++) {
    const [c1, c2] = colorSets[i % colorSets.length];
    const el = document.createElement("div");
    el.className = "lantern";
    el.style.cssText = `left:${i * 14 + 2}%;--sd:${3.5 + i * 0.35}s;--sl:${i * 0.55}s;`;
    el.innerHTML = `
      <svg width="22" height="52" viewBox="0 0 28 60">
        <line x1="14" y1="0"  x2="14" y2="8"  stroke="${c1}" stroke-width="1.5"/>
        <rect x="3"  y="8"  width="22" height="34" rx="6" fill="${c1}" opacity="0.85"/>
        <rect x="7"  y="12" width="14" height="26" rx="4" fill="${c2}" opacity="0.55"/>
        <ellipse cx="14" cy="42" rx="11" ry="4"   fill="${c1}" opacity="0.6"/>
        <circle  cx="14" cy="25" r="5"             fill="${c2}" opacity="0.9"/>
        <circle  cx="14" cy="25" r="2"             fill="white" opacity="0.5"/>
        <line x1="14" y1="42" x2="14" y2="58" stroke="${c1}" stroke-width="1.5"/>
      </svg>`;
    container.appendChild(el);
  }
})();

/* ── Open Card ── */
window.openCard = function () {
  const cover = document.getElementById("coverSection");
  const card = document.getElementById("cardSection");

  cover.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  cover.style.opacity = "0";
  cover.style.transform = "scale(0.97) translateY(-10px)";

  setTimeout(() => {
    cover.style.display = "none";
    card.classList.add("visible");
    card.scrollIntoView({ behavior: "smooth" });
    burstPetals();
  }, 600);
};

/* ── Music Player ── */
const bgAudio = document.getElementById("bgMusic");
let isPlaying = false;

window.toggleMusic = function () {
  const bars = document.getElementById("bars");
  const icon = document.getElementById("playIcon");

  if (!isPlaying) {
    bgAudio
      .play()
      .then(() => {
        isPlaying = true;
        icon.textContent = "⏸";
        bars.classList.remove("paused");
        burstPetals();
      })
      .catch(() => {
        isPlaying = true;
        icon.textContent = "⏸";
        bars.classList.remove("paused");
      });
  } else {
    bgAudio.pause();
    isPlaying = false;
    icon.textContent = "▶";
    bars.classList.add("paused");
  }
};

/* ── Petal burst (DOM sparks) ── */
function burstPetals() {
  for (let i = 0; i < 4; i++) setTimeout(spawnBurst, i * 380);
}

function spawnBurst() {
  const x = 20 + Math.random() * 60;
  const y = 20 + Math.random() * 50;
  const syms = ["✿", "❀", "✾", "❋", "✽", "⁕"];
  const colors = [
    "#bd8294",
    "#d4a0b4",
    "#e8c8d4",
    "#8a9060",
    "#f0e0e8",
    "#c8b890",
  ];

  for (let i = 0; i < 14; i++) {
    const sp = document.createElement("div");
    sp.className = "spark";
    const angle = (i / 14) * Math.PI * 2;
    const dist = 30 + Math.random() * 60;

    sp.style.cssText = [
      `left:${x}vw`,
      `top:${y}vh`,
      `color:${colors[i % colors.length]}`,
      `font-size:${Math.random() * 10 + 8}px`,
      `background:transparent`,
      `width:auto`,
      `height:auto`,
      `transition:transform 1s ease-out,opacity 1s ease-out`,
      `opacity:1`,
    ].join(";");
    sp.textContent = syms[i % syms.length];

    document.body.appendChild(sp);
    requestAnimationFrame(() => {
      sp.style.transform = `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px) rotate(${Math.random() * 360}deg)`;
      sp.style.opacity = "0";
    });
    setTimeout(() => sp.remove(), 1100);
  }
}
