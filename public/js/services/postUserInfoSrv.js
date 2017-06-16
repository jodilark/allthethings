angular.module('app').service('postUserInfoSrv', function ($http) {
    // =============== TESTS
    this.serviceTest = 'the postUserInfoSrv is connected'

    // =============== ENDPOINTS
    this.submitUserInfo = (data) => {
        // console.log(`clicked submit and got ${JSON.stringify(data)}`)
        $http({
            url: 'http://localhost:3000/api/user',
            method: 'POST',
            data: data
        }).then(function (httpResponse) {
            console.log('response:', JSON.stringify(httpResponse));
        })
    }

})