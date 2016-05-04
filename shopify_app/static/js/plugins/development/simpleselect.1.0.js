/*
 * ************************************************************* *
 * Name       : Simple Select                                    *
 * Date       : Feb 2013                                         *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-23 13:11:46 UTC+02:00                    *
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

    var pluginName = 'simpleSelect';

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
             * Build method.
             **/
            self._build();

            /**
             * Events method.
             **/
            self._events();

            /**
             * Update method.
             **/
            self.update();
        },

        /**
         * Build the fake select.
         *
         * @param:
         **/
        _build: function (param) {

            var self = this;

            /**
             * Wrap and build the fake select.
             **/
            if (!self.obj.attr('multiple')) {
                self.obj.wrap('<div class="simpelselect-container"></div>')
                    .parent()
                    .prepend('<div class="simpelselect-inner"><div class="simpleselect-value"></div><div class="simpleselect-btn">' + self.o.icon + '</div></div>');
            }
        },

        /**
         * All events.
         *
         * @param:
         **/
        _events: function (param) {
            var self = this;

            /**
             * Native select change.
             **/
            self.obj.change(function (e) {
                var sPar = $(this).parent();
                var nt = sPar.find(':selected').text();
                var val = $(this).val();

                /**
                 * Set new text.
                 **/
                sPar.find('.simpleselect-value').text(nt);

                /**
                 * Run the callback function.
                 **/
                if (typeof self.o.onChange == 'function') {
                    self.o.onChange.call(this, {
                        item: $(this),
                        value: val
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
            var nt = self.obj.find('option:selected').text();

            /**
             * Set new text.
             **/
            self.obj.parent().find('.simpleselect-value').text(nt);

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
        icon: '<i class="fa fa-caret-down"></i>',
        onChange: function () {
        }
    };

}));