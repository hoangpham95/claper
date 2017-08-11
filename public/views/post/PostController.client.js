/**
 * Created by hpham on 8/10/17.
 */

(function() {
    angular.module("Claper")
        .controller("PostController", PostController)
        .controller("PostNewController", PostNewController);

    function PostController($location, $routeParams, SearchService) {
        var vm = this;
        vm.posts = SearchService.searchedPosts;
        vm.classCode = $routeParams.classCode;

        vm.viewPost = viewPost;

        function init() {
            if (!vm.posts || vm.posts.length == 0) {
                SearchService.search(vm.classCode)
                    .success(function(posts) {
                        if (posts.length > 0) {
                            vm.posts = posts;
                        } else {
                            vm.error = "No post can be found for your class";
                        }
                    });
            }
        }

        function viewPost(post) {
            console.log("View post");
            console.log(post);
        }

        init();
    }

    function PostNewController($http, $location, PostService, SearchService, UserService) {
        var vm = this;
        vm.googlePlacesAPIKey = 'AIzaSyDfdxtsGVkYua4URRetPRufRmPRELktpc8';

        vm.getMajorClasses = getMajorClasses;

        function init() {
            // if (!UserService.currentUser) {
            //     $location.url("/user/login");
            //     return;
            // }

            console.log("Current User: " + UserService.currentUser);
            SearchService.getMajor()
                .success(function(majors) {
                    vm.majors = majors;
                })
                .error(function() {
                    vm.error = "User error";
                });
        }

        function getMajorClasses() {
            SearchService.getMajorClasses(vm.selectedMajor)
                .success(function(classes) {
                    vm.classes = classes;
                })
                .error(function () {
                    vm.error = "Cannot get classes";
                });
        }

        init();
    }
})();