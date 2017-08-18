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
            "favoritePost": favoritePost,
            "getUserFavorites": getUserFavorites,
            "deleteFav": removeFavorite,
            "deleteUser": deleteUser,
            "getAllUser": getAllUser
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

        function favoritePost(postId, userId) {
            return $http.put('/api/favPost?user=' + userId + '&post=' + postId);
        }

        function getUserFavorites(userId) {
            return $http.get('/api/userFav?user=' + userId);
        }

        function removeFavorite(userId, postId) {
            return $http.put('/api/deleteFav?user=' + userId + '&post=' + postId);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/' + userId);
        }

        function getAllUser() {
            return $http.get('/api/users/all');
        }
    }

})();