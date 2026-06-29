function start(){
document.querySelector(".intro").style.display="none";
document.getElementById("spaceSound").play();
}

/* 🪐 SHOW CARDS */
window.addEventListener("load",()=>{

let cards=document.querySelectorAll(".nasa-card");

cards.forEach((c,i)=>{
setTimeout(()=>{
c.classList.add("show");
}, i*180);
});

});

/* 🪐 OPEN PLANET */
function openPlanet(name,info){

document.getElementById("popup").classList.remove("hidden");
document.getElementById("pname").innerText=name;
document.getElementById("pinfo").innerText=info;

}

/* ❌ CLOSE */
function closePopup(){
document.getElementById("popup").classList.add("hidden");
}
