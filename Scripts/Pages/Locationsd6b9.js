$('.scroll-next').on('click', function () {
    $('html, body').animate({ scrollTop: $('.intro-section').height() }, 400);
});

var $countriesSelect = $('#Countries');
var $venueSelect = $('#Venues');

// Populate countries
$countriesSelect.html('');
//$countriesSelect.append($('<option>', { value: '', text: 'Please Select' }));
for (var i = 0; i < locationsData.length; i++) {
    $countriesSelect.append($('<option>', {
        value: locationsData[i].Country,
        text: locationsData[i].Country
    }));
}

$countriesSelect.on('change', function () {
    var country = getCountry($countriesSelect.val());
    showCountry(country);
});

$venueSelect.on('change', function () {
    showVenue(getVenue($venueSelect.val()));
});

function getCountry(country) {
    for (var i = 0; i < locationsData.length; i++) {
        if (locationsData[i].Country == country) {
            return locationsData[i];
        }
    }
}

function getVenue(siteId) {
    for (var i = 0; i < locationsData.length; i++) {
        for (var j = 0; j < locationsData[i].Venues.length; j++) {
            var venue = locationsData[i].Venues[j];
            if (venue.SiteId == siteId) {
                return venue;
            }
        }
    }
}

function showCountry(country) {
    $venueSelect.html('');
    for (var i = 0; i < country.Venues.length; i++) {
        $venueSelect.append($('<option>', {
            value: country.Venues[i].SiteId,
            text: country.Venues[i].DropdownName
        }));
    }

    $venueSelect.val(country.Venues[0].SiteId);
    showVenue(country.Venues[0]);
}

function showVenue(venue) {
    $('#VenueTitle').html(venue.Name);
    $('#VenueAddress').html(venue.Address);

    if (venue.ContactEmail) {
        $('#ContactEmail').show();
        $('#ContactEmail').html('Email: <a href="mailto:' + venue.ContactEmail + '">' + venue.ContactEmail + '</a>');
    }
    else {
        $('#ContactEmail').hide();
    }

    if (venue.Games.length) {
        $('#AvailableGames').html('');
        for (var i = 0; i < venue.Games.length; i++) {
            $('#AvailableGames').append('<li>' + venue.Games[i] + '</li>');
        }
        $('.available-games').show();
    }
    else {
        $('.available-games').hide();
    }

    $('#BookSessionButton').attr('href', venue.BookUrl);
    $('#GoogleMapLink').attr('href', venue.GoogleMapLink);
    $('#GoogleMap').attr('src', venue.GoogleMap);

    if (venue.WebsiteUrl) {
        $('#LocationWebUrl').attr('href', venue.WebsiteUrl);
        $('#LocationWebUrl').text(venue.WebsiteUrl);
        $('#LocationWebUrl').show();
    }
    else {
        $('#LocationWebUrl').hide();
    }
}

showCountry(locationsData[0]);