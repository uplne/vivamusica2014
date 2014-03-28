/**
 * Carousel module
 *
 * JS hook for container: data-module="carousel"
 * JS hooks for arrows: data-move="prev", data-move="next"
 *
 */

'use strict';

define([
    'jquery'
], function($) {

    var Carousel = function() {

        var self        = null,

            // DOM elements
            $arrowLeft  = $('[data-move="prev"]'),
            $arrowRight = $('[data-move="next"]');

        return {
            init: function() {
                self = this;

                self.bindEvents();
            },

            bindEvents: function() {
                $arrowLeft.on('click', self.moveLeft);
                $arrowRight.on('click', self.moveRight);
            },

            moveLeft: function(e) {
                e.preventDefault();
                console.log('prev');
            },

            moveRight: function(e) {
                e.preventDefault();
                console.log('next');
            }
        }
    }

    return Carousel;
});
