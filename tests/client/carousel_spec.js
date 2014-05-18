define([
    'chai',
    'sinon',
    'jquery',
    '../../static/js/modules/carousel'
], function (chai, sinon, $, Carousel) {
    'use strict';

    var expect   = chai.expect,
        carousel = null,
        sandbox  = null;

    describe("Carousel", function() {
        var $fixtures;

        beforeEach(function() {
            $fixtures = $('#fixtures');
            $fixtures.append('<div class="js-carousel"><a></a><a></a></div>');

            carousel = new Carousel();

            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            //$fixtures.empty();

            sandbox.restore();
        });

        describe("Initialization", function() {

            it("should intialize", function() {
                var spy = sandbox.spy(carousel, "init");

                carousel.init();

                expect(spy.calledOnce).equal(true);

                spy.restore();
            });

            it("should set first element to active and start rotation", function() {

                var spy1 = sandbox.stub(carousel, "setActive"),
                    spy2 = sandbox.spy(carousel, "startRotation");

                carousel.init();

                expect(spy1.calledOnce).equal(true);
                expect(spy2.calledOnce).equal(true);
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

        it.only("should change image", function() {
            carousel.setActive();

            var mockCarousel = sandbox.mock(carousel),
                $next        = $('.js-carousel').find('a:eq(1)'),
                $item        = $('.js-carousel').find('.is-active');

            mockCarousel.expects('getActive').once().returns($item);
            mockCarousel.expects('getNext').once().returns($next);
            mockCarousel.expects('removeActive').once();
            mockCarousel.expects('stackToEnd').withArgs($item).once();

            carousel.changeImage();

            expect($next.hasClass('is-changing')).to.be.false;
            expect($next.attr('style')).not.to.be;
            mockCarousel.verify();
        });

        xit("should fade in new image and stack old one at the end", function() {
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

            this.clock.restore();
        });

        xit("should stack old one to the end and set first one to active", function() {

        })

        xdescribe("Timing", function() {

            it("should change image every 5000 ms", function() {
                this.clock = sinon.useFakeTimers();

                var spy = sinon.spy(carousel, "changeImage");

                carousel.init();

                this.clock.tick(4999);
                expect(spy.called).equal(false);

                this.clock.tick(5001);
                expect(spy.called).equal(true);

                this.clock.restore();
            });
        });
    });
});
