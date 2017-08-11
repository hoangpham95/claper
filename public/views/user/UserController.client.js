/**
 * Created by hpham on 8/11/17.
 */

(function() {
    angular.module("Claper")
        .controller("UserRegisterController", UserRegisterController);

    function UserRegisterController($scope, $location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            var user = vm.user;
            UserService.createUser(user)
                .success(function(res) {
                    vm.message = "Register successfully";
                    UserService.currentUser = res;
                    setTimeout(function() {
                        $location.url("/post/new");
                    }, 3000);
                }).error(function(err) {
                    console.log(err);
            });
        }
    }

})();