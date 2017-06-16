angular.module('app').service('userListSrv', function($http){
    // =============== TESTS
    this.userServiceTest = 'the userListSrv is connected'

    // =============== ENDPOINTS
    this.getUserList = () => ( $http.get('http://localhost:3000/api/user') )
    this.getCustomUserList = () => ( $http.get('http://localhost:3000/api/users') )
})