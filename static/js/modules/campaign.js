
/**
 * Popup module
 */

define([
    'jquery',
    'utils/events',
    'utils/utils'
], function($, Events, Utils) {
    'use strict';

    var Popup = function() {
        var self  = null,
            api   = {},
            user  = {};

        // DOM elements
        api.els = {
            $popup    : $('.js-campaignpopup'),
            $btnClose : $('.js-campaignbutton-close '),
            $btnOpen  : $('.js-campaignbutton'),
            $btnSubmit: $('.js-campaignbutton-send'),
            $form     : $('.js-campaign-form'),
            $error    : $('.js-campaign-error')
        };

        api.events = {
            '$btnOpen click'  : 'openHandler',
            '$btnClose click' : 'closeHandler'
        };

        api.init = function() {
            // Save reference to this
            self = this;

            Events.bindEvents.call(this);

            api.els.$form.submit(function(e) {
                e.preventDefault();

                api.submitForm();
            })
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

        api.openHandler = function(e) {
            e.preventDefault();

            api.fbLogin();
            //api.openPopup();
        };

        api.closeHandler = function(e) {
            e.preventDefault();

            api.els.$popup.toggleClass('is-active');
        };

        api.fbLogin = function() {
            FB.login(function(response) {
                if (response.authResponse) {
                    api.getUserInformation();
                } else {
                    // Permission not granted.
                }
             }, {scope: 'public_profile, email, user_friends'});
        };

        api.getUserInformation = function() {
            FB.api('/me', function (response) {
                if (response && !response.error) {
                    user.name = response.name;
                    user.email = response.email;

                    console.log(user);

                    api.sendFbRequest();
                }
            });

        };

        api.sendFbRequest = function() {
            FB.ui({
                method: 'apprequests',
                message: 'Slovenská sporiteľňa - Pozvánka na festival Viva Musica video'
            }, function(response) {
                if (typeof response.to === 'object' && response.to.length > 0) {
                    //api.openPopup();
                }
            });
        };

        api.openPopup = function() {
            api.setPopupPosition();
            api.els.$popup.toggleClass('is-active');

            if (typeof user.name !== 'undefined' && typeof user.email !== 'undefined') {
                $('[name="name"]').val(user.name);
                $('[name="email"]').val(user.email);
            }
        };

        api.submitForm = function() {
            var email = $('[name="campemail"]').val(),
                name  = $('[name="name"]').val(),
                phone = $('[name="phone"]').val(),
                tickets = $('[name="tickets"]').is(":checked") ? 1 : 0,
                canvas = $('[name="canvas"]').is(":checked") ? 1 : 0,
                terms = $('[name="terms"]').is(":checked") ? 1 : 0,
                marketing = $('[name="marketing"]').is(":checked") ? 1 : 0,
                reg   = /^[0-9]/g;

            if (name === '' || !Utils.validateEmail(email) || !reg.test(phone) || !terms) {
                api.els.$error.removeClass('is-hidden');
            } else {
                console.log('preslo')
            }
        };

        return api;
    };

    return Popup;
});
