let scene, camera, renderer;
let planets = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let selected = null;
let t = 0;

/* 🚀 START */
function start(){

document.getElementById("intro").style.display = "none";
document.getElementById("nasaLayer").style.display = "block";

document.getElementById("audio").play();

initNASA();

}

/* 🌌 INIT */
function initNASA(){

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
0.1,
5000
);

let canvas = document.getElementById("nasaLayer");

renderer = new THREE.WebGLRenderer({
canvas:canvas,
alpha:true,
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

/* LIGHT */
let light = new THREE.PointLight(0x00e5ff,2,5000);
scene.add(light);

/* SUN */
let sun = new THREE.Mesh(
new THREE.SphereGeometry(6,32,32),
new THREE.MeshStandardMaterial({
color:0x00e5ff,
emissive:0x00e5ff,
emissiveIntensity:1
})
);
scene.add(sun);

/* STARS */
let geo = new THREE.BufferGeometry();
let arr = [];

for(let i=0;i<20000;i++){
arr.push((Math.random()-0.5)*3000);
arr.push((Math.random()-0.5)*3000);
arr.push((Math.random()-0.5)*3000);
}

geo.setAttribute("position",new THREE.Float32BufferAttribute(arr,3));

scene.add(new THREE.Points(
geo,
new THREE.PointsMaterial({color:0xffffff,size:0.8})
));

/* PLANETS */
function addPlanet(distance,size,color,speed,name,info){

let mesh = new THREE.Mesh(
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

/* SYSTEM */
addPlanet(14,0.8,0x00e5ff,0.02,"Mercury","Hot rocky planet");
addPlanet(18,1.2,0xff00ff,0.015,"Venus","Toxic atmosphere");
addPlanet(24,1.4,0x7a00ff,0.01,"Earth","Life planet");
addPlanet(30,1.1,0x00ff88,0.008,"Mars","Red planet");
addPlanet(40,2.2,0xff2bd6,0.005,"Jupiter","Gas giant");
addPlanet(52,1.8,0x00aaff,0.004,"Saturn","Ring planet");

/* CLICK */
window.addEventListener("click",(e)=>{

mouse.x = (e.clientX/window.innerWidth)*2-1;
mouse.y = -(e.clientY/window.innerHeight)*2+1;

raycaster.setFromCamera(mouse,camera);

let hits = raycaster.intersectObjects(planets.map(p=>p.mesh));

if(hits.length>0){

selected = planets.find(p=>p.mesh === hits[0].object);

camera.position.set(
selected.mesh.position.x + 6,
selected.mesh.position.y + 4,
selected.mesh.position.z + 10
);

camera.lookAt(selected.mesh.position);

let hud = document.getElementById("planetHUD");
hud.style.display = "block";

hud.innerHTML = `
🌌 <b>${selected.name}</b><br><br>
📜 ${selected.info}<br>
📏 Size: ${selected.size}<br>
⚡ Speed: ${selected.speed}
`;

}

});

/* LOOP */
function animate(){

requestAnimationFrame(animate);

t += 0.01;

planets.forEach(p=>{
p.angle += p.speed;
p.mesh.position.x = Math.cos(p.angle)*p.distance;
p.mesh.position.z = Math.sin(p.angle)*p.distance;
});

renderer.render(scene,camera);

}

animate();

/* RESIZE */
window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

}
