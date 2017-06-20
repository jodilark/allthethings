angular.module('app').service('locationUpdateSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locationUpdateServiceTest = 'the locationUpdateSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.submitLocationInfo = (data) => {
        // console.log(`data to be sent ${JSON.stringify(data)}`)
        $http({
            url: 'http://localhost:3000/api/locations/' + data.id,
            method: 'PUT',
            data: data
        })
    }
})