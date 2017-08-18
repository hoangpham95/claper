(function() {
    angular.module("Claper")
        .controller("PostDetailController", PostDetailController);

    function PostDetailController($rootScope, $location, $routeParams, $window, PostService, UserService) {
        var vm = this;

        vm.shareFacebook = shareFacebook;
        vm.getPostTypeAvatar = getPostTypeAvatar;
        vm.like = like;
        vm.sendMail = sendMail;
        vm.isUserAdmin = isUserAdmin;
        vm.deletePost = deletePost;
        vm.favorite = favorite

        function init() {
            var postId = $routeParams.postId;

            PostService.getPostById(postId)
                .success(function(res) {
                    vm.post = res;

                    if ($rootScope.currentUser) {
                        vm.isCurrentUser = vm.post.author === $rootScope.currentUser._id;
                    } else {
                        vm.isCurrentUser = false;
                    }

                    UserService.getUserById(vm.post.author)
                        .success(function(user) {
                            vm.author = user;
                        }).error(function(error) {
                        vm.error = error.message;
                    });


                }).error(function(err) {
                vm.error = err.message;
            });

            PostService.getAllPosts()
                .success(function(result) {
                    console.log(result);
                    vm.posts = result;
                }).error(function(err) {
                vm.error = err.message;
            });
        }

        function shareFacebook() {
            FB.ui({
                method: 'share',
                href: 'www.claper.herokuapp.com/#/post/detail/' + vm.post._id
            }, function(response) {
                console.log(response);
            });
        }

        function getPostTypeAvatar(post) {
            var postTypes = {
                "question": 'https://image.flaticon.com/icons/svg/237/237188.svg',
                "helper": 'https://image.flaticon.com/icons/svg/486/486391.svg',
                "application": 'https://www.flaticon.com/premium-icon/icons/svg/238/238033.svg',
            };

            return postTypes[post.postType];
        }

        function like(isPressingLike) {
            PostService.pressLikeButton(vm.post._id, isPressingLike, $rootScope.currentUser._id)
                .success(function(result) {
                    console.log("Result" + JSON.stringify(result));
                }).error(function(err) {
                console.log(err);
            })
        }

        function sendMail() {
            var subject = "About your post: " + vm.post.classCode;
            $window.open('mailto:' + vm.author.email +"?subject=" + subject, "_self");
        }

        function isUserAdmin() {
            return $rootScope.currentUser && $rootScope.currentUser.isAdmin;
        }

        function deletePost() {
            PostService.deletePost(vm.post)
                .success(function(res) {
                    $location.url('/posts/all');
                }).error(function(err) {
                console.log(err);
            })
        }

        function favorite() {
            if (vm.post.favorite && vm.post.favorite.indexOf(vm.post._id)) {
                vm.note = "You've already favorite this post";
                return;
            } else {
                console.log("Fav");
                UserService.favoritePost(vm.post._id, $rootScope.currentUser._id)
                    .success(function(res) {
                        $location.url('/profile');
                    }).error(function(err) {
                    console.log(err);
                });
            }
        }

        init();
    }
})();