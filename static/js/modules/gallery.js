define([
    'jquery'
], function($) {

    var Gallery = function() {

        var self = null;

        return {
            el: {
                holder: $('[data-module="gallery"]'),
                imgs: null
            },

            init: function() {
                self = this;

                self.bindEvents();
            },

            bindEvents: function() {
                self.el = $('[data-role="galleryitem"');

                self.el.on('click', self.clickHandler);
            },

            clickHandler: function(e) {
                e.preventDefault();

                console.log(e.target);
            }
        }
    };

    return Gallery;
});
