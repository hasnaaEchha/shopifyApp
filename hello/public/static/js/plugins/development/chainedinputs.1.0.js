/*
 * ************************************************************* *
 * Name       : Chained inputs                                   *
 * Date       : March 2011                                       *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-21 21:50:14 UTC+02:00                    *
 * Developer  : Mark                                             *
 * Dependency :                                                  *
 * Lib        : jQuery 1.6+                                      *
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
    $.fn.chainedInputs = function (options) {

        options = $.extend({}, $.fn.chainedInputs.options, options);

        return this.each(function () {

            /**
             * Variables.
             **/
            var obj = $(this);

            /**
             * Find the data attribute.
             **/
            obj.on('keyup', '[data-chained-group]', function () {
                var changTo = $(this).attr('data-chained-group');
                var maxLength = $(this).attr('maxlength');
                var val = $(this).val().length;
                var count = $('[data-chained-group="' + changTo + '"]').length - 1;
                var index = $(this).index('[data-chained-group="' + changTo + '"]');

                /**
                 * If not present use option.
                 **/
                if (!maxLength) {
                    var maxLength = options.maxLength;
                }

                /**
                 * Hop to the next one.
                 **/
                if (val == maxLength) {
                    if (index == count) {

                        /**
                         * If true on end blur input.
                         **/
                        if (options.onEndBlur === true) {
                            $(this).blur();
                        }

                        /**
                         * Run the callback function.
                         **/
                        if (typeof options.onEnd == 'function') {
                            options.onEnd.call(this);
                        }

                    } else {
                        $('[data-chained-group="' + changTo + '"]').eq(index + 1).focus();

                        /**
                         * Run the callback function.
                         **/
                        if (typeof options.onSwitch == 'function') {
                            options.onSwitch.call(this, {
                                item: $(this)
                            });
                        }
                    }
                }
            });

            /**
             * Reset cursor back to the end(if the input has a value) .
             **/
            obj.on('focus', '[data-chained-group]', function () {
                if (this.createTextRange) {
                    //IE
                    var FieldRange = this.createTextRange();
                    FieldRange.moveStart('character', this.value.length);
                    FieldRange.collapse();
                    FieldRange.select();
                } else {
                    // All other
                    // Double the length because Opera is inconsistent
                    // about whether a carriage return is one character or two.
                    var len = $(this).val().length * 2;
                    this.setSelectionRange(len, len);
                }
            });

        });
    };

    /**
     * Default settings(dont change).
     * You can globally override these options
     * by using $.fn.pluginName.key = 'value';
     **/
    $.fn.chainedInputs.options = {
        maxLength: 5,
        onEndBlur: true,
        onSwitch: function (ui) {
        },
        onEnd: function () {
        }
    };

}));
