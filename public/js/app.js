angular.module('app', ['ui.router', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/', "")
        // .......................  authorization
        var authentication = {
            authenticate: ($state, checkUserSrv) => {
                checkUserSrv.getUser().then((response) => {
                    if (!response.data.isFirstTime) {
                        event.preventDefault()
                        $state.go('dashboard')
                    }
                }).catch(error => {
                    event.preventDefault()
                    $state.go('home')
                })
            }
        }
        $stateProvider
            .state('home', {
                templateUrl: '../views/home.html',
                url: '/'
            })
            .state('dashboard', {
                templateUrl: '../views/dashboard.html',
                url: '/dashboard',
                resolve: authentication
            })
            .state('user_create_new', {
                templateUrl: '../views/user_create.html',
                url: '/user_create_new',
                controller: 'userCreate',
                resolve: {
                    authenticate: ($state, checkUserSrv) => {
                        checkUserSrv.getUser().then((response) => {
                            if (!response.data.isFirstTime) {
                                event.preventDefault()
                                $state.go('dashboard')
                            }
                        }).catch(error => {
                            event.preventDefault()
                            $state.go('home')
                        })
                    }
                }
            })
            .state('user_create', {
                templateUrl: '../views/user_create.html',
                url: '/user_create',
                controller: 'userCreate',
                resolve: authentication
            })
            .state('user_manage', {
                templateUrl: '../views/user_manage.html',
                url: '/user_manage',
                controller: 'userManage',
                resolve: authentication
            })
            .state('location_create', {
                templateUrl: '../views/location_create.html',
                url: '/location_create',
                controller: 'locCreate',
                resolve: authentication
            })
            .state('loc_container', { // MOVE INTO MODAL
                templateUrl: '../views/loc_container.html',
                url: '/loc_container',
                controller: 'locContainer',
                resolve: authentication
            })
            .state('loc_class', { // MOVE INTO MODAL
                templateUrl: '../views/loc_class.html',
                url: '/loc_class',
                controller: 'locClass',
                resolve: authentication
            })
            .state('location_manage', {
                templateUrl: '../views/location_manage.html',
                url: '/location_manage',
                controller: 'locManage',
                resolve: authentication
            })
            .state('trackbys', { // MOVE INTO MODAL
                templateUrl: '../views/trackbys.html',
                url: '/trackbys',
                controller: 'trackBy',
                resolve: authentication
            })
            .state('settings', { // MOVE INTO MODAL
                templateUrl: '../views/settings.html',
                url: '/settings',
                controller: 'settings',
                resolve: authentication
            })
    })