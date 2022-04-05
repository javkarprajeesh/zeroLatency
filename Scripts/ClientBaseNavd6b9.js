$('#LanguageSelectorButton').on('click', function () {
    $('#LanguageSelector').toggleClass('show-menu');
});

$('[data-language]').on('click', function () {
    var language = $(this).data('language');
    $('#LanguageSelector').removeClass('show-menu');
    console.log('Start! ' + clientBaseNav.siteId);
    showLoader(true);
    $.ajax({
        method: 'post',
        url: '/set-language',
        data: {
            Language: language,
            //SiteId: WizardData.config.siteId
            SiteId: clientBaseNav.siteId
        }
    }).done(function (data) {
        //console.log('Done!');
        location.reload(true);
    });
});

$(document).on('click', function (e) {
    if (!$(e.target).closest('.language-selector').length) {
        $('#LanguageSelector').removeClass('show-menu');
    }
});

function showLoader(show) {
    if (show) {
        $('#FullLoader').addClass('show');
    }
    else {
        $('#FullLoader').removeClass('show');
    }
}