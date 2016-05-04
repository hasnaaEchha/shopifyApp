/*
 * ************************************************************* *
 * Name       : Easy File Tree                                   *
 * Date       : Nov 2012                                         *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-07 00:37:16 UTC+02:00                    *
 * Developer  : Richard                                          *
 * Dependency :                                                  *
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
    $.fn.easyFileTree = function (options) {

        options = $.extend({}, $.fn.easyFileTree.options, options);

        return this.each(function () {

            /**
             * Variables.
             **/
            var obj = $(this);
            var o_speed = options.speed;

            /**
             * Check for touch support and set right click events.
             **/
            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                var clickEvent = 'touchstart';
            } else {
                var clickEvent = 'click';
            }

            /**
             * Show/hide sub folders with a click event.
             **/
            obj.find('li').on(clickEvent, this, function (e) {
                e.stopPropagation();
                if ($(this).hasClass('eft-open')) {
                    $(this)
                        .children('.fa-folder-open')
                        .removeClass('fa-folder-open')
                        .addClass('fa-folder')
                        .next('ul')
                        .slideUp(o_speed, function () {
                            $(this).parent('li').removeClass('eft-open').addClass('eft-closed');
                        });
                } else {
                    $(this)
                        .children('.fa-folder')
                        .removeClass('fa-folder')
                        .addClass('fa-folder-open')
                        .next('ul')
                        .slideDown(o_speed, function () {
                            $(this).parent('li').removeClass('eft-closed').addClass('eft-open');
                        });
                }
            });
        });
    };

    /**
     * Default settings(dont change).
     * You can globally override these options
     * by using $.fn.pluginName.key = 'value';
     **/
    $.fn.easyFileTree.options = {
        speed: 200
    };

}));
