function start(){
document.querySelector(".intro").style.display="none";
}

/* ✨ show cards one by one */
window.addEventListener("load",()=>{

let cards=document.querySelectorAll(".card");

cards.forEach((c,i)=>{
setTimeout(()=>{
c.classList.add("show");
},i*200);
});

});
