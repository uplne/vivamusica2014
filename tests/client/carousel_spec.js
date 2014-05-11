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
            //$fixtures.empty();
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

        it("should change image", function() {
            var mockCarousel = sinon.mock(carousel),
                $next        = $('.js-carousel').find('a:eq(1)');

            mockCarousel.expects('getActive').once();
            mockCarousel.expects('getNext').once().returns($next);

            carousel.changeImage();

            mockCarousel.verify();
            expect($next.hasClass('is-changing')).to.be.true;
        });

        it("should fade in new image and stack old one at the end", function() {
            var spy1  = sinon.spy(carousel, 'stackToEnd'),
                spy2  = sinon.spy(carousel, 'removeActive'),
                $next = $('.js-carousel').find('a:eq(1)');

            this.clock = sinon.useFakeTimers();

            carousel.changeImage();

            this.clock.tick(1100);
            expect(spy1).not.have.been.called;
            expect(spy2).not.have.been.called;

            this.clock.tick(1300);
            expect(spy1).to.have.been.calledOnce;
            expect(spy2).to.have.been.calledOnce;
            expect($('.js-carousel').find('.is-changing').length).to.equal(0);
        });

        it.only("should stack old one to the end and set first one to active", function() {

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

                this.clock.restore();
            });
        });
    });
});
