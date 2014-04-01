define([
    'chai',
    'sinon',
    'jquery',
    '../../static/js/modules/carousel'
], function (chai, sinon, $, Carousel) {
    'use strict';

    var expect = chai.expect,
        carousel = null;

    describe("Carousel", function() {

        beforeEach(function() {
            carousel = new Carousel();
        });

        it("should intialize", function() {
            var spy = sinon.spy(carousel, "init");

            carousel.init();

            expect(spy).to.have.been.called;

        });

        it("should check if we need carousel", function() {
            var spy = sinon.spy(carousel, 'doWeNeedCarousel');

            carousel.init();

            expect(spy).to.have.been.called;
            expect(spy).to.have.returned(false);
        });
    });
});
