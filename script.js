let scene,camera,renderer,composer;
let planets=[];
let t=0;

/* 🌌 INIT */
init();

function init(){

scene=new THREE.Scene();

/* 🎥 CAMERA (Blade Runner style slow cinematic) */
camera=new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
0.1,
5000
);

/* 🖥️ RENDERER */
renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

/* ✨ BLOOM (ULTRA NEON) */
composer=new THREE.EffectComposer(renderer);

composer.addPass(new THREE.RenderPass(scene,camera));

let bloom=new THREE.UnrealBloomPass(
new THREE.Vector2(window.innerWidth,window.innerHeight),
3.0,  // STRONG glow
0.8,
0.7
);

composer.addPass(bloom);

/* ☀️ NEON SUN */
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

/* 🪐 PLANETS NEON */
addPlanet(14,0.8,0x00e5ff,0.02);
addPlanet(18,1.2,0xff00ff,0.015);
addPlanet(24,1.4,0x7a00ff,0.01);
addPlanet(30,1.1,0x00ff88,0.008);
addPlanet(40,2.2,0xff2bd6,0.005);
addPlanet(52,1.8,0x00aaff,0.004);

camera.position.z=120;

animate();

}

/* 🌌 NEBULA + STARS */
function createStars(){

let geo=new THREE.BufferGeometry();
let arr=[];

for(let i=0;i<30000;i++){
arr.push((Math.random()-0.5)*4000);
arr.push((Math.random()-0.5)*4000);
arr.push((Math.random()-0.5)*4000);
}

geo.setAttribute("position",new THREE.Float32BufferAttribute(arr,3));

let stars=new THREE.Points(
geo,
new THREE.PointsMaterial({color:0x88aaff,size:0.9})
);

scene.add(stars);

}

/* 🪐 PLANET */
function addPlanet(distance,size,color,speed){

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
angle:Math.random()*10
});

}

/* 🎥 CYBER CAMERA (Blade Runner slow drift) */
function cameraMove(){

camera.position.x=Math.cos(t*0.015)*160;
camera.position.z=Math.sin(t*0.015)*160;
camera.position.y=40+Math.sin(t*0.03)*20;

camera.lookAt(0,0,0);

}

/* 🔁 LOOP */
function animate(){

requestAnimationFrame(animate);

t+=0.01;

/* 🪐 ORBITS */
planets.forEach(p=>{
p.angle+=p.speed;

p.mesh.position.x=Math.cos(p.angle)*p.distance;
p.mesh.position.z=Math.sin(p.angle)*p.distance;
});

/* 🎥 CAMERA */
cameraMove();

/* 🌟 RENDER */
composer.render();

}

/* 🚪 START + SOUND */
function start(){

document.getElementById("intro").style.opacity="0";

setTimeout(()=>{
document.getElementById("intro").style.display="none";
},2500);

/* 🔊 CYBER SOUND */
let audio=document.getElementById("audio");
audio.volume=0.3;
audio.play();

}

/* 📏 RESIZE */
window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);
composer.setSize(window.innerWidth,window.innerHeight);

});
