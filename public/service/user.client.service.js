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
            "getUserById": getUserById,
            "login": login
        };

        return api;

        function getUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function login(user) {
            return $http.post("/api/user/login", user);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }
    }

})();