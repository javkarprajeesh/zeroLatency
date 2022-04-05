Analytics = (function () {
    var self = {};

    var Queue = [];

    self.setSPAPageRel = function (page) {
        if (!page) {
            return;
        }

        var path = getCurrentRelativePath();

        self.setSPAPageAbs(path + page);
    };

    var getCurrentRelativePath = function () {
        var a = document.createElement('a');
        a.href = window.location;

        return a.pathname;
    };

    self.setSPAPageAbs = function (page) {
        if (!page) {
            return;
        }

        setAndSendPage(page);
    };

    var setAndSendPage = function (page) {
        setGAPage(page);
        sendGAPageView();
    };

    var setGAPage = function (item) {
        if (!item.page) {
            item = {
                type: 'SetPage',
                page: item
            };
        }

        if (window.ga) {
            ga('gtm1.html', 'page', item.page);
        } else {
            enqueueAndRetry(item);
        }
    };

    var sendGAPageView = function (item) {
        if (window.ga) {
            ga('gtm1.send', 'pageview');
        } else {
            if (!item) {
                item = {
                    type: 'SendPage'
                };
            }
            enqueueAndRetry(item);
        }
    };

    var enqueueAndRetry = function (event) {
        Queue.push(event);

        setTimeout(retryGAOperation, 500);
    };

    var retryGAOperation = function () {
        while (Queue.length > 0) {
            var event = Queue.shift();

            if (isNaN(event.retryCount)) {
                event.retryCount = 1;
            } else {
                event.retryCount++;
            }

            if (event.retryCount < 3) {
                processQueuedItem(event);
            }
        }
    };

    var processQueuedItem = function (item) {
        if (item.type === 'Event') {
            sendGAEvent(item);
        } else if (item.type === 'SetPage') {
            setGAPage(item);
        } else if (item.type === 'SendPage') {
            sendGAPageView(item);
        }
    };

    var sendGAEvent = function (eventData) {
        if (window.ga) {
            ga('gtm1.send', 'event', eventData);
        } else {
            eventData.type = 'Event';
            enqueueAndRetry(event);
        }
    };

    self.trackEvent = function (category, action, label, value) {
        if (!category || !action || !label) {
            return;
        }

        event = {
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value
        };

        sendGAEvent(event);
    };

    self.saveSessionData = function (key, data) {
        if (window.sessionStorage) {
            sessionStorage.setItem(key, JSON.stringify(data));
        } else {
            $.cookie(key, JSON.stringify(data));
        }
    };

    self.readSessionData = function (key) {
        if (window.sessionStorage) {
            return JSON.parse(sessionStorage.getItem(key));
        } else {
            return JSON.parse($.cookie(key));
        }
    };

    self.clearSessionData = function (key) {
        if (window.sessionStorage) {
            sessionStorage.removeItem(key);
        } else {
            $.removeCookie(key, { path: '/' });
        }
    };

    return self;
})();