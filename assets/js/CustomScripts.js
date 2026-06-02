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
var topCards = [
    "images/Rounded corner images/Tops/Card_Rounded_0003_templatev5pleasefuckingwork_Bear.png",
    "images/Rounded corner images/Tops/Card_Rounded_0006_templatev5pleasefuckingwork_Cyclops.png",
    "images/Rounded corner images/Tops/Card_Rounded_0007_templatev5pleasefuckingwork_Demon.png",
    "images/Rounded corner images/Tops/Card_Rounded_0010_templatev5pleasefuckingwork_Dragon.png",
    "images/Rounded corner images/Tops/Card_Rounded_0011_templatev5pleasefuckingwork_Elf.png",
    "images/Rounded corner images/Tops/Card_Rounded_0014_templatev5pleasefuckingwork_Fish.png",
    "images/Rounded corner images/Tops/Card_Rounded_0022_templatev5pleasefuckingwork_Guy.png",
    "images/Rounded corner images/Tops/Card_Rounded_0033_templatev5pleasefuckingwork_Mushroom.png",
    "images/Rounded corner images/Tops/Card_Rounded_0035_templatev5pleasefuckingwork_Nuclear-Warhead.png",
    "images/Rounded corner images/Tops/Card_Rounded_0036_templatev5pleasefuckingwork_Pig.png",
    "images/Rounded corner images/Tops/Card_Rounded_0037_templatev5pleasefuckingwork_Puppet.png",
    "images/Rounded corner images/Tops/Card_Rounded_0042_templatev5pleasefuckingwork_Skeleton.png",
    "images/Rounded corner images/Tops/Card_Rounded_0043_templatev5pleasefuckingwork_Slime.png",
    "images/Rounded corner images/Tops/Card_Rounded_0045_templatev5pleasefuckingwork_Steampunk.png",
    "images/Rounded corner images/Tops/Card_Rounded_0049_templatev5pleasefuckingwork_Toy-Robot.png",
    "images/Rounded corner images/Tops/Card_Rounded_0050_templatev5pleasefuckingwork_Tree.png",
    "images/Rounded corner images/Tops/Card_Rounded_0051_templatev5pleasefuckingwork_Tv-Head.png",
    "images/Rounded corner images/Tops/Card_Rounded_0054_templatev5pleasefuckingwork_Vampire.png",
    "images/Rounded corner images/Tops/Card_Rounded_0055_templatev5pleasefuckingwork_Virtual-Idol.png",
    "images/Rounded corner images/Tops/Card_Rounded_0056_templatev5pleasefuckingwork_Werewolf.png"
    // add more top cards here...
];

var botCards = [
   
    "images/Rounded corner images/Bottoms/Card_Rounded_0002_templatev5pleasefuckingwork_Animatronic-Legs.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0008_templatev5pleasefuckingwork_Djinn.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0012_templatev5pleasefuckingwork_Ent.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0015_templatev5pleasefuckingwork_Future.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0016_templatev5pleasefuckingwork_Gargoyle.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0017_templatev5pleasefuckingwork_Ghost.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0021_templatev5pleasefuckingwork_Guy-Legs.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0024_templatev5pleasefuckingwork_Horse.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0025_templatev5pleasefuckingwork_Hydra.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0026_templatev5pleasefuckingwork_In-the-Box.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0031_templatev5pleasefuckingwork_Mermaid.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0032_templatev5pleasefuckingwork_Mummy.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0038_templatev5pleasefuckingwork_Raven.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0039_templatev5pleasefuckingwork_Rocket.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0040_templatev5pleasefuckingwork_Satyr.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0044_templatev5pleasefuckingwork_Spider-Legs.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0046_templatev5pleasefuckingwork_Tank-Treads.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0053_templatev5pleasefuckingwork_Unicycle.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0057_templatev5pleasefuckingwork_Wolf.png",
    "images/Rounded corner images/Bottoms/Card_Rounded_0058_templatev5pleasefuckingwork_Zombie.png",
    // add more bottom cards here...
];

var cardBack = "images/card back.png";

// Shuffle a copy of an array (Fisher-Yates)
function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

// Build alternating back/card HTML for one group
// pool      — array of card image paths
// cardCount — how many card-face slots to fill (backs fill the gaps)
function buildGroupHTML(pool, cardCount) {
    var picked = shuffled(pool);  // random order, no repeats until pool exhausted
    var html = "";
    var poolIdx = 0;

    for (var i = 0; i < cardCount * 2; i++) {
        if (i % 2 === 0) {
            // Even slots → card back
            html += '<div class="card"><img src="' + cardBack + '" alt="card back" /></div>';
        } else {
            // Odd slots → random card from pool (cycles if cardCount > pool length)
            var src = picked[poolIdx % picked.length];
            poolIdx++;
            html += '<div class="card"><img src="' + src + '" alt="card" /></div>';
        }
    }
    return html;
}

function buildCarousels() {
    var cardCount = 6; // number of face cards per group — adjust freely

    var topHTML = buildGroupHTML(topCards, cardCount);
    var botHTML = buildGroupHTML(botCards, cardCount);

    document.getElementById('topGroup').innerHTML    = topHTML;
    document.getElementById('topGroupDupe').innerHTML = topHTML; // same order for seamless loop
    document.getElementById('botGroup').innerHTML    = botHTML;
    document.getElementById('botGroupDupe').innerHTML = botHTML;
}

window.addEventListener('load', function() {
     buildCarousels();
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