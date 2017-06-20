angular.module('app').controller('locManage', function ($scope, locationsListSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locManageTest = 'locManage controller is connected and operational'
    $scope.locListServiceTest = locationsListSrv.locListServiceTest

    // // »»»»»»»»»»»»»»»»»»»║ LOCATION CLASSIFICATION MANIPULATION
    // .................... get list of location classes and grid information
    $scope.getLocations = () => locationsListSrv.getLocationsCustomList().then((response) => {
        // $scope.locations = response.data
        $scope.gridOptions.data = response.data
    })
    $scope.getLocations()

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: false
        , enableSelectAll: false
        , enableFiltering: true
        , columnDefs: [
            { name: 'id'}
            , { name: 'loc_desc', displayName: 'Description' }
            , { name: 'loc_class_name', displayName: 'Classification' }
            , { name: 'loc_class_desc', displayName: 'Class Desc.' }
            , { name: 'loc_container', displayName: 'Container' }
            , { name: 'x_coordinate', displayName: 'X' }
            , { name: 'y_coordinate', displayName: 'Y' }
            , { name: 'z_coordinate', displayName: 'Z' }
            , { name: 'parent_location_id', displayName: 'Parent' }
        ]
        , onRegisterApi: (gridApi) => {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected
                $scope.rowId = row.uid
                $scope.rowObj = row.entity
                $scope.enableDelete = false
                $scope.selected === true ? $scope.enableDelete = false : $scope.enableDelete = true
            })

            // ...........   update the loc class on lost focus, tab, or enter
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updateCont = rowEntity
                $scope.update($scope.updateCont)
            })
        }
    }


})