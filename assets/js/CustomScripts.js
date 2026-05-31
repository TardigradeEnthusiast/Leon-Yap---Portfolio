function BgAdd(BgType) {
    document.body.classList.add(BgType) ;
}
function BgRemove() {
    document.body.classList.remove("MonsterBg") ;
}
function activatePosition(){

   var bobo =  document.getElementsByClassName('carousel');
   bobo.item(0).classList.add('moved');
    var gobo =  document.getElementsByClassName('carouselBot');
   gobo.item(0).classList.add('moved');

}