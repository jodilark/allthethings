angular.module('app').service('itemPutSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemPutSrvTest = 'the itemPutSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  update items
    this.updateItem = (id, data) => {
        // console.log("the id in the srv is :", data)
        $http({
            url: '/api/items/' + id,
            method: 'PUT',
            data: data
        })
    }
})