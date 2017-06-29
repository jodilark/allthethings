angular.module('app').controller('itemManage', function ($scope, bcService, $interval, itemGetSrv, itemPostSrv, itemPutSrv, itemDeleteSrv, userListSrv, locationsListSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.itemManageTest = 'itemManage controller is connected and operational'
    $scope.itemGetSrvTest = itemGetSrv.itemGetSrvTest
    $scope.itemPostSrvTest = itemPostSrv.itemPostSrvTest
    $scope.itemPutSrvTest = itemPutSrv.itemPutSrvTest
    $scope.itemDeleteSrvTest = itemDeleteSrv.itemDeleteSrvTest
    // VARIABLES
    var ddList = []
    var ddLocList = []
    var rtnUsers = []
    var rtnLocs = []
    var nuid = 0
    var nlid = 0
    var useFrequency = [{ id: 'Day', value: 'Day' }, { id: 'Week', value: 'Week' }, { id: 'Month', value: 'Month' }, { id: 'Year', value: 'Year' }]
    var betterBool = [{ id: true, value: true }, { id: false, value: false }]

    // .................... get item grid list
    $scope.getGridData = () => itemGetSrv.getItemCustomList().then((response) => $scope.gridOptions.data = response.data)
    $scope.getGridData()

    // .................... get list of users

    $scope.getUserList = () => userListSrv.getUserList().then((response) => {
        rtnUsers = response.data
        let droplist = rIndex => {
            let tempArr = {}
            tempArr.id = rIndex.first_name
            tempArr.value = rIndex.first_name
            ddList.push(tempArr)
        }
        rtnUsers.map(droplist)
    })
    $scope.getUserList()

    // .................... get list of Locaitons

    $scope.getLocaitonList = () => locationsListSrv.getLocationsList().then((response) => {
        rtnLocs = response.data
        let droplist = rIndex => {
            let tempArr = {}
            tempArr.id = rIndex.description
            tempArr.value = rIndex.description
            ddLocList.push(tempArr)
        }
        rtnLocs.map(droplist)
    })
    $scope.getLocaitonList()


    // .................... columns and data
    const minW = 75
    const maxW = 500
    const wid = 150

    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: false
        , multiSelect: false
        , enableSelectAll: false
        , enableGridMenu: true
        , enableFiltering: true
        , infiniteScrollRowsFromEnd: 25
        , infiniteScrollUp: true
        , infiniteScrollDown: true
        , columnDefs: [
            { name: 'id', displayName: 'Id', enableCellEdit: false, minWidth: minW, width: 75, maxWidth: maxW, pinnedLeft: true }
            , { name: 'Owner', displayName: 'Owner', editableCellTemplate: 'ui-grid/dropdownEditor', minWidth: minW, width: 75, maxWidth: maxW, editDropdownValueLabel: 'value', editDropdownOptionsArray: ddList, pinnedLeft: true }
            , { name: 'short_name', minWidth: minW, width: 200, maxWidth: maxW, pinnedLeft: true }
            , { name: 'qty', type: 'number', minWidth: minW, width: 75, maxWidth: maxW, pinnedLeft: true }
            , { name: 'description', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'date_added', type: 'date', cellFilter: 'date', minWidth: minW, width: 250, maxWidth: maxW }
            , { name: 'upc', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'frequency_period', displayName: 'Frequency of Use Period', editableCellTemplate: 'ui-grid/dropdownEditor', minWidth: minW, width: wid, maxWidth: maxW, editDropdownOptionsArray: useFrequency }
            , { name: 'frequency_qty', type: 'number', displayName: 'Times Per Period', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'img', displayName: 'Image', enableCellEdit: false, minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'is_consumable', displayName: 'Consumable', editableCellTemplate: 'ui-grid/dropdownEditor', minWidth: minW, width: wid, maxWidth: maxW, editDropdownOptionsArray: betterBool }
            , { name: 'is_part', displayName: 'Part', editableCellTemplate: 'ui-grid/dropdownEditor', minWidth: minW, width: wid, maxWidth: maxW, editDropdownOptionsArray: betterBool }
            , { name: 'last_accessed', type: 'date', cellFilter: 'date', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'locationDescription', editableCellTemplate: 'ui-grid/dropdownEditor', minWidth: minW, width: 250, maxWidth: maxW, editDropdownValueLabel: 'value', editDropdownOptionsArray: ddLocList }
            // , { name: 'locationID', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'original_package', displayName: 'Have Package', editableCellTemplate: 'ui-grid/dropdownEditor', minWidth: minW, width: wid, maxWidth: maxW, editDropdownOptionsArray: betterBool }
            , { name: 'other_common_loc_json', minWidth: minW, width: '100%', maxWidth: maxW }
            // , { name: 'parent_item_id', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'purchase_date', type: 'date', cellFilter: 'date', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'purchase_price', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'purchase_reason', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'purchase_retailer', minWidth: minW, width: wid, maxWidth: maxW }
            // , { name: 'replace_radio_default', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'replacement_comment', minWidth: minW, width: 250, maxWidth: maxW }
            , { name: 'replacement_link', cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{ COL_FIELD }}" target="_blank">View Item</a></div>', minWidth: minW, width: 250, maxWidth: maxW }
            , { name: 'resale_value', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'sentimental_rating', type: 'number', minWidth: minW, width: 200, maxWidth: maxW }
            , { name: 'trackby_json', displayName: 'Track-By', minWidth: minW, width: '100%', maxWidth: maxW }
            // , { name: 'userID', minWidth: minW, width: wid, maxWidth: maxW }
            , { name: 'warrenty_period_in_days', displayName: 'Warrenty (days)', type: 'number', minWidth: minW, width: wid, maxWidth: maxW }
        ]

        , onRegisterApi: (gridApi) => {
            $scope.gridApi = gridApi;

            // interval of zero just to allow the directive to have initialized
            $interval(function () {
                gridApi.core.addToGridMenu(gridApi.grid, []);
            }, 0, 1);

            gridApi.core.on.columnVisibilityChanged($scope, function (changedColumn) {
                $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
            });

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
                let rei = rowEntity.id
                // ............. validation for owner, location, qty
                let reo = rowEntity.Owner
                let rel = rowEntity.locationDescription
                let newUsersId = rtnUsers.filter((el, ind, arr) => { if (el.first_name === reo) { nuid = el.id } })
                let newLocationsId = rtnLocs.filter((el, ind, arr) => { if (el.description === rel) { nlid = el.id } })
                let newQuantity = (qty) => {
                    let nqty = 0
                    qty < 0 ? nqty = qty / 0 : nqty = qty
                    return nqty;
                }
                var nIQty = newQuantity(rowEntity.qty)
                var nFQty = newQuantity(rowEntity.frequency_qty)
                var nWQty = newQuantity(rowEntity.warrenty_period_in_days)
                var nSRQty = newQuantity(rowEntity.sentimental_rating)
                var gridObj = { Owner: rowEntity.Owner, date_added: rowEntity.date_added, description: rowEntity.description, frequency_period: rowEntity.frequency_period, frequency_qty: nFQty, id: rowEntity.id, img: rowEntity.img, is_consumable: rowEntity.is_consumable, is_part: rowEntity.is_part, last_accessed: rowEntity.last_accessed, locationDescription: rowEntity.locationDescription, locationID: nlid, original_package: rowEntity.original_package, other_common_loc_json: rowEntity.other_common_loc_json, parent_item_id: rowEntity.parent_item_id, purchase_date: rowEntity.purchase_date, purchase_price: rowEntity.purchase_price, purchase_reason: rowEntity.purchase_reason, purchase_retailer: rowEntity.purchase_retailer, qty: nIQty, replace_radio_default: rowEntity.replace_radio_default, replacement_comment: rowEntity.replacement_comment, replacement_link: rowEntity.replacement_link, resale_value: rowEntity.resale_value, sentimental_rating: nSRQty, short_name: rowEntity.short_name, trackby_json: rowEntity.trackby_json, upc: rowEntity.upc, userID: nuid, warrenty_period_in_days: nWQty }
                // ............. call update
                $scope.update(rei, gridObj)
            })
        }
    }

    // »»»»»»»»»»»»»»»»»»»║  UPDATE ITEMS
    $scope.update = (id, updateObj) => itemPutSrv.updateItem(id, updateObj)


