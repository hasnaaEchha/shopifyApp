/**
 * Created by hasnaa on 09/12/15.
 */

(function(){
    'use strict';

    angular.module('shopifyApp')
        .controller('ImportProductsController',['$window','$scope','$location','$timeout','ShopifyService',
            ImportProductsController]);
    function ImportProductsController($window, $scope,$location, $timeout, ShopifyService) {
    	var strParams=$location.url().split('?')[1];
        console.log(strParams);
        if(strParams){
            var params = strParams.split('&');
            var param,code,shop, timestamp1;
            for(var i=0; i<params.length;i++){
                param = params[i].split('=')
                if(param[0] == "code"){
                    code=param[1];
                }

                if(param[0]== "shop"){
                    shop=param[1];
                }
                

            }
            console.log(code);
            console.log(shop);
            ShopifyService.getProducts(shop, code).then(function(response){
                console.log(response);
            }, function(error){
                console.log(error);
            })
        }
        
            $scope.goToStore=function(){
                console.log('hello');
                $window.location=$scope.shopifyUrl+"/admin/oauth/authorize?client_id="+$scope.apiKey+"&scope=read_products&redirect_uri=http://localhost:8003"
            }    
        

    }
}());
