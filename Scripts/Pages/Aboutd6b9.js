$('.scroll-next').on('click', function () {
    $('html, body').animate({ scrollTop: $('.intro-section').height() }, 400);
});