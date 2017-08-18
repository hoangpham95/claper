/**
 * Created by hpham on 8/4/17.
 */
(function () {
    angular.module('Claper')
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        var contentType = 'application/json;charset=utf-8';

        $httpProvider.defaults.headers.post['Content-Type'] = contentType;
        $httpProvider.defaults.headers.put['Content-Type'] = contentType;

        $routeProvider
            .when("/", {
                templateUrl: "./views/search/search-material.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: "./views/search/search.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/post/:classCode", {
                templateUrl: "./views/post/post-list.html",
                controller: "PostListController",
                controllerAs: "model"
            })
            .when("/posts/all", {
                templateUrl: "./views/post/post-list.html",
                controller: "PostListController",
                controllerAs: "model",
            })
            .when("/register", {
                templateUrl: "./views/user/user-register.html",
                controller: "UserRegisterController",
                controllerAs: "model"
            })
            .when("/posts/new", {
                templateUrl: "./views/post/post-new.html",
                controller: "PostNewController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/login", {
                templateUrl: "./views/user/user-login.html",
                controller: "UserLoginController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "./views/user/user-profile.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/post/detail/:postId", {
                templateUrl: "./views/post/post-detail.html",
                controller: "PostDetailController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/post/edit/:postId", {
                templateUrl: "./views/post/post-edit.html",
                controller: "PostEditController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/post/:postId/review/new", {
                templateUrl: "./views/review/review-new.html",
                controller: "ReviewNewController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/profile", {
                templateUrl: "./views/user/user-profile.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/profile/edit", {
                templateUrl: "./views/user/user-edit.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            });
    }
    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin')
            .success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve(user);
                } else {
                    deferred.reject(user);
                    $location.url('/login');
                }
            });
        return deferred.promise;
    }
})();