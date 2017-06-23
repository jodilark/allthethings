angular.module('app').directive('trackByDir', function (trackByGetSrv) {
  return {
    restrict: 'E'
    , link: (scope, elem, attr) => {
      // // .................... get list of trackby types and grid information
      // $scope.gettrackbys = () => trackByGetSrv.getTrackByList().then((response) => {
      //   $scope.trackbys = response.data
      // })
      // $scope.gettrackbys()
      // < div ng-repeat="trackby in trackbys" >
      //     <input type="text" placeholder="trackby.[name]" ng-model="trackby.value">
      // </div>
    }
  };
});