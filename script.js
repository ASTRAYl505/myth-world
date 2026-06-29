let scene,camera,renderer;
let planets=[];
let t=0;
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
5000
);

/* 🖥️ RENDERER */
renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000,0);

/* 🌞 SUN */
let sun=new THREE.Mesh(
new THREE.SphereGeometry(8,64,64),
new THREE.MeshStandardMaterial({
color:0x00e5ff,
emissive:0x00e5ff,
emissiveIntensity:2
})
);
scene.add(sun);

/* 💡 LIGHT */
let light=new THREE.PointLight(0xffffff,2,5000);
scene.add(light);

/* 🌌 STARS */
createStars();

/* 🪐 PLANETS (REAL TEXTURES) */
addPlanet(14,0.8,"https://threejs.org/examples/textures/planets/mercury.jpg",0.02,"Mercury","Hot rocky planet");

addPlanet(18,1.2,"https://threejs.org/examples/textures/planets/venus.jpg",0.015,"Venus","Toxic atmosphere");

addPlanet(24,1.4,"https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",0.01,"Earth","Life planet");

addPlanet(30,1.1,"https://threejs.org/examples/textures/planets/mars.jpg",0.008,"Mars","Red planet");

addPlanet(40,2.2,"https://threejs.org/examples/textures/planets/jupiter.jpg",0.005,"Jupiter","Gas giant");

addPlanet(
52,
1.8,
"https://threejs.org/examples/textures/planets/saturn.jpg",
0.004,
"Saturn",
"Ring planet",
true
);

camera.position.z=130;

animate();

/* 🖱 CLICK */
window.addEventListener("click",onClick);

}

/* 🌌 STARS */
function createStars(){

let geo=new THREE.BufferGeometry();
let arr=[];

for(let i=0;i<30000;i++){
arr.push((Math.random()-0.5)*5000);
arr.push((Math.random()-0.5)*5000);
arr.push((Math.random()-0.5)*5000);
}

geo.setAttribute("position",new THREE.Float32BufferAttribute(arr,3));

scene.add(new THREE.Points(
geo,
new THREE.PointsMaterial({color:0xffffff,size:0.9})
));

}

/* 🪐 PLANET + TEXTURE + RING */
function addPlanet(distance,size,textureUrl,speed,name,info,hasRing=false){

let texture=new THREE.TextureLoader().load(textureUrl);

let mesh=new THREE.Mesh(
new THREE.SphereGeometry(size,64,64),
new THREE.MeshStandardMaterial({
map:texture
})
);

scene.add(mesh);

let ring=null;

/* 🪐 SATURN RING */
if(hasRing){

let ringGeo=new THREE.RingGeometry(size+0.3,size+1.8,64);

let ringMat=new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide,
transparent:true,
opacity:0.6
});

ring=new THREE.Mesh(ringGeo,ringMat);
ring.rotation.x=Math.PI/2;
scene.add(ring);

}

planets.push({
mesh,
ring,
distance,
speed,
angle:Math.random()*10,
name,
info,
size
});

}

/* 🎥 CAMERA CINEMATIC */
function cameraMove(){

if(!selected){

camera.position.x+= (Math.cos(t*0.01)*200 - camera.position.x)*0.02;
camera.position.z+= (Math.sin(t*0.01)*200 - camera.position.z)*0.02;
camera.position.y=60;

camera.lookAt(0,0,0);

}else{

camera.position.x+= (selected.mesh.position.x+10 - camera.position.x)*0.06;
camera.position.y+= (selected.mesh.position.y+6 - camera.position.y)*0.06;
camera.position.z+= (selected.mesh.position.z+15 - camera.position.z)*0.06;

camera.lookAt(selected.mesh.position);

}

}

/* 🖱 CLICK SELECT */
function onClick(e){

mouse.x=(e.clientX/window.innerWidth)*2-1;
mouse.y=-(e.clientY/window.innerHeight)*2+1;

raycaster.setFromCamera(mouse,camera);

let hits=raycaster.intersectObjects(planets.map(p=>p.mesh));

if(hits.length>0){

selected=planets.find(p=>p.mesh===hits[0].object);

/* 📜 HUD */
let hud=document.getElementById("planetHUD");

if(hud){
hud.style.display="block";
hud.innerHTML=`
🌌 <b>${selected.name}</b><br><br>
📜 ${selected.info}<br>
📏 Size: ${selected.size}<br>
⚡ Speed: ${selected.speed}
`;
}

}

}

/* 🔁 LOOP */
function animate(){

requestAnimationFrame(animate);

t+=0.01;

/* 🪐 ORBIT + ROTATION */
planets.forEach(p=>{
p.angle+=p.speed;

p.mesh.position.x=Math.cos(p.angle)*p.distance;
p.mesh.position.z=Math.sin(p.angle)*p.distance;

p.mesh.rotation.y+=0.004;

/* RING FOLLOW */
if(p.ring){
p.ring.position.copy(p.mesh.position);
}

});

cameraMove();

renderer.render(scene,camera);

}

/* 🚪 START */
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
