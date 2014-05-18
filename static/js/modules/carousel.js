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
            timer       = 0,

            // DOM elements
            $holder     = $('.js-carousel');

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
                $holder.append(item);

                this.setActive();
            },

            startRotation: function() {
                self = this;

                timer = window.setInterval(function() {
                    self.changeImage(self);
                }, 5000);
            },

            changeImage: function(self) {
                self = self || this;

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
