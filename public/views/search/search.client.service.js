/**
 * Created by hpham on 8/4/17.
 */
(function() {
    angular.module("Claper")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        var api = {
            "getMajor": getMajor,
            "getMajorClasses": getMajorClasses,
            "search": search
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
    }
})();
