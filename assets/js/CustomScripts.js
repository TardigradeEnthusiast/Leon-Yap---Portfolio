function BgAdd(BgType) {
    document.body.classList.add(BgType) ;
}
function BgRemove() {
    document.body.classList.remove("MonsterBg");

    var carousel = document.getElementsByClassName('carousel')[0];
    var carouselBot = document.getElementsByClassName('carouselBot')[0];

    // Add removing WHILE moved is still present (both classes active together)
    carousel.classList.add('removing');
    carouselBot.classList.add('removing');

    // Only after animation finishes, strip both
    setTimeout(function() {
        carousel.classList.remove('moved', 'removing');
        carouselBot.classList.remove('moved', 'removing');
    }, 1000);
}
function activatePosition(){

   var bobo =  document.getElementsByClassName('carousel');
   bobo.item(0).classList.add('moved');
    var gobo =  document.getElementsByClassName('carouselBot');
   gobo.item(0).classList.add('moved');

}

window.addEventListener('load', function() {
    if (window.location.hash === '#MonMash') {
        activatePosition();
    }
});