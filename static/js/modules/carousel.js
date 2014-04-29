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
            $holder     = $('.js-carousel')

        return {

            // Public variables
            itemWidth : 0,
            carouselLength: 0,

            // Public methods
            init: function() {
                self = this;

                self.setActive();
                //self.startRotation();
            },

            setActive: function() {
                $holder.find('li:eq(0)').addClass('is-active');
            },

            removeActive: function() {
                $holder.find('.is-active').removeClass('is-active');
            },

            getActive: function() {
                return $holder.find('.is-active');
            },

            startRotation: function() {
                timer = window.setInterval(self.changeImage, 2000);
            },

            changeImage: function() {
                var $item = self.getActive();

                $item.addClass('is-moving');
                setTimeout(self.detachCarousel, 500);
            },

            detachCarousel: function() {
                var $car     = $holder.find('ul').clone();

                var newmitem = $car.find('li:eq(0)').clone();

                $car.find('li:eq(0)').remove();
                $car.append(newmitem);

                newmitem.removeClass();

                $car.find('li:eq(0)').addClass('is-active');

                $holder.find('ul').remove();
                $holder.append($car);
            }
        };
    };

    return Carousel;
});
