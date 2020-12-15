document.addEventListener('DOMContentLoaded', function(){
  showSlides(slideIndex);
  document.onkeydown = function(e) {
    e = e || window.event;
    if (e.key == 'ArrowLeft') {
      plusSlides(-1); //left <- show Prev image
    } else if (e.key == 'ArrowRight') {
      // right -> show next image
      plusSlides(1);
    }
  }
});

var slideIndex = 1;

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  // Cancel execution if the condition is met
  if (n > slides.length || n < 1) return;

  // Otherwise set slideIndex to the value passed to showSlides (slideIndex + n)
  slideIndex = n;

  // There's always as many dots as there is slides -- no need to loop twice,
  // and you can assign the variable inside of the for loop.
  // I'd recommend looking into let & const over var as well:
  // https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function plusSlides(n) {
  // Add n to slideIndex but don't increment the variable
  showSlides(slideIndex + n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Close control
function visitPage(){
  window.location='https://iseesam.github.io/readers/index.html';
}
