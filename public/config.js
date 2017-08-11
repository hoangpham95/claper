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
                templateUrl: "./views/search/search.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: "./views/search/search.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/posts/:classCode", {
                templateUrl: "./views/post/post-list.html",
                controller: "PostController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "./views/user/user-register.html",
                controller: "UserRegisterController",
                controllerAs: "model"
            })
            .when("/user/:userId/post/new", {
                templateUrl: "./views/post/post-new.html",
                controller: "PostNewController",
                controllerAs: "model"
            })
            .when("/user/login", {
                templateUrl: "./views/user/user-login.html",
                controller: "UserLoginController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "./views/user/user-profile.html",
                controller: "UserProfileController",
                controllerAs: "model"
            });
    }
})();