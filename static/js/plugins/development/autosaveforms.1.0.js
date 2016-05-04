/*
 * ************************************************************* *
 * Name       : Auto Save Form                                   *
 * Date       : January 2013                                     *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2014-01-11 15:12:25 UTC+02:00                    *
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

    var pluginName = 'autoSaveForms';

    function Plugin(element, options) {

        /**
         * Variables.
         **/
        this.obj = $(element);
        this.o = $.extend({}, $.fn[pluginName].defaults, options);
        this.form = this.obj;

        this.init();
    };

    Plugin.prototype = {

        /**
         * Code that we run at the start.
         *
         * @param:
         **/
        init: function () {

            self = this;//global

            /**
             * Check if localstorage is supported.
             **/
            storage = !!function () {
                var result,
                    uid = +new Date;
                try {
                    localStorage.setItem(uid, uid);
                    result = localStorage.getItem(uid) == uid;
                    localStorage.removeItem(uid);
                    return result;
                } catch (e) {
                }
            }() && localStorage;

            /**
             * Set an unique key.
             * Get the key.
             **/
            if (storage) {
                key = 'asf_' + location.pathname + '_' + this.form.attr('id');
                getKey = localStorage.getItem(key);
            }

            /**
             * Run methodes.
             **/
            if (storage) {

                self._restore();

                self._save();

            }

        },

        /**
         * Restore the data if data is present and timestamp is not expired.
         *
         * @param:
         **/
        _restore: function () {

            if (getKey != null) {

                var parsedKey = JSON.parse(getKey);

                $.each(parsedKey, function (i, item) {

                    /**
                     * Check for expired timestamp, otherwise
                     * set/remove checked values for checkbox and radio
                     * and values for selects, textareas and inputs.
                     **/
                    if (i == 0 && item.expireafter < new Date().getTime()) {
                        localStorage.removeItem(key);
                        return false;
                    } else if (i > 0) {
                        if ($('[name=' + item.name + ']').is(':checkbox, :radio')) {
                            self.obj.find('[name=' + item.name + ']').removeAttr('checked')
                            self.obj.find('[name=' + item.name + '][value="' + item.value + '"]').attr('checked', true);
                        } else {
                            self.obj.find('[name=' + item.name + ']').val(item.value);
                        }
                    }
                });

            }

        },

        /**
         * Save data to localstorage.
         *
         * @param:
         **/
        _save: function () {

            /**
             * Variables.
             **/
            var saveTime = self.obj.attr('data-asf-time');
            var dataExpire = self.obj.attr('data-asf-expireafter');

            /**
             * Check for dataset otherwise use option value.
             **/
            if (!saveTime || saveTime === undefined) {
                var cycle = self.o.saveTime;
            } else {
                cycle = saveTime;
            }

            /**
             * Check for dataset otherwise use option value.
             **/
            if (!dataExpire || dataExpire === undefined) {
                var expire = self.o.expireAfter;
            } else {
                expire = dataExpire;
            }

            /**
             * Start looping the saving if a field gets used.
             **/
            var saveToStorage = function () {

                setInterval(function () {

                    /**
                     * Get the values.
                     **/
                    var param = self.form.serializeArray();

                    /**
                     * Add a exparation date to the beginning of the array.
                     **/
                    param.unshift({"expireafter": new Date().getTime() + expire * 60000});

                    /**
                     * Convert array to string.
                     **/
                    var storeVal = JSON.stringify(param);

                    /**
                     * Save the data into the local storage.
                     **/
                    localStorage.setItem(key, storeVal);

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onSave == 'function') {
                        self.o.onSave.call(this, {
                            item: self.form,
                            output: self.form.serializeArray()
                        });
                    }

                }, (cycle * 1000));

                /**
                 * Only run once(unbind/reset).
                 **/
                self.form.off('focus', 'input, textarea, select', saveToStorage);
            }

            /**
             * Run if a field gets used(focus).
             **/
            self.form.on('focus', 'input, textarea, select', saveToStorage);

        },

        /**
         * Clear the data from the localstorage.
         *
         * @param: param | string | id of the form.
         **/
        clear: function (param) {
            localStorage.removeItem('asf_' + location.pathname + '_' + param);
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
        saveTime: 300,
        expireAfter: 1,
        onSave: function (ui) {
        }
    };

}));