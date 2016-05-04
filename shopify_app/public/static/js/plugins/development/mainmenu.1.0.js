/*
 * ************************************************************* *
 * Name       : MainMenu                                         *
 * Date       : December 2012                                    *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : --/--/----                                       *
 * Developer  : Richard                                          *
 * Dependency : jQuery UI core                                   *
 * Lib        : jQuery 1.4+                                      *
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
    $.fn.mainMenu = function (options) {

        options = $.extend({}, $.fn.mainMenu.options, options);

        return this.each(function () {

            /**
             * Variables.
             **/
            var obj = $(this);
            var objHref = obj.children().children();
            var o_closeClass = options.closeClass;
            var o_openClass = options.openClass;
            var o_speed = options.speed;
            var o_openAll = options.openAll;

            /**
             * Check for touch support and set right click events.
             **/
            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                var clickEvent = 'touchstart';
            } else {
                var clickEvent = 'click';
            }

            /**
             * Show/hide menu with a click event.
             **/
            objHref.on(clickEvent, 'a', function (e) {

                /**
                 * Check if the href attribute is valid, if not use the animation.
                 **/
                if (($(this).attr('href').lastIndexOf('#') >= 0) || ($(this).attr('href').indexOf('javascript') >= 0)) {

                    /**
                     * Adding/removing active class & arrow class.
                     **/
                    if ($(this).next().is(':hidden')) {
                        $(this).find('.' + o_openClass).removeClass(o_openClass).addClass(o_closeClass);
                    } else {
                        $(this).find('.' + o_closeClass).removeClass(o_closeClass).addClass(o_openClass);
                    }
                    /**
                     * The animation of the menu.
                     **/
                    $(this).next().stop(true, true).animate({height: 'toggle'}, o_speed);

                    e.preventDefault();
                }
            });
        });
    };

    /**
     * Default settings(dont change).
     * You can globally override these options
     * by using $.fn.pluginName.key = 'value';
     **/
    $.fn.mainMenu.options = {
        closeClass: 'fa-caret-up',
        openClass: 'fa-caret-down',
        speed: 400
    };

}));
