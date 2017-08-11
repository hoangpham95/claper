/**
 * Created by hpham on 8/11/17.
 */

(function() {
    angular.module("Claper")
        .controller("UserLoginController", UserLoginController)
        .controller("UserProfileController", UserProfileController)
        .controller("UserRegisterController", UserRegisterController);

    function UserLoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login() {
            // console.log(vm.user);
            UserService.login(vm.user)
                .success(function(usr) {
                    UserService.currentUser = usr;
                    console.log(usr);
                    // $location.url("/post/new");
                    $location.url("/user/" + usr._id);
                }).error(function(err) {
                    vm.error = err.message;
            })
        }
    }

    function UserRegisterController($scope, $location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            var user = vm.user;
            UserService.createUser(user)
                .success(function(res) {
                    vm.message = "Register successfully";
                    // UserService.currentUser = res;
                    console.log(res);
                    $location.url("/user/" + res._id);
                }).error(function(err) {
                    console.log(err);
            });
        }
    }

    function UserProfileController($routeParams, UserService) {
        var vm = this;
        vm.uid = $routeParams.userId;

        function init() {
            UserService.getUserById(vm.uid)
                .success(function(user) {
                    vm.user = user;
                }).error(function(error) {
                    vm.error = error.message;
            });
        }

        init();
    }

})();