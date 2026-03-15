// SHOP STATUS + COUNTDOWN

let now = new Date();
let hour = now.getHours();

let openHour = 16;
let closeHour = 23;

let statusBox = document.getElementById("shop-status");
let statusText = document.getElementById("status-text");
let countdown = document.getElementById("countdown");

if(statusBox){

if(hour >= openHour && hour < closeHour){

statusBox.classList.add("open");
statusText.innerHTML = "SHOP OPEN NOW";

if(countdown){
countdown.innerHTML = "Come visit us! Fresh snacks available.";
}

}else{

statusBox.classList.add("closed");
statusText.innerHTML = "SHOP CLOSED";

let openTime = new Date();
openTime.setHours(openHour,0,0,0);

if(hour >= closeHour){
openTime.setDate(openTime.getDate()+1);
}

let diff = openTime - now;

let hoursLeft = Math.floor(diff/(1000*60*60));
let minutesLeft = Math.floor((diff%(1000*60*60))/(1000*60));

if(countdown){
countdown.innerHTML =
"Shop opens in: "+hoursLeft+" hours "+minutesLeft+" minutes";
}

}

}


// IMAGE SLIDER

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i){

slides.forEach(s=>s.classList.remove("active"));
slides[i].classList.add("active");

}

function nextSlide(){

index++;

if(index>=slides.length) index=0;

showSlide(index);

}

function prevSlide(){

index--;

if(index<0) index=slides.length-1;

showSlide(index);

}

setInterval(nextSlide,3000);


// WHATSAPP ORDER

function orderItem(item){

let message =
"Hello, I want to order "+item+
"\n\nనాకు ఇది ఆర్డర్ చేయాలి: "+item;

window.open(
"https://wa.me/919391673220?text="+encodeURIComponent(message)
);

}


// VIEW IMAGE

function viewImage(src){

let w = window.open("");
w.document.write("<img src='"+src+"' style='width:100%'>");

}


// BACK TO TOP

let mybutton = document.getElementById("topBtn");

window.onscroll=function(){

if(document.body.scrollTop>200 ||
document.documentElement.scrollTop>200){

if(mybutton) mybutton.style.display="block";

}else{

if(mybutton) mybutton.style.display="none";

}

}

function topFunction(){

document.body.scrollTop=0;
document.documentElement.scrollTop=0;

}


// CART FUNCTIONS

function addToCart(name,price,qtyText=""){

price = parseInt(price);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let item = cart.find(
i => i.name===name && i.qtyText===qtyText
);

if(item){

item.count += 1;

}else{

cart.push({
name:name,
price:price,
qtyText:qtyText,
count:1
});

}

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

}
function flyToCart(imgElement){

let cart = document.querySelector(".cart-icon");

let img = imgElement.cloneNode(true);

img.classList.add("fly-img");

document.body.appendChild(img);

let rect = imgElement.getBoundingClientRect();
let cartRect = cart.getBoundingClientRect();

img.style.left = rect.left + "px";
img.style.top = rect.top + "px";

setTimeout(()=>{

img.style.left = cartRect.left + "px";
img.style.top = cartRect.top + "px";
img.style.width = "20px";
img.style.height = "20px";
img.style.opacity = "0.5";

},10);

setTimeout(()=>{
img.remove();
},800);

}

// CART BADGE

function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item=>{
total += item.count;
});

let badge = document.getElementById("cart-count");

if(badge){
badge.innerText = total;
}

/* CART ICON ANIMATION */

let cartIcon = document.querySelector(".cart-icon");

if(cartIcon){

cartIcon.classList.add("cart-animate");

setTimeout(()=>{
cartIcon.classList.remove("cart-animate");
},500);

}

}


// LOAD CART COUNT

updateCartCount();