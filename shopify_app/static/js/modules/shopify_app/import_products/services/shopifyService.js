/**
 * Created by hasnaa on 09/12/15.
 */

myApp.factory('ShopifyService', ['$http', function ShopifyService($http) {
    var api = {};
    api.getProducts = function (adminShop, adminToken,shop, token) {
       var http = $http.post('shopify_app/get_products/',  {adminShop:adminShop,adminToken:adminToken, shop:shop,token:token,  async: false});
       return http;
    };
    return api;
}]);
