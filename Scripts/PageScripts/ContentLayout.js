var pendingBookingTimeoutId = null;

$('#MenuToggle').on('click', function () {
    var $body = $('body');
    if ($body.hasClass('show-menu')) {
        $('body').removeClass('show-menu');
    }
    else {
        $('body').addClass('show-menu');
    }
});

$(document).on('click', function (e) {
    if (!$(e.target).is('#MenuToggle') && !$(e.target).is('.menu-toggle')) {
        $('body').removeClass('show-menu');
    }
});

if ($('#BookingCart').length === 1) {
    updatePendingBookingTimer();
}

$('#CancelPendingBooking').on('click', function () {

    $('#BookingCart').addClass('hide');
    $.ajax({
        method: 'post',
        url: '/cancel-pending-booking',
        data: {}
    }).done(function (data) {
        window.location = window.location.href;
    });
});

function updatePendingBookingTimer() {
    var pendingBookingTimeoutSeconds = (pendingBookingExpiration - new Date()) / 1000;

    if (pendingBookingTimeoutSeconds < (5 * 60)) {
        $('#BookingCart').addClass('warn');
    }

    if (pendingBookingTimeoutSeconds < 0) {
        $('#BookingCart').addClass('hide');
        setTimeout(function () { window.location = window.location.href }, 1200);
    }
    else {
        var mins = Math.floor(pendingBookingTimeoutSeconds / 60);
        var secs = Math.floor(pendingBookingTimeoutSeconds - mins * 60);

        $('#PendingBookingTimeout').text(mins + ':' + ZLCommon.PadZeros(secs, 2));

        clearTimeout(pendingBookingTimeoutId);
        pendingBookingTimeoutId = setTimeout(function () {
            updatePendingBookingTimer();
        }, 500);
    }
}