/**
 * Carousel module
 *
 * JS hook for container: data-module="carousel"
 * JS hooks for arrows: data-move="prev", data-move="next"

    <ul data-module="carousel">
        <li>
            <a href=""></a>
        </li>
    </ul>
    <a data-move="prev" href="#nogo">Prev</a>
    <a data-move="next" href="#nogo">Next</a>
 *
 */

'use strict';

define([
    'jquery'
], function($) {

    var Carousel = function() {

        var self        = null,

            // DOM elements
            $holder     = $('[data-model="carousel"]'),
            $arrowLeft  = $('[data-move="prev"]'),
            $arrowRight = $('[data-move="next"]');

        return {
            init: function() {
                self = this;

                if (self.doWeNeedCarousel()) {
                    console.log('Carousel: bind');
                    self.bindEvents();
                }
            },

            doWeNeedCarousel: function() {
                var parentwidth   = self.getParentWidth(),
                    carouselwidth = self.getCarouselWidth();

                if (parentwidth > carouselwidth) {
                    return true;
                }

                return false;
            }

            /**
             * Get the parent (container) width
             *
             * @return {Number} Parent width
             */
            getParentWidth: function() {
                return $holder.parent().width();
            },

            /**
             * Get the carousel width
             *
             * @return {Number} Carousel width
             */
            getCarouselWidth: function() {
                return $holder.width();
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
