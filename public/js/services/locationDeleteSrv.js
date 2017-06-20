angular.module('app').service('locationDeleteSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locationDeleteServiceTest = 'the locationDeleteSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  delete loc_classes
    this.deleteLocation = (id) => {
        $http({
            url: 'http://localhost:3000/api/locations/' + id,
            method: 'DELETE'
        })
    }
})