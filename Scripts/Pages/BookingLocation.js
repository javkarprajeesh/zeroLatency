var wipeExisting = function(callback) {
    $('.gift-voucher-link').fadeTo(50, 0.0, function() {
        $(this).slideUp(50, function () {
            var currentLocations = $('#Locations > li');
            if (currentLocations.length > 0) {
                $('#Locations > li').fadeTo(50, 0.01, function() {
                    $(this).slideUp(50, function() {
                        $('#Locations > li').remove();
                        callback();
                    });
                });
            } else {
                callback();
            }
        });
    });
}

$('#CountrySelect').on('change', function() {
    LocationServices.changeCountry($('#CountrySelect').val());
});

$.each(locationsData, function(index, item) {
    $('#CountrySelect').append('<option>' + item.Country + '</option>');
});

var renderSites = function(currentCountry, siteData) {
    $('#CountrySelect').val(currentCountry);

    var showVouchers = siteData.some(function(i) {
        return i.GiftVouchers;
    });

    var locationContainer = $('#Locations');

    wipeExisting(function() {
        $.each(siteData, function(index, item) {
            var locationCard = $('<li><a href="' + item.BookUrl + '" data-location="' + item.Name + '"><strong>' + item.DropdownName + '</strong><span class="address">' + item.Address + '</span></a></li>');

            locationCard.hide().appendTo(locationContainer).fadeTo(50,1.00,function() {
                $(this).slideDown(50);
            });
        });

        if (showVouchers) {
            $('#Locations > li').filter(':animated').promise().done(function() {
                $('.gift-voucher-link').fadeTo(50, 1.0, function() {
                    $(this).slideDown(50);
                });
            });
        }
    });
};

LocationServices.setSiteLocationData(locationsData);
LocationServices.getDisplaySites(ipAddress, renderSites);
