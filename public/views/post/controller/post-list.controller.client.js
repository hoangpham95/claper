/**
 * Created by hpham on 8/10/17.
 */

(function() {
    angular.module("Claper")
        .controller("PostListController", PostListController);

    function PostListController($location, $routeParams, SearchService, PostService) {
        var vm = this;
        vm.posts = SearchService.searchedPosts;
        vm.classCode = $routeParams.classCode;

        vm.getPostTypeAvatar = getPostTypeAvatar;

        function init() {
            if (!vm.classCode) {
                // this means view all post
                vm.title = "All posts";
                PostService.getAllPosts()
                    .success(function(result) {
                        console.log(result);
                        vm.posts = result;
                    }).error(function(err) {
                        vm.error = err.message;
                })
            } else {
                vm.title = "Search result for: " + vm.classCode;
                if (!vm.posts || vm.posts.length == 0) {
                    SearchService.search(vm.classCode)
                        .success(function (posts) {
                            if (posts.length > 0) {
                                vm.posts = posts;
                            } else {
                                vm.error = "No post can be found for your class";
                            }
                        });
                }
            }
        }

        function getPostTypeAvatar(post) {
            var postTypes = {
                "question": 'https://image.flaticon.com/icons/svg/237/237188.svg',
                "helper": 'https://image.flaticon.com/icons/svg/486/486391.svg',
                "application": 'https://www.flaticon.com/premium-icon/icons/svg/238/238033.svg',
            };

            return postTypes[post.postType];
        }

        init();
    }
})();