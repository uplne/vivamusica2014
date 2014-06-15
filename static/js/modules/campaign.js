
/**
 * Popup module
 */

define([
    'jquery',
    'utils/events'
], function($, Events) {
    'use strict';

    var Popup = function() {
        var self  = null,
            api   = {};

        // DOM elements
        api.els = {
            $popup   : $('.js-campaignpopup'),
            $btnClose: $('.js-campaignbutton-close '),
            $btnOpen : $('.js-campaignbutton')
        };

        api.events = {
            '$btnOpen click' : 'openCloseHandler',
            '$btnClose click': 'openCloseHandler'
        };

        api.init = function() {
            // Save reference to this
            self = this;

            Events.bindEvents.call(this);
        };

        api.setPopupPosition = function() {
            var position = api.getPopupPosition();

            api.els.$popup.css({
                'left': position.x + 'px',
                'top' : position.y + 'px'
            });
        };

        api.getPopupPosition = function() {
            var position = {
                    x: 0,
                    y: 0
                },
                parent   = api.els.$popup.parent(),
                $window  = $(window),
                ww       = parent.width() / 2,
                wh       = $window.height() / 2,
                hw       = api.els.$popup.width() / 2,
                hh       = api.els.$popup.height() / 2;

                position.x = ww - hw;
                position.y = wh - hh + document.body.scrollTop;

            return position;
        };

        api.openCloseHandler = function(e) {
            e.preventDefault();

            //api.setPopupPosition();

            //api.els.$popup.toggleClass('is-active');
            FB.ui({
              method: 'share',
              href: 'http://www.vivamusica.sk',
            }, function(response){});
        };

        return api;
    };

    return Popup;
});
