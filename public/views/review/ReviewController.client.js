/**
 * Created by hpham on 8/15/17.
 */
(function() {
    angular.module("Claper")
        .controller("ReviewNewController", ReviewNewController);

    function ReviewNewController($routeParams, $location, UserService, PostService, ReviewService) {
        var vm = this;
        vm.ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        vm.submit = submit;
        vm.review = {};

        function init() {
            vm.postId = $routeParams.postId;

            PostService.getPostById(vm.postId)
                .success(function(post) {
                    vm.post = post;
                    vm.review.classCode = post.classCode;
                    UserService.getUserById(vm.post.author)
                        .success(function(user) {
                            vm.user = user;
                            vm.review.about = vm.user._id;
                        }).error(function(error) {
                        vm.error = vm.error + error.message;
                    })
                }).error(function(error) {
                    vm.error = error.message;
            });
        }

        function submit() {
            console.log(vm.review);
            ReviewService.uploadReview(vm.review)
                .success(function(result) {
                    console.log("Successfully upload review: " + JSON.stringify(result));
                    $location.url("/user/" + vm.user._id);
                }).error(function(error) {
                    console.log(error);
                    vm.error = error.message;
            });
        }

        init();
    }
})();