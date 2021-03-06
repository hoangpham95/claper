/**
 * Created by hpham on 8/11/17.
 */

(function() {
    angular.module("Claper")
        .controller("UserLoginController", UserLoginController)
        .controller("UserProfileController", UserProfileController)
        .controller("UserRegisterController", UserRegisterController);

    function UserLoginController(UserService, $rootScope, $location) {
        var vm = this;
        vm.login = login;

        function login() {
            // console.log(vm.user);
            UserService.login(vm.user)
                .success(function(usr) {
                    $rootScope.currentUser = usr;
                    console.log(usr);
                    // $location.url("/post/new");
                    $location.url("/profile");
                }).error(function(err) {
                    console.log(err);
                    vm.error = "Cannot find user";
            })
        }
    }

    function UserRegisterController($rootScope, $location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            var user = vm.user;

            if (!user) {
                vm.error = "User cannot be empty";
                return;
            }

            if (!user.username) {
                vm.userNameError = "Username cannot be empty";
                return;
            }

            if (!user.password || !user.verifyPassword) {
                vm.passwordError = "Username cannot be empty";
                return;
            }

            if (!user.isSchoolOfficial) {
                vm.isSchoolOfficialError = "You must specify this";
                return;
            }

            if (!user.firstName || !user.lastName || !user.email) {
                vm.infoError = "Your info must be included";
                return;
            }

            UserService.createUser(user)
                .success(function(res) {
                    vm.message = "Register successfully";
                    // UserService.currentUser = res;
                    $rootScope.currentUser = res;
                    $location.url("/user/" + $rootScope.currentUser._id);
                }).error(function(err) {
                    console.log(err);
            });
        }
    }

    function UserProfileController($rootScope, $route, $routeParams, $location, UserService) {
        var vm = this;
        vm.uid = $routeParams.userId;

        vm.viewPost = viewPost;
        vm.isCurrentUser = isCurrentUser;
        vm.updateUser = updateUser;
        vm.deleteFav = deleteFav;
        vm.deleteUser = deleteUser;
        vm.gotoEdit = gotoEdit;
        vm.logout = logout;

        vm.isAdmin = false;

        function init() {
            if (!vm.uid) {
                vm.uid = $rootScope.currentUser._id;
            }

            if ($rootScope.currentUser) {
                vm.isAdmin = $rootScope.currentUser.isAdmin;
            }

            UserService.getUserById(vm.uid)
                .success(function(user) {
                    vm.user = user;
                }).error(function(error) {
                    vm.error = error.message;
            });

            UserService.getUserPosts(vm.uid)
                .success(function(posts) {
                    vm.userPosts = posts;
                }).error(function(error) {
                    vm.error = error.message;
            });

            UserService.getReviewsByOtherId(vm.uid)
                .success(function(reviews) {
                    console.log(reviews);
                    vm.userReviews = reviews;
                }).error(function(error) {
                    vm.error = error.message;
            });

            UserService.getUserFavorites(vm.uid)
                .success(function(posts) {
                    vm.userFavorites = posts;
                }).error(function(error) {
                    vm.error = error;
            });
        }

        function viewPost(post) {
            $location.url("/post/" + post._id);
        }

        function isCurrentUser() {
            if ($rootScope.currentUser && $rootScope.currentUser._id === vm.uid) {
                return true;
            }

            return false;
        }

        function updateUser() {
            UserService.updateUser(vm.user)
                .success(function(result) {
                    $location.url('/profile');
                }).error(function(err) {
                    console.log(err);
            })
        }

        function deleteFav(postId) {
            UserService.deleteFav(vm.uid, postId)
                .success(function(result) {
                    $route.reload();
                }).error(function (error) {
                    console.log(error);
            })
        }

        function deleteUser() {
            if (vm.user.isAdmin) {
                vm.error = "Can't delete an admin account";
                return;
            }

            UserService.deleteUser(vm.uid)
                .success(function(result) {
                    $location.url('/');
                }).error(function (error) {
                    console.log(error);
            })
        }

        function gotoEdit() {
            $location.url('/user/' + vm.uid + '/edit');

        }

        function logout() {
            UserService.logout()
                .success(function(res) {
                    $location.url('/')
                }).error(function(res) {
                    vm.error = "Cannot log out";
            })
        }

        init();
    }

})();