/**
 * Created by hasnaa on 09/12/15.
 */


(function(){
    'use strict';

    angular.module('shopifyApp')
        .controller('ImportProductsController',['$window','$scope','$location','$timeout','$localStorage','ShopifyService',
            ImportProductsController]);
    function ImportProductsController($window, $scope,$location,$timeout, $localStorage, ShopifyService) {
        var lastCat="";
        $scope.categoryIndex=0
        $scope.getCategories=function(){
            $scope.exportingProducts=true;
            $scope.$emit('loader-show');
            var start=0;
            
            $scope.getVasionCategoryTotal(s$cope.categories[0]['name']);
        };
        $scope.getVasionCategoryTotal=function(catName){
                

             ShopifyService.getVasionCategoryTotal(catName,$scope.chinavisionApiKey).then(

                 function(response){

                    $scope.creatProd(0,response['data']['total'],catName)
                    
                 },function(error){

                 })
                     
                
        };
        $scope.creatProd=function(start,total,category){
            ShopifyService.exportProductsToShopify($localStorage['shop'],$localStorage['token'],category,$scope.chinavisionApiKey,start,5).then(
                function(response){
                    $scope.startCount=$scope.startCount+5;
                    if($scope.startCount<=total){
                        $scope.creatProd($scope.startCount,total);
                    }
                    
                    else{
                        $scope.categoryIndex++;
                        $scope.getVasionCategoryTotal($scope.categories[$scope.categoryIndex])
                    }
                    
                },function(error){

                }
            )
        }

        $scope.exportProducts=function(){
            $scope.$emit('loader-show');
            $scope.exportingProducts=true;
            ShopifyService.exportProductsToShopify($localStorage['shop'],$localStorage['token'],$scope.chinavisionCategory,$scope.chinavisionApiKey).then(
                function(response){
                    $scope.$emit('loader-hide');
                    console.log(response);
                    $scope.totalImportedProducts=response['data']['count'];
                    $scope.exportingProducts=false;
                },function(error){
                    $scope.exportingProducts=false;
                    $scope.$emit('notification-show', {
                            type: 'notification',
                            level: 'error',
                            sticky: true,
                            title: 'Error',
                            text:"connection error"
                });
                $scope.$emit('loader-hide');
                })
        }
        $scope.showFromForm=false;
    	var strParams=$location.url().split('?')[1];
        console.log(strParams);
        console.log($localStorage['globalDeal']);
        if(strParams && !$localStorage['globalDeal']){
            $scope.$emit('loader-show');
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

            $localStorage['shop'] = shop;
            $localStorage['code'] = code;
            $localStorage['globalDeal']=true;
            
            ShopifyService.createToken($localStorage['shop'],$localStorage['code']).then(function(response){
                console.log(response);
                $scope.$emit('loader-hide');
                $scope.showFromForm=true;
                $localStorage['token']=response.data['token']['access_token'];
                $timeout(function(){$window.location.href = '/'},1000);
            },function(error){
                $scope.$emit('notification-show', {
                            type: 'notification',
                            level: 'error',
                            sticky: true,
                            title: 'Error',
                            text:"connection error"
                });
                $scope.$emit('loader-hide');
            });
        }
        else if($localStorage['globalDeal']) {
            $scope.showFromForm=true;
            
        }
        $scope.goToStore=function(){
            //$window.location=$scope.shopifyUrl+"/admin/oauth/authorize?client_id="+$scope.apiKey+"&scope=read_products,write_products&redirect_uri=http://0.0.0.0:8003"
            
            $window.location=$scope.shopifyUrl+"/admin/oauth/authorize?client_id="+$scope.apiKey+"&scope=read_products,write_products&redirect_uri=https://global-deal.herokuapp.com"
        };
        $scope.resetSession=function(){
            $localStorage.$reset();
            $timeout(function(){$window.location.href = '/'},1000);
        };



    }
}());

/*
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
*/
