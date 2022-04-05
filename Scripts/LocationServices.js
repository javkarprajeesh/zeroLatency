LocationServices = (function () {
    const self = {};

    var location = {
        Longitude: 0,
        Latitude: 0,
        Country: 'Australia',
        CountryCode: 'AU'
    };

    var lastSetCountry = '';

    var siteLocationData = {};

    var callbackOnCompletion = function () {};

    var displaySiteData = {};


    var storageSupported = typeof (Storage) !== 'undefined';

    var saveLocation = function() {
        if (storageSupported) {
            localStorage.setItem('lastKnownLocation', JSON.stringify(location));
        }
    }

    var getSavedLocation = function() {
        if (storageSupported) {
            var storedLocation = localStorage.getItem('lastKnownLocation');
            if (storedLocation !== null) {
                location = JSON.parse(storedLocation);
            }
        }
    }

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    };

    function haversine(v1, v2) {
        const r = 6371e3; //Earths average radius in meters.

        var dLat = toRadians(v2.Latitude - v1.Latitude);
        var dLon = toRadians(v2.Longitude - v1.Longitude);
        var lat1 = toRadians(v1.Latitude);
        var lat2 = toRadians(v2.Latitude);

        var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.asin(Math.sqrt(a));

        return r * c;
    };

    function distanceToSite(site) {
        return haversine(location, site);
    }

    var getSitesToDisplay = function () {
        //If no sites are in the users geo located country, return Australia
        if (!siteLocationData.some(function(i) {return i.Country === location.Country;})) {
            location.Country = 'Australia';
        };

        //Filter locations by found country
        var countrySites = siteLocationData.filter(function (l) {
            return l.Country === location.Country;
        });

        //Sort by distance (lowest distance to top, furthest to back)
        displaySiteData = countrySites[0].Venues.sort(function (a, b) {
            return distanceToSite(a) < distanceToSite(b) ? -1 : 1;
        });

        if (lastSetCountry !== location.Country) {
            lastSetCountry = location.Country;
            callbackOnCompletion(location.Country, displaySiteData);
        }
    }

    var setLocation = function (position) {
        location = {
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude
        };

        $.ajax({
            url: 'booking-location/get-location',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(location),
            success: function(data) {
                location.Country = data.Country;
                location.CountryCode = data.CountryCode;

                saveLocation();

                getSitesToDisplay();
            },
            error: function() {
                getSitesToDisplay();
            }
        });
    };

    var returnLocation = function(position){
        location = {
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude
        };

        $.ajax({
            url: '/booking-location/get-location',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(location),
            success: function(data){
                location.Country = data.Country;
                location.CountryCode = data.CountryCode;

                saveLocation();

                callbackOnCompletion(location);
            },
            error: function () {
                callbackOnCompletion(location); }
        });
    }

    var setLocationViaIpAddress = function () {

    };

    self.getCurrentCountry = function (callback){
        callbackOnCompletion = callback;

        getSavedLocation();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(returnLocation, setLocationViaIpAddress);
        }
    }

    self.getDisplaySites = function (ip, callback) {
        callbackOnCompletion = callback;

        getSavedLocation();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setLocation, setLocationViaIpAddress);
        }

        getSitesToDisplay();
    };

    self.changeCountry = function (country) {
        location.Country = country;

        getSitesToDisplay();
    }

    self.setSiteLocationData = function (data) {
        siteLocationData = data;
    }

    return self;
})();