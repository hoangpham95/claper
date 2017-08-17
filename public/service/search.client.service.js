/**
 * Created by hpham on 8/4/17.
 */
(function() {
    angular.module("Claper")
        .factory("SearchService", SearchService);

    function SearchService($http) {
        var searchedPosts = [];

        var api = {
            "getMajor": getMajor,
            "getMajorClasses": getMajorClasses,
            "search": search,
            "getNumberOfPosts": getNumberOfPosts
        };

        return api;

        function getMajor() {
            return $http.get('/api/major');
        }

        function getMajorClasses(major) {
            return $http.get('/api/class?major=' + major);
        }

        function search(code) {
            return $http.get('/api/post?code=' + code);
        }

        function getNumberOfPosts() {
            return $http.get('/api/posts');
        }
    }
})();
