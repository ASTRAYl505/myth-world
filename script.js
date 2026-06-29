window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("launch").style.display="none";
},1200);

document.querySelectorAll(".nasa-card").forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
},i*120);
});

startStars();

});

/* 🚀 START */
window.start=function(){
document.querySelector(".intro").style.display="none";
}

/* 🪐 PLANETS (LOCKED DATA) */
const planets={
Mercury:{
text:"Closest planet to the Sun. No atmosphere.",
img:"https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg"
},
Venus:{
text:"Hottest planet with toxic atmosphere.",
img:"https://upload.wikimedia.org/wikipedia/commons/3/3d/Venus_-_real_color.jpg"
},
Earth:{
text:"Only known planet with life.",
img:"https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
},
Mars:{
text:"Red planet with iron surface.",
img:"https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
},
Jupiter:{
text:"Largest gas giant in solar system.",
img:"https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg"
},
Saturn:{
text:"Famous ring system made of ice and rock.",
img:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg"
}
};

/* 🪐 OPEN POPUP */
window.openPlanet=function(name){

document.getElementById("popup").classList.remove("hidden");
document.getElementById("pname").innerText=name;
document.getElementById("pinfo").innerText=planets[name].text;

/* image fix */
const img=document.getElementById("pimg");
if(img){
img.src=planets[name].img;
img.style.display="block";
}
}

/* ❌ CLOSE */
window.closePopup=function(){
document.getElementById("popup").classList.add("hidden");
}

/* 🌌 STARS */
function startStars(){

const c=document.getElementById("stars");
if(!c)return;

const ctx=c.getContext("2d");

c.width=innerWidth;
c.height=innerHeight;

let stars=[];

for(let i=0;i<100;i++){
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

for(let s of stars){
ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fill();

s.y+=s.s;
if(s.y>c.height){
s.y=0;
s.x=Math.random()*c.width;
}
}

requestAnimationFrame(animate);
}

animate();
}
