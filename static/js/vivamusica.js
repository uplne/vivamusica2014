/**
 - 0.0.2
http://www.vivamusica.sk
Copyright (c) 2014 Steve Vadocz
License: Enjoy. Live long and prosper.
*/
'use strict';

require.config({
    "baseUrl": "/static/js",
    "paths": {
        //jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
        jquery: 'lib/jquery/jquery'
    }
});

require([
    'jquery',
    'modules/toggleMenu',
    'modules/gallery',
    'modules/newsletter',
    'modules/carousel'
], function ($, ToggleMenu, Gallery, Newsletter, Carousel) {

    var toggleMenu = new ToggleMenu();
        toggleMenu.init();

    var gallery = new Gallery();
        gallery.init();

    var newsletter = new Newsletter();
        newsletter.init();

    var carousel = new Carousel();
        carousel.init();
});

define([
    'jquery'
], function($) {

    'use strict';

    var Carousel = function() {

        var self        = null,
            timer       = 0,

            // DOM elements
            $holder     = $('.js-carousel'),
            $wrapper    = $('.carousel__wrap');

        return {

            // Public variables
            itemWidth : 0,
            carouselLength: 0,

            // Public methods
            init: function() {
                self = this;

                self.setActive();
                self.startRotation();
            },

            setActive: function() {
                $holder.find('a:eq(0)').addClass('is-active');
            },

            removeActive: function() {
                $holder.find('.is-active').removeClass('is-active');
            },

            getActive: function() {
                return $holder.find('.is-active');
            },

            getNext: function() {
                return $holder.find('a:eq(1)');
            },

            stackToEnd: function(item) {
                $wrapper.append(item);

                self.setActive();
            },

            startRotation: function() {
                timer = window.setInterval(self.changeImage, 5000);
            },

            changeImage: function() {
                var $item = self.getActive(),
                    $next = self.getNext();

                    $next.addClass('is-changing');
                    $next.fadeIn(1200, function() {
                        self.removeActive();
                        $next.removeClass('is-changing');
                        $next.removeAttr('style');
                        self.stackToEnd($item);
                    });
            }
        };
    };

    return Carousel;
});

define([
    'jquery'
], function($) {

    var Gallery = function() {

        var self = null;

        return {
            el: {
                holder: $('[data-module="gallery"]'),
                imgs: null
            },

            init: function() {
                self = this;

                self.bindEvents();
            },

            bindEvents: function() {
                self.el = $('[data-role="galleryitem"');

                self.el.on('click', self.clickHandler);
            },

            clickHandler: function(e) {
                e.preventDefault();

                self.openImage(e.target.srcr);
            },

            openImage: function(path) {
                console.log(path);
            }
        }
    };

    return Gallery;
});

define([
    'jquery',
    'utils/events',
    'utils/utils'
], function($, Events, Utils) {
    'use strict';

    var Newsletter = function() {

        var self = null,
            TEXT = '';

        return {
            els: {
                $mainHolder: $('[data-module="newsletter"]'),
                $input     : $('[data-role="check"]'),
                $submit    : $('[data-role="send"]'),
                $notify    : $('[data-module="notify"]')
            },

            init: function() {

                self = this;

                TEXT = self.els.$input.val();

                Events.bindEvents.call(this);
            },

            events: {
                '$input focus' : 'inputFocus',
                '$input blur'  : 'inputBlur',
                '$submit click': 'submit'
            },

            inputFocus: function() {
                var val = $(this).val();

                if (val === TEXT) {
                    $(this).val('');
                }
            },

            inputBlur: function() {
                var val = $(this).val();

                if (val === '') {
                    $(this).val(TEXT);
                }
            },

            submit: function(e) {
                event.preventDefault();

                var email = self.els.$input.val();

                if (Utils.validateEmail(email)) {
                    self.sendData(email);
                }
            },

            sendData: function(email) {
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify({email: email}),
                    contentType: 'application/json',
                    url: '/newsletter',
                    success: function(data) {
                        self.notify();
                    }
                });
            },

            notify: function() {
                var $window = $(window),
                    halfw   = $window.width() / 2,
                    halfh   = $window.height() / 2,
                    popw    = self.els.$notify.width() / 2;

                self.els.$input.val(TEXT);

                self.els.$notify.css({
                    'top': halfh + 'px',
                    'left': (halfw - popw) + 'px'
                }).fadeIn().delay(1500).fadeOut();
            }
        };
    };

    return Newsletter;
});

define([
    'jquery',
    'utils/events'
], function($, Events) {
    'use strict';

    var Popup = function() {
        var self  = null,
            timer = 1000,
            api   = {};

        // DOM elements
        api.els = {
            $holder  : $('[data-popup]'),
            $btnClose: $('[data-action="close"]'),
            $btnOpen : $('[data-action="open"]')
        };

        api.events = {
            '$btnOpen click' : 'openCloseHandler',
            '$btnClose click': 'openCloseHandler'
        };

        api.init = function() {

            // Save reference to this
            self = this;

            api.showPopup();

            Events.bindEvents.call(this);
        };

        api.showPopup = function() {
            var position = api.getPopupPosition();

            api.els.$holder.css({
                'left': position.x + 'px',
                'top' : position.y + 'px'
            });

            setTimeout(function() {
                api.els.$holder.removeClass('is-hidden');
            }, 2000);
        };

        api.getPopupPosition = function() {
            var position = {
                    x: 0,
                    y: 0
                },
                $window  = $(window),
                ww       = $window.width() / 2,
                wh       = $window.height() / 2,
                hw       = api.els.$holder.width() / 2,
                hh       = api.els.$holder.height() / 2;

                position.x = ww - hw;
                position.y = wh - hh;

            return position;
        };

        api.openCloseHandler = function(e) {
            e.preventDefault();

            api.els.$holder.toggleClass('is-hidden');
        };

        return api;
    };

    return Popup;
});
define([
    'jquery'
], function($) {
    'use strict';

    var ToggleMenu = function() {

        var self = null;

        return {
            // DOM elements
            el: {
                $mainHolder: $('.main'),
                $navlink:    $('[data-module="tooglemenu"]'),
                $sidebar:    $('.main__menu')
            },

            init: function() {

                self = this;

                self.bindEvents();
            },

            bindEvents: function() {
                self.el.$navlink.on('click', function(event) {
                    event.preventDefault();

                    $(this).toggleClass('is-active');
                    self.el.$mainHolder.toggleClass('is-active');
                    self.el.$sidebar.toggleClass('is-active');
                });
            }
        };
    };

    return ToggleMenu;
});
