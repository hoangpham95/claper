/**
 * Created by hpham on 8/4/17.
 */
(function() {
    angular.module("Claper")
        .controller("SearchController", SearchController);

    function SearchController($location, SearchService) {
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

        function search() {
            console.log(vm.selectedClass);
            SearchService.search(vm.selectedClass.code)
                .success(function(posts) {
                    if (posts.length > 0) {
                        console.log(posts);
                    } else {
                        vm.error = "No post can be found for your class";
                    }
                })
        }

        init();
    }
})();