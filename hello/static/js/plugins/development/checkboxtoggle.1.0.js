/*
 * ************************************************************* *
 * Name       : Checkbox Toggle                                  *
 * Date       : December 2012                                    *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2014-02-10 15:45:37 UTC+02:00                    *
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

    var pluginName = 'checkboxToggle';

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

            /**
             * Check for touch support and set right click events.
             **/
            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                clickEvent = 'touchstart';
            } else {
                clickEvent = 'click';
            }

            /**
             * Variables.
             **/
            var self = this;
            var lastChecked = null;
            var orgCheckbox = '[type=checkbox]:not(:disabled)';

            /**
             * Click event.
             **/
            self.obj.on(clickEvent, orgCheckbox + ', ' + self.o.trigger, function (e) {

                /**
                 * Variables.
                 **/
                var exclude = (self.o.exclude == '' || self.o.exclude == ' ') ? 'xxxx, ' + self.o.trigger : self.o.exclude + ', ' + self.o.trigger;
                var trigger = self.obj.find(self.o.trigger);
                var checkBox = self.obj.find(orgCheckbox).not(self.o.exclude);
                var toggleType = $(this).attr('data-checkboxtoggle-only');
                var totalChecked = function () {
                    var r1 = self.obj.find(orgCheckbox + ':checked').not(exclude).length;
                    return r1;
                }
                var allChecked = function () {
                    var r2 = (self.obj.find(orgCheckbox).not(exclude).length == totalChecked()) ? true : false;
                    return r2;
                }

                /**
                 * Check between trigger or single checkbox.
                 **/
                if ($(this).is(self.o.trigger)) {

                    /**
                     * Check/un-check checkboxes(inc trigger(s)).
                     **/
                    if (toggleType == 'select') {
                        checkBox.prop('checked', true);
                        self.obj.find('[data-checkboxtoggle-only="select"]').prop('checked', true)
                            .end()
                            .find('[data-checkboxtoggle-only="unselect"]').prop('checked', false);
                    } else if (toggleType == 'unselect') {
                        checkBox.prop('checked', false);
                        self.obj.find('[data-checkboxtoggle-only="unselect"]').prop('checked', true);
                    } else {
                        if (allChecked()) {
                            checkBox.prop('checked', false);
                            self.obj.find('[data-checkboxtoggle-only="unselect"]').prop('checked', true);
                        } else {
                            checkBox.prop('checked', true);
                            self.obj.find('[data-checkboxtoggle-only="select"]').prop('checked', true)
                                .end()
                                .find('[data-checkboxtoggle-only="unselect"]').prop('checked', false);
                        }
                    }

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onToggle == 'function') {
                        self.o.onToggle.call(this, {
                            item: $(this),
                            allChecked: allChecked(),
                            totalChecked: totalChecked()
                        });
                    }

                    /**
                     * Savety for anchors.
                     **/
                    if ($(this).is('a')) {
                        e.preventDefault();
                    }

                } else {

                    /**
                     * Exclude excluded elements.
                     **/
                    if (!$(this).is(self.o.exclude)) {

                        /**
                         * Last checked checkbox cant be null.
                         **/
                        if (!lastChecked) {
                            lastChecked = this;
                        }

                        /**
                         * On shift, select or unselect the checkboxes.
                         **/
                        if (self.o.allowShiftSelect && e.shiftKey) {
                            var start = checkBox.index($(this));
                            var end = checkBox.index(lastChecked);
                            for (i = Math.min(start, end); i <= Math.max(start, end); i++) {
                                if (checkBox.eq(start).is(':checked')) {
                                    checkBox.eq(i).prop('checked', true);
                                } else {
                                    checkBox.eq(i).prop('checked', false);
                                }

                                /**
                                 * Run the callback function.
                                 **/
                                if (typeof self.o.onToggle == 'function') {
                                    self.o.onToggle.call(this, {
                                        item: checkBox.eq(i),
                                        allChecked: allChecked(),
                                        totalChecked: totalChecked()
                                    });
                                }
                            }
                            lastChecked = $(this);
                        }

                        /**
                         * Set the trigger to checked/unchecked if all checkboxes are
                         * checked without the trigger.
                         **/
                        if (allChecked()) {
                            trigger.not('[data-checkboxtoggle-only="unselect"]').prop('checked', true);
                        } else {
                            trigger.prop('checked', false);
                        }

                        /**
                         * If an unselect-only-trigger is present set to select when all checkboxes are unchecked.
                         **/
                        if (totalChecked() == 0) {
                            self.obj.find('[data-checkboxtoggle-only="unselect"]').prop('checked', true);
                        }

                        /**
                         * Run the callback function.
                         **/
                        if (typeof self.o.onSelect == 'function') {
                            self.o.onSelect.call(this, {
                                item: $(this),
                                allChecked: allChecked(),
                                totalChecked: totalChecked()
                            });
                        }

                    }
                }
            });
        },

        /**
         * Update.
         *
         * @param:
         **/
        update: function () {
        },

        /**s
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
        trigger: '.checkbox-master',
        exclude: '',
        allowShiftSelect: true,
        onToggle: function (ui) {
        },
        onSelect: function (ui) {
        }
    };

}));