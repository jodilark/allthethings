angular.module('app').service('locCreateSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locCreateServiceTest = 'the locCreateSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.submitLocationInfo = (data) => {
        $http({
            url: '/api/locations',
            method: 'POST',
            data: data
        }).then(response => alert('Location has been created.'))
    }
})