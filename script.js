const DB = {
  Zeus: {
    type: "God",
    era: "Age of Gods",
    period: "1200–400 BC",
    age: "Immortal",
    desc: "God of thunder and sky.",
    img: "https://cdn.pixabay.com/photo/2020/03/31/19/20/zeus-4989512_1280.jpg"
  },

  Hades: {
    type: "God",
    era: "Age of Gods",
    period: "1200–400 BC",
    age: "Immortal",
    desc: "Ruler of the Underworld.",
    img: "https://cdn.pixabay.com/photo/2021/05/20/13/35/underworld-6270143_1280.jpg"
  },

  Dragon: {
    type: "Myth Beast",
    era: "Mythic Age",
    period: "Pre-History",
    age: "Thousands of years",
    desc: "Ancient fire creature.",
    img: "https://cdn.pixabay.com/photo/2021/09/10/10/19/dragon-6613215_1280.jpg"
  },

  Phoenix: {
    type: "Myth Beast",
    era: "Mythic Age",
    period: "Ancient cycle",
    age: "Eternal rebirth",
    desc: "Reborn from ashes.",
    img: "https://cdn.pixabay.com/photo/2020/04/12/10/39/phoenix-5032706_1280.jpg"
  },

  Vampire: {
    type: "Undead",
    era: "Dark / Victorian Era",
    period: "1400–Present",
    age: "500+ years",
    desc: "Immortal blood creature.",
    img: "https://cdn.pixabay.com/photo/2017/01/31/13/14/vampire-2025473_1280.jpg"
  },

  Werewolf: {
    type: "Cursed Human",
    era: "Medieval Age",
    period: "1000–1600",
    age: "Human + curse",
    desc: "Beast under full moon.",
    img: "https://cdn.pixabay.com/photo/2020/10/05/20/23/wolf-5630123_1280.jpg"
  }
};

// 📚 BUILD GRID
const grid = document.getElementById("grid");

function render() {
  grid.innerHTML = "";

  Object.keys(DB).forEach(key => {
    const item = DB[key];

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.img}" alt="${key}">
      <b>${key}</b>
    `;

    card.onclick = () => openItem(key);
    grid.appendChild(card);
  });
}

render();

// 📦 OPEN PANEL
function openItem(key) {
  const d = DB[key];

  document.getElementById("name").innerText = key;

  document.getElementById("img").src = d.img;

  document.getElementById("meta").innerText =
    `Type: ${d.type} | Era: ${d.era} | Period: ${d.period} | Age: ${d.age}`;

  document.getElementById("desc").innerText = d.desc;

  document.getElementById("panel").style.right = "0";
}

// ❌ CLOSE PANEL
function closePanel() {
  document.getElementById("panel").style.right = "-420px";
}

// 🔍 SEARCH FUNCTION
function search() {
  const value = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      card.innerText.toLowerCase().includes(value)
        ? "block"
        : "none";
  });
}
