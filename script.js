let scene,camera,renderer;
let planets=[];
let raycaster=new THREE.Raycaster();
let mouse=new THREE.Vector2();
let selected=null;
let targetPos=null;

init();

function init(){

scene=new THREE.Scene();

/* 🌌 BACKGROUND */
scene.background = new THREE.TextureLoader().load(
"https://threejs.org/examples/textures/planets/starfield.jpg"
);

/* 🎥 CAMERA */
camera=new THREE.PerspectiveCamera(
70,window.innerWidth/window.innerHeight,0.1,10000
);

/* 🖥️ RENDER */
renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

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
let light=new THREE.PointLight(0xffffff,6,15000);
scene.add(light);

/* 🪐 PLANETS */
addPlanet(-120,3,"https://threejs.org/examples/textures/planets/mercury.jpg","Mercury","Hot rocky planet");
addPlanet(-80,4,"https://threejs.org/examples/textures/planets/venus.jpg","Venus","Toxic atmosphere");
addPlanet(-30,5,"https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg","Earth","Life planet 🌍");
addPlanet(30,4,"https://threejs.org/examples/textures/planets/mars.jpg","Mars","Red planet");
addPlanet(120,12,"https://threejs.org/examples/textures/planets/jupiter.jpg","Jupiter","Gas giant");
addPlanet(220,10,"https://threejs.org/examples/textures/planets/saturn.jpg","Saturn","Ring planet");

camera.position.z=300;

window.addEventListener("click",onClick);
window.addEventListener("resize",onResize);

animate();

}

/* 🪐 ADD PLANET */
function addPlanet(x,size,tex,name,info){

let texture=new THREE.TextureLoader().load(tex);

let mesh=new THREE.Mesh(
new THREE.SphereGeometry(size,64,64),
new THREE.MeshStandardMaterial({map:texture})
);

mesh.position.x=x;

scene.add(mesh);

planets.push({mesh,name,info,size});

}

/* 🎥 LOOP */
function animate(){

requestAnimationFrame(animate);

if(targetPos){
camera.position.lerp(targetPos,0.05);
}

renderer.render(scene,camera);

}

/* 🖱 CLICK */
function onClick(e){

mouse.x=(e.clientX/window.innerWidth)*2-1;
mouse.y=-(e.clientY/window.innerHeight)*2+1;

raycaster.setFromCamera(mouse,camera);

let hits=raycaster.intersectObjects(planets.map(p=>p.mesh));

if(hits.length>0){

selected=planets.find(p=>p.mesh===hits[0].object);

document.getElementById("planetHUD").style.display="block";

document.getElementById("planetHUD").innerHTML=`
<h2>${selected.name}</h2>
<p>${selected.info}</p>
<hr>
Size: ${selected.size}
`;

/* 🎥 ZOOM */
targetPos = new THREE.Vector3(
selected.mesh.position.x + 50,
selected.mesh.position.y + 20,
selected.mesh.position.z + 80
);

camera.lookAt(selected.mesh.position);

}

}

/* 🚪 START */
function start(){

document.getElementById("intro").style.display="none";

let audio=document.getElementById("audio");
audio.volume=0.3;
audio.play();

}

/* 📏 RESIZE */
function onResize(){

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);

}
