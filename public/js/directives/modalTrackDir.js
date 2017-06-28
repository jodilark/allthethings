angular.module('app').directive('modalTrackDir', function(modalService){
    return {
        templateUrl: '../views/trackbys.html'
        , scope: {}
        , controller: 'trackBy'
    }
})

