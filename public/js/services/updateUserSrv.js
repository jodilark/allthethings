angular.module('app').service('updateUserSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.updateUserServiceTest = 'the updateUserSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.updateUser = (id, data) => {
        $http({
            url: '/api/users/' + id,
            method: 'PUT',
            data: data
        })
    }
})

