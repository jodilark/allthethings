angular.module('app').service('countryListSrv', function($http){
    // =============== TESTS
    this.countryListServiceTest = 'the countryListSrv is connected'

    // =============== ENDPOINTS
    this.getcountryList = () => ( $http.get('http://localhost:3000/api/country') )
})