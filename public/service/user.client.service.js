/**
 * Created by hpham on 8/11/17.
 */
(function() {
    angular.module("Claper")
        .factory("UserService", UserService);

    function UserService($http) {

        var currentUser = null;

        var api = {
            "createUser": createUser,
            "getUserById": getUserById
        };

        return api;

        function getUserById() {
            console.log("Hello!");
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }
    }

})();