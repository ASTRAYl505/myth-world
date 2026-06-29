const DB = {
  Zeus: { type:"God", era:"Age of Gods", desc:"God of thunder and sky." },
  Hades: { type:"God", era:"Age of Gods", desc:"Ruler of Underworld." },
  Dragon: { type:"Myth", era:"Mythic Age", desc:"Ancient fire beast." },
  Phoenix: { type:"Myth", era:"Mythic Age", desc:"Reborn from ashes." },
  Luffy: { type:"Anime", era:"Fiction Layer", desc:"Pirate king." },
  Eren: { type:"Anime", era:"Fiction Layer", desc:"Titan shifter." }
};

function openItem(name){
  document.getElementById("name").innerText = name;
  document.getElementById("meta").innerText =
    DB[name].type + " | " + DB[name].era;
  document.getElementById("desc").innerText =
    DB[name].desc;

  show("detail");
}

function show(id){
  document.querySelectorAll("section").forEach(s => s.style.display="none");
  document.getElementById(id).style.display="block";
}

function openCodex(){ show("codex"); }
function openTimeline(){ show("timeline"); }
function backHome(){ show("home"); }

function search(){
  let val = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display = c.innerText.toLowerCase().includes(val)
      ? "block" : "none";
  });
}
