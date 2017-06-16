angular.module('app', ['ui.router', 'ui.grid'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/', "")
        $stateProvider
            .state('home', {
                templateUrl: '../views/home.html',
                url: '/'
            })
            .state('dashboard', {
                templateUrl: '../views/dashboard.html',
                url: '/dashboard',
            })
            .state('user_create', {
                templateUrl: '../views/user_create.html',
                url: '/user_create',
                controller: 'userCreate'
            })
            .state('user_manage', {
                templateUrl: '../views/user_manage.html',
                url: '/user_manage',
                controller: 'userManage'
            })
    })