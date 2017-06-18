angular.module('app').service('updateUserSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.updateUserServiceTest = 'the updateUserSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.updateUser = (id, data) => {
        $http({
            url: 'http://localhost:3000/api/users/' + id,
            method: 'PUT',
            data: data
        }).then((httpResponse) => console.log('response:', JSON.stringify(httpResponse)))
    }
})

