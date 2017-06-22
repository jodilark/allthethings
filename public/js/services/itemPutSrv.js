angular.module('app').service('itemPutSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemPutSrvTest = 'the itemPutSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  update items
    this.updateItem = (id, data) => {
        $http({
            url: '/api/trackbys/' + id,
            method: 'PUT',
            data: data
        })
    }
})