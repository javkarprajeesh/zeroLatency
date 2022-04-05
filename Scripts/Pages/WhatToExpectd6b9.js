$('.scroll-next').on('click', function () {
    $('html, body').animate({ scrollTop: $('.intro-section').height() }, 400);
});

var equipmentCarousel = CarouselSwipe('Equipment', {
    pagerSelector: '#Equipment .carousel-pages',
});

var gameCarousel = CarouselSwipe('GamesSection', {
    pagerSelector: '#GamesSection .carousel-pages',
});

$('#GameCarouselPrevButton').on('click', gameCarousel.previous);
$('#GameCarouselNextButton').on('click', gameCarousel.next);

$('#EquipmentPrevButton').on('click', equipmentCarousel.previous);
$('#EquipmentNextButton').on('click', equipmentCarousel.next);