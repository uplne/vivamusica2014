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

        it("should remove active class", function() {
            carousel.setActive();

            expect($('.js-carousel').find('a:eq(0)').attr('class')).to.equal('is-active');
            expect($('.js-carousel').find('a.is-active').length).to.equal(1);

            carousel.removeActive();
            expect($('.js-carousel').find('a.is-active').length).to.equal(0);
        });

        it("should get active class", function() {
            carousel.setActive();

            var test = carousel.getActive();

            expect(test).to.be.an('object');
            expect(test.hasClass('is-active')).to.be.true;
        });

        describe("Timing", function() {

            it("should change image every 5000 ms", function() {
                this.clock = sinon.useFakeTimers();

                var spy = sinon.spy(carousel, "changeImage");

                carousel.init();

                this.clock.tick(4998);
                expect(spy).not.have.been.called;

                this.clock.tick(5001);
                expect(spy).to.have.been.calledOnce;
            });
        });
    });
});
