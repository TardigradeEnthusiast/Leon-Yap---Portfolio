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
});