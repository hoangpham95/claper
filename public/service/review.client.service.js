/**
 * Created by hpham on 8/15/17.
 */
(function() {
    angular.module("Claper")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var currentUser = null;

        var api = {
            uploadReview: uploadReview,
        };

        return api;

        function uploadReview(review) {
            return $http.post('/api/review', review);
        }
    }
})();