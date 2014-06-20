
/**
 * Popup module
 */

define([
    'jquery',
    'utils/events',
    'utils/utils'
], function($, Events, Utils) {
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
            $error    : $('.js-campaign-error'),
            $thxmsg   : $('.js-camppopup-thanks')
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

                    api.sendFbShareRequest();
                }
            });

        };

        api.sendFbShareRequest = function() {
            FB.ui({
                method: 'share',
                href: 'http://www.youtube.com/embed/oGNVmhc0zxE?list=UUsaC0DwceodFCDq_mQGl1LA',
            }, function(response) {
                if (response.error_code !== 4201) {
                    api.openPopup();
                }
            });
        };

        api.openPopup = function() {
            api.setPopupPosition();
            api.els.$popup.toggleClass('is-active');

            if (typeof user.name !== 'undefined' && typeof user.email !== 'undefined') {
                $('[name="name"]').val(user.name);
                $('[name="campemail"]').val(user.email);
            }
        };

        api.submitForm = function() {
            var data = {
                    email    : $('[name="campemail"]').val(),
                    name     : $('[name="name"]').val(),
                    phone    : $('[name="phone"]').val(),
                    tickets  : $('[name="tickets"]').is(":checked") ? 'TRUE' : 'FALSE',
                    canvas   : $('[name="canvas"]').is(":checked") ? 'TRUE' : 'FALSE',
                    terms    : $('[name="terms"]').is(":checked") ? 'TRUE' : 'FALSE',
                    marketing: $('[name="marketing"]').is(":checked") ? 'TRUE' : 'FALSE'
                },
                reg   = /^[0-9]/g;

            if (data.name === '' || !Utils.validateEmail(data.email) || !reg.test(data.phone) || !data.terms) {
                api.els.$error.removeClass('is-hidden');
            } else {
                api.els.$btnSubmit[0].disabled = true;

                api.sendData(data);
            }
        };

        api.sendData = function(data) {
            $.post( "/savecampaign", {
                name: data.name,
                email: data.email,
                tel_number: data.phone,
                ch_tickets: data.tickets,
                ch_picture: data.canvas,
                ch_allow_marketing_use: data.marketing
            }).done(function() {
                api.els.$btnOpen[0].disabled = true;
                api.showThankYou();
            }).fail(function() {

            });

            api.els.$btnOpen[0].disabled = true;
            api.showThankYou();
        };

        api.showThankYou = function() {
            api.els.$form.addClass('is-hidden');
            api.els.$thxmsg.removeClass('is-hidden');
        };

        return api;
    };

    return Popup;
});