// .................... variables
$scope.barcode
$scope.storeBarcode = () => bcService.storeBarcode($scope.barcode)

// .................... quagga barcode scanner
var Quagga = window.Quagga;
var resultsArr = []
var counter = resultsArr.length
var App = {
    _lastResult: null,
    init: function () {
        this.attachListeners();
    },
    activateScanner: function () {
        var scanner = this.configureScanner('.overlay__content'),
            onDetected = function (result) {
                resultsArr.push(result.codeResult.code)
                counter = resultsArr.length
                // console.log("On Detected :", resultsArr)
                // console.log("counter = ", counter)
                if (counter === 10) {
                    var mc = mostCommon(resultsArr)
                    console.log("most common", mc)
                    $scope.barcode = mc
                    $scope.storeBarcode()
                    $scope.$apply()
                    $scope.stoppy()
                    $scope.showBarcodeWindow = false
                    $scope.$apply()
                    snd.play()
                }
            }.bind(this),
            stop = function () {
                scanner.stop();  // should also clear all event-listeners?
                scanner.removeEventListener('detected', onDetected);
                this.hideOverlay();
                this.attachListeners();
            }.bind(this);

        this.showOverlay(stop);
        console.log("activateScanner");
        scanner.addEventListener('detected', onDetected).start();
    },
    showOverlay: function (cancelCb) {
        $scope.showBarcodeWindow = true
        $scope.$apply()
        document.querySelector('.container ')
            .classList.add('hide');
        document.querySelector('.overlay--inline')
            .classList.add('show');
        $scope.stoppy = () => {
            cancelCb();
        };
    },
    attachListeners: function () {
        var button = document.querySelector('button.scan'),
            self = this;

        button.addEventListener("click", function clickListener(e) {
            e.preventDefault();
            button.removeEventListener("click", clickListener);
            self.activateScanner();
        });
    },
    hideOverlay: function () {
        document.querySelector('.container ')
            .classList.remove('hide');
        document.querySelector('.overlay--inline')
            .classList.remove('show');
        $scope.showBarcodeWindow = false
    },
    configureScanner: function (selector) {
        var scanner = Quagga
            .decoder({ readers: ['ean_reader'] })
            .locator({ patchSize: 'medium' })
            .fromSource({
                target: selector,
                constraints: {
                    width: 600,
                    height: 600,
                    facingMode: "environment"
                }
            });
        return scanner;
    }
};
App.init();

// .................... take results array and get the average
const mostCommon = (arr) => {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop()
}
// .................... play a sound
var snd = new Audio("../audio/cameraOne.wav")

// .................... hide / show playback window
$scope.showBarcodeWindow = false

})