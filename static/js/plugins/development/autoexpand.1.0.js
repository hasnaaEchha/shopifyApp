/*
 * ************************************************************* *
 * Name       : Auto expand                                      *
 * Date       : September 2012                                   *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-21 12:58:08 UTC+02:00                    *
 * Developer  : Mark                                             *
 * Dependency :                                                  *
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

    //"use strict"; // jshint ;_;

    var pluginName = 'autoExpand';

    function Plugin(element, options) {
        /**
         * Variables.
         **/
        this.obj = $(element);
        this.o = $.extend({}, $.fn[pluginName].defaults, options);

        this.init();
    };

    Plugin.prototype = {

        /**
         * Code that we run at the start.
         *
         * @param:
         **/
        init: function () {

            var self = this;

            /**
             * Run on focus(start).
             **/
            self.obj.on('focus', function () {

                var boxHeight = $(this).innerHeight();

                /**
                 * Get dataset value or use default
                 **/
                if ($(this).data('autoexpand-size') > 1) {
                    var sizeTo = $(this).attr('data-autoexpand-size');
                } else {
                    sizeTo = self.o.height;
                }

                /**
                 * Animate the textarea.
                 **/
                $(this).attr('data-autoexpand-default', boxHeight).animate({height: sizeTo}, self.o.speed, function () {

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onFocus == 'function') {
                        self.o.onFocus.call(this, {
                            item: $(this)
                        });
                    }

                });

            });

            /**
             * Run on blur(end).
             **/
            self.obj.on('blur', function () {

                var boxHeight = $(this).attr('data-autoexpand-default');

                if (self.o.keepOpen == 'false' || self.o.keepOpen == 'present' && $(this).val().length == 0) {

                    /**
                     * Animate the textarea.
                     **/
                    $(this).animate({height: boxHeight}, self.o.speed, function () {

                        /**
                         * Run the callback function.
                         **/
                        if (typeof self.o.onBlur == 'function') {
                            self.o.onBlur.call(this, {
                                item: $(this)
                            });
                        }

                    });
                }

            });
        },

        /**
         * Update.
         *
         * @param:
         **/
        update: function (param) {
            var self = this;
        },

        /**
         * Destroy.
         *
         * @param:
         **/
        destroy: function () {
            $.removeData(this.obj, this.pluginName);
        }

    };

    $.fn[pluginName] = function (option, param) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);
            var options = typeof option == 'object' && option;
            if (!data) {
                $this.data(pluginName, (data = new Plugin(this, options)))
            }
            if (typeof option == 'string') {
                data[option](param);
            }
        });
    };

    /**
     * Default settings(dont change).
     * You can globally override these options
     * by using $.fn.pluginName.key = 'value';
     **/
    $.fn[pluginName].defaults = {
        speed: 200,
        height: 150,
        keepOpen: 'present',
        onFocus: function (ui) {
        },
        onBlur: function (ui) {
        }
    };

}));