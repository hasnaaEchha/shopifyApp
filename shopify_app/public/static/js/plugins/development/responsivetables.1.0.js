/*
 * ************************************************************* *
 * Name       : Responsive Tables                                *
 * Date       : January 2013                                     *
 * Owner      : CreativeMilk                                     *
 * Url        : www.creativemilk.net                             *
 * Version    : 1.0                                              *
 * Updated    : 2013-12-23 13:10:53 UTC+02:00                    *
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

    var pluginName = 'responsiveTables';

    function Plugin(element, options) {

        /**
         * Variables.
         **/
        this.obj = $(element);
        this.o = $.extend({}, $.fn[pluginName].defaults, options);
        this.breakpoint = this.obj.data('rt-breakpoint');
        this.tbodyTr = this.obj.children('tbody').children('tr').not(this.o.exclude);
        this.theadTr = this.obj.children('thead').children('tr').not(this.o.exclude);

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
             * Wrap table.
             **/
            self.obj.wrap('<div></div>');

            /**
             * Exclude class.
             **/
            $(self.o.exclude).addClass('rt-exclude');

            /**
             * Build the responsive part.
             **/
            self.tbodyTr.each(function (e, i) {

                var inner = '';

                $(this).children('td').addClass('rt-hide-td').each(function (e, i) {
                    inner += '<div class="rt-responsive-row">';
                    inner += '<div class="rt-responsive-th">' + $.trim(self.obj.find('thead').find('th:eq(' + e + ')').text()) + '</div>';
                    inner += '<div class="rt-responsive-td">' + $(this).html() + '</div>';
                    inner += '</div>';
                });

                $(this).append('<td class="rt-clone-td">' + inner + '</td>');

            });

            /**
             * Add a menu wrapper to the header.
             **/
            if (self.o.columnManage === true) {
                self.obj.parent().prepend('<div class="btn-group rt-menu"></div>').addClass('rt-table');
            }

            /**
             * Add a search dropdown to the menu(available in 1.1).
             **/
            if (true == false) {

                /**
                 * Build column sort menu.
                 **/
                var dropDownSearch = '<div class="btn-group">' +
                    '<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-search"></i></a>' +
                    '<div role="menu" class="dropdown-menu pull-right rt-search"><input type="text" placeholder="Search..."/>' +
                    '</div>';

                /**
                 * Show a column sort menu if set to true.
                 **/
                self.obj.parent().children('.rt-menu').prepend(dropDownSearch);

            }

            /**
             * Allow column managing.
             **/
            if (self.o.columnManage === true) {

                /**
                 * Build column sort menu.
                 **/
                var dropDownMenu =
                    '<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#">' + self.o.menuIcon + '</a>' +
                    '<ul role="menu" class="dropdown-menu pull-right rt-column-menu">' +
                    '</ul>';

                /**
                 * Show a column sort menu if set to true.
                 **/
                self.obj.parent().children('.rt-menu').append(dropDownMenu);

                /**
                 * Loop al table headers and collect data.
                 * Set data for mnenu, td and for the responsive part.
                 **/
                self.theadTr.children('th').each(function (i, e) {

                    var colNameData = $(this).data('rt-column');
                    var colHide = $(this).data('rt-hide');

                    /**
                     * Set an checked attribute if there is no dataset
                     * called 'data-rt-hide' present.
                     **/
                    if (colNameData != undefined) {
                        var colName = $.trim($(this).text());
                    } else {
                        var colName = $.trim(colNameData);
                    }

                    /**
                     * Set the column dataset 'data-rt-column' for every td and div.
                     **/
                    self.tbodyTr
                        .children('td:nth-child(' + (i + 1) + ')')
                        .attr('data-rt-column', colName)
                        .parent()
                        .children('.rt-clone-td')
                        .children('div:nth-child(' + (i + 1) + ')')
                        .attr('data-rt-column', colName);

                    /**
                     * Hide a column if it has an dataset called 'data-rt-hide'
                     * with a value 'true', and define check attribute for the
                     * checkbox located in the dropdown menu.
                     **/
                    if (colHide === true) {
                        self.obj.find('[data-rt-column="' + colName + '"]').addClass('rt-hide');
                        var ck = '';
                    } else {
                        var ck = 'checked="checked"';
                    }

                    /**
                     * Build the dropdown menu with the column names.
                     **/
                    self.obj
                        .parents('.rt-table')
                        .find('.rt-menu')
                        .find('.rt-column-menu')
                        .append('<li><label><input type="checkbox" ' + ck + ' id="' + i + '" data-rt-column="' + colName + '"/><span></span>' + colName + '</label></li>');

                });

                /**
                 * Manage columns.
                 **/
                self.obj.parent().children('.rt-menu').on('click', 'label *', function (e) {

                    var colName = $(this).data('rt-column');

                    /**
                     * Check for disabled class, if not present hide/show columns.
                     **/
                    if ($(this).hasClass('checkbox-disabled')) {
                        e.preventDefault();
                    } else {
                        if ($(this).is(':checked')) {
                            self.obj.find('[data-rt-column="' + colName + '"]').removeClass('rt-hide');
                        } else {
                            self.obj.find('[data-rt-column="' + colName + '"]').addClass('rt-hide');
                        }
                    }

                    /**
                     * Give a disabled class to the last checked checkbox,
                     * this to prevent an empty table.
                     **/
                    if ($(this).parents('ul').find(':checked').length == 1) {
                        $(this).parents('ul').find(':checked').addClass('checkbox-disabled');
                    } else {
                        $(this).parents('ul').find(':checked').removeClass('checkbox-disabled');
                    }

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.onColumnManage == 'function') {
                        self.o.onColumnManage.call(this);
                    }
                });

                /**
                 * Stop bootstrap from hiding the menu(looking for a better solution).
                 **/
                self.obj.parent().children('.rt-menu').on('click', 'label', function (e) {
                    e.stopPropagation()
                });

            }

            /**
             * Resize function, set or remove a responsive class to the table.
             **/
            function responsiveMode(width) {
                if (width < self.breakpoint) {
                    self.obj.parent().addClass('rt-compact-layout');

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.startBreakpoint == 'function') {
                        self.o.startBreakpoint.call(this, {
                            item: self.obj
                        });
                    }
                } else {
                    self.obj.parent().removeClass('rt-compact-layout');

                    /**
                     * Run the callback function.
                     **/
                    if (typeof self.o.endBreakpoint == 'function') {
                        self.o.endBreakpoint.call(this, {
                            item: self.obj
                        });
                    }
                }
            }

            /**
             * Run responsive mode function.
             **/
            responsiveMode($(window).width());

            /**
             * Run responsive mode function(resize event).
             **/
            $(window).resize(function () {
                responsiveMode($(this).width());
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
            $.removeData(this.obj, this.pluginName);
            this.obj.unwrap();
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
        columnManage: true,
        exclude: '',
        menuIcon: '<i class="fa fa-bars"></i>',
        startBreakpoint: function () {
        },
        endBreakpoint: function (obj) {
        },
        onColumnManage: function (obj) {
        }
    };

}));