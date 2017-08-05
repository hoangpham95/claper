/**
 * Created by hpham on 8/4/17.
 */
(function() {
    angular.module('Claper')
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        var contentType = 'application/json;charset=utf-8';

        $httpProvider.defaults.headers.post['Content-Type'] = contentType;
        $httpProvider.defaults.headers.put['Content-Type'] = contentType;

        $routeProvider
            .when("/", {
                templateUrl: "./views/search/search.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: "./view/search/search.html",
                controller: "SearchController",
                controllerAs: "model"
            });
    }
})();