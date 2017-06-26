angular.module('app').directive('modalTrackDir', function(){
    return {
        templateUrl: '../views/trackbys.html'
        , scope: '='
        , controller: 'trackBy'
    }
})

