angular.module('app').controller('locClass', function ($scope, locClassSrv, uiGridConstants, ) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locClassTest = 'locClass controller is connected and operational'
    $scope.locClassServiceTest = locClassSrv.locClassServiceTest

    // // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = () => document.getElementById("classCreateForm").reset()

    // // »»»»»»»»»»»»»»»»»»»║ LOCATION CLASSIFICATION MANIPULATION
    // .................... get list of location classes and grid information
    $scope.getLocClasses = () => locClassSrv.getLocClassesList().then((response) => {
        $scope.locClasses = response.data
        $scope.gridOptions.data = response.data
    })
    $scope.getLocClasses()

    // // .................... location classes types
    $scope.locClassObj = {}
    $scope.createLocClassObj = () => {
        $scope.gridOptions.data.push({
            "name": $scope.locClassObj.name
            , "description": $scope.locClassObj.description
        });
        // console.log(`this will be created ... ${JSON.stringify($scope.locClassObj)}`)
        locClassSrv.createLocClassObj($scope.locClassObj)
        $scope.clearForm()
    }

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: false
        , enableSelectAll: false
        , enableFiltering: true
        , columnDefs: [
            { name: 'name', displayName: 'Name' }
            , { name: 'description', displayName: 'Description' }
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

    // .................... update a location class
    $scope.update = (upObj) => {
        let cId = upObj.id
        locClassSrv.updateLocClass(cId, upObj)
    }

    // .................... delete a container
    $scope.delete = () => {
        let gridData = $scope.gridOptions.data
        let cId = $scope.rowObj.id
        if ($scope.selected === true) {
            for (let i = 0; i < gridData.length; i++) {
                if (gridData[i].id === cId) {
                    gridData.splice(i, 1)
                }
            }
            locClassSrv.deleteLocClass(cId)
        }
    }

})