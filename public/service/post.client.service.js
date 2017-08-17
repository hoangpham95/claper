/**
 * Created by hpham on 8/11/17.
 */

(function() {
    angular.module("Claper")
        .factory("PostService", PostService);

    function PostService($http) {
        var api = {
            "getPostById": getPostById,
            "submitNewPost": submitNewPost,
            "getAllPosts": getAllPosts,
            "pressLikeButton": pressLikeButton,
            "updatePost": updatePost,
        };

        return api;

        function getPostById(postId) {
            return $http.get('/api/post/' + postId);
        }

        function submitNewPost(post) {
            return $http.post('/api/post', post);
        }

        function getAllPosts() {
            return $http.get('/api/postAll');
        }

        function pressLikeButton(postId, isLike, userId) {
            return $http.post('/api/like?post=' + postId + '&user=' + userId, {like: isLike});
        }

        function updatePost(post) {
            return $http.put('/api/post', post);
        }
    }
})();