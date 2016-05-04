/**
 * Created by hasnaa on 09/12/15.
 */

myApp.factory('ShopifyService', ['$http', function ImexService($http) {
    var api = {};
    api.getProducts = function () {
       var http = $http.post('shopify_app/getProducts/',  { async: false});
       return http;
    };
    return api;
}]);
