angular.module('app').service('locationsListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locListServiceTest = 'the locationsListSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getLocationsList = () => ($http.get('/api/locations')) 
    this.getLocationsCustomList = () => ($http.get('/api/locations/custom')) 
})