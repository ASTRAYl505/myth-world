window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("launch").style.display="none";
},1500);

document.querySelectorAll(".nasa-card").forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
},i*150);
});

startStars();

});

/* 🚀 START */
function start(){
document.querySelector(".intro").style.display="none";
}

/* 🪐 DATA (مضمون 100%) */
const planets = {
Mercury:"Closest planet to Sun. No atmosphere. Extreme temperature shifts.",
Venus:"Hottest planet. Thick toxic atmosphere.",
Earth:"Only planet with life. Water covers 71%.",
Mars:"Red planet. Evidence of past water.",
Jupiter:"Largest planet. Giant gas planet.",
Saturn:"Ring system made of ice and rock."
};

/* 🪐 OPEN POPUP */
function openPlanet(name){
document.getElementById("popup").classList.remove("hidden");
document.getElementById("pname").innerText=name;
document.getElementById("pinfo").innerText=planets[name];
}

/* ❌ CLOSE */
function closePopup(){
document.getElementById("popup").classList.add("hidden");
}

/* 🌌 STARS */
function startStars(){

const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let stars=[];

for(let i=0;i<100;i++){
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

if(star.y>canvas.height){
star.y=0;
star.x=Math.random()*canvas.width;
}
});

requestAnimationFrame(animate);
}

animate();
}
