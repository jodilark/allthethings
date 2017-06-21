angular.module('app').controller('settings', function ($scope, uiGridConstants, locationsListSrv, settingsSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.settingsTest = 'settings controller is connected and operational'
    $scope.locListServiceTest = locationsListSrv.locListServiceTest
    // »»»»»»»»»»»»»»»»»»»║  VARIABLES 
    $scope.defaultLocation
    $scope.loc
    var sendArr = {}

    // »»»»»»»»»»»»»»»»»»»║  DATABASE CALLS
    // .................... get list of locations
    $scope.getLocations = () => locationsListSrv.getLocationsList().then(response => $scope.locations = response.data)
    $scope.getLocations()

    // .................... get default location
    $scope.getDefaultLoc = () => settingsSrv.getDefaultLocation().then(response => { 
        $scope.loc = response.data[0].description;
        $scope.locid = response.data[0].id
         $scope.defaultLocation = $scope.loc })
    $scope.getDefaultLoc()

    // .................... will convert to update default location
    $scope.updateDefault = () => {
        var dl = $scope.defaultLocation
        if (typeof dl === 'string') {
            // console.log(dl)
            sendArr.d_location_id = $scope.locid
        }
        else {
            // console.log(dl.description)
            sendArr.d_location_id = dl.id
        }        
        console.log(sendArr) //this is what we will send to the db PUT
        settingsSrv.updateDefaultLocation(sendArr)
    }
})