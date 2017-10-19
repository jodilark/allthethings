angular.module('app').service('checkUserSrv', function($http){

this.getUser = () => {
    console.log('called checkUserSrv')
    return $http.get('/auth/me')}

})