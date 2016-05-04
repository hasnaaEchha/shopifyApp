/*
 * ************************************************************* *
 * Name       : Slide to unlock                                  *
 * Date       : Feb 2013                                         *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-21 23:54:14 UTC+02:00                    *
 * Developer  : Mark                                             *
 * Dependency : jQuery UI core                                   *
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

    var pluginName = 'lockScreen';

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

            $('body').addClass('lockscreen-ready');

            /**
             * Choose type.
             **/
            if (self.o.type == 'slider') {

                /**
                 * Build and append the slider.
                 **/
                self.obj.append('<div class="lockscreen-slider">'
                + '<div class="lockscreen-slider-inner">'
                + '<div class="lockscreen-slider-text">' + self.o.unlockText + '</div>'
                + '</div>'
                + '</div>');

                /**
                 * Slider function
                 **/
                self._slider();

            } else if (self.o.type == 'button') {

                /**
                 * Build and append the slider.
                 **/
                self.obj.append('<div class="lockscreen-button">'
                + '<a href="#" class="btn btn-default">' + self.o.submitText + '</a>'
                + '</div>');

                /**
                 * Button function
                 **/
                self._button();

            } else {

                /**
                 * Build and append the form.
                 **/
                self.obj.append('<form action="" class="lockscreen-form">'
                + '<input type="password" class="lockscreen-password form-control" placeholder="' + self.o.unlockText + '"/>'
                + '<input type="submit" value="' + self.o.submitText + '" class="btn btn-default btn-block lockscreen-submit"/>'
                + '</form>');

                /**
                 * Form function
                 **/
                self._form();

            }
        },

        /**
         * Slider.
         *
         * @param:
         **/
        _slider: function (param) {

            var self = this;

            /**
             * Define variable.
             **/
            var uText = self.obj.find('.lockscreen-slider-text');

            /**
             * Build the slider.
             **/
            self.obj.find('.lockscreen-slider-inner').slider({
                value: 1,
                slide: function (event, ui) {

                    /**
                     * Set the opacity of the unlock text.
                     **/
                    uText.css("opacity", (1.0 - (ui.value / 50.0)));

                },
                start: function () {

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.start == 'function') {
                        self.o.start.call(this);
                    }

                },
                stop: function (event, ui) {

                    /**
                     * Reset all if not unlocked.
                     **/
                    if (ui.value >= self.o.unlockAt) {
                        setTimeout(function () {

                            /**
                             * Run the callback function.
                             **/
                            if (typeof self.o.success == 'function') {
                                self.o.success.call(this);
                            }

                            /**
                             * Reset text opacity.
                             **/
                            uText.css("opacity", 1.0);

                            /**
                             * Reset handle position.
                             **/
                            self.obj.find('.ui-slider-handle').css({left: 0});

                            return false
                        }, self.o.delayUnlock);

                    } else {
                        self.obj.find('.ui-slider-handle').animate({left: 0}, 200);
                        uText.css("opacity", 1.0);

                        /**
                         * Run the callback function.
                         **/
                        if (typeof self.o.fail == 'function') {
                            self.o.fail.call(this);
                        }
                    }
                }
            });

            /**
             * Handle variable.
             **/
            var handle = self.obj.find('.ui-slider-handle');

            /**
             * Insert a icon into the handle.
             **/
            if (handle.children('i')) {
                handle.append('<i class="fa fa-chevron-right"></i>');
            }
        },

        /**
         * Form.
         *
         * @param:
         **/
        _form: function (param) {

            var self = this;

            /**
             * On submit use AJAX to validate.
             **/
            self.obj.find('form').submit(function () {
                if (self.o.formAction != '' && self.o.formAction != ' ') {
                    var input = $(this).find('input').not('[type=submit]');
                    if (input.val().length >= self.o.minChar) {
                        $.ajax({
                            type: "POST",
                            data: self.obj.find('.lockscreen-password').val(),
                            url: self.o.formAction,
                            statusCode: {
                                404: function () {
                                    alert("File not found(formAction)");
                                }
                            },
                            start: function () {
                                /**
                                 * Run the callback function.
                                 **/
                                if (typeof self.o.start == 'function') {
                                    self.o.start.call(this);
                                }
                            },
                            success: function () {
                                setTimeout(function () {
                                    /**
                                     * Reset.
                                     **/
                                    input.val('');
                                    /**
                                     * Run the callback function.
                                     **/
                                    if (typeof self.o.success == 'function') {
                                        self.o.success.call(this);
                                    }
                                }, self.o.delayUnlock);
                            },
                            error: function () {
                                /**
                                 * Run the callback function.
                                 **/
                                if (typeof self.o.fail == 'function') {
                                    self.o.fail.call(this);
                                }
                            }
                        });

                        return false;
                    } else {
                        /**
                         * Run the callback function.
                         **/
                        if (typeof self.o.fail == 'function') {
                            self.o.fail.call(this);
                        }
                        return false;
                    }
                } else {
                    alert("The option 'formAction' is empty!");
                    return false;
                }
            });

        },

        /**
         * Button.
         *
         * @param:
         **/
        _button: function (param) {

            var self = this;

            self.obj.on('click', '.lockscreen-button a', function (e) {

                /**
                 * Run the callback function.
                 **/
                if (typeof self.o.start == 'function') {
                    self.o.start.call(this);
                }

                setTimeout(function () {
                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.success == 'function') {
                        self.o.success.call(this);
                    }
                }, self.o.delayUnlock);

                e.preventDefault();
            });
        },

        /**
         * Update...
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
        type: 'slider',
        unlockText: 'Unlock',
        delayUnlock: 200,
        unlockAt: 100,
        submitText: 'Login',
        formAction: '',
        minChar: 3,
        start: function () {
        },
        fail: function () {
        },
        success: function () {
        }     //slider/form/button
    };


}));