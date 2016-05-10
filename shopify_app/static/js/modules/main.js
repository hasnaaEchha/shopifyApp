'use strict';
var myApp = angular.module('application', ['ui.router', 'ncy-angular-breadcrumb', 'ngSanitize',
    'siyfion.sfTypeahead', 'ngCookies','shopifyApp','ngStorage']);

myApp.run(function ($rootScope, $http, $state, $location, $timeout, $window,$cookies) {
    

});
myApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs}}';
    }]);