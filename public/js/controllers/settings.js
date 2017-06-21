angular.module('app').controller('settings', function ($scope, uiGridConstants, locationsListSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.settingsTest = 'settings controller is connected and operational'
    $scope.locListServiceTest = locationsListSrv.locListServiceTest

    // .................... get list of locations
    $scope.getLocations = () => locationsListSrv.getLocationsList().then(response => {
        $scope.locations = response.data
    })
    $scope.getLocations()

})