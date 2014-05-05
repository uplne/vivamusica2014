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
        var $fixtures;

        beforeEach(function() {
            $fixtures = $('#fixtures');
            $fixtures.append('<div class="js-carousel"><a></a><a></a></div>');

            carousel = new Carousel();
        });

        afterEach(function() {
            $fixtures.empty();
        });

        describe("Initialization", function() {

            it("should intialize", function() {
                var spy = sinon.spy(carousel, "init");

                carousel.init();

                expect(spy).to.have.been.called;
            });

            it("should set first element to active and start rotation", function() {

                sinon.stub(carousel, "setActive");
                sinon.stub(carousel, "startRotation");

                carousel.init();

                expect(carousel.setActive).to.have.been.calledOnce;
                expect(carousel.startRotation).to.have.been.calledOnce;
            });
        });

        it("should set first element to active", function() {
            carousel.setActive();

            expect($('.js-carousel').find('a:eq(0)').attr('class')).to.equal('is-active');
        });

        it("should remove active class when necessary", function() {
            carousel.setActive();
            expect($('.js-carousel').find('a:eq(0)').attr('class')).to.equal('is-active');
            expect($('.js-carousel').find('a.is-active').length).to.equal(1);

            carousel.removeActive();
            expect($('.js-carousel').find('a.is-active').length).to.equal(0);
        });
    });
});
