'use strict';

define([
    'jquery',
    'modules/toggleMenu'
], function($, ToggleMenu) {

    describe('ToggleMenu', function() {
        var toggleMenu = new ToggleMenu();
     
        it('is being initialized', function() {
            spyOn(toggleMenu, 'init');

            toggleMenu.init();

            expect(toggleMenu.init).toHaveBeenCalled();
        });
    });
});