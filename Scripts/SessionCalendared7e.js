function SessionCalendar(id, options) {
    var self = {};

    // Options
    self.options = {
        baseUrl: '',
        apiKey: '',
        siteId: -1,
        packageId: -1,
        playerCount: 1,
        upcomingOnly: true,
        allowCurrentSession: false,

        sessionContainerId: null,

        filterAccessCode: true, // if false all session will come through
        accessCode: null,
        showGameSpace: false,
        numberCalendarMonths: 1,
        firstDayOfWeek: 0, // Weekday index, 0 is Sunday, 1 is Monday
        localUtcOffsetHours: 0, // local time offset relative to UTC (hours)

        // Localisation stuff
        noSessionsMessage: 'No sessions available on this date',
        bookedOutMessage: 'This date is booked out',
        insufficientSlotsMessage: 'Insufficient slots available',
        playerAvailableLabel: '# player available',
        playersAvailableLabel: '# players available',
        nextMonthLabel: 'Next month',
        prevMonthLabel: 'Previous month',

        monthYearFormat: 'MMMM yyyy',
        sessionTimeFormat: 'd MMM yyyy - h:mm tt',

        // Callback methods
        formatPrice: null,
        onUpdate: null,
        onSelectSession: null,
        firstCalendarDate: null
    };
    if (typeof options === 'object') {
        self.options = $.extend(self.options, options);
    }

    // Plugin Variables
    self.firstCalendarDate = self.options.firstCalendarDate; // Date of the first calendar to display
    self.selectedCalendarDate = null; // Date object
    self.$dateSelection = null;
    self.$calendars = null;
    self.$sessionContainer = null;
    self.$sessionMessageContainer = null;

    self.selectedPrice = null;
    self.selectedRemainingSlots = null;

    self.init = function () {
        self.$valueDom = $('#' + id);
        self.$valueDom.hide();

        self.selectedCalendarDate = self.options.firstCalendarDate;
        if (self.selectedCalendarDate === null) {
            self.selectedCalendarDate = DateManager.Date(DateManager.UtcNowOffset(self.options.localUtcOffsetHours));
        }
        self.firstCalendarDate = self.selectedCalendarDate;

        // Set up calendars
        self.$dateSelection = $('<div class="session-calendar-dates"></div>');
        self.$dateSelection.append('<div class="month-nav"><a class="prev" title="' + self.options.prevMonthLabel + '"><span>' + self.options.prevMonthLabel + '</span></a><a class="next" title="' + self.options.nextMonthLabel + '"><span>' + self.options.nextMonthLabel + '</span></a></div>');
        self.$calendars = $('<div class="calendars"></div>');
        self.$dateSelection.append(self.$calendars);
        self.$valueDom.after(self.$dateSelection);

        self.$sessionContainer = $('<div class="session-times"></div>');
        self.$sessionContainer.hide();
        if (self.options.sessionContainerId !== null) {
            $('#' + self.options.sessionContainerId).append(self.$sessionContainer);
        }
        else {
            self.$dateSelection.after(self.$sessionContainer);
        }
        self.$sessionMessageContainer = $('<div class="session-message-container">Messages go here!</div>');
        self.$sessionMessageContainer.hide();

        self.$sessionContainer.after(self.$sessionMessageContainer);

        self.wireEvents();
        self.buildCalendars();
    };

    self.wireEvents = function () {
        self.$calendars.on('click', '[data-date]', function () {
            var $cell = $(this);
            self.$calendars.find('[data-date]').removeClass('selected');
            $cell.addClass('selected');
            self.selectedCalendarDate = DateManager.Parse($cell.attr('data-date'), 'ddMMyyyy');
            self.buildSessions();
        });

        self.$sessionContainer.on('click', '[data-value]', function () {
            var $session = $(this);
            if (!$session.hasClass('insufficient-slots')) {
                self.$sessionContainer.find('[data-value]').removeClass('selected');
                self.$calendars.find('[data-date]').removeClass('value');
                self.$calendars.find('.selected').addClass('value');
                $session.addClass('selected');

                self.selectedPrice = $session.data('price');
                self.selectedRemainingSlots = $session.data('slots');
                self.$valueDom.val($session.attr('data-value') + $session.attr('data-game-space'));

                if (self.options.onSelectSession) {
                    self.options.onSelectSession(self.getSelectedValue());
                }
                if (self.options.onUpdate) {
                    self.options.onUpdate();
                }
            }
        });

        self.$dateSelection.find('.month-nav .prev').on('click', function () {
            self.firstCalendarDate = new Date(self.firstCalendarDate.getFullYear(), self.firstCalendarDate.getMonth() - 1, 1);
            self.buildCalendars();
        });

        self.$dateSelection.find('.month-nav .next').on('click', function () {
            self.firstCalendarDate = new Date(self.firstCalendarDate.getFullYear(), self.firstCalendarDate.getMonth() + 1, 1);
            self.buildCalendars();
        });
    }

    self.buildCalendars = function () {
        self.$dateSelection.addClass('loading');
        self.$calendars.html('');

        var monthLoop = self.firstCalendarDate;

        for (var i = 0; i < self.options.numberCalendarMonths; i++) {
            self.$calendars.append(self.getMonth(monthLoop.getFullYear(), monthLoop.getMonth() + 1));
            monthLoop = new Date(monthLoop.getFullYear(), monthLoop.getMonth() + 1);
        }

        self.populateCalendars();
    }

    self.populateCalendars = function () {
        self.$dateSelection.addClass('loading');
        $.ajax({
            method: 'post',
            url: self.fullUrlPath('/month-availability'),
            data: {
                ApiKey: self.options.apiKey,
                SiteId: self.options.siteId,
                Year: self.firstCalendarDate.getFullYear(),
                Month: self.firstCalendarDate.getMonth() + 1,
                Months: self.options.numberCalendarMonths,
                PackageId: self.options.packageId,
                FilterAccessCode: self.options.filterAccessCode,
                AccessCode: self.options.accessCode
            }
        }).done(function (data) {
            self.$calendars.find('[data-date]').removeClass('available insufficient-slots sold-out');

            for (var i = 0; i < data.length; i++) {
                var dateAvailability = data[i];

                var $cell = self.$calendars.find('[data-date="' + dateAvailability.Date + '"]');

                if (!$cell.hasClass('past')) {

                    //$cell.data('max-players', 3);
                    $cell.attr('data-max-players', dateAvailability.MaxPlayers);
                    if (dateAvailability.TotalSlots > 0) {
                        if (dateAvailability.MaxPlayers > 0) {
                            if (dateAvailability.MaxPlayers < self.options.playerCount) {
                                $cell.addClass('insufficient-slots');
                            }
                            else {
                                $cell.addClass('available');
                            }
                        }
                        else {
                            $cell.addClass('sold-out');
                        }
                    }
                }
            }
        }).always(function () {
            self.$dateSelection.removeClass('loading');
        });

        self.buildSessions();
    }

    self.buildSessions = function () {
        self.$sessionContainer.addClass('loading');
        self.$sessionMessageContainer.addClass('loading');
        $.ajax({
            method: 'post',
            url: self.fullUrlPath('/date-sessions'),
            data: {
                ApiKey: self.options.apiKey,
                SiteId: self.options.siteId,
                Date: DateManager.Format(self.selectedCalendarDate, 'ddMMyyyy'),
                PackageId: self.options.packageId,
                UpcomingOnly: self.options.upcomingOnly,
                allowCurrentSession: self.options.allowCurrentSession,
                FilterAccessCode: self.options.filterAccessCode,
                AccessCode: self.options.accessCode
            }
        }).done(function (data) {
            // if the selected value is no longer valid set deselect
            if (self.selectedRemainingSlots < self.options.playerCount) {
                self.selectedPrice = null;
                self.selectedRemainingSlots = null;
                self.$valueDom.val('');
            }

            self.$sessionContainer.removeClass('show-gamespaces');
            for (var i = 1; i < data.length; i++) {
                if (data[i].GameSpace.Id != data[i - 1].GameSpace.Id) {
                    self.$sessionContainer.addClass('show-gamespaces');
                    break;
                }
            }

            self.$sessionContainer.html('');

            if (data.length > 0) {
                var dateSlotsRemaing = 0;
                for (var i = 0; i < data.length; i++) {
                    var session = data[i];
                    if (session.RemainingSlots > 0) {
                        var time = DateManager.Parse(session.StartTime, 'ddMMyyyyHHmm');
                        var $session = $('<div></div>');
                        $session.attr('data-value', DateManager.Format(time, 'ddMMyyyyHHmm'));
                        $session.attr('data-game-space', session.GameSpace.Id);
                        $session.attr('data-price', session.Price);
                        $session.attr('data-slots', session.RemainingSlots);

                        if ((session.StartTime + session.GameSpace.Id) === self.$valueDom.val()) {
                            $session.addClass('selected');
                        }
                        if ($session.data('slots') < self.options.playerCount) {
                            $session.addClass('insufficient-slots');
                        }

                        $session.append('<span class="radio"></span>');

                        if (self.options.showGameSpace) {
                            $session.append('<span class="game-space" style="background-color:' + session.GameSpace.Colour + '"><span>' + session.GameSpace.Name + '</span></span>');
                        }
                        $session.append('<span class="time">' + DateManager.Format(time, self.options.sessionTimeFormat) + '</span>');

                        if (session.RemainingSlots > 1) {
                            $session.append('<span class="availability">' + self.options.playersAvailableLabel.replace('#', session.RemainingSlots) + '</span>');
                        }
                        else {
                            $session.append('<span class="availability">' + self.options.playerAvailableLabel.replace('#', session.RemainingSlots) + '</span>');
                        }

                        var priceStr = session.Price;
                        if (self.options.formatPrice !== null) {
                            priceStr = self.options.formatPrice(session.Price);
                        }
                        $session.append('<span class="price" style="color:' + session.Colour + '">' + priceStr + '</span>');

                        self.$sessionContainer.append($session);
                    }
                    dateSlotsRemaing += session.RemainingSlots;
                }

                if (dateSlotsRemaing === 0) {
                    self.$sessionContainer.hide();
                    self.$sessionMessageContainer.show();
                    self.$sessionMessageContainer.text(self.options.bookedOutMessage);
                }
                else {
                    self.$sessionContainer.show();
                    self.$sessionMessageContainer.hide();
                }
            }
            else {
                self.$sessionMessageContainer.text(self.options.noSessionsMessage);
                self.$sessionMessageContainer.show();
                self.$sessionContainer.hide();
            }

            if (self.options.onUpdate !== null) {
                self.options.onUpdate();
            }
        }).always(function () {
            self.$sessionContainer.removeClass('loading');
            self.$sessionMessageContainer.removeClass('loading');
        });
    }

    self.getMonth = function (year, month) {
        $calendar = $('<div class="calendar"></div>');

        var monthDate = new Date(year, month - 1, 1);
        var monthDateStr = DateManager.Format(monthDate, self.options.monthYearFormat);

        $calendar.append('<header>' + monthDateStr + '</header>');

        var $table = $('<table></table>');

        var $thead = $('<thead></thead>');
        var $tr = $('<tr></td>');
        for (var i = 0; i < 7; i++) {
            var weekdayIndex = i + self.options.firstDayOfWeek;
            if (weekdayIndex > 6) {
                weekdayIndex -= 7;
            }
            $tr.append($('<th>' + DateManager.ShortWeekdays[weekdayIndex] + '</th>'));
        }
        $thead.append($tr);
        $table.append($thead);

        var loopDate = DateManager.PreviousWeekday(monthDate, self.options.firstDayOfWeek);

        var now = DateManager.UtcNowOffset(self.options.localUtcOffsetHours);
        var nowDate = DateManager.Date(now);

        // Week rows
        var $tbody = $('<tbody></tbody>');
        for (var i = 0; i < 6; i++) {
            var $tr = $('<tr></tr>');
            $tbody.append($tr);
            for (var j = 0; j < 7; j++) {
                var $td = $('<td data-date="' + DateManager.Format(loopDate, 'ddMMyyyy') + '">' + loopDate.getDate() + '</td>');

                if (loopDate.getMonth() !== (month - 1)) {
                    $td.addClass('diff-month');
                }
                if (DateManager.IsSameDate(loopDate, now)) {
                    $td.addClass('today');
                }
                if (DateManager.IsSameDate(self.selectedCalendarDate, loopDate)) {
                    $td.addClass('selected');
                }
                if (loopDate.getTime() < nowDate.getTime()) {
                    $td.addClass('past');
                }

                if (self.$valueDom.val() !== '') {
                    if (DateManager.IsSameDate(loopDate, DateManager.Parse(self.$valueDom.val(), 'ddMMyyyy'))) {
                        $td.addClass('value');
                    }
                }

                $tr.append($td);
                loopDate = DateManager.NextDay(loopDate);
            }
        }
        $table.append($tbody);
        $calendar.append($table);
        return $calendar;
    }

    self.refresh = function () {
        self.populateCalendars();
    }

    self.getSelectedValue = function () {
        if (self.$valueDom.val().length !== 0) {
            return {
                gameSpace: parseInt(self.$valueDom.val().substr(12)),
                sessionTimestr: self.$valueDom.val().substr(0, 12),
                sessionTime: DateManager.Parse(self.$valueDom.val().substr(0, 12), 'ddMMyyyyHHmm'),
                remainingSlots: self.selectedRemainingSlots,
                price: self.selectedPrice
            };
        }
        return null;
    }

    self.fullUrlPath = function (relativePath) {
        var urlBase = self.options.baseUrl;
        while (urlBase[urlBase.length - 1] === '../index.html') {
            urlBase = urlBase.substr(0, urlBase.length - 1);
        }
        var relativeUrl = relativePath;
        while (relativeUrl[0] === '../index.html') {
            relativeUrl = relativeUrl.substr(1, relativeUrl.length);
        }
        return urlBase + '/' + relativeUrl;
    }

    self.init();

    return self;
}