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

    var carousel = new Carousel();
        console.log('carousel load');
        carousel.init();
});
