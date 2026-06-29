window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("launch").style.display="none";
},1500);

/* 🪐 animate cards */
document.querySelectorAll(".nasa-card").forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
}, i * 150);
});

startStars();

});

/* 🚀 intro */
function start(){
document.querySelector(".intro").style.display="none";
}

/* 🪐 FULL NASA DATA */
const planets = {

Mercury: {
info:"Closest planet to the Sun. No atmosphere. Extreme heat and cold.",
img:"https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg"
},

Venus: {
info:"Hottest planet. Thick toxic CO₂ atmosphere with acid clouds.",
img:"https://upload.wikimedia.org/wikipedia/commons/3/3d/Venus_-_real_color.jpg"
},

Earth: {
info:"Only known planet with life. 71% water and breathable atmosphere.",
img:"https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
},

Mars: {
info:"Red planet with iron-rich soil. Evidence of past water.",
img:"https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
},

Jupiter: {
info:"Largest planet. Gas giant with giant storm (Great Red Spot).",
img:"https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg"
},

Saturn: {
info:"Famous for its rings made of ice and rock particles.",
img:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg"
}

};

/* 🪐 OPEN PLANET */
function openPlanet(name){

document.getElementById("popup").classList.remove("hidden");

document.getElementById("pname").innerText = name;
document.getElementById("pinfo").innerText = planets[name].info;

/* image */
const img = document.getElementById("pimg");
img.src = planets[name].img;
img.style.display = "block";

}

/* ❌ CLOSE */
function closePopup(){
document.getElementById("popup").classList.add("hidden");
}

/* 🌌 STAR SYSTEM */
function startStars(){

const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let stars=[];

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*1.5,
s:Math.random()*0.5+0.2
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
