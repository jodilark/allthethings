angular.module('app').service('deleteAllUsersSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.deleteAllUsersServiceTest = 'the deleteAllUsersSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.deleteAllUsers = function () {
        $http({
            url: '/api/user',
            method: 'DELETE'
        }).then((httpResponse) => console.log('response:', JSON.stringify(httpResponse)))
    }

})