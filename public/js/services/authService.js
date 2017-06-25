angular.module('app').service('authService', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.authServiceTest = 'the authService is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.logMeIn = () => $http.get('/auth', 'Access-Control-Allow-Origin').then(response => res.send('ok'))
    this.logout = () => $http.get('/auth/logout').then(response => window.location = response.data)
})