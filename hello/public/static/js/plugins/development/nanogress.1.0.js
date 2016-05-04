/*
 * ************************************************************* *
 * Name       : NanoGress                                        *
 * Date       : December 2012                                    *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : --/--/----                                       *
 * Developer  : Mark                                             *
 * Dependency : jQuery UI core                                   *
 * Lib        : jQuery 1.7+                                      *
 * Licence    : NOT free                                         *
 * This is part of a themeforest file                            *
 * ************************************************************* *
 */

;
(function (factory) {

    //"use strict"; // jshint ;_;

    if (typeof define === 'function' && define.amd) {
        /**
         * AMD register as an anonymous module.
         **/
        define([jquery], factory);
    } else {
        /**
         * Browser globals.
         **/
        factory(jQuery);
    }

}(function ($) {

    //*****************************************************************//
    /////////////////////////// PRIVATE METHODS /////////////////////////
    //*****************************************************************//

    function init() {
    }

    // Initialize
    init();

    //*****************************************************************//
    ////////////////////////// PUBLIC INTERFACE /////////////////////////
    //*****************************************************************//

    $.nanoGress = {

        //*****************************************************************//
        ////////////////////////////// START ////////////////////////////////
        //*****************************************************************//

        start: function (str) {

            if (typeof str === 'undefined') {
                var str = '';
            }

            /**
             * Set a custom target or use body as default.
             **/
            if (str.target) {
                var obj = $(str.target);
            } else {
                var obj = $('body')
            }

            /**
             * Build and append the bar to the body or target.
             **/
            obj.append('<div class="nanogress"><div class="nanogress-bar"></div></div>');

            /**
             * Start the function.
             **/
            animatedBar();

            var end = 0;

            /**
             * Animate the bar.
             **/
            function animatedBar() {
                var ran = Math.floor(Math.random() * 5) + 1;
                $('.nanogress-bar').animate({width: '+=' + ran + '%'}, ran * 1000, function () {
                    end = end + ran;
                    if (end <= 93) {
                        animatedBar();
                    }
                });
            }

        },

        //*****************************************************************//
        /////////////////////////////// END /////////////////////////////////
        //*****************************************************************//

        end: function (str) {

            if (typeof str === 'undefined') {
                var str = '';
            }

            /**
             * Set a custom delay.
             **/
            if (str.delay) {
                var delay = str.delay;
            } else {
                var delay = 0
            }

            /**
             * Finsh the animation and remove the bar.
             **/
            setTimeout(function () {
                $('.nanogress-bar').stop(true).animate({width: '100%'}, 400, function () {
                    $(this).parent().delay(200).fadeOut(200, function () {
                        $(this).remove();

                        /**
                         * Run the callback function.
                         **/
                        if (typeof str.onEnd == 'function') {
                            str.onEnd.call(this);
                        }
                    });
                });
            }, delay);

        }
    };
}));
