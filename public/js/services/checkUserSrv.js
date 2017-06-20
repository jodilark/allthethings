angular.module('app').service('checkUserSrv', function($http){

this.getUser = () => $http.get('http://localhost:3000/auth/me')

})