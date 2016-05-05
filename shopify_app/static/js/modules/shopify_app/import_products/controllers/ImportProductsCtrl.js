/**
 * Created by hasnaa on 09/12/15.
 */

(function(){
    'use strict';

    angular.module('shopifyApp')
        .controller('ImportProductsController',['$window','$scope','$location','$localStorage','ShopifyService',
            ImportProductsController]);
    function ImportProductsController($window, $scope,$location, $localStorage, ShopifyService) {


    	var strParams=$location.url().split('?')[1];
        console.log(strParams);
        if(strParams){
            var params = strParams.split('&');
            var param,code,shop;
            for(var i=0; i<params.length;i++){
                param = params[i].split('=');
                if(param[0] == "code"){
                    code=param[1];
                }

                if(param[0]== "shop"){
                    shop=param[1];
                }

                

            }
            if(!$localStorage['globalDeal']){
                console.log('global deal')
                $localStorage['shop'] = shop;
                $localStorage['code'] = code;
                $localStorage['globalDeal']=true;
            }
            else{
                ShopifyService.getProducts($localStorage['shop'],$localStorage['code'],shop, code).then(function(response){
                    console.log(response);
                }, function(error){
                    console.log(error);
                })
            }
        }
        
        $scope.goToStore=function(){
            $window.location=$scope.shopifyUrl+"/admin/oauth/authorize?client_id="+$scope.apiKey+"&scope=read_products,write_products&redirect_uri=https://global-deal.herokuapp.com"
        };
        $scope.resetSession=function(){
            console.log('reset');
            $localStorage.$reset()
        }


    }
}());
