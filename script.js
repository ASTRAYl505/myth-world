/* 🚀 START SYSTEM */
window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("launch").style.display="none";
},1800);

/* 🪐 cards animation */
document.querySelectorAll(".nasa-card").forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
},i*180);
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
