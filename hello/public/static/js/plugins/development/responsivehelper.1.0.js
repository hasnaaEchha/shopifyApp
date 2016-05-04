/*
 * ************************************************************* *
 * Name       : Responsive helper                                *
 * Date       : June 2013                                        *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-22 17:50:46 UTC+02:00                    *
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

    var pluginName = 'responsiveHelper';

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
             * Run resize method.
             **/
            self._resize();

        },

        /**
         * Set method.
         *
         * @param:
         **/
        _set: function () {

            var self = this;
            var countWidth = null;

            self.obj.each(function (e, i) {

                var container = $(this);
                var containerClass = self.o.containerClass;
                var childrenClass = self.o.childrenClass;
                var fallbackParam = 'data-rh-width';
                var breakPoint = 'data-breakpoint';

                /**
                 * Get total width of all children elements.
                 **/
                $(this).children().each(function (e, i) {
                    countWidth += $(this).width();
                });

                /**
                 * Get dataset 'breakpoint' value if not use container width.
                 **/
                if (container.attr(breakPoint)) {
                    var containerWidth = container.attr('data-breakpoint');
                } else {
                    var containerWidth = $(this).width();
                }

                /**
                 * Choose between the prev set totalwidth or the current
                 * totalwidth. This is needed because once set the total
                 * width will always be bigger as the set elements can
                 * contain a class that will have a width:100% or display:block.
                 **/
                if (container.attr(fallbackParam)) {
                    var totalWidth = $(this).attr(fallbackParam);
                } else {
                    var totalWidth = countWidth;
                }

                /**
                 * Set or reset the container/children elements.
                 **/
                if (totalWidth > containerWidth) {

                    if (containerClass.length > 1) {
                        container.addClass(containerClass);
                    }
                    if (childrenClass.length > 1) {
                        container.children().addClass(childrenClass);
                    }

                    /**
                     * Set fallback parameter.
                     **/
                    container.attr(fallbackParam, totalWidth);

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.inResponsiveMode == 'function') {
                        self.o.inResponsiveMode.call(this, {
                            item: container
                        });
                    }

                } else {

                    if (containerClass.length > 1) {
                        container.removeClass(containerClass);
                    }
                    if (childrenClass.length > 1) {
                        container.children().removeClass(childrenClass);
                    }

                    /**
                     * Remove fallback parameter.
                     **/
                    container.removeAttr(fallbackParam);

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.outResponsiveMode == 'function') {
                        self.o.outResponsiveMode.call(this, {
                            item: container
                        });
                    }
                }
            });
        },

        /**
         * Resize event. This alos runs on page load!
         *
         * @param:
         **/
        _resize: function () {

            var self = this;

            $(window).resize(function (e) {

                /**
                 * Run set method.
                 **/
                self._set();
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
        containerClass: '',
        childrenClass: '',
        inResponsiveMode: function (ui) {
        },
        outResponsiveMode: function (ui) {
        },
        onResize: function (ui) {
        }
    };

}));