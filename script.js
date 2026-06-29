let scene,camera,renderer;
let planets=[];
let raycaster=new THREE.Raycaster();
let mouse=new THREE.Vector2();
let selected=null;

/* 🚀 INIT */
init();

function init(){

scene=new THREE.Scene();

/* 🎥 CAMERA */
camera=new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
0.1,
10000
);

/* 🖥️ RENDERER */
renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000,0);

/* ☀️ SUN */
let sun=new THREE.Mesh(
new THREE.SphereGeometry(25,64,64),
new THREE.MeshStandardMaterial({
color:0xffffff,
emissive:0xffcc88,
emissiveIntensity:2
})
);
scene.add(sun);

/* 💡 LIGHT */
let light=new THREE.PointLight(0xffffff,5,10000);
scene.add(light);

/* 🌌 STARS */
createStars();

/* 🪐 PLANETS (STATIC POSITIONS) */
addPlanet(-80, 10, "https://threejs.org/examples/textures/planets/mercury.jpg", "Mercury", "Small rocky planet");
addPlanet(-50, 12, "https://threejs.org/examples/textures/planets/venus.jpg", "Venus", "Hot toxic atmosphere");
addPlanet(-10, 14, "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg", "Earth", "Life planet");
addPlanet(40, 11, "https://threejs.org/examples/textures/planets/mars.jpg", "Mars", "Red dusty planet");
addPlanet(120, 30, "https://threejs.org/examples/textures/planets/jupiter.jpg", "Jupiter", "Gas giant");
addPlanet(220, 26, "https://threejs.org/examples/textures/planets/saturn.jpg", "Saturn", "Ring planet", true);

camera.position.z=250;

animate();

/* 🖱 CLICK */
window.addEventListener("click",onClick);

}

/* 🌌 STARS */
function createStars(){

let geo=new THREE.BufferGeometry();
let arr=[];

for(let i=0;i<30000;i++){
arr.push((Math.random()-0.5)*6000);
arr.push((Math.random()-0.5)*6000);
arr.push((Math.random()-0.5)*6000);
}

geo.setAttribute("position",new THREE.Float32BufferAttribute(arr,3));

scene.add(new THREE.Points(
geo,
new THREE.PointsMaterial({color:0xffffff,size:1})
));

}

/* 🪐 PLANET */
function addPlanet(x,size,textureUrl,name,info,hasRing=false){

let texture=new THREE.TextureLoader().load(textureUrl);

let mesh=new THREE.Mesh(
new THREE.SphereGeometry(size,64,64),
new THREE.MeshStandardMaterial({
map:texture
})
);

mesh.position.x = x;

scene.add(mesh);

let ring=null;

/* 🪐 SATURN RING */
if(hasRing){

let ringGeo=new THREE.RingGeometry(size+2,size+5,64);

let ringMat=new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide,
transparent:true,
opacity:0.5
});

ring=new THREE.Mesh(ringGeo,ringMat);
ring.rotation.x=Math.PI/2;
ring.position.x=x;

scene.add(ring);

}

planets.push({
mesh,
ring,
name,
info,
size
});

}

/* 🎥 CAMERA CONTROL (USER VIEW) */
function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera);

}

/* 🖱 CLICK SELECT */
function onClick(e){

mouse.x=(e.clientX/window.innerWidth)*2-1;
mouse.y=-(e.clientY/window.innerHeight)*2+1;

raycaster.setFromCamera(mouse,camera);

let hits=raycaster.intersectObjects(planets.map(p=>p.mesh));

if(hits.length>0){

selected=planets.find(p=>p.mesh===hits[0].object);

let hud=document.getElementById("planetHUD");

if(hud){
hud.style.display="block";
hud.innerHTML=`
🌌 <h2>${selected.name}</h2>
<p>${selected.info}</p>
<hr>
📏 Size: ${selected.size}
`;
}

}

}

/* 🚪 START */
function start(){

document.getElementById("intro").style.display="none";

let audio=document.getElementById("audio");
if(audio){
audio.volume=0.3;
audio.play();
}

}
