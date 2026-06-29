function start(){
document.querySelector(".intro").style.opacity = "0";

setTimeout(()=>{
document.querySelector(".intro").style.display = "none";
},800);
}

/* 🌌 STAR BACKGROUND */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*1.8,
d:Math.random()*0.6+0.2
});
}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "white";

for(let i=0;i<stars.length;i++){

let s = stars[i];

ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fill();

s.y += s.d;

if(s.y > canvas.height){
s.y = 0;
s.x = Math.random()*canvas.width;
}

}

requestAnimationFrame(draw);
}

draw();

/* ✨ FADE IN ON SCROLL */
window.addEventListener("scroll",()=>{

document.querySelectorAll(".card").forEach(card=>{

let top = card.getBoundingClientRect().top;

if(top < window.innerHeight - 100){
card.classList.add("show");
}

});

});

/* 📏 RESIZE FIX */
window.addEventListener("resize",()=>{

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

});
