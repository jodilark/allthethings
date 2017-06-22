angular.module('app').service('itemMainSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemMainSrvTest = 'the itemMainSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get logged in user
    this.getCurrentUser = () => $http.get('/auth/me/')
})