angular.module('app').service('authService', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.authServiceTest = 'the authService is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.logout = () => $http.get('/auth/logout').then(response => window.location = response.data)
})