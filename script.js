function openCard(title, desc) {
  document.getElementById("title").innerText = title;
  document.getElementById("desc").innerText = desc;
  document.getElementById("modal").style.display = "flex";
}

function closeCard() {
  document.getElementById("modal").style.display = "none";
}

/* بحث حي */
function searchCards() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (card.innerText.toLowerCase().includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
