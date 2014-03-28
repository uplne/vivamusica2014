'use strict';

require.config({
    "baseUrl": "static/js",
    "paths": {
        //jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
        jquery: 'lib/jquery/jquery'
    }
});

require([
    'jquery',
    'modules/carousel'
], function ($, Carousel) {

    console.log('start');

    var carousel = new Carousel();
        carousel.init();
});
