function toggleMenu(){
document.getElementById("navLinks").classList.toggle("show");
}

let currentIndex=0;
const slides=document.getElementById("slides");
const totalSlides=document.querySelectorAll(".slides img").length;

function updateSlider(){
slides.style.transform=`translateX(-${currentIndex*100}%)`;
}

function nextSlide(){
currentIndex=(currentIndex+1)%totalSlides;
updateSlider();
}

function prevSlide(){
currentIndex=(currentIndex-1+totalSlides)%totalSlides;
updateSlider();
}

setInterval(nextSlide,3500);
