angular.module('app').service('itemPostSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemPostSrvTest = 'the itemPostSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  create item
    this.createItem = (data) => {
        console.log('the data in itemPostSrv is: ', data)
        $http({
            url: '/api/items',
            method: 'POST',
            data: data
        })
    }
})