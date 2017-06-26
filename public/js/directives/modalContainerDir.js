angular.module('app').directive('modalContainerDir', function(){
    return {
        templateUrl: '../views/loc_container.html'
        , scope: '='
        , controller: 'locContainer'
    }
})