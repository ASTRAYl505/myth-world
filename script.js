/* 🌍 DATABASE */
const DATA = {
ancient: [
{
title:"Egypt Civilization",
type:"Civilization",
desc:"One of the oldest civilizations in human history."
},
{
title:"Mesopotamia",
type:"Civilization",
desc:"The cradle of writing and early cities."
}
],

myth: [
{
title:"Phoenix",
type:"Creature",
desc:"A bird reborn from ashes with fire power."
},
{
title:"Zeus",
type:"God",
desc:"King of Greek gods, ruler of thunder."
}
],

prophetic: [
{
title:"Historical Events",
type:"Event",
desc:"Key religious and historical events timeline."
}
]
};

/* 📚 LOAD ERA */
function loadEra(name){

let content=document.getElementById("content");
content.innerHTML="";

DATA[name].forEach(item=>{

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<b>${item.title}</b><br>
<small>${item.type}</small>
`;

div.onclick=()=>showDetails(item);

content.appendChild(div);

});

}

/* 📖 DETAILS */
function showDetails(item){

document.getElementById("details").innerHTML=`
<h3>${item.title}</h3>
<p><b>Type:</b> ${item.type}</p>
<p>${item.desc}</p>
`;

}
