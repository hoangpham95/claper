/**
 * Created by hpham on 8/10/17.
 */

(function() {
    angular.module("Claper")
        .controller("PostNewController", PostNewController);

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

            vm.location = new google.maps.LatLng(42.3398070,-71.0891720);

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(res, err) {
                    if (!err && res && res !== null) {
                        vm.location = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
                    }
                });
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
})();