// Track the pending cleanup so we can cancel it if needed
var bgRemoveTimer = null;

function BgAdd(BgType) {
    document.body.classList.add(BgType);
}

function BgRemove() {
    document.body.classList.remove("MonsterBg");

    var carousel = document.getElementsByClassName('carousel')[0];
    var carouselBot = document.getElementsByClassName('carouselBot')[0];

    carousel.classList.add('removing');
    carouselBot.classList.add('removing');

    bgRemoveTimer = setTimeout(function() {
        bgRemoveTimer = null;
        carousel.classList.remove('moved', 'removing');
        carouselBot.classList.remove('moved', 'removing');
    }, 1000);
}

function activatePosition() {
    // Cancel any in-flight exit animation/cleanup before re-entering
    if (bgRemoveTimer !== null) {
        clearTimeout(bgRemoveTimer);
        bgRemoveTimer = null;
    }

    var carousel = document.getElementsByClassName('carousel')[0];
    var carouselBot = document.getElementsByClassName('carouselBot')[0];

    // Strip leftover exit-state classes before re-triggering entry
    carousel.classList.remove('removing');
    carouselBot.classList.remove('removing');

    carousel.classList.add('moved');
    carouselBot.classList.add('moved');
}

window.addEventListener('load', function() {
    if (window.location.hash === '#MonMash') {
        activatePosition();
    }

    // Initialise all slideshows
    showSlide(1, 1);
    showSlide(1, 2);
});

// Separate slide index for each slideshow
// Index 0 is unused; [1] = slideshow 1, [2] = slideshow 2
var slideIndexes = [1, 1, 1];

// Called by prev/next buttons: n = +1 or -1, slideshowNum = 1 or 2
function plusSlides(n, slideshowNum) {
    showSlide(slideIndexes[slideshowNum] += n, slideshowNum);
}

// Jump directly to a slide (used by dot indicators if present)
function currentSlide(n, slideshowNum) {
    showSlide(slideIndexes[slideshowNum] = n, slideshowNum);
}

function showSlide(n, slideshowNum) {
    var slides = document.getElementsByClassName("mySlides" + slideshowNum);
    var dots   = document.getElementsByClassName("dot" + slideshowNum);

    if (slides.length === 0) return;

    // Wrap around
    if (n > slides.length) { slideIndexes[slideshowNum] = 1; }
    if (n < 1)             { slideIndexes[slideshowNum] = slides.length; }

    // Hide all slides in this slideshow
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Deactivate all dots for this slideshow (if any)
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and activate its dot
    slides[slideIndexes[slideshowNum] - 1].style.display = "block";
    if (dots.length > 0) {
        dots[slideIndexes[slideshowNum] - 1].className += " active";
    }
}