angular.module('app').controller('trackBy', function ($scope, uiGridConstants, trackByGetSrv, trackByPostSrv, trackByPutSrv, trackByDeleteSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.trackByTest = 'trackBy controller is connected and operational'
    $scope.trackByGetSrvTest = trackByGetSrv.trackByGetSrvTest
    $scope.trackByPostSrvTest = trackByPostSrv.trackByPostSrvTest
    $scope.trackByPutSrvTest = trackByPutSrv.trackByPutSrvTest
    $scope.trackByDeleteSrvTest = trackByDeleteSrv.trackByDeleteSrvTest

    // »»»»»»»»»»»»»»»»»»»║  MODAL CONTROLS
    $scope.modalShownTrackby = false
    $scope.showTrackbyModal = () => $scope.modalShownTrackby = true
    $scope.hideTrackbyModal = () => {
        $scope.clearForm()
        $scope.trackByObj.trackby_name= ""
        $scope.trackByObj.trackby_value = ""
        $scope.trackByObj.trackby_category = ""
        $scope.modalShownTrackby = false
    }

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = () => document.getElementById("trackbyForm").reset()

    // »»»»»»»»»»»»»»»»»»»║ TRACKBY MANIPULATION
    // .................... get list of trackby types and grid information
    $scope.gettrackbys = () => trackByGetSrv.getTrackByList().then((response) => {
        $scope.trackbys = response.data
        $scope.gridOptions.data = response.data
        // console.log(`gridOptions.data = ${JSON.stringify(response.data)}`)
    })
    $scope.gettrackbys()

    // .................... create trackby types
    $scope.trackByObj = {}
    $scope.createTrackBy = () => {
        $scope.gridOptions.data.push({
            "trackby_name": $scope.trackByObj.trackby_name
            , "trackby_value": $scope.trackByObj.trackby_value
            , "trackby_category": $scope.trackByObj.trackby_category
        });
        trackByPostSrv.createTrackBy($scope.trackByObj)

        $scope.clearForm()
    }


    // .................... update trackby types

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: false
        , enableSelectAll: false
        , enableFiltering: true
        , columnDefs: [
            { name: 'id', enableCellEdit: false }
            , { name: 'trackby_name', displayName: 'Name' }
            , { name: 'trackby_value', displayName: 'Value' }
            , { name: 'trackby_category', displayName: 'Category' }
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

    // .................... update a trackby
    $scope.update = (upObj) => {
        let cId = upObj.id
        trackByPutSrv.updateTrackBy(cId, upObj)
    }

    // .................... delete a trackby
    $scope.delete = () => {
        let gridData = $scope.gridOptions.data
        let cId = $scope.rowObj.id
        if ($scope.selected === true) {
            for (let i = 0; i < gridData.length; i++) {
                if (gridData[i].id === cId) {
                    gridData.splice(i, 1)
                }
            }
            trackByDeleteSrv.deleteTrackBy(cId)
            $scope.enableDelete = true
        }
    }

})