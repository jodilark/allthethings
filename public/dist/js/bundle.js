'use strict';

angular.module('app', ['ui.router', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/', "");
    $stateProvider.state('home', {
        templateUrl: '../views/home.html',
        url: '/'
    }).state('dashboard', {
        templateUrl: '../views/dashboard.html',
        url: '/dashboard'
    }).state('user_create', {
        templateUrl: '../views/user_create.html',
        url: '/user_create',
        controller: 'userCreate'
    }).state('user_manage', {
        templateUrl: '../views/user_manage.html',
        url: '/user_manage',
        controller: 'userManage'
    }).state('location_create', {
        templateUrl: '../views/location_create.html',
        url: '/location_create',
        controller: 'locCreate'
    }).state('loc_container', { // MOVE INTO MODAL
        templateUrl: '../views/loc_container.html',
        url: '/loc_container',
        controller: 'locContainer'
    }).state('loc_class', { // MOVE INTO MODAL
        templateUrl: '../views/loc_class.html',
        url: '/loc_class',
        controller: 'locClass'
    });
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
        }
    };
});
'use strict';

angular.module('app').controller('locCreate', function ($scope) {
  // »»»»»»»»»»»»»»»»»»»║  TESTS 
  $scope.locCtrlTest = 'locCreate controller is connected and operational';

  // .................... user object to submit  
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    $scope.controllerTest = 'Controller Engaged!!!';

    $scope.loggedIn = false;

    $scope.login = function () {
        return $scope.loggedIn = true;
    };
    $scope.logout = function () {
        return $scope.loggedIn = false;
    };
});
"use strict";
"use strict";
"use strict";
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
                    // console.log("what the fuck!")
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
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
        });
    };
    // ...................  update containers
    this.updateContainer = function (id, data) {
        $http({
            url: 'http://localhost:3000/api/containers/' + id,
            method: 'PUT',
            data: data
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
        });
    };
    // ...................  delete containers
    this.deleteContainer = function (id) {
        $http({
            url: 'http://localhost:3000/api/containers/' + id,
            method: 'DELETE'
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
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

angular.module('app').service('locClassSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locClassServiceTest = 'the containerSrv is connected';

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
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
        });
    };
    // ...................  update loc_classes
    this.updateLocClass = function (id, data) {
        $http({
            url: 'http://localhost:3000/api/loc_classes/' + id,
            method: 'PUT',
            data: data
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
        });
    };
    // ...................  delete loc_classes
    this.deleteLocClass = function (id) {
        $http({
            url: 'http://localhost:3000/api/loc_classes/' + id,
            method: 'DELETE'
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
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
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
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

angular.module('app').service('updateUserSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.updateUserServiceTest = 'the updateUserSrv is connected';

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.updateUser = function (id, data) {
        $http({
            url: 'http://localhost:3000/api/users/' + id,
            method: 'PUT',
            data: data
        }).then(function (httpResponse) {
            return console.log('response:', JSON.stringify(httpResponse));
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
