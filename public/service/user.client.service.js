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
            "login": login,
            "getUserPosts": getUserPosts,
            "getReviewsByOtherId": getReviewsByOtherId,
            "updateUser": updateUser,
        };

        return api;

        function getUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function createUser(user) {
            return $http.post("/api/register", user);
        }

        function getUserPosts(userId) {
            return $http.get("/api/posts/" + userId);
        }

        function getReviewsByOtherId(id) {
            return $http.get('/api/user/' + id + '/reviews');
        }

        function updateUser(user) {
            return $http.put('/api/user', user);
        }
    }

})();