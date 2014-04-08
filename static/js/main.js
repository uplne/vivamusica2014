'use strict';

require.config({
    "baseUrl": "/static/js",
    "paths": {
        //jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
        jquery: 'lib/jquery/jquery'
    }
});

require([
    'jquery',
    'modules/toggleMenu',
    'modules/gallery'
], function ($, ToggleMenu, Gallery) {

    var toggleMenu = new ToggleMenu();
        toggleMenu.init();

    var gallery = new Gallery();
        gallery.init();
});
