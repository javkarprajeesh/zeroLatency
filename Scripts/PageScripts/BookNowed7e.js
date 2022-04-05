$('#EmailAddress,#PromotionCode').on('change', updateCostSummary);

var firstCalendarDate = null;
if ($('#CalendarStart').length > 0) {
    var str = $('#CalendarStart').val();
    firstCalendarDate = new Date(parseInt(str.substr(0, 4)), str.substr(4, 2) - 1, 1);

    var currentMonth = new Date();
    currentMonth.setDate(1);

    if (firstCalendarDate.getTime() < currentMonth.getTime()) {
        firstCalendarDate = new Date();
    }
}

if ($('#BookForm').length === 1) {

    // If the user clicks back from a payment then there will be a pending booking, and we need 
    // to force this page to refresh to ensure the awaiting payment form is showing
    $.ajax({
        method: 'post',
        url: '/booking/has-pending-booking',
        data: {}
    }).done(function (data) {
        if (data.HasPendingBooking) {
            $('body').html('');
            window.location = window.location.href;
        }
    });

    var calendar = new SessionCalendar('SessionCalendar', {
        apiKey: apiKey,
        baseUrl: portalUrl,
        siteId: siteId,
        playerCount: $('#Players').val(),
        packageId: parseInt($('#PackageId').val()),
        onSelectSession: function (e) {
            validation.validateElement($('#SessionCalendar'));
            updateCostSummary();
        },
        noSessionsMessage: noSessionsAvailableMsg,
        bookedOutMessage: bookedOutMsg,
        insufficientSlotsMessage: insufficientMsg,
        playerAvailableLabel: playerAvailableLabel,
        playersAvailableLabel: playersAvailableLabel,
        formatPrice: function (price) { return ZLCommon.GetCurrencyFormat(price, localisation.currencyType); },
        nextMonthLabel: nextMonth,
        prevMonthLabel: prevMonth,
        sessionTimeFormat: localisation.sessionFormat,
        monthYearFormat: localisation.sessionMonthFormat,
        firstDayOfWeek: localisation.firstDayOfWeek,
        accessCode: accessCode,
        showGameSpace: showGameSpace,
        firstCalendarDate: firstCalendarDate,
        localUtcOffsetHours: siteUtcOffsetHours
    });

    $('[data-packageid="' + $('#PackageId').val() + '"]').addClass('selected');
    $('[data-packageid]').on('click', function () {
        var $package = $(this);
        $('#PackageSelection .package').removeClass('selected');
        $package.addClass('selected');

        var packageId = $package.attr('data-packageId');
        $('#PackageId').val(packageId);
        $('#GameName').text($package.attr('data-package-name'));

        calendar.options.packageId = packageId;
        calendar.refresh();
        updateCostSummary();

        if ($('#MenuToggle').is(':visible') || $('#MobileMenuButton').is(':visible')) {
            $('html,body').animate({
                scrollTop: $('#MakeBookingHeader').offset().top - 20
            }, 400);
        }
    });

    // Terms
    $('#AgreeToTerms').on('click', function () {
        var $checkbox = $(this).find('.checkbox');
        if ($checkbox.hasClass('on')) {
            $checkbox.removeClass('on');
        }
        else {
            $('#AgreeToTermsPopup').show();
            $('body').addClass('show-popup');
            window.scrollTo(0, 0);
        }
    });

    $('#CancelAgree').on('click', function () {
        $('#AgreeToTermsPopup').hide();
        $('body').removeClass('show-popup');
    });

    $('#Agree').on('click', function () {
        $('#AgreeToTerms .checkbox').addClass('on');
        $('#AgreeToTermsPopup').hide();
        $('body').removeClass('show-popup');
        validation.validateForm('#BookForm');
    });

    validation.addValidator('accept-terms', function (element) {
        var $terms = $('#AgreeToTerms');
        if ($terms.length > 0) {
            return $('#AgreeToTerms .checkbox').hasClass('on');
        }
        return true;
    });

    // Submit
    $('#BookButton').on('click', function () {
        if (validation.validateForm('#BookForm')) {
            $('#BookForm').submit();
        }
    });
}
else {
    $('#BookNowCancelPendingBooking').on('click', function () {
        $('#BookingCart').addClass('hide');
        $.ajax({
            method: 'post',
            url: '/cancel-pending-booking',
            data: {}
        }).done(function (data) {
            window.location = window.location.href;
        });
    });
}

$('.quantity').on('change', function () {
    var quanity = 0;
    $('.quantity').each(function () {
        quanity += parseInt($(this).val());
    });

    calendar.options.playerCount = quanity;
    calendar.refresh();
    updateCostSummary();
    validation.validateElement($('#SessionCalendar'));
});

function updateCostSummary() {
    var session = calendar.getSelectedValue();

    var concessionQuantities = [];

    $('.quantity').each(function () {
        var $this = $(this);
        concessionQuantities.push({
            ConcessionTypeId: $this.attr('id').split('_')[1],
            Quantity: $this.val()
        });
    });

    $('#Prices').addClass('loading');
    if (session !== null) {
        $.ajax({
            method: 'post',
            url: '/booking/cost-summary',
            data: {
                SiteId: siteId,
                Language: $('#Language').val(),
                Email: $('#EmailAddress').val(),
                PackageId: $('#PackageId').val(),
                DiscountCode: $('#PromotionCode').val(),
                StartTime: session.sessionTimestr,
                GameSpace: session.gameSpace,
                Quantities: concessionQuantities
            }
        }).done(function (data) {

            var html = '';
            for (var i = 0; i < data.LineItems.length; i++) {
                var item = data.LineItems[i];
                html += '<tr><td>' + item.Title + '</td><td class="price">' + item.Price + '</td></tr>';
            }

            $('#PriceBreakdownTBody').html(html);
            $('#TotalCost').text(data.Total);
            $('#Prices').show();

            $('#DiscountInvalid').hide();
            $('.error-message.discount-error').hide();
            $('[data-disacount-err="' + data.DiscountResponse + '"]').show();
        }).fail(function () {
        }).always(function () {
            $('#Prices').removeClass('loading');
        });
    }
}