/*
 * ************************************************************* *
 * Name       : Tiny Context Menu                                *
 * Date       : September 2013                                   *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-27 22:18:53 UTC+02:00                    *
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

    var pluginName = 'tinyContextMenu';

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
             * Start with a right click.
             **/
            self.obj.mousedown(function (e) {
                if (e.which === 3) {

                    /**
                     * Get cursor postion.
                     **/
                    var bodyOffset = $('body').offset();
                    var posX = e.pageX - bodyOffset.left + self.o.offsetX;
                    var posY = e.pageY - bodyOffset.top + self.o.offsetY;

                    /**
                     * Show tinycontextmenu with the new position.
                     **/
                    $(self.o.container).css({left: posX, top: posY}).show();

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onShow == 'function') {
                        self.o.onShow.call(this, {
                            container: self.o.container
                        });
                    }

                    /**
                     * Disable the native contextmenu in browsers.
                     **/
                    $(this).on("contextmenu", function (e) {
                        e.preventDefault();
                    });
                }
            });

            /**
             * Hide tinycontextmenu if (right)clicked.
             **/
            $('body').on('click mousedown', function (e) {
                if ($(self.o.container).is(':visible')) {
                    if (!$(e.target).is(self.obj) || e.type == 'click') {
                        $(self.o.container).hide();
                    }

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onHide == 'function') {
                        self.o.onHide.call(this, {
                            container: self.o.container
                        });
                    }
                }
            });

            /**
             * Disable native contextmenu in browsers inside
             * the tiny contextmenu(savety first).
             **/
            $(self.o.container).on("contextmenu", function (e) {
                e.preventDefault();
            });

        },

        /**
         * Update.
         *
         * @param:
         **/
        update: function () {
        },

        /**
         * Destroy.
         *
         * @param:
         **/
        destroy: function () {
            $.removeData(this.obj, this.pluginName);
            $(this.o.container).remove();
        }

    };

    $.fn[pluginName] = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);
            var options = typeof option == 'object' && option;
            if (!data) {
                $this.data(pluginName, (data = new Plugin(this, options)))
            }
            if (typeof option == 'string') {
                data[option]();
            }
        });
    };

    /**
     * Default settings(dont change).
     * You can globally override these options
     * by using $.fn.pluginName.key = 'value';
     **/
    $.fn[pluginName].defaults = {
        container: '',
        offsetX: 0,
        offsetY: 0,
        onShow: function (ui) {
        },
        onHide: function (ui) {
        }
    };

}));