'use strict';

var shopifyApp = angular.module('shopifyApp', ['ui.router', 'ncy-angular-breadcrumb', 'ngSanitize', 'siyfion.sfTypeahead', 'ngCookies','ngStorage']);

shopifyApp.run(function ($rootScope, $http, $state, $location, $timeout, $window) {

});

shopifyApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        includeAbstract: true
    });
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('shopifyApp', {
            url: "/shopifyApp",
            params: {orders: null, keys: null},
            //abstract: true,
            template: "<ui-view></ui_view>",
            ncyBreadcrumb: {
                label: 'Global Deal',
                parent: 'home'
            },
            data: {
                pageTitle: 'Global Deal'
            }
        })

        .state('shopifyApp.Setting', {
            url: '/setting',
            params: {pageTitle: 'Settings'},
            templateUrl: 'templates/shopify_app/settings/homeSetting.html',
            ncyBreadcrumb: {
                label: 'setting',
                parent: 'shopifyApp'
            },
            data: {
                pageTitle: 'Settings'
            }
        })
        .state('shopifyApp.imexSettings', {
            abstract: true,
            url: '/setting',
            template: '<ui-view>'
        })
        .state('shopifyApp.imexSettings.keys', {
            url: '/connection',
            templateUrl: 'templates/shopify_app/settings/imexSettings.html',
            controller: 'ImexSettingController',
            ncyBreadcrumb: {
                label: 'Imex Setting',
                parent: 'shopifyApp.Setting'
            },
            data: {
                pageTitle: 'Settings: Imex KEYs'
            }
        })
        .state('home', {
            url: '/',
            templateUrl: 'templates/shopify_app/import_products/importProducts.html',
            controller:"ImportProductsController"
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);