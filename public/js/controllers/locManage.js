angular.module('app').controller('locManage', function ($scope, locationsListSrv, locationUpdateSrv, locationDeleteSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locManageTest = 'locManage controller is connected and operational'
    $scope.locListServiceTest = locationsListSrv.locListServiceTest

    // // »»»»»»»»»»»»»»»»»»»║ LOCATION CLASSIFICATION MANIPULATION
    // .................... get list of location classes and grid information
    $scope.getLocations = () => locationsListSrv.getLocationsCustomList().then((response) => {
        $scope.gridOptions.data = response.data
    })
    $scope.getLocations()

    // .................... columns and data
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: false
        , enableSelectAll: false
        , enableFiltering: true
        , columnDefs: [
            { name: 'id', enableCellEdit: false, width: 75 }
            , { name: 'loc_desc', displayName: 'Description' }
            , { name: 'loc_class_name', displayName: 'Classification', enableCellEdit: false }
            , { name: 'loc_class_desc', displayName: 'Class Desc.', enableCellEdit: false }
            , { name: 'loc_container', displayName: 'Container', enableCellEdit: false }
            , { name: 'x_coordinate', displayName: 'X', width: 75 }
            , { name: 'y_coordinate', displayName: 'Y', width: 75 }
            , { name: 'z_coordinate', displayName: 'Z', width: 75 }
            , { name: 'parent_location_id', displayName: 'Parent', width: 110 }
        ]
        , onRegisterApi: (gridApi) => {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected
                $scope.rowId = row.uid
                $scope.rowObj = row.entity
                $scope.enableDelete = false
                $scope.selected === true ? $scope.enableDelete = false : $scope.enableDelete = true
            })

            // ...........   update the location on lost focus, tab, or enter
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updateCont = rowEntity
                // ............. drop containers and classes text from entity obj
                var gridObj = {container_id: rowEntity.container_id, id: rowEntity.id, loc_class_id: rowEntity.loc_class_id, loc_desc: rowEntity.loc_desc, parent_location_id: rowEntity.parent_location_id, x_coordinate: rowEntity.x_coordinate, y_coordinate: rowEntity.y_coordinate, z_coordinate: rowEntity.z_coordinate}
                // ............. call update
                $scope.update(gridObj)
            })
        }
    }

    // »»»»»»»»»»»»»»»»»»»║  UPDATE LOCATIONS
    $scope.update = (updateObj) => locationUpdateSrv.submitLocationInfo(updateObj)

    // »»»»»»»»»»»»»»»»»»»║  DELETE LOCATIONS
    $scope.delete = () => {
        let gridData = $scope.gridOptions.data
        let cId = $scope.rowObj.id
        if ($scope.selected === true) {
            for (let i = 0; i < gridData.length; i++) {
                if (gridData[i].id === cId) {
                    gridData.splice(i, 1)
                }
            }
            locationDeleteSrv.deleteLocation(cId)
            $scope.enableDelete = true
        }
    }

})