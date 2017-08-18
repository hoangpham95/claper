(function() {
    angular.module("Claper")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;

        function init() {
            UserService.getAllUser()
                .success(function(res) {
                    vm.users = res;
                }).error(function(err) {
                    console.log(err);
            });
        }

        init();
    }
})();