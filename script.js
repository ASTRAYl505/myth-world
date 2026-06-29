let scene, camera, renderer;
let planets = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selected = null;

/* 🚀 INIT */
init();

function init(){

scene = new THREE.Scene();

/* 🌌 BACKGROUND */
scene.background = new THREE.TextureLoader().load(
"https://threejs.org/examples/textures/planets/starfield.jpg"
);

/* 🎥 CAMERA */
camera = new THREE.PerspectiveCamera(
70,
window.innerWidth / window.innerHeight,
0.1,
10000
);

/* 🖥️ RENDERER */
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* ☀️ SUN REALISTIC */
let sun = new THREE.Mesh(
new THREE.SphereGeometry(25,64,64),
new THREE.MeshStandardMaterial({
color:0xffffff,
emissive:0xffcc88,
emissiveIntensity:2
})
);
scene.add(sun);

/* 💡 LIGHT */
let light = new THREE.PointLight(0xffffff,5,15000);
scene.add(light);

/* 🌌 STARS */
createStars();

/* 🪐 PLANETS (REAL SCALE) */
addPlanet(-120,3,"https://threejs.org/examples/textures/planets/mercury.jpg","Mercury","Hot rocky planet");
addPlanet(-80,5,"https://threejs.org/examples/textures/planets/venus.jpg","Venus","Toxic atmosphere");
addPlanet(-30,6,"https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg","Earth","Life planet 🌍");
addPlanet(20,5,"https://threejs.org/examples/textures/planets/mars.jpg","Mars","Red dusty planet");
addPlanet(100,14,"https://threejs.org/examples/textures/planets/jupiter.jpg","Jupiter","Gas giant");
addPlanet(200,12,"https://threejs.org/examples/textures/planets/saturn.jpg","Saturn","Ring planet",true);

camera.position.z = 300;

/* EVENTS */
window.addEventListener("click", onClick);
window.addEventListener("resize", onResize);

animate();

}

/* 🪐 PLANET */
function addPlanet(x, size, textureUrl, name, info, hasRing=false){

let texture = new THREE.TextureLoader().load(textureUrl);

/* 🌍 MATERIAL */
let mesh = new THREE.Mesh(
new THREE.SphereGeometry(size,64,64),
new THREE.MeshStandardMaterial({
map:texture
})
);

mesh.position.x = x;
scene.add(mesh);

/* 🔵 SATURN RING */
let ring = null;

if(hasRing){

let ringGeo = new THREE.RingGeometry(size+2,size+5,64);

let ringMat = new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide,
transparent:true,
opacity:0.5
});

ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI/2;
ring.position.x = x;

scene.add(ring);

}

/* 🧠 PLANET DATA */
planets.push({
mesh,
ring,
name,
info,
size
});

}

/* 🌌 STARS */
function createStars(){

let geo = new THREE.BufferGeometry();
let arr = [];

for(let i=0;i<30000;i++){
arr.push((Math.random()-0.5)*5000);
arr.push((Math.random()-0.5)*5000);
arr.push((Math.random()-0.5)*5000);
}

geo.setAttribute("position", new THREE.Float32BufferAttribute(arr,3));

scene.add(new THREE.Points(
geo,
new THREE.PointsMaterial({color:0xffffff,size:1})
));

}

/* 🎥 LOOP */
function animate(){
requestAnimationFrame(animate);
renderer.render(scene,camera);
}

/* 🖱 CLICK */
function onClick(e){

mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

raycaster.setFromCamera(mouse,camera);

let hits = raycaster.intersectObjects(planets.map(p=>p.mesh));

if(hits.length > 0){

selected = planets.find(p => p.mesh === hits[0].object);

let hud = document.getElementById("planetHUD");

hud.style.display = "block";

hud.innerHTML = `
🌌 <h2>${selected.name}</h2>
<p>${selected.info}</p>
<hr>
📏 Size: ${selected.size}
`;

camera.position.lerp(
new THREE.Vector3(
selected.mesh.position.x + 40,
selected.mesh.position.y + 20,
selected.mesh.position.z + 80
),
0.2
);

camera.lookAt(selected.mesh.position);

}

}

/* 🚪 START */
function start(){

document.getElementById("intro").style.display = "none";

let audio = document.getElementById("audio");

if(audio){
audio.volume = 0.3;
audio.play();
}

}

/* 📏 RESIZE */
function onResize(){

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth, window.innerHeight);

}
