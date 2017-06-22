angular.module('app').controller('itemCreate', function ($scope, itemGetSrv, itemPostSrv, itemPutSrv, itemDeleteSrv, locationsListSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.itemCreateTest = 'itemCreate controller is connected and operational'
    $scope.itemGetSrvTest = itemGetSrv.itemGetSrvTest
    $scope.itemPostSrvTest = itemPostSrv.itemPostSrvTest
    $scope.itemPutSrvTest = itemPutSrv.itemPutSrvTest
    $scope.itemDeleteSrvTest = itemDeleteSrv.itemDeleteSrvTest

    // »»»»»»»»»»»»»»»»»»»║  VARIABLES
    $scope.itemCreateObj = { has_package: false }
    const itemsObj = $scope.itemCreateObj
    $scope.originalPackaging = () => {
        $scope.itemCreateObj.has_package = $scope.packageStatus
    }
    $scope.repItem = 'replink'

    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION LIST
    $scope.getLocations = () => locationsListSrv.getLocationsList().then(response => $scope.locations = response.data)
    $scope.getLocations()

    // »»»»»»»»»»»»»»»»»»»║ LOCATION CLASSIFICATION MANIPULATION
    // .................... get list of location classes and grid information
    $scope.getLocations = () => locationsListSrv.getLocationsCustomList().then(response => $scope.gridOptions.data = response.data)
    $scope.getLocations()

    // .................... columns and data
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: true
        , enableSelectAll: true
        , enableFiltering: true
        , columnDefs: [
            { name: 'id', enableCellEdit: false, width: 75 }
            , { name: 'loc_desc', displayName: 'Description' }
            , { name: 'loc_class_name', displayName: 'Classification', enableCellEdit: false }
            , { name: 'loc_class_desc', displayName: 'Class Desc.', enableCellEdit: false }
            , { name: 'loc_container', displayName: 'Container', enableCellEdit: false }
        ]
        , onRegisterApi: (gridApi) => {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected
                $scope.rowId = row.uid
                $scope.rowObj = row.entity
            })
        }
    }

    // »»»»»»»»»»»»»»»»»»»║  CREATE ITEMS
    $scope.createItem = () => {
        $scope.itemCreateObj.location = $scope.locationId.id
        console.log(itemsObj)//this is the object that will be sent to the server

    }
})