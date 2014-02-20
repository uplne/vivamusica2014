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