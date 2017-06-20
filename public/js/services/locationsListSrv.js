angular.module('app').service('locationsListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locListServiceTest = 'the locationsListSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getLocationsList = () => ($http.get('http://localhost:3000/api/locations')) 
})