// 🌌 ERA SYSTEM
function openEra(title, desc) {
  document.getElementById("title").innerText = title;
  document.getElementById("desc").innerText = desc;
  document.getElementById("panel").style.right = "0";

  // 🌟 cinematic glow shift
  document.querySelector(".glow").style.background =
    "radial-gradient(circle at center, rgba(255,215,0,0.18), transparent 60%)";
}

function closePanel() {
  document.getElementById("panel").style.right = "-400px";
}

/* 🌠 CAMERA FOLLOW EFFECT */
document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  document.getElementById("world").style.transform =
    `rotateY(${x}deg) rotateX(${y}deg)`;
});
