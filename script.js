const audio = document.getElementById("ambience");

function enterWorld() {
  document.getElementById("intro").style.opacity = "0";

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("world").style.display = "block";
  }, 600);

  // 🎧 start sound
  audio.volume = 0.4;
  audio.play();
}

/* PANEL */
function openPanel(title, desc) {
  document.getElementById("title").innerText = title;
  document.getElementById("desc").innerText = desc;
  document.getElementById("panel").style.right = "0";
}

function closePanel() {
  document.getElementById("panel").style.right = "-380px";
}

/* FILTER */
function filter(type) {
  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type)
        ? "block"
        : "none";
  });
}

/* SEARCH */
function searchWorld() {
  let val = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(val)
      ? "block"
      : "none";
  });
}

/* CURSOR LIGHT */
document.addEventListener("mousemove", (e) => {
  const light = document.querySelector(".cursor-light");
  light.style.left = e.clientX + "px";
  light.style.top = e.clientY + "px";
});
