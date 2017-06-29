angular.module('app').directive('modalUserCreateDir', function(){
    return {
        templateUrl: '../views/user_create.html'
        , scope: {}
        , controller: 'userCreate'
    }
})