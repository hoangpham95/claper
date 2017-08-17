/**
 * Created by hpham on 8/10/17.
 */

(function() {
    angular.module("Claper")
        .controller("PostListController", PostListController)
        .controller("PostNewController", PostNewController)
        .controller("PostDetailController", PostDetailController);

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
                "question": 'https://image.flaticon.com/icons/svg/3/3711.svg',
                "helper": 'https://image.flaticon.com/icons/svg/486/486391.svg',
                "application": 'https://image.flaticon.com/icons/svg/149/149338.svg',
            };

            return postTypes[post.postType];
        }

        init();
    }

    function PostNewController($scope, $rootScope, $location, $routeParams, PostService, SearchService) {
        var vm = this;
        vm.uid = $rootScope.currentUser._id;

        vm.getMajorClasses = getMajorClasses;
        vm.submit = submit;
        vm.updatingPlaces = updatingPlaces;

        vm.location = null;
        vm.map = null;
        vm.places = [];

        function init() {
            if (!$rootScope.currentUser) {
                vm.notCurrentUserError = "You must sign in to make a new post";
            }

            SearchService.getMajor()
                .success(function(majors) {
                    vm.majors = majors;
                })
                .error(function() {
                    vm.error = "User error";
                });

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(res, err) {
                    if (!err) {
                        vm.location = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
                    }
                });
            } else {
                vm.location = new google.maps.LatLng(42.3398, 71.0892); // Northeastern Uni
            }

            vm.map = new google.maps.Map(document.getElementById('ggMap'), {
                center: vm.location,
                zoom: 15
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

        function submit() {
            var post = vm.post;
            post.classCode = vm.selectedClass.code;
            post.className = vm.selectedClass.name;

            if (!parseInt(post.offerAmount)) {
                vm.error = "Your offer amount must be a number";
                return;
            }

            if (!post.classCode) {
                vm.error = "You must select your class";
                return;
            }

            if (!post.postType) {
                vm.error = "You must select type of post";
                return;
            }

            if (!post.content || post.content.length < 50) {
                vm.error = "You must write a short description about your post (minimum 50 characters)";
                return;
            }

            if (!post.offerAmount) {
                vm.error = "You must specify the offer amount";
                return;
            }

            post.author = vm.uid;
            post.place = vm.selectedPlace.formatted_address;

            vm.error = null;

            console.log(post);
            PostService.submitNewPost(post)
                .success(function(result) {
                    console.log("Success uploading post");
                    console.log(result);
                    $location.url("/post/detail/" + result._id);
                }).error(function(error) {
                    vm.error = error;
            });
        }

        function updatingPlaces() {
            if (vm.searchPlaceText && vm.searchPlaceText.length > 0) {
                var callback = function(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        vm.places = results;
                        console.log(results);
                    }
                };

                var request = {
                    location: vm.location,
                    radius: '500',
                    query: vm.searchPlaceText
                };

                service = new google.maps.places.PlacesService(vm.map);
                service.textSearch(request, callback);
            }
        }

        init();
    }

    function PostDetailController($rootScope, $routeParams, $window, PostService, UserService) {
        var vm = this;

        vm.shareFacebook = shareFacebook;
        vm.getPostTypeAvatar = getPostTypeAvatar;
        vm.like = like;
        vm.sendMail = sendMail;
        vm.isUserAdmin = isUserAdmin;

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
                href: 'www.claper-herokuapp.com/#/post/detail/' + vm.post._id
            }, function(response) {
               console.log(response);
            });
        }

        function getPostTypeAvatar(post) {
            var postTypes = {
                "question": 'https://image.flaticon.com/icons/svg/3/3711.svg',
                "helper": 'https://image.flaticon.com/icons/svg/486/486391.svg',
                "application": 'https://image.flaticon.com/icons/svg/149/149338.svg',
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

        init();
    }
})();