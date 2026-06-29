let hoverSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8f1a8f5.mp3");

/* ✨ دخول تدريجي واحد واحد */
window.addEventListener("load",()=>{

let cards = document.querySelectorAll(".planet-card");

cards.forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
}, i * 200); // واحد واحد
});

});

/* 🔊 صوت hover */
document.querySelectorAll(".planet-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

hoverSound.currentTime = 0;
hoverSound.volume = 0.2;
hoverSound.play();

});

});
