/**
 * Created by hasnaa on 09/12/15.
 */

(function(){
    'use strict';

    angular.module('shopifyApp')
        .controller('ImportProductsController',['$window','$scope','$timeout','ShopifyService',
            ImportProductsController]);
    function ImportProductsController($window, $scope, $timeout, ShopifyService) {
        $scope.goToStore=function(){
            $window.location=$scope.shopifyUrl+"/admin/oauth/authorize?client_id="+$scope.apiKey+"&scope=read&redirect_uri=https://immense-badlands-74664.herokuapp.com"
        }

    }
}());
