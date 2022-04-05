function CarouselSwipe(id, options) {
    var self = {};
    self.id = id;

    // Options
    self.options = {
        pagerSelector: null,
        indexChanged: null
    }
    if (typeof options === 'object') {
        self.options = $.extend(self.options, options);
    }

    // DOM
    self.slide = true;
    self.element = document.getElementById(self.id);
    self.$element = $(self.element);
    self.$slider = self.$element.find('.slider');
    self.$pager = null;
    if (self.options.pagerSelector !== null) {
        self.$pager = $(self.options.pagerSelector);
        self.$pager.on('click', '[data-index]', function () {
            self.setIndex($(this).data('index'));
        });
        self.$pager.find('[data-index]').first().addClass('current');
    }

    self.$slider.find('[data-index]').first().addClass('current');

    // Move data
    self.screenWidth = 0;
    self.ItemWidth = 0;
    self.containerWidth = 0;

    // Properties
    self.itemCount = self.$slider.find('[data-index]').length;
    self.index = 0;
    self.grip = { x: 0, y: 0 };
    self.x = 0;
    self.directionLock = null;

    // Tolerances
    self.dragTollerance = 0;
    self.selectDirectionTolerance = 30;

    self.init = function () {
        self.wireEvents();
        self.setIndex(0);
        self.resize();
    }

    self.wireEvents = function () {

        self.element.addEventListener('touchstart', function (e) {
            self.index = self.$slider.find('[data-index].current').data('index');
            self.$slider.addClass('no-transition');
            if (e.touches.length === 1) {
                self.grip = {
                    x: e.touches[0].screenX,
                    y: e.touches[0].screenY
                };
            }
        }, { passive: true });

        self.$slider.find('[data-index]').on('click', function () {
            var index = $(this).data('index');
            self.setIndex(index);
        });

        self.element.addEventListener('touchmove', function (e) {
            if (e.touches.length === 1) {

                if (self.directionLock === null) {
                    if (Math.abs(e.touches[0].screenX - self.grip.x) > self.selectDirectionTolerance) {
                        self.directionLock = 'horizontal';
                    }
                    else if (Math.abs(e.touches[0].screenY - self.grip.y) > self.selectDirectionTolerance) {
                        self.directionLock = 'vertical';
                    }
                }

                if (self.directionLock === 'horizontal') {
                    self.x = e.touches[0].screenX;
                    var sliderX = self.containerWidth / 2 - self.ItemWidth * (self.index + 0.5) + self.x - self.grip.x;
                    self.translateX(sliderX);

                    // Prevent y scrolling
                    e.preventDefault();
                }
            }
        }, { passive: true });

        self.element.addEventListener('touchend', function (e) {
            self.$slider.removeClass('no-transition');

            if (self.directionLock === 'horizontal') {
                var delta = self.x - self.grip.x;

                var newIndex = self.index;

                if (Math.abs(delta) >= self.dragTollerance) {
                    if (delta < 0) {
                        newIndex++;
                    }
                    else if (delta > 0) {
                        newIndex--;
                    }
                }

                newIndex = Math.min(self.itemCount - 1, Math.max(0, newIndex));
                self.setIndex(newIndex);
            }

            if (self.$pager != null) {
                self.$pager.find('[data-index]').removeClass('selected');
                self.$pager.find('[data-index="' + self.index + '"]').addClass('selected');
            }

            self.directionLock = null;
        }, false);

        // Resize
        $(window).on('resize', self.resize);
    }

    self.resize = function () {
        self.screenWidth = $(document).width();
        self.containerWidth = self.$element.width();
        self.dragTollerance = self.screenWidth / 4;
        self.ItemWidth = self.$slider.find('[data-index]').first().outerWidth(true);
        self.$slider.width(self.itemCount * self.ItemWidth);
        self.setIndex(self.index);
    }

    self.setIndex = function (newIndex) {
        var hasChanged = self.index !== newIndex

        self.index = newIndex;

        if (self.$pager !== null) {
            self.$pager.find('[data-index]').removeClass('current');
            self.$pager.find('[data-index="' + self.index + '"]').addClass('current');
        }

        self.$slider.find('[data-index]').removeClass('current');
        self.$slider.find('[data-index="' + self.index + '"]').addClass('current');

        var newX = self.containerWidth / 2 - self.ItemWidth * (self.index + 0.5);
        self.translateX(newX);

        self.directionLock = null;

        if (hasChanged && self.options.indexChanged !== undefined && self.options.indexChanged !== null) {
            self.options.indexChanged(self.index);
        }
    }

    self.next = function () {
        var newIndex = self.index + 1;
        if (newIndex >= self.itemCount) { newIndex = 0; }
        self.setIndex(newIndex);
    }

    self.previous = function () {
        var newIndex = self.index - 1;
        if (newIndex < 0) { newIndex = self.itemCount - 1; }
        self.setIndex(newIndex);
    }

    self.translateX = function (amount, measurement) {
        if (self.slide) {
            if (measurement !== undefined) {
                self.$slider.css('transform', 'translateX(' + amount + measurement + ')');
            }
            else {
                self.$slider.css('transform', 'translateX(' + amount + 'px)');
            }
        }
        else {
            self.$slider.removeAttr('style');
        }
    }

    self.setSlide = function (slide) {
        if (self.slide !== slide) {
            self.slide = slide;

            if (self.slide) {
                self.$element.removeClass('no-slide');
            }
            else {
                self.$element.addClass('no-slide');
            }
            self.setIndex(self.index);
        }
    }

    self.refresh = function () {
        self.$slider.find('[data-index]').first().addClass('current');
        self.wireEvents();
    }

    self.init();
    return self;
}