/**
 * Newsletter module.
 */
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
                $submit    : $('[data-role="send"]')
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
                self.els.$input.val(TEXT);
            }
        };
    };

    return Newsletter;
});
