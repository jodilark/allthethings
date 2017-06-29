angular.module('app').service('stateListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.serviceTest = 'the stateListSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getStatesList = () => ($http.get('/api/states'))
})