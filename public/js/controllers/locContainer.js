angular.module('app').controller('locContainer', function ($scope, containerSrv, uiGridConstants, ) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locContainerTest = 'locContainerTest controller is connected and operational'
    $scope.containerServiceTest = containerSrv.containerServiceTest

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = () => document.getElementById("containerCreateForm").reset()

    // »»»»»»»»»»»»»»»»»»»║ CONTAINER MANIPULATION
    // .................... get list of container types and grid information
    $scope.getContainers = () => containerSrv.getContainerList().then((response) => {
        $scope.containers = response.data
        $scope.gridOptions.data = response.data
    })
    $scope.getContainers()

    // .................... create container types
    $scope.container = {}
    $scope.createContainer = () => {
        $scope.gridOptions.data.push({
            "name": $scope.container.name
        });
        // console.log(`this will be created ... ${JSON.stringify($scope.container)}`)
        containerSrv.createContainer($scope.container)
        $scope.clearForm()
    }


    // .................... update container types

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: false
        , enableSelectAll: false
        , enableFiltering: true
        , columnDefs: [
            { name: 'name', displayName: 'Description' }
        ]
        , onRegisterApi: (gridApi) => {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected
                $scope.rowId = row.uid
                $scope.rowObj = row.entity
                $scope.enableDelete = false
                $scope.selected === true ? $scope.enableDelete = false : $scope.enableDelete = true
            })

            // ...........   update the user on lost focus, tab, or enter
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updateCont = rowEntity
                $scope.update($scope.updateCont)
            })
        }
    }

    // .................... update a container
    $scope.update = (upObj) => {
        let cId = upObj.id
        containerSrv.updateContainer(cId, upObj)
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
            containerSrv.deleteContainer(cId)
        }
    }

})