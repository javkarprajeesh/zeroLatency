var gamesCount = $('#GameItems > article').length;

$('#EscapeButton').on('click', function () {
    if (typeof Analytics !== "undefined") {
        Analytics.trackEvent('button', 'click', 'Enter');
    }
    window.location = 'games.html';
});

$('.game-discover-more').on('click', function () {
    $('html, body').animate({ scrollTop: $('.intro-section').height() * 2 }, 600);
});

$('#GameItems').width((100 * gamesCount) + 'vw');

var screenshotCarousels = [];

var gameCarousel = CarouselSwipe('GamesSection', {
    pagerSelector: '#GamesSection .carousel-pages',
    indexChanged: function (index) {
        $('#GameDetailsSection > [data-index]').removeClass('current');
        $('#GameDetailsSection > [data-index=' + index + ']').addClass('current');
        for (var i = 0; i < screenshotCarousels.length; i++) {
            screenshotCarousels[i].resize();
        }
    }
});

$('#GameCarouselPrevButton').on('click', gameCarousel.previous);
$('#GameCarouselNextButton').on('click', gameCarousel.next);

// Support hash url for games
var urlHash = window.location.hash;
if (urlHash && urlHash.length > 0) {
    var $displayGame = $('[data-url-hash=' + urlHash.replace('#', '') + ']');
    var $displayGameIntro = $('[data-intro-url-hash=' + urlHash.replace('#', '') + ']');
    if ($displayGame.length === 1) {
        gameCarousel.setIndex($displayGame.data('index'));
        $('html, body').scrollTop($('#GameDetailsSection').offset().top - 100);
    } else if ($displayGameIntro.length === 1) {
        gameCarousel.setIndex($displayGameIntro.data('index'));
        $('html, body').scrollTop($('#GamesSection').offset().top - 100);
    }
}

$('#BackToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
});

// fixing game carousel arrow buttons
var $navArrows = $('#GamesSection .nav-arrows');
$(window).on('scroll', function () {
    var elementTop = $('#GameItems').offset().top;
    var scrollPos = $(document).scrollTop();
    if (scrollPos > elementTop) {
        $navArrows.addClass('fixed');
    }
    else {
        $navArrows.removeClass('fixed');
    }
});
