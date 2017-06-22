angular.module('app').service('itemPostSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemPostSrvTest = 'the itemPostSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  create item
    this.createItem = (data) => {
        $http({
            url: '/api/trackbys/',
            method: 'POST',
            data: data
        })
    }
})