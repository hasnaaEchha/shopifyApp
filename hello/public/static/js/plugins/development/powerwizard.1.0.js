/*
 * ************************************************************* *
 * Name       : Power wizard                                     *
 * Date       : Feb 2013                                         *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2014-01-19 23:17:34 UTC+02:00                    *
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

    var pluginName = 'powerWizard';

    function Plugin(element, options) {

        /**
         * Variables.
         **/
        this.obj = $(element);
        this.o = $.extend({}, $.fn[pluginName].defaults, options);
        this.container = $(this.o.containerSelector);
        this.nextBtn = this.o.nextButtonSelector;
        this.prevBtn = this.o.prevButtonSelector;
        this.navBtn = this.o.navButtonSelector;
        this.aClass = this.o.activeClass;

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
             * Set parameter.
             **/
            self.container.attr('data-powerwizard-step', self.o.startAt);

            /**
             * Switch step method.(default = 0)
             **/
            self._switchStep(self.o.startAt);

            /**
             * Click events method.
             **/
            self._clickEvents();

            /**
             * Submit events method.
             **/
            self._submitEvents();

        },

        /**
         * Set active class.
         *
         * @param:
         **/
        _activeClass: function () {

            var self = this;

            /**
             * Get current step value method.
             *
             * @return: cur | number | Current step.
             **/
            self._currentStepVal();

            /**
             * Allow histroy.
             **/
            if (self.o.historyTitles === false) {
                self.obj.children(':gt(' + cur + ')').removeClass(self.aClass);
            }

            /**
             * Set the class(titles).
             **/
            self.obj.children(':lt(' + (cur + 1 ) + ')').addClass(self.aClass);

            /**
             * Set the class(navigation).
             **/
            if (self.container.find(self.navBtn).length > 0) {
                self.container.find(self.navBtn).children().removeClass(self.aClass).eq(cur).addClass(self.aClass);
            }
            ;

        },

        /**
         * Set disable class.
         *
         * @param: param | number | Current step.
         **/
        _disableClass: function (param) {

            var self = this;
            var total = parseInt($(self.navBtn).children().length);

            /**
             * Disable the prev button if first step is visible.
             **/
            if (param == 0) {
                $(self.prevBtn).addClass(self.o.disableClass);
            } else {
                $(self.prevBtn).removeClass(self.o.disableClass);
            }

            /**
             * Disable the next button if last step is visible.
             **/
            if (param == (total - 1)) {
                $(self.nextBtn).addClass(self.o.disableClass);
            } else {
                $(self.nextBtn).removeClass(self.o.disableClass);
            }

        },

        /**
         * Get current step value.
         *
         * @param:
         * @return: cur
         **/
        _currentStepVal: function () {
            var self = this;
            cur = parseInt($(self.o.containerSelector).attr('data-powerwizard-step'));
            return cur;
        },

        /**
         * All click events.
         *
         * @param:
         **/
        _clickEvents: function () {

            var self = this;

            /**
             * Check for touch support and set right click events.
             **/
            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                var clickEvent = 'touchstart';
            } else {
                clickEvent = 'click';
            }

            /**
             * Option to allow clickable titles.
             **/
            if (self.o.clickableTitles === true) {
                self.obj.addClass('powerwizard-clickable').on(clickEvent, ' *', function (e) {

                    var cur = parseInt($(this).index());

                    /**
                     * Validation method.
                     *
                     * @return: validation | boolean | Validation value.
                     * @param:  cur        | integer | current step
                     **/
                    self._validation((cur - 1));

                    if (validation === false) {
                        e.preventDefault();
                        return false;
                    }

                    /**
                     * Switch step method.
                     **/
                    self._switchStep(cur);

                    /**
                     * Prevent default.
                     **/
                    e.preventDefault();

                });
            }

            /**
             * Prev/next buttons(disable class not clickable).
             **/
            self.container.on(clickEvent, self.nextBtn + ',' + self.prevBtn, function (e) {
                if (!$(e.target).is('.' + self.o.disableClass) && !$(e.target).parent().is('.' + self.o.disableClass)) {

                    /**
                     * Get current step value method.
                     *
                     * @return: cur | number | Current step.
                     **/
                    self._currentStepVal();

                    /**
                     * Choose next or prev button.
                     **/
                    if ($(e.target).is(self.nextBtn) || $(e.target).parent().is(self.nextBtn)) {

                        /**
                         * Validation method.
                         *
                         * @return: validation | boolean | Validation value.
                         * @param:  cur        | integer | current step
                         **/
                        self._validation(cur);

                        if (validation === false) {
                            e.preventDefault();
                            return false;
                        }

                        var i = cur + 1;

                    } else {
                        i = cur - 1;
                    }

                    /**
                     * Switch step method.
                     **/
                    self._switchStep(i);

                }

                /**
                 * Prevent default.
                 **/
                e.preventDefault();

            });

            /**
             * Nav buttons.
             **/
            $(self.navBtn).on(clickEvent, '>', function (e) {

                /**
                 * Get current step value method.
                 **/
                self._currentStepVal();

                /**
                 * Validation method.
                 *
                 * @return: validation | boolean | validation value.
                 * @param:  cur        | integer | current step
                 **/
                self._validation(cur);

                if (validation === false) {
                    e.preventDefault();
                    return false;
                }

                /**
                 * Switch step method.
                 **/
                self._switchStep($(this).index());

                /**
                 * Prevent default.
                 **/
                e.preventDefault();

            });
        },

        /**
         * Submit events.
         *
         * @param:
         **/
        _submitEvents: function () {

            var self = this;

            /**
             * Submit.
             **/
            $(self.o.containerSelector).on('submit', function (e) {

                /**
                 * Validation method.
                 *
                 * @return: validation | boolean | Validation value.
                 * @param:  cur        | integer | current step
                 **/
                self._validation(cur);

                if (validation === false) {
                    e.preventDefault();
                    return false;
                }

                /**
                 * CallbackData method.
                 *
                 * @return: currentStep | object | The open step.
                 **/
                self._callbackData();

                /**
                 * Ajax callback function.
                 **/
                function acFunc() {
                    if (typeof self.o.onSubmit == 'function') {
                        self.o.onSubmit.call(this, {
                            step: currentStep,
                            output: $(this).find('form').serialize()
                        });
                    }
                }

                /**
                 * If option useAjax is true.
                 **/
                if (self.o.useAjax === true) {
                    var methode = '';
                    var action = '';

                    /**
                     * Get data from form.
                     **/
                    if (container.is('form')) {
                        var form = container;
                    } else {
                        form = container.find('form');
                    }
                    if (form.attr('method')) {
                        var method = form.attr('method');
                    }
                    if (form.attr('action')) {
                        var action = form.attr('action');
                    }

                    /**
                     * Use ajax to send.
                     **/
                    $.ajax({
                        type: method,
                        url: action,
                        data: form.serialize(),
                        error: function (data) {
                            if (typeof self.o.ajaxError == 'function') {
                                self.o.ajaxError.call(this, {
                                    step: currentStep
                                });
                            }
                        },
                        success: function (data) {
                            if (typeof self.o.ajaxSuccess == 'function') {
                                self.o.ajaxSuccess.call(this, {
                                    step: currentStep
                                });
                            }
                        }
                    });

                    /**
                     * Run the callback function.
                     **/
                    acFunc();

                    /**
                     * Stop!.
                     **/
                    e.preventDefault();

                }

                /**
                 * Run the callback function.
                 **/
                acFunc();

            });
        },

        /**
         * Callback data.
         *
         * @param:
         **/
        _callbackData: function () {

            var self = this;

            /**
             * Get current step value method.
             *
             * @return: cur | number | Current step.
             **/
            self._currentStepVal();

            /**
             * Get the current step as object.
             **/
            currentStep = self.container.find(self.o.stepsSelector).eq(cur);

            return currentStep;
        },

        /**
         * Validation.
         *
         * @param: param | number | The index of the open step.
         **/
        _validation: function (param) {

            var self = this;
            validation = true;

            /**
             * CallbackData method.
             *
             * @return: currentStep | object | The open step.
             **/
            self._callbackData();

            /**
             * Validation method.
             **/
            if (typeof self.o.onValidate == 'function') {
                validation = self.o.onValidate.call(this, {
                    step: currentStep
                });
            }

            return validation;

        },

        /**
         * Switch steps.
         *
         * @param: param | number | The index of the current step.
         **/
        _switchStep: function (param) {

            var self = this;

            /**
             * Current step value method.
             **/
            self._currentStepVal();

            /**
             * Switch between the steps.
             **/
            self.container.find(self.o.stepsSelector).hide().eq(param).show();

            /**
             * Run callbacks.
             **/
            if (param != cur) {

                /**
                 * CallbackData method.
                 *
                 * @return: currentStep | object | The open step.
                 **/
                self._callbackData();

                /**
                 * Run the callback function.
                 **/
                if (typeof self.o.onSwitch == 'function') {
                    self.o.onSwitch.call(this, {
                        step: currentStep
                    });
                }

                /**
                 * Run the next or prev callback function.
                 **/
                if (param > cur) {
                    if (typeof self.o.onNext == 'function') {
                        self.o.onNext.call(this, {
                            step: currentStep
                        });
                    }
                } else {
                    if (typeof self.o.onPrev == 'function') {
                        self.o.onPrev.call(this, {
                            step: currentStep
                        });
                    }
                }

            }

            /**
             * Set parameter.
             **/
            self.container.attr('data-powerwizard-step', param);

            /**
             * Set active class method.
             **/
            self._activeClass();

            /**
             * Set disabled class method.
             **/
            self._disableClass(cur);

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
        destroy: function (param) {
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
        containerSelector: '.powerwizard-content',
        stepsSelector: '.powerwizard-step',
        nextButtonSelector: '.pw-next',
        prevButtonSelector: '.pw-prev',
        navButtonSelector: '.pw-nav',
        activeClass: 'pw-active',
        disableClass: 'pw-disable',
        clickableTitles: true,
        historyTitles: false,
        startAt: 0,
        useAjax: true,
        onNext: function () {
        },
        onPrev: function () {
        },
        onSwitch: function () {
        },
        onSubmit: function () {
        },
        ajaxSuccess: function () {
        },
        ajaxError: function () {
        },
        onValidate: function (data) {
        }
    };

}));