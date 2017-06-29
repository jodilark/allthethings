angular.module('app').service('postUserInfoSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.serviceTest = 'the postUserInfoSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.submitUserInfo = (data) => {
        // console.log(`clicked submit and got ${JSON.stringify(data)}`)
        $http({
            url: '/api/users',
            method: 'POST',
            data: data
        })
    }
})