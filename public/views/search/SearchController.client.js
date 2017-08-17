/**
 * Created by hpham on 8/4/17.
 */
(function() {
    angular.module("Claper")
        .controller("SearchController", SearchController);

    function SearchController($location, SearchService, $mdDialog) {
        var vm = this;

        vm.getMajorClasses = getMajorClasses;
        vm.search = search;

        function init() {
            SearchService.getMajor()
                .success(function(majors) {
                    vm.majors = majors;
                })
                .error(function() {
                    vm.error = "User error";
                });

            SearchService.getNumberOfPosts()
                .success(function(number) {
                    vm.totalPosts = number;
                }).error(function(error) {
                    vm.error = error.message;
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

        function search(ev) {
            console.log(vm.selectedClass);
            if (vm.selectedClass && vm.selectedClass !== null) {
                SearchService.search(vm.selectedClass.code)
                    .success(function (posts) {
                        if (posts.length > 0) {
                            SearchService.searchedPosts = posts;
                            $location.url("/post/" + vm.selectedClass.code);
                        } else {
                            vm.error = "No class has been found."
                        }
                    }).error(function(err) {
                        console.log(err);
                })
            }
        }

        init();
    }
})();