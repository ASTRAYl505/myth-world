function enterWorld() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("world").style.display = "block";
}

/* PANEL */
function openPanel(title, desc) {
  document.getElementById("title").innerText = title;
  document.getElementById("desc").innerText = desc;
  document.getElementById("panel").style.right = "0";
}

function closePanel() {
  document.getElementById("panel").style.right = "-340px";
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
  const glow = document.querySelector(".cursor-glow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
