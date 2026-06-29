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
  document.getElementById("panel").style.right = "-320px";
}

/* FILTER */
function filter(type) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type)
        ? "block"
        : "none";
  });
}

/* SEARCH */
function searchWorld() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(input)
      ? "block"
      : "none";
  });
}
