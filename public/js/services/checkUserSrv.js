angular.module('app').service('checkUserSrv', function($http){

this.getUser = () => $http.get('/auth/me')

})