/* 🚀 LAUNCH SCREEN */
window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("launch").style.display="none";
},1800);

/* 🪐 cards animation */
document.querySelectorAll(".nasa-card").forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
}, i * 180);
});

/* 🌌 start stars */
startStars();

});

/* 🚀 START BUTTON */
function start(){
document.querySelector(".intro").style.display="none";
}

/* 🪐 PLANET DATA */
const planets = {

Mercury: `
<b>Type:</b> Terrestrial<br>
<b>Distance:</b> 57.9 million km<br>
<b>Day:</b> 59 Earth days<br>
<b>Year:</b> 88 days<br>
<b>Facts:</b> No atmosphere, extreme heat & cold
`,

Venus: `
<b>Type:</b> Terrestrial<br>
<b>Distance:</b> 108.2 million km<br>
<b>Day:</b> 243 days<br>
<b>Year:</b> 225 days<br>
<b>Facts:</b> Thick toxic CO₂ atmosphere, hottest planet
`,

Earth: `
<b>Type:</b> Terrestrial<br>
<b>Distance:</b> 149.6 million km<br>
<b>Day:</b> 24 hours<br>
<b>Year:</b> 365 days<br>
<b>Facts:</b> Only known life planet 🌍
`,

Mars: `
<b>Type:</b> Terrestrial<br>
<b>Distance:</b> 227.9 million km<br>
<b>Day:</b> 24.6 hours<br>
<b>Year:</b> 687 days<br>
<b>Facts:</b> Red planet, iron oxide surface
`,

Jupiter: `
<b>Type:</b> Gas Giant<br>
<b>Distance:</b> 778 million km<br>
<b>Facts:</b> Largest planet, Great Red Spot storm
`,

Saturn: `
<b>Type:</b> Gas Giant<br>
<b>Distance:</b> 1.4 billion km<br>
<b>Facts:</b> Famous ring system made of ice & rock
`

};

/* 🪐 OPEN POPUP */
function openPlanet(name){
document.getElementById("popup").classList.remove("hidden");
document.getElementById("pname").innerText = name;
document.getElementById("pinfo").innerHTML = planets[name];
}

/* ❌ CLOSE POPUP */
function closePopup(){
document.getElementById("popup").classList.add("hidden");
}

/* 🌌 STAR SYSTEM */
function startStars(){

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*1.5,
s:Math.random()*0.6+0.2
});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";

stars.forEach(star=>{
ctx.beginPath();
ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
ctx.fill();

star.y += star.s;

if(star.y > canvas.height){
star.y = 0;
star.x = Math.random()*canvas.width;
}
});

requestAnimationFrame(animate);
}

animate();

}
