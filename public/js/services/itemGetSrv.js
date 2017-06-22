angular.module('app').service('itemGetSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemGetSrvTest = 'the itemGetSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get items
    this.getItemList = () => $http.get('/api/trackbys/')
})