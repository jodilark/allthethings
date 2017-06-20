angular.module('app').controller('locCreate', function ($scope, locCreateSrv, containerSrv, locClassSrv, locationsListSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locCtrlTest = 'locCreate controller is connected and operational'
    $scope.locCreateServiceTest = locCreateSrv.locCreateServiceTest
    $scope.containerServiceTest = containerSrv.containerServiceTest
    $scope.locClassServiceTest = locClassSrv.locClassServiceTest
    $scope.locListServiceTest = locationsListSrv.locListServiceTest

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = () => document.getElementById("createLocationForm").reset()

    // »»»»»»»»»»»»»»»»»»»║  GET CONTAINER LIST 
    $scope.getContainers = () => containerSrv.getContainerList().then((response) => $scope.containers = response.data)
    $scope.getContainers()

    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION CLASSIFICATION LIST
    $scope.getLocClasses = () => locClassSrv.getLocClassesList().then((response) => $scope.locClasses = response.data)
    $scope.getLocClasses()

    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION LIST
    $scope.getLocations = () => locationsListSrv.getLocationsList().then((response) => $scope.locations = response.data)
    $scope.getLocations()

    // »»»»»»»»»»»»»»»»»»»║  CREATE A NEW LOCATION
    //  .................... objects used to post
    $scope.locClassObj = []
    $scope.containerObj = []
    $scope.locationParentObj = []
    $scope.locObj = {}
    //  .................... function to cover defaults are sent if not user didn't make selection
    $scope.setDefaults = () => {
        let cl = $scope.locClassObj.length
        let c = $scope.containerObj.length
        let p = $scope.locationParentObj.length
        cl === 0 ? $scope.locObj.loc_class_id = 1 : undefined
        c === 0 ? $scope.locObj.container_id = 1 : undefined
        p === 0 ? $scope.locObj.parent_location_id = 1 : undefined
    }
    // ....................  create location
    $scope.createLocation = () => {
        $scope.getLocations()
        $scope.locObj.loc_class_id = $scope.locClassObj.id
        $scope.locObj.container_id = $scope.containerObj.id
        $scope.locObj.parent_location_id = $scope.locationParentObj.id
        $scope.setDefaults()
        var exists = 0
        for (let i = 0; i < $scope.locations.length; i++) {
            if ($scope.locations[i].description === $scope.locObj.description && $scope.locations[i].parent_location_id === $scope.locObj.parent_location_id) {
                exists = 1
                break;
            }
            else {
                exists = 0
            }
        }
        if(exists === 1) {
            alert(`this is a duplicate`)
        }
        else {
            locCreateSrv.submitLocationInfo($scope.locObj) 
            $scope.clearForm()
        }
    }

})