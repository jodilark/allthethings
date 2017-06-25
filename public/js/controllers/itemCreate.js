angular.module('app').controller('itemCreate', function ($scope, bcService, itemMainSrv, itemGetSrv, itemPostSrv, itemPutSrv, itemDeleteSrv, locationsListSrv, trackByGetSrv, userListSrv, settingsSrv) {
    // // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.itemCreateTest = 'itemCreate controller is connected and operational'
    $scope.itemGetSrvTest = itemGetSrv.itemGetSrvTest
    $scope.itemPostSrvTest = itemPostSrv.itemPostSrvTest
    $scope.itemPutSrvTest = itemPutSrv.itemPutSrvTest
    $scope.itemDeleteSrvTest = itemDeleteSrv.itemDeleteSrvTest
    $scope.itemMainSrvTest = itemMainSrv.itemMainSrvTest
    // test barcode from service
    $scope.getBC = () => {
        $scope.barcode = bcService.upc
        console.log($scope.barcode)
    }

    // »»»»»»»»»»»»»»»»»»»║  VARIABLES
    $scope.itemCreateObj = {
        has_package: false
        , has_multiPiece: false
        , is_consumable: false
        , repOther: null
        , replink: null
        ,af_period: "Day"
    }
  

    $scope.trackbyValues = {}
    const itemsObj = $scope.itemCreateObj
    $scope.replink = 'replink'
    $scope.repItem = $scope.replink
    $scope.userId = {}
    const commonLocObj = { loc_id: [] }

    // .................... get current user
    $scope.currentUser = () => itemMainSrv.getCurrentUser().then(response => {
        // console.log(response.data)
        $scope.thisUser = response.data.first_name
        $scope.itemCreateObj.owner_id = response.data.id
        $scope.userId.id = response.data.id
    })
    $scope.currentUser()
    // .................... original package checkbox
    $scope.originalPackaging = () => $scope.itemCreateObj.has_package = $scope.packageStatus

    // .................... multiple piece checkbox
    $scope.multiplePieces = () => $scope.itemCreateObj.has_multiPiece = $scope.multiPiece

    // .................... consumable checkbox
    $scope.isConsumable = () => $scope.itemCreateObj.is_consumable = $scope.consumable

    // .................... sets sentimental value
    $scope.rating = 1;
    $scope.rateFunction = (rating) => $scope.itemCreateObj.sentimental_rating = rating

    // .................... sets max date allowed
    // <input id="datefield" type='date' max='2000-13-13'></input>
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("datefield").setAttribute("max", today);


    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION LIST
    $scope.getLocations = () => locationsListSrv.getLocationsList().then(response => $scope.locations = response.data)
    $scope.getLocations()

    // .................... get custom list of locations 
    $scope.getLocations = () => locationsListSrv.getLocationsCustomList().then(response => {
        var locGrid = response.data
        $scope.gridOptions.data = locGrid
    })
    $scope.getLocations()

    // .................... get default location
    $scope.getDefaultLoc = () => settingsSrv.getDefaultLocation().then(response => {
        $scope.loc = response.data[0].description;
        $scope.locid = response.data[0].location_id;
        $scope.defaultLocation = $scope.loc
        $scope.itemCreateObj.location_id = $scope.locid
    })
    $scope.getDefaultLoc()

    // »»»»»»»»»»»»»»»»»»»║ GET A LIST OF ALL TRACKBYS
    $scope.gettrackbys = () => trackByGetSrv.getTrackByList().then(response => {
        // console.log(response.data)
        $scope.trackbys = response.data
    })
    $scope.gettrackbys()

    // »»»»»»»»»»»»»»»»»»»║ GET USERS LIST
    $scope.getUsers = () => userListSrv.getCustomUserList().then(response => $scope.users = response.data)
    $scope.getUsers()

    // .................... columns and data
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: true
        , enableSelectAll: false
        , enableFiltering: true
        , columnDefs: [
            { name: 'id', enableCellEdit: false, width: 75 }, { name: 'loc_desc', displayName: 'Description' }, { name: 'loc_class_name', displayName: 'Classification' }, { name: 'loc_class_desc', displayName: 'Class Desc.' }, { name: 'loc_container', displayName: 'Container' }
        ]
        , onRegisterApi: (gridApi) => {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected
                $scope.rowId = row.uid
                $scope.rowObj = row.entity
                $scope.selected === true ? commonLocObj.loc_id.push($scope.rowObj.id) : commonLocObj.loc_id.splice(commonLocObj.loc_id.indexOf($scope.rowObj.id), 1)
                $scope.itemCreateObj.common = commonLocObj
            })
        }
    }

    $scope.locationId = () => $scope.itemCreateObj.location_id = $scope.locationOption.id

    // .................... radio control
    $scope.swapper = () => $scope.linked = !$scope.linked


    // »»»»»»»»»»»»»»»»»»»║  CREATE ITEMS
    $scope.createItem = () => {

        $scope.itemCreateObj.repItem = $scope.repItem
        let loggedInUser = $scope.itemCreateObj.owner_id
        if (loggedInUser !== $scope.userId.id) { $scope.itemCreateObj.owner_id = $scope.userId.id }
        $scope.itemCreateObj.trackbys = $scope.trackbyValues
        $scope.itemCreateObj.upc = $scope.barcode

        // console.log(itemsObj)//this is the object that will be sent to the server
        itemPostSrv.createItem(itemsObj)
    }
})