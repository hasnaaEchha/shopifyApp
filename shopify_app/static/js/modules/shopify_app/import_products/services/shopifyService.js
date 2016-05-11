/**
 * Created by hasnaa on 09/12/15.
 */

myApp.factory('ShopifyService', ['$http', function ShopifyService($http) {
    var api = {};
    api.getProducts = function (adminShop, adminToken,shop, token) {
       var http = $http.post('shopify_app/get_products/',  {adminShop:adminShop,adminToken:adminToken, shop:shop,token:token,  async: false});
       return http;
    };
    api.getInvasionCategories = function (apiKey) {
       var http = $http.post('shopify_app/get_invasion_categories/',  {apiKey:apiKey,async: false});
       return http;
    };
    api.createToken = function (shop,code) {
       var http = $http.post('shopify_app/create_token/',  {shop:shop,code:code,async: false});
       return http;
    };
    api.exportProductsToShopify = function (shop,token,categoryName,apiKey,start,count) {
       var http = $http.post('shopify_app/export_products/',  {shop:shop,token:token,categoryName:categoryName,apiKey:apiKey,start:start,count:count,async: false});
       return http;
    };
    api.getVasionCategoryTotal = function (categoryName,apiKey) {
       var http = $http.post('shopify_app/getInvasionCategoryTotal/',  {categoryName:categoryName,apiKey:apiKey,async: false});
       return http;
    };
    return api;
}]);
