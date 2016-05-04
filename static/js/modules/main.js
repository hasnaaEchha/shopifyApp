'use strict';
var myApp = angular.module('application', ['ui.router', 'ncy-angular-breadcrumb', 'ngSanitize',
    'siyfion.sfTypeahead', 'ngCookies','shopifyApp','ngStorage']);

myApp.run(function ($rootScope, $http, $state, $location, $timeout, $window) {
    var host_url = $location.host();
    var host_port = $location.port();
    //djangoAuth.initialize('//'+host_url+':'+host_port+'/rest-auth', false);
    $rootScope.previousState;
    $rootScope.currentState;


});
