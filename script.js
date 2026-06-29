function openPanel(title, desc) {
  document.getElementById("title").innerText = title;
  document.getElementById("desc").innerText = desc;
  document.getElementById("panel").style.right = "0";
}

function closePanel() {
  document.getElementById("panel").style.right = "-300px";
}

function filter(type) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (type === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.classList.contains(type)
        ? "block"
        : "none";
    }
  });
}

function searchWorld() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(input)
      ? "block"
      : "none";
  });
}
