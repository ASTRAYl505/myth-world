window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("launch").style.display="none";
},1500);

/* 🪐 animate cards */
document.querySelectorAll(".nasa-card").forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
},i*150);
});

startStars();

});

/* 🚀 START BUTTON */
window.start = function(){
document.querySelector(".intro").style.display="none";
}

/* 🪐 PLANETS DATA */
const planets = {
Mercury:"Closest to Sun. No atmosphere.",
Venus:"Extreme heat and toxic clouds.",
Earth:"Only planet with life.",
Mars:"Red iron surface planet.",
Jupiter:"Largest gas giant.",
Saturn:"Ring system planet."
};

/* 🪐 POPUP */
window.openPlanet = function(name){
document.getElementById("popup").classList.remove("hidden");
document.getElementById("pname").innerText=name;
document.getElementById("pinfo").innerText=planets[name];
}

/* ❌ CLOSE */
window.closePopup = function(){
document.getElementById("popup").classList.add("hidden");
}

/* 🌌 STARS */
function startStars(){

const c=document.getElementById("stars");
const ctx=c.getContext("2d");

c.width=window.innerWidth;
c.height=window.innerHeight;

let stars=[];

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*c.width,
y:Math.random()*c.height,
r:Math.random()*1.5,
s:Math.random()*0.5+0.2
});
}

function animate(){
ctx.clearRect(0,0,c.width,c.height);
ctx.fillStyle="white";

stars.forEach(s=>{
ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fill();

s.y+=s.s;

if(s.y>c.height){
s.y=0;
s.x=Math.random()*c.width;
}
});

requestAnimationFrame(animate);
}

animate();
}
