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

define([
    'jquery'
], function($) {

    'use strict';

    var Carousel = function() {

        var self        = null,

            // DOM elements
            $holder     = $('[data-module="carousel"]'),
            $arrowLeft  = $('[data-move="prev"]'),
            $arrowRight = $('[data-move="next"]');

        return {

            // Public variables
            itemWidth : 0,
            carouselLength: 0,

            // Public methods
            init: function() {
                self = this;

                if (self.§()) {
                    self.bindEvents();
                }
            },

            /**
             * Function is checking if we need to activate carousel by
             * checking if it's content is wider than it's parent.
             *
             * @return {Boolean} Return true if we need to activate carousel
             */
            doWeNeedCarousel: function() {
                var parentwidth   = self.getParentWidth(),
                    carouselwidth = self.getRealCarouselWidth();

                if (parentwidth < carouselwidth) {
                    return true;
                }

                return false;
            },

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
            getRealCarouselWidth: function() {
                var $li   = $holder.find('li');

                // Set settings
                self.carouselLength = $li.length;
                self.itemWidth = $li.width();

                return self.carouselLength * self.itemWidth;
            },

            bindEvents: function() {
                $arrowLeft.on('click', self.moveLeft);
                $arrowRight.on('click', self.moveRight);
            },

            moveLeft: function(e) {
                e.preventDefault();

                self.slideCarousel('left', e.target);
            },

            moveRight: function(e) {
                e.preventDefault();
                console.log('next');
            },

            slideCarousel: function(direction, item) {
                if (direction === 'left') {
                    console.log($holder.find('li:eq(' + (self.carouselLength - 1) + ')'));
                    var lastitem = $holder.find('li:eq(' + (self.carouselLength - 1) + ')');
                    var newitem = lastitem.clone();

                    lastitem.remove();

                    $holder.prepend(newitem);
                    $holder.css({'margin-left': -self.itemWidth});
                }
            }
        };
    };

    return Carousel;
});
