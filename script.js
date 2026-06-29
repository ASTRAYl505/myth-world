window.addEventListener("load",()=>{
setTimeout(()=>{
document.querySelector(".intro").style.display="none";
},1200);
startStars();
});

/* START */
window.start=function(){
document.querySelector(".intro").style.display="none";
};

/* PLANETS */
const planets={
Mercury:"Closest to Sun",
Venus:"Hottest planet",
Earth:"Life exists here",
Mars:"Red planet",
Jupiter:"Largest planet",
Saturn:"Ring system planet"
};

/* POPUP */
window.openPlanet=function(name){
document.getElementById("popup").classList.remove("hidden");
document.getElementById("pname").innerText=name;
document.getElementById("pinfo").innerText=planets[name];
document.getElementById("pimg").style.display="none";
};

/* CLOSE */
window.closePopup=function(){
document.getElementById("popup").classList.add("hidden");
};

/* STARS */
function startStars(){
const c=document.getElementById("stars");
const ctx=c.getContext("2d");

c.width=innerWidth;
c.height=innerHeight;

let stars=[];

for(let i=0;i<80;i++){
stars.push({
x:Math.random()*c.width,
y:Math.random()*c.height,
r:Math.random()*1.5,
s:Math.random()*0.5
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
