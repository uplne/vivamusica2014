/**
 * Toogle menu module.
 */
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
