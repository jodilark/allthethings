angular.module('app').service('locCreateSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locCreateServiceTest = 'the locCreateSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.submitLocationInfo = (data) => {
        $http({
            url: 'http://localhost:3000/api/locations',
            method: 'POST',
            data: data
        })
    }
})