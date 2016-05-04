/*
 * ************************************************************* *
 * Name       : Bootstrap tabs extend                            *
 * Date       : December 2012                                    *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-22 14:00:14 UTC+02:00                    *
 * Developer  : Mark                                             *
 * Dependency : bootstrap tabs                                   *
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

    var pluginName = 'bootstrapTabsExtend';

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
             * Responsive mode.
             **/
            self._responsive();

            /**
             * Load AJAX.
             **/
            self._ajax();

        },

        /**
         * Responsive mode method.
         *
         * @param:
         **/
        _responsive: function (update) {

            var self = this;

            /**
             * Responsivemode function.
             **/
            function responsiveMode() {

                var bar = self.obj;
                var barTotal = bar.width();
                var tabTotal = 0;
                var breakpoint = bar.attr('data-tabs-breakpoint');

                /**
                 * Count the total tabs width.
                 **/
                bar.children('li').each(function () {
                    tabTotal += $(this).width();
                });

                /**
                 * If the tabs total width is bigger than the bar width
                 * add responsive mode class.
                 **/
                if (tabTotal > barTotal) {
                    bar.addClass(self.o.responsiveClass).attr('data-tabs-breakpoint', tabTotal);
                }

                /**
                 * Check for the set breakpoint, if smaller than the bar width
                 * remove the responsive mode class.
                 **/
                if (breakpoint && $.trim(breakpoint) && breakpoint < barTotal) {
                    bar.removeClass(self.o.responsiveClass).removeAttr('data-tabs-breakpoint');
                }

            }

            if (self.o.responsive === true) {

                /**
                 * Run responsivemode function(window resize).
                 **/
                $(window).resize(function () {
                    responsiveMode();
                });
            }
        },

        /**
         * Ajax load method.
         *
         * @param:
         **/
        _ajax: function () {

            var self = this;

            /**
             * AJAX load function.
             **/
            function loadAjax(tab) {

                var dataLoad = tab.data('tabs-load');
                var source = tab.attr("href");

                if (dataLoad && $.trim(dataLoad) && !tab.hasClass('ajax-is-loaded')) {
                    $(source).load(dataLoad, function (response, status, xhr) {
                        if (status == "error") {
                            $(source).html(xhr.status + " " + xhr.statusText);
                        } else {
                            tab.addClass('ajax-is-loaded');
                        }

                        /**
                         * Run the callback function.
                         **/
                        if (typeof self.o.onLoad == 'function') {
                            self.o.onLoad.call(this, response, status, xhr);
                        }
                    });
                }

            }

            /**
             * Preload all AJAX files if set to true, otherwise
             * check if the active tab is AJAX loaded if so load.
             **/
            if (self.o.preloadAjax === true) {
                self.obj.find('a').each(function () {
                    loadAjax($(this));
                });
            } else {

                // works with button groups to
                var activeTab = self.obj.find('.active');

                if (self.obj.hasClass('ext-tabs-btn-group')) {
                    loadAjax(activeTab);
                } else {
                    loadAjax(activeTab.children());
                }
            }

            /**
             * Load AJAX (click).
             **/
            self.obj.on('click', 'a', function (e) {

                loadAjax($(this));

                e.preventDefault();

            });
        },

        /**
         * Update.
         *
         * @param:
         **/
        update: function () {
            var self = this;
        },

        /**
         * Destroy.
         *
         * @param:
         **/
        destroy: function () {
            var self = this;
            $(self.obj).removeattr('data-tabs-breakpoint');
            $.removeData(self.obj, self.pluginName);
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
        responsive: true,
        responsiveClass: 'ext-tabs-responsive-mode',
        preloadAjax: false,
        onLoad: function () {
        }
    };

}));