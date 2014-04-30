'use strict';

require.config({
    "baseUrl": "/static/js",
    "paths": {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
        //jquery: 'lib/jquery/jquery'
    }
});

require([
    'jquery',
    'modules/toggleMenu',
    'modules/newsletter',
    'modules/carousel'
], function ($, ToggleMenu, Newsletter, Carousel) {

    var toggleMenu = new ToggleMenu();
        toggleMenu.init();

    var newsletter = new Newsletter();
        newsletter.init();

    var carousel = new Carousel();
        carousel.init();
});
