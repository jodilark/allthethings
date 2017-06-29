angular.module('app').service('userListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.userServiceTest = 'the userListSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getUserList = () => ($http.get('/api/users'))
    this.getCustomUserList = () => ($http.get('/api/users/custom'))
})