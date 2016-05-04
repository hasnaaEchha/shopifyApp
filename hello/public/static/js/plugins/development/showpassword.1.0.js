/*
 * ************************************************************* *
 * Name       : Show password                                    *
 * Date       : Feb 2013                                         *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2014-01-05 00:16:59 UTC+02:00                    *
 * Developer  : Mark                                             *
 * Dependency : jQuery UI core                                   *
 * Lib        : jQuery 1.7+                                      *
 * Licence    : NOT free                                         *
 * This is part of a themeforest file                            *
 * ************************************************************* *
 */

;
(function ($, window, document, undefined) {

    //"use strict"; // jshint ;_;

    var pluginName = 'showPassword';

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

            self.obj.wrap('<div class="showpassword-wrap"></div>')

            $(self.o.template).addClass('showpassword-hint').appendTo('.showpassword-wrap');

            /**
             * Events function.
             **/
            self._events();
        },

        /**
         * Events
         *
         * @param:
         **/
        _events: function (param) {

            var self = this;
            var passInput = self.obj;
            var textInput = self.obj.next('.showpassword-hint');

            /**
             * Click event.
             **/
            $('body').on('click', self.o.trigger, function (e) {
                /**
                 * Switch between.
                 **/
                if (textInput.is(':hidden')) {
                    /**
                     * Change trigger text.
                     **/
                    $(this).text(self.o.labelHide);
                    /**
                     * Show/hide inputs.
                     **/
                    passInput.hide();
                    textInput.show();
                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onHide == 'function') {
                        self.o.onHide.call(this);
                    }
                } else {
                    /**
                     * Change trigger text.
                     **/
                    $(this).text(self.o.labelShow);
                    /**
                     * Show/hide inputs.
                     **/
                    textInput.hide();
                    passInput.show();
                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onShow == 'function') {
                        self.o.onShow.call(this);
                    }
                }
                e.preventDefault();
            });
            /**
             * Keyup event.
             **/
            $('body').on('keyup', self.obj.parent().find('input'), function (e) {
                /**
                 * Switch between.
                 **/
                if ($(e.target).is('.showpassword-hint')) {
                    /**
                     * Copy value.
                     **/
                    self.obj.val(textInput.val());
                } else {
                    /**
                     * Copy value.
                     **/
                    textInput.val(passInput.val());
                }
                /**
                 * Run the callback function.
                 **/
                if (typeof self.o.keyup == 'function') {
                    self.o.keyup.call(this);
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
        trigger: '#showpassword-trigger',
        template: '<input class="form-control" type="text"/>',
        labelShow: 'Show password',
        labelHide: 'Hide password',
        keyup: function () {
        },
        onShow: function () {
        },
        onHide: function () {
        }
    };

})(jQuery, window, document);