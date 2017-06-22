angular.module('app').service('itemDeleteSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemDeleteSrvTest = 'the itemDeleteSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  delete items
    this.deleteItem = (id) => {
        $http({
            url: '/api/trackbys/' + id,
            method: 'DELETE'
        })
    }
})