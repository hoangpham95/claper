/**
 * Created by hpham on 8/17/17.
 */

(function() {
    angular.module("Claper")
        .controller("PostEditController", PostEditController);

    function PostEditController($rootScope, $location, $routeParams, PostService) {
        var vm = this;
        vm.updatingPlaces = updatingPlaces;
        vm.updatePost = updatePost;

        function init() {
            var postId = $routeParams.postId;
            PostService.getPostById(postId)
                .success(function(res) {
                    vm.post = res;
                    if ($rootScope.currentUser && $rootScope.currentUser !== null) {
                        vm.isNotPostFromCurrentUser = $rootScope.currentUser._id !== res.author;
                    }
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

        function updatingPlaces() {
            if (vm.searchPlaceText && vm.searchPlaceText.length > 0) {
                var callback = function(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        vm.places = results.map(function(item) {
                            return item.formatted_address;
                        });
                        console.log(vm.places);
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

        function updatePost() {
            PostService.updatePost(vm.post)
                .success(function(post) {
                    $location.url('/post/detail/' + post._id);
                }).error(function(err) {
                    console.log(err);
            })
        }

        init();
    }
})();
