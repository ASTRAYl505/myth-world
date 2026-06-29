let scene,camera,renderer;
let planets=[];
let t=0;
let raycaster=new THREE.Raycaster();
let mouse=new THREE.Vector2();

/* 🌌 INIT */
init();

function init(){

scene=new THREE.Scene();

/* 🎥 CAMERA */
camera=new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
0.1,
5000
);

/* 🖥️ RENDERER */
renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x000000,0);

/* ☀️ SUN */
let sun=new THREE.Mesh(
new THREE.SphereGeometry(7,32,32),
new THREE.MeshStandardMaterial({
color:0x00e5ff,
emissive:0x00e5ff,
emissiveIntensity:1.5
})
);
scene.add(sun);

/* 💡 LIGHT */
let light=new THREE.PointLight(0x00e5ff,3,5000);
scene.add(light);

/* 🌌 STARS */
createStars();

/* 🪐 PLANETS */
addPlanet(14,0.8,0x00e5ff,0.02,"Mercury","Hot rocky planet");
addPlanet(18,1.2,0xff00ff,0.015,"Venus","Toxic atmosphere");
addPlanet(24,1.4,0x7a00ff,0.01,"Earth","Life planet");
addPlanet(30,1.1,0x00ff88,0.008,"Mars","Red planet");
addPlanet(40,2.2,0xff2bd6,0.005,"Jupiter","Gas giant");
addPlanet(52,1.8,0x00aaff,0.004,"Saturn","Ring planet");

camera.position.z=120;

animate();

}

/* 🌌 STARS */
function createStars(){

let geo=new THREE.BufferGeometry();
let arr=[];

for(let i=0;i<20000;i++){
arr.push((Math.random()-0.5)*3000);
arr.push((Math.random()-0.5)*3000);
arr.push((Math.random()-0.5)*3000);
}

geo.setAttribute("position",new THREE.Float32BufferAttribute(arr,3));

let stars=new THREE.Points(
geo,
new THREE.PointsMaterial({color:0xffffff,size:0.8})
);

scene.add(stars);

}

/* 🪐 PLANET */
function addPlanet(distance,size,color,speed,name,info){

let mesh=new THREE.Mesh(
new THREE.SphereGeometry(size,32,32),
new THREE.MeshStandardMaterial({
color,
emissive:color,
emissiveIntensity:0.6
})
);

scene.add(mesh);

planets.push({
mesh,
distance,
speed,
angle:Math.random()*10,
name,
info,
size
});

}

/* 🎥 CAMERA MOVE */
function cameraMove(){

camera.position.x=Math.cos(t*0.015)*160;
camera.position.z=Math.sin(t*0.015)*160;
camera.position.y=40;

camera.lookAt(0,0,0);

}

/* 🖱 CLICK PLANETS */
window.addEventListener("click",(e)=>{

mouse.x=(e.clientX/window.innerWidth)*2-1;
mouse.y=-(e.clientY/window.innerHeight)*2+1;

raycaster.setFromCamera(mouse,camera);

let hits=raycaster.intersectObjects(planets.map(p=>p.mesh));

if(hits.length>0){

let p=planets.find(x=>x.mesh===hits[0].object);

/* 🎥 ZOOM */
camera.position.set(
p.mesh.position.x+6,
p.mesh.position.y+4,
p.mesh.position.z+10
);

camera.lookAt(p.mesh.position);

/* 📜 HUD */
let hud=document.getElementById("planetHUD");
if(hud){
hud.style.display="block";
hud.innerHTML=`
🌌 <b>${p.name}</b><br><br>
📜 ${p.info}<br>
📏 Size: ${p.size}<br>
⚡ Speed: ${p.speed}
`;
}

}

});

/* 🔁 LOOP */
function animate(){

requestAnimationFrame(animate);

t+=0.01;

/* ORBITS */
planets.forEach(p=>{
p.angle+=p.speed;

p.mesh.position.x=Math.cos(p.angle)*p.distance;
p.mesh.position.z=Math.sin(p.angle)*p.distance;
});

/* CAMERA */
cameraMove();

/* RENDER */
renderer.render(scene,camera);

}

/* 🚪 START (لو عندك intro) */
function start(){

let intro=document.getElementById("intro");
if(intro) intro.style.display="none";

let audio=document.getElementById("audio");
if(audio){
audio.volume=0.3;
audio.play();
}

}

/* 📏 RESIZE */
window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
