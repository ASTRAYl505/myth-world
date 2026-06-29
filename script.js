window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("launch").style.display="none";
},1500);

startStars();

});

/* 🚀 start */
window.start = function(){
document.querySelector(".intro").style.display="none";
};

/* 🪐 planets */
const planets = {
Mercury:["Closest to Sun","https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg"],
Venus:["Hottest planet","https://upload.wikimedia.org/wikipedia/commons/3/3d/Venus_-_real_color.jpg"],
Earth:["Planet of life","https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"],
Mars:["Red planet","https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"],
Jupiter:["Largest planet","https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg"],
Saturn:["Ring system","https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg"]
};

/* 🪐 popup */
window.openPlanet = function(name){
document.getElementById("popup").classList.remove("hidden");
document.getElementById("pname").innerText=name;
document.getElementById("pinfo").innerText=planets[name][0];
document.getElementById("pimg").src=planets[name][1];
};

window.closePopup = function(){
document.getElementById("popup").classList.add("hidden");
};

/* 🌌 stars */
function startStars(){

const c=document.getElementById("stars");
const ctx=c.getContext("2d");

c.width=window.innerWidth;
c.height=window.innerHeight;

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
