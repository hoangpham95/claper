/**
 * Created by hpham on 8/11/17.
 */

(function() {
    angular.module("Claper")
        .factory("PostService", PostService);

    function PostService($http) {
        var api = {
            "getPostById": getPostById
        };

        return api;

        function getPostById() {
            console.log("Hello");
        }
    }
})();