'use strict';

angular.module('app', ['ui.router', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/', ""
    // .......................  authorization
    // var authentication = {
    //     authenticate: ($state, checkUserSrv) => {
    //         checkUserSrv.getUser().then((response) => {
    //             if (!response.data.isFirstTime) {
    //                 event.preventDefault()
    //                 $state.go('dashboard')
    //             }
    //         }).catch(error => {
    //             event.preventDefault()
    //             $state.go('home')
    //         })
    //     }
    // }
    );$stateProvider.state('home', {
        templateUrl: '../views/home.html',
        url: '/'
    }).state('dashboard', {
        templateUrl: '../views/dashboard.html',
        url: '/dashboard'
        // resolve: authentication
    }).state('user_create_new', {
        templateUrl: '../views/user_create.html',
        url: '/user_create_new',
        controller: 'userCreate'
        // resolve: authentication
    }).state('user_create', {
        templateUrl: '../views/user_create.html',
        url: '/user_create',
        controller: 'userCreate'
        // resolve: authentication
    }).state('user_manage', {
        templateUrl: '../views/user_manage.html',
        url: '/user_manage',
        controller: 'userManage'
        // resolve: authentication
    }).state('location_create', {
        templateUrl: '../views/location_create.html',
        url: '/location_create',
        controller: 'locCreate'
        // resolve: authentication
    }).state('loc_container', { // MOVE INTO MODAL
        templateUrl: '../views/loc_container.html',
        url: '/loc_container',
        controller: 'locContainer'
        // resolve: authentication
    }).state('loc_class', { // MOVE INTO MODAL
        templateUrl: '../views/loc_class.html',
        url: '/loc_class',
        controller: 'locClass'
        // resolve: authentication
    }).state('location_manage', {
        templateUrl: '../views/location_manage.html',
        url: '/location_manage',
        controller: 'locManage'
        // resolve: authentication
    }).state('trackbys', { // MOVE INTO MODAL
        templateUrl: '../views/trackbys.html',
        url: '/trackbys',
        controller: 'trackBy'
        // resolve: authentication
    }).state('settings', { // MOVE INTO MODAL
        templateUrl: '../views/settings.html',
        url: '/settings',
        controller: 'settings'
        // resolve: authentication
    }).state('item_create', { // MOVE INTO MODAL
        templateUrl: '../views/item_create.html',
        url: '/item_create',
        controller: 'itemCreate'
        // resolve: authentication
    }).state('item_manage', { // MOVE INTO MODAL
        templateUrl: '../views/item_manage.html',
        url: '/item_manage',
        controller: 'itemManage'
        // resolve: authentication
    });
});
'use strict';

angular.module('app').controller('itemCreate', function ($scope, itemGetSrv, itemPostSrv, itemPutSrv, itemDeleteSrv, locationsListSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.itemCreateTest = 'itemCreate controller is connected and operational';
    $scope.itemGetSrvTest = itemGetSrv.itemGetSrvTest;
    $scope.itemPostSrvTest = itemPostSrv.itemPostSrvTest;
    $scope.itemPutSrvTest = itemPutSrv.itemPutSrvTest;
    $scope.itemDeleteSrvTest = itemDeleteSrv.itemDeleteSrvTest;

    // »»»»»»»»»»»»»»»»»»»║  VARIABLES
    $scope.itemCreateObj = { has_package: false };
    var itemsObj = $scope.itemCreateObj;
    $scope.originalPackaging = function () {
        $scope.itemCreateObj.has_package = $scope.packageStatus;
    };
    $scope.repItem = 'replink';

    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION LIST
    $scope.getLocations = function () {
        return locationsListSrv.getLocationsList().then(function (response) {
            return $scope.locations = response.data;
        });
    };
    $scope.getLocations

    // »»»»»»»»»»»»»»»»»»»║ LOCATION CLASSIFICATION MANIPULATION
    // .................... get list of location classes and grid information
    ();$scope.getLocations = function () {
        return locationsListSrv.getLocationsCustomList().then(function (response) {
            return $scope.gridOptions.data = response.data;
        });
    };
    $scope.getLocations

    // .................... columns and data
    ();$scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        multiSelect: true,
        enableSelectAll: true,
        enableFiltering: true,
        columnDefs: [{ name: 'id', enableCellEdit: false, width: 75 }, { name: 'loc_desc', displayName: 'Description' }, { name: 'loc_class_name', displayName: 'Classification', enableCellEdit: false }, { name: 'loc_class_desc', displayName: 'Class Desc.', enableCellEdit: false }, { name: 'loc_container', displayName: 'Container', enableCellEdit: false }],
        onRegisterApi: function onRegisterApi(gridApi) {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected;
                $scope.rowId = row.uid;
                $scope.rowObj = row.entity;
            });
        }

        // »»»»»»»»»»»»»»»»»»»║  CREATE ITEMS
    };$scope.createItem = function () {
        $scope.itemCreateObj.location = $scope.locationId.id;
        console.log(itemsObj //this is the object that will be sent to the server

        );
    };
});
'use strict';

angular.module('app').controller('itemManage', function ($scope, itemGetSrv, itemPostSrv, itemPutSrv, itemDeleteSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.itemManageTest = 'itemManage controller is connected and operational';
    $scope.itemGetSrvTest = itemGetSrv.itemGetSrvTest;
    $scope.itemPostSrvTest = itemPostSrv.itemPostSrvTest;
    $scope.itemPutSrvTest = itemPutSrv.itemPutSrvTest;
    $scope.itemDeleteSrvTest = itemDeleteSrv.itemDeleteSrvTest;
});
'use strict';

angular.module('app').controller('locClass', function ($scope, locClassSrv, uiGridConstants) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locClassTest = 'locClass controller is connected and operational';
    $scope.locClassServiceTest = locClassSrv.locClassServiceTest;

    // // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = function () {
        return document.getElementById("classCreateForm").reset

        // // »»»»»»»»»»»»»»»»»»»║ LOCATION CLASSIFICATION MANIPULATION
        // .................... get list of location classes and grid information
        ();
    };$scope.getLocClasses = function () {
        return locClassSrv.getLocClassesList().then(function (response) {
            $scope.locClasses = response.data;
            $scope.gridOptions.data = response.data;
        });
    };
    $scope.getLocClasses

    // // .................... location classes types
    ();$scope.locClassObj = {};
    $scope.createLocClassObj = function () {
        $scope.gridOptions.data.push({
            "name": $scope.locClassObj.name,
            "description": $scope.locClassObj.description
        });
        // console.log(`this will be created ... ${JSON.stringify($scope.locClassObj)}`)
        locClassSrv.createLocClassObj($scope.locClassObj);
        $scope.clearForm();
    };

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        multiSelect: false,
        enableSelectAll: false,
        enableFiltering: true,
        columnDefs: [{ name: 'name', displayName: 'Name' }, { name: 'description', displayName: 'Description' }],
        onRegisterApi: function onRegisterApi(gridApi) {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected;
                $scope.rowId = row.uid;
                $scope.rowObj = row.entity;
                $scope.enableDelete = false;
                $scope.selected === true ? $scope.enableDelete = false : $scope.enableDelete = true;
            }

            // ...........   update the loc class on lost focus, tab, or enter
            );gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updateCont = rowEntity;
                $scope.update($scope.updateCont);
            });
        }

        // .................... update a location class
    };$scope.update = function (upObj) {
        var cId = upObj.id;
        locClassSrv.updateLocClass(cId, upObj);
    };

    // .................... delete a container
    $scope.delete = function () {
        var gridData = $scope.gridOptions.data;
        var cId = $scope.rowObj.id;
        if ($scope.selected === true) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].id === cId) {
                    gridData.splice(i, 1);
                }
            }
            locClassSrv.deleteLocClass(cId);
            $scope.enableDelete = true;
        }
    };
});
'use strict';

angular.module('app').controller('locContainer', function ($scope, containerSrv, uiGridConstants) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locContainerTest = 'locContainerTest controller is connected and operational';
    $scope.containerServiceTest = containerSrv.containerServiceTest;

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = function () {
        return document.getElementById("containerCreateForm").reset

        // »»»»»»»»»»»»»»»»»»»║ CONTAINER MANIPULATION
        // .................... get list of container types and grid information
        ();
    };$scope.getContainers = function () {
        return containerSrv.getContainerList().then(function (response) {
            $scope.containers = response.data;
            $scope.gridOptions.data = response.data;
        });
    };
    $scope.getContainers

    // .................... create container types
    ();$scope.container = {};
    $scope.createContainer = function () {
        $scope.gridOptions.data.push({
            "name": $scope.container.name
        });
        // console.log(`this will be created ... ${JSON.stringify($scope.container)}`)
        containerSrv.createContainer($scope.container);
        $scope.clearForm();
    };

    // .................... update container types

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        multiSelect: false,
        enableSelectAll: false,
        enableFiltering: true,
        columnDefs: [{ name: 'name', displayName: 'Description' }],
        onRegisterApi: function onRegisterApi(gridApi) {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected;
                $scope.rowId = row.uid;
                $scope.rowObj = row.entity;
                $scope.enableDelete = false;
                $scope.selected === true ? $scope.enableDelete = false : $scope.enableDelete = true;
            }

            // ...........   update the user on lost focus, tab, or enter
            );gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updateCont = rowEntity;
                $scope.update($scope.updateCont);
            });
        }

        // .................... update a container
    };$scope.update = function (upObj) {
        var cId = upObj.id;
        containerSrv.updateContainer(cId, upObj);
    };

    // .................... delete a container
    $scope.delete = function () {
        var gridData = $scope.gridOptions.data;
        var cId = $scope.rowObj.id;
        if ($scope.selected === true) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].id === cId) {
                    gridData.splice(i, 1);
                }
            }
            containerSrv.deleteContainer(cId);
            $scope.enableDelete = true;
        }
    };
});
'use strict';

angular.module('app').controller('locCreate', function ($scope, locCreateSrv, containerSrv, locClassSrv, locationsListSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locCtrlTest = 'locCreate controller is connected and operational';
    $scope.locCreateServiceTest = locCreateSrv.locCreateServiceTest;
    $scope.containerServiceTest = containerSrv.containerServiceTest;
    $scope.locClassServiceTest = locClassSrv.locClassServiceTest;
    $scope.locListServiceTest = locationsListSrv.locListServiceTest;

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = function () {
        return document.getElementById("createLocationForm").reset

        // »»»»»»»»»»»»»»»»»»»║  GET CONTAINER LIST 
        ();
    };$scope.getContainers = function () {
        return containerSrv.getContainerList().then(function (response) {
            return $scope.containers = response.data;
        });
    };
    $scope.getContainers

    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION CLASSIFICATION LIST
    ();$scope.getLocClasses = function () {
        return locClassSrv.getLocClassesList().then(function (response) {
            return $scope.locClasses = response.data;
        });
    };
    $scope.getLocClasses

    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION LIST
    ();$scope.getLocations = function () {
        return locationsListSrv.getLocationsList().then(function (response) {
            return $scope.locations = response.data;
        });
    };
    $scope.getLocations

    // »»»»»»»»»»»»»»»»»»»║  CREATE A NEW LOCATION
    //  .................... objects used to post
    ();$scope.locClassObj = [];
    $scope.containerObj = [];
    $scope.locationParentObj = [];
    $scope.locObj = {};
    //  .................... function to cover defaults are sent if not user didn't make selection
    $scope.setDefaults = function () {
        var cl = $scope.locClassObj.length;
        var c = $scope.containerObj.length;
        var p = $scope.locationParentObj.length;
        cl === 0 ? $scope.locObj.loc_class_id = 1 : undefined;
        c === 0 ? $scope.locObj.container_id = 1 : undefined;
        p === 0 ? $scope.locObj.parent_location_id = 1 : undefined;
    };
    // ....................  create location
    $scope.createLocation = function () {
        $scope.getLocations();
        $scope.locObj.loc_class_id = $scope.locClassObj.id;
        $scope.locObj.container_id = $scope.containerObj.id;
        $scope.locObj.parent_location_id = $scope.locationParentObj.id;
        $scope.setDefaults();
        var exists = 0;
        for (var i = 0; i < $scope.locations.length; i++) {
            if ($scope.locations[i].description === $scope.locObj.description && $scope.locations[i].parent_location_id === $scope.locObj.parent_location_id) {
                exists = 1;
                break;
            } else {
                exists = 0;
            }
        }
        if (exists === 1) {
            alert('this is a duplicate');
        } else {
            locCreateSrv.submitLocationInfo($scope.locObj);
            $scope.getLocations();
            $scope.clearForm();
        }
    };
});
'use strict';

angular.module('app').controller('locManage', function ($scope, locationsListSrv, locationUpdateSrv, locationDeleteSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locManageTest = 'locManage controller is connected and operational';
    $scope.locListServiceTest = locationsListSrv.locListServiceTest;

    // // »»»»»»»»»»»»»»»»»»»║ LOCATION CLASSIFICATION MANIPULATION
    // .................... get list of location classes and grid information
    $scope.getLocations = function () {
        return locationsListSrv.getLocationsCustomList().then(function (response) {
            $scope.gridOptions.data = response.data;
        });
    };
    $scope.getLocations

    // .................... columns and data
    ();$scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        multiSelect: false,
        enableSelectAll: false,
        enableFiltering: true,
        columnDefs: [{ name: 'id', enableCellEdit: false, width: 75 }, { name: 'loc_desc', displayName: 'Description' }, { name: 'loc_class_name', displayName: 'Classification', enableCellEdit: false }, { name: 'loc_class_desc', displayName: 'Class Desc.', enableCellEdit: false }, { name: 'loc_container', displayName: 'Container', enableCellEdit: false }, { name: 'x_coordinate', displayName: 'X', width: 75 }, { name: 'y_coordinate', displayName: 'Y', width: 75 }, { name: 'z_coordinate', displayName: 'Z', width: 75 }, { name: 'parent_location_id', displayName: 'Parent', width: 110 }],
        onRegisterApi: function onRegisterApi(gridApi) {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected;
                $scope.rowId = row.uid;
                $scope.rowObj = row.entity;
                $scope.enableDelete = false;
                $scope.selected === true ? $scope.enableDelete = false : $scope.enableDelete = true;
            }

            // ...........   update the location on lost focus, tab, or enter
            );gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updateCont = rowEntity;
                // ............. drop containers and classes text from entity obj
                var gridObj = { container_id: rowEntity.container_id, id: rowEntity.id, loc_class_id: rowEntity.loc_class_id, loc_desc: rowEntity.loc_desc, parent_location_id: rowEntity.parent_location_id, x_coordinate: rowEntity.x_coordinate, y_coordinate: rowEntity.y_coordinate, z_coordinate: rowEntity.z_coordinate
                    // ............. call update
                };$scope.update(gridObj);
            });
        }

        // »»»»»»»»»»»»»»»»»»»║  UPDATE LOCATIONS
    };$scope.update = function (updateObj) {
        return locationUpdateSrv.submitLocationInfo(updateObj

        // »»»»»»»»»»»»»»»»»»»║  DELETE LOCATIONS
        );
    };$scope.delete = function () {
        var gridData = $scope.gridOptions.data;
        var cId = $scope.rowObj.id;
        if ($scope.selected === true) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].id === cId) {
                    gridData.splice(i, 1);
                }
            }
            locationDeleteSrv.deleteLocation(cId);
            $scope.enableDelete = true;
        }
    };
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, authService, checkUserSrv) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    $scope.controllerTest = 'Controller Engaged!!!';

    $scope.loggedIn = false;

    $scope.login = function () {
        return $scope.loggedIn = true;
    };
    $scope.logout = function () {
        $scope.loggedIn = false;
        authService.logout();
    };
    // .......................  checks to see if the user is logged in
    // checkUserSrv.getUser().then((response) => $scope.loggedIn = true)
});
"use strict";
"use strict";
'use strict';

angular.module('app').controller('settings', function ($scope, uiGridConstants, locationsListSrv, settingsSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.settingsTest = 'settings controller is connected and operational';
    $scope.locListServiceTest = locationsListSrv.locListServiceTest;
    // »»»»»»»»»»»»»»»»»»»║  VARIABLES 
    $scope.defaultLocation;
    $scope.loc;
    var sendArr = {};

    // »»»»»»»»»»»»»»»»»»»║  DATABASE CALLS
    // .................... get list of locations
    $scope.getLocations = function () {
        return locationsListSrv.getLocationsList().then(function (response) {
            return $scope.locations = response.data;
        });
    };
    $scope.getLocations

    // .................... get default location
    ();$scope.getDefaultLoc = function () {
        return settingsSrv.getDefaultLocation().then(function (response) {
            $scope.loc = response.data[0].description;
            $scope.locid = response.data[0].id;
            $scope.defaultLocation = $scope.loc;
        });
    };
    $scope.getDefaultLoc

    // .................... will convert to update default location
    ();$scope.updateDefault = function () {
        var dl = $scope.defaultLocation;
        if (typeof dl === 'string') {
            // console.log(dl)
            sendArr.d_location_id = $scope.locid;
        } else {
            // console.log(dl.description)
            sendArr.d_location_id = dl.id;
        }
        console.log(sendArr //this is what we will send to the db PUT
        );settingsSrv.updateDefaultLocation(sendArr);
    };
});
'use strict';

angular.module('app').controller('trackBy', function ($scope, uiGridConstants, trackByGetSrv, trackByPostSrv, trackByPutSrv, trackByDeleteSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.trackByTest = 'trackBy controller is connected and operational';
    $scope.trackByGetSrvTest = trackByGetSrv.trackByGetSrvTest;
    $scope.trackByPostSrvTest = trackByPostSrv.trackByPostSrvTest;
    $scope.trackByPutSrvTest = trackByPutSrv.trackByPutSrvTest;
    $scope.trackByDeleteSrvTest = trackByDeleteSrv.trackByDeleteSrvTest;

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = function () {
        return document.getElementById("trackbyCreateForm").reset

        // »»»»»»»»»»»»»»»»»»»║ TRACKBY MANIPULATION
        // .................... get list of trackby types and grid information
        ();
    };$scope.gettrackbys = function () {
        return trackByGetSrv.getTrackByList().then(function (response) {
            $scope.trackbys = response.data;
            $scope.gridOptions.data = response.data;
            // console.log(`gridOptions.data = ${JSON.stringify(response.data)}`)
        });
    };
    $scope.gettrackbys

    // .................... create trackby types
    ();$scope.trackByObj = {};
    $scope.createTrackBy = function () {
        $scope.gridOptions.data.push({
            "trackby_name": $scope.trackByObj.trackby_name,
            "trackby_value": $scope.trackByObj.trackby_value,
            "trackby_category": $scope.trackByObj.trackby_category
        });
        trackByPostSrv.createTrackBy($scope.trackByObj);

        $scope.clearForm();
    };

    // .................... update trackby types

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        multiSelect: false,
        enableSelectAll: false,
        enableFiltering: true,
        columnDefs: [{ name: 'id', enableCellEdit: false }, { name: 'trackby_name', displayName: 'Name' }, { name: 'trackby_value', displayName: 'Value' }, { name: 'trackby_category', displayName: 'Category' }],

        onRegisterApi: function onRegisterApi(gridApi) {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected;
                $scope.rowId = row.uid;
                $scope.rowObj = row.entity;
                $scope.enableDelete = false;
                $scope.selected === true ? $scope.enableDelete = false : $scope.enableDelete = true;
            }

            // ...........   update the user on lost focus, tab, or enter
            );gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updateCont = rowEntity;
                $scope.update($scope.updateCont);
            });
        }

        // .................... update a trackby
    };$scope.update = function (upObj) {
        var cId = upObj.id;
        trackByPutSrv.updateTrackBy(cId, upObj);
    };

    // .................... delete a trackby
    $scope.delete = function () {
        var gridData = $scope.gridOptions.data;
        var cId = $scope.rowObj.id;
        if ($scope.selected === true) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].id === cId) {
                    gridData.splice(i, 1);
                }
            }
            trackByDeleteSrv.deleteTrackBy(cId);
            $scope.enableDelete = true;
        }
    };
});
'use strict';

angular.module('app').controller('userCreate', function ($scope, stateListSrv, countryListSrv, updateUserSrv, postUserInfoSrv, userListSrv, deleteAllUsersSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.userCreateTest = 'userCreate controller is working correctly';
    $scope.stateListSrvTest = stateListSrv.serviceTest;
    $scope.postUserInfoSrvTest = postUserInfoSrv.serviceTest;
    $scope.userServiceTest = userListSrv.userServiceTest;
    $scope.deleteAllUsersServiceTest = deleteAllUsersSrv.deleteAllUsersServiceTest;
    $scope.countryListServiceTest = countryListSrv.countryListServiceTest;

    // »»»»»»»»»»»»»»»»»»»║  VARIABLES


    // »»»»»»»»»»»»»»»»»»»║  GET STATES LIST
    $scope.states = function () {
        return stateListSrv.getStatesList().then(function (response) {
            return $scope.stateName = response.data;
        });
    };
    $scope.states

    // »»»»»»»»»»»»»»»»»»»║  GET COUNTRY LIST
    ();$scope.country = function () {
        return countryListSrv.getcountryList().then(function (response) {
            return $scope.countryName = response.data;
        });
    };
    $scope.country

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    ();$scope.clearForm = function () {
        return document.getElementById("userCreateForm").reset

        // »»»»»»»»»»»»»»»»»»»║ SUBMIT USER FORM DATA
        // .................... user object to submit   
        ();
    };$scope.userInfo = { "country_id": 1, "inactive": false

        // .................... sets rent rating
    };$scope.rating = 5;
    $scope.rateFunction = function (rating) {
        return $scope.userInfo.renter_rating = rating;
    };

    // .................... sets checkbox
    $scope.deactivateUserChecked = function () {
        return $scope.userInfo.inactive = $scope.userStatus;
    };

    $scope.submit = function () {
        var sName = $scope.stateObj.name;
        var exists = 0;

        // .................... checks to verify that the user doesn't already exist in the database.
        var getUsers = function getUsers() {
            userListSrv.getUserList().then(function (response) {
                $scope.users = response.data;
                // console.log(JSON.stringify($scope.users))
                for (var i = 0; i < $scope.users.length; i++) {
                    // console.log(`db email ${$scope.users[i].email}`)
                    if ($scope.users[i].email === $scope.userInfo.email && $scope.users[i].first_name === $scope.userInfo.firstName) {
                        exists = 1;
                        break;
                    }
                }
                // console.log(`exists inside after function ${exists}`)
                for (var _i = 0; _i < $scope.stateName.length; _i++) {
                    if ($scope.stateName[_i].name === sName) {
                        $scope.userInfo.state_id = $scope.stateName[_i].id;
                    }
                }
                if (exists === 0) {
                    // console.log(`userInfo object that will be sent is ${JSON.stringify($scope.userInfo)}`)
                    postUserInfoSrv.submitUserInfo($scope.userInfo);
                    alert('User has been created.');
                    $scope.clearForm();
                } else {
                    alert('User already exists!');
                }
            });
        };
        getUsers();
    };

    // »»»»»»»»»»»»»»»»»»»║ DELETE ALL USERS
    $scope.deleteUsers = function () {
        return deleteAllUsersSrv.deleteAllUsers();
    };

    // no code below this line
});
'use strict';

angular.module('app').controller('userManage', function ($scope, uiGridConstants, userListSrv, stateListSrv, countryListSrv, updateUserSrv, getUserColumnsSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS
    $scope.userManageControllerTest = 'userManage Controller is ready to role!';
    $scope.getUserColumnsSrvServiceTest = getUserColumnsSrv.getUserColumnsSrvServiceTest;
    $scope.updateUserServiceTest = updateUserSrv.updateUserServiceTest;
    $scope.StateServiceTest = stateListSrv.serviceTest;
    $scope.countryListServiceTest = countryListSrv.countryListServiceTest;

    // »»»»»»»»»»»»»»»»»»»║  GET STATES LIST
    $scope.states = function () {
        return stateListSrv.getStatesList().then(function (response) {
            return $scope.stateName = response.data;
        });
    };
    $scope.states

    // »»»»»»»»»»»»»»»»»»»║  GET COUNTRY LIST
    ();$scope.country = function () {
        return countryListSrv.getcountryList().then(function (response) {
            return $scope.countryName = response.data;
        });
    };
    $scope.country

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    ();$scope.gridOptions = {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableFiltering: true,
        columnDefs: [//this shows which columns show in grid. the value needs to match the data key.
        // { name: 'id' },
        { name: 'first_name' }, { name: 'last_name' }, { name: 'phone' }, { name: 'email' }, { name: 'state', displayName: 'State' }],
        onRegisterApi: function onRegisterApi(gridApi) {
            $scope.grid1Api = gridApi;

            // ...........   update the user on lost focus, tab, or enter
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updatedUser = rowEntity;
                $scope.update($scope.updatedUser);
            });
        }
    };

    // ....................  get column data
    $scope.getUsers = function () {
        return userListSrv.getCustomUserList().then(function (response) {
            return $scope.gridOptions.data = response.data;
        });
    };
    $scope.getUsers

    // »»»»»»»»»»»»»»»»»»»║ UPDATE USER
    ();$scope.update = function (updateObj) {
        var uId = updateObj.id;
        var expectedObj = {
            "firstName": updateObj.first_name,
            "lastName": updateObj.last_name,
            "phone": updateObj.phone,
            "email": updateObj.email,
            "address1": updateObj.address1,
            "address2": updateObj.address2,
            "city": updateObj.city,
            "state_id": updateObj.state,
            "country_id": updateObj.country,
            "zip": updateObj.zip,
            "renter_rating": updateObj.renter_rating,
            "inactive": updateObj.inactive,
            "auth_id": updateObj.auth_id
        };
        var getId = function getId() {
            // ..... convert state name
            for (var i = 0; i < $scope.stateName.length; i++) {
                if ($scope.stateName[i].name === expectedObj.state_id) {
                    expectedObj.state_id = $scope.stateName[i].id;
                }
            }
            // ..... convert country name
            for (var _i = 0; _i < $scope.countryName.length; _i++) {
                if ($scope.countryName[_i].name === expectedObj.country_id) {
                    expectedObj.country_id = $scope.countryName[_i].id;
                }
            }
            // console.log(`this is what will be sent! ${uId}`)
            // console.log(`this is what will be sent! ${JSON.stringify(expectedObj)}`)
            updateUserSrv.updateUser(uId, expectedObj);
        };
        getId();
    };
});
'use strict';

angular.module('app').directive('hideShow', function () {
  return {
    priority: 1001, // compiles first
    terminal: true, // prevent lower priority directives to compile after it
    compile: function compile(el) {
      el.removeAttr('my-dir'); // necessary to avoid infinite compile loop
      el.attr('ng-click', 'fxn()');
      var fn = $compile(el);
      return function (scope) {
        fn(scope);
      };
    }
  };
});
'use strict';

angular.module('app').directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' + '\u2605' + '</li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function link(scope, elem, attrs) {
            var updateStars = function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
});
'use strict';

angular.module('app').service('authService', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.authServiceTest = 'the authService is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.logout = function () {
        return $http.get('/auth/logout').then(function (response) {
            return window.location = response.data;
        });
    };
});
'use strict';

angular.module('app').service('checkUserSrv', function ($http) {

  this.getUser = function () {
    return $http.get('http://localhost:3000/auth/me');
  };
});
'use strict';

angular.module('app').service('containerSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.containerServiceTest = 'the containerSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get containers
    this.getContainerList = function () {
        return $http.get('http://localhost:3000/api/containers');
    };
    // ...................  create containers
    this.createContainer = function (data) {
        $http({
            url: 'http://localhost:3000/api/containers',
            method: 'POST',
            data: data
        });
    };
    // ...................  update containers
    this.updateContainer = function (id, data) {
        $http({
            url: 'http://localhost:3000/api/containers/' + id,
            method: 'PUT',
            data: data
        });
    };
    // ...................  delete containers
    this.deleteContainer = function (id) {
        $http({
            url: 'http://localhost:3000/api/containers/' + id,
            method: 'DELETE'
        });
    };
});
'use strict';

angular.module('app').service('countryListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.countryListServiceTest = 'the countryListSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getcountryList = function () {
        return $http.get('http://localhost:3000/api/country');
    };
});
'use strict';

angular.module('app').service('deleteAllUsersSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.deleteAllUsersServiceTest = 'the deleteAllUsersSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.deleteAllUsers = function () {
        $http({
            url: 'http://localhost:3000/api/user',
            method: 'DELETE'
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
        });
    };
});
'use strict';

angular.module('app').service('getUserColumnsSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.getUserColumnsSrvServiceTest = 'the getUserColumnsSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getColumnList = function () {
        return $http.get('http://localhost:3000/api/user/columns');
    };
});
'use strict';

angular.module('app').service('itemDeleteSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemDeleteSrvTest = 'the itemDeleteSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  delete items
    this.deleteItem = function (id) {
        $http({
            url: '/api/trackbys/' + id,
            method: 'DELETE'
        });
    };
});
'use strict';

angular.module('app').service('itemGetSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemGetSrvTest = 'the itemGetSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get items
    this.getItemList = function () {
        return $http.get('/api/trackbys/');
    };
});
'use strict';

angular.module('app').service('itemPostSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemPostSrvTest = 'the itemPostSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  create item
    this.createItem = function (data) {
        $http({
            url: '/api/trackbys/',
            method: 'POST',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('itemPutSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.itemPutSrvTest = 'the itemPutSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  update items
    this.updateItem = function (id, data) {
        $http({
            url: '/api/trackbys/' + id,
            method: 'PUT',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('locationDeleteSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locationDeleteServiceTest = 'the locationDeleteSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  delete loc_classes
    this.deleteLocation = function (id) {
        $http({
            url: 'http://localhost:3000/api/locations/' + id,
            method: 'DELETE'
        });
    };
});
'use strict';

angular.module('app').service('locationsListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locListServiceTest = 'the locationsListSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getLocationsList = function () {
        return $http.get('http://localhost:3000/api/locations');
    };
    this.getLocationsCustomList = function () {
        return $http.get('http://localhost:3000/api/locations/custom');
    };
});
'use strict';

angular.module('app').service('locationUpdateSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locationUpdateServiceTest = 'the locationUpdateSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.submitLocationInfo = function (data) {
        // console.log(`data to be sent ${JSON.stringify(data)}`)
        $http({
            url: 'http://localhost:3000/api/locations/' + data.id,
            method: 'PUT',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('locClassSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locClassServiceTest = 'the locClassSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get loc_classes
    this.getLocClassesList = function () {
        return $http.get('http://localhost:3000/api/loc_classes');
    };
    // ...................  create loc_classes
    this.createLocClassObj = function (data) {
        $http({
            url: 'http://localhost:3000/api/loc_classes',
            method: 'POST',
            data: data
        });
    };
    // ...................  update loc_classes
    this.updateLocClass = function (id, data) {
        $http({
            url: 'http://localhost:3000/api/loc_classes/' + id,
            method: 'PUT',
            data: data
        });
    };
    // ...................  delete loc_classes
    this.deleteLocClass = function (id) {
        $http({
            url: 'http://localhost:3000/api/loc_classes/' + id,
            method: 'DELETE'
        });
    };
});
'use strict';

angular.module('app').service('locCreateSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locCreateServiceTest = 'the locCreateSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.submitLocationInfo = function (data) {
        $http({
            url: 'http://localhost:3000/api/locations',
            method: 'POST',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('postUserInfoSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.serviceTest = 'the postUserInfoSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.submitUserInfo = function (data) {
        // console.log(`clicked submit and got ${JSON.stringify(data)}`)
        $http({
            url: 'http://localhost:3000/api/users',
            method: 'POST',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('settingsSrv', function ($http) {
    // ...................  get default location
    this.getDefaultLocation = function () {
        return $http.get('http://localhost:3000/api/settings/default_location'

        // ...................  update default location
        );
    };this.updateDefaultLocation = function (data) {
        console.log('sending data');
        console.log(data);
        $http({
            url: '/api/settings/default_location',
            method: 'PUT',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('stateListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.serviceTest = 'the stateListSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getStatesList = function () {
        return $http.get('http://localhost:3000/api/states');
    };
});
'use strict';

angular.module('app').service('trackByDeleteSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByDeleteSrvTest = 'the trackByDeleteSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  delete trackbys
    this.deleteTrackBy = function (id) {
        $http({
            url: 'http://localhost:3000/api/trackbys/' + id,
            method: 'DELETE'
        });
    };
});
'use strict';

angular.module('app').service('trackByGetSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByGetSrvTest = 'the trackByGetSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get trackbys
    this.getTrackByList = function () {
        return $http.get('http://localhost:3000/api/trackbys/');
    };
});
'use strict';

angular.module('app').service('trackByPostSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByPostSrvTest = 'the trackByPostSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  create trackbys
    this.createTrackBy = function (data) {
        $http({
            url: 'http://localhost:3000/api/trackbys/',
            method: 'POST',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('trackByPutSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByPutSrvTest = 'the trackByPutSrv is connected';

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  update trackbys
    this.updateTrackBy = function (id, data) {
        $http({
            url: 'http://localhost:3000/api/trackbys/' + id,
            method: 'PUT',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('updateUserSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.updateUserServiceTest = 'the updateUserSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.updateUser = function (id, data) {
        $http({
            url: 'http://localhost:3000/api/users/' + id,
            method: 'PUT',
            data: data
        });
    };
});
'use strict';

angular.module('app').service('userListSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.userServiceTest = 'the userListSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getUserList = function () {
        return $http.get('http://localhost:3000/api/users');
    };
    this.getCustomUserList = function () {
        return $http.get('http://localhost:3000/api/users/custom');
    };
});
//# sourceMappingURL=bundle.js.map
