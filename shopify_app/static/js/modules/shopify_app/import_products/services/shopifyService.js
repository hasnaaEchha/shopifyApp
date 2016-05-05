/**
 * Created by hasnaa on 09/12/15.
 */

myApp.factory('ShopifyService', ['$http', function ImexService($http) {
    var api = {};
    api.getProducts = function (shop, token) {
       var http = $http.post('shopify_app/get_products/',  {shop:shop,token:token,  async: false});
       return http;
    };
    return api;
}]);
