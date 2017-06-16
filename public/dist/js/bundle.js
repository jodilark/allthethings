'use strict';

angular.module('app', ['ui.router', 'ui.grid']).config(function ($stateProvider, $urlRouterProvider) {
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
    });
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope) {
    // ...tests
    $scope.controllerTest = 'Controller Engaged!!!';
});
"use strict";
"use strict";
"use strict";
'use strict';

angular.module('app').controller('userCreate', function ($scope, stateListSrv, postUserInfoSrv, userListSrv, deleteAllUsersSrv) {
    // =============== TESTS
    $scope.userCreateTest = 'userCreate controller is working correctly';
    $scope.stateListSrvTest = stateListSrv.serviceTest;
    $scope.postUserInfoSrvTest = postUserInfoSrv.serviceTest;
    $scope.userServiceTest = userListSrv.userServiceTest;
    $scope.deleteAllUsersServiceTest = deleteAllUsersSrv.deleteAllUsersServiceTest;

    // =============== VARIABLES


    // =============== GET STATES LIST
    $scope.states = function () {
        stateListSrv.getStatesList().then(function (response) {
            $scope.stateName = response.data;
        });
    };
    $scope.states

    // =============== CLEAR FORM
    ();$scope.clearForm = function () {
        return document.getElementById("userCreateForm").reset

        // =============== SUBMIT USER FORM DATA
        ();
    };$scope.userInfo = {};
    $scope.submit = function () {
        var sName = $scope.stateObj.name;
        var exists = 0;
        // console.log(`exists before function ${exists}`)
        // ...................... checks to verify that the user doesn't already exist in the database.
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

    // =============== DELETE ALL USERS
    $scope.deleteUsers = function () {
        return deleteAllUsersSrv.deleteAllUsers();
    };

    // no code below this line
});
'use strict';

angular.module('app').controller('userManage', function ($scope, uiGridConstants, userListSrv, getUserColumnsSrv) {
    // ===============  TESTS
    $scope.userManageControllerTest = 'userManage Controller is ready to role!';
    $scope.getUserColumnsSrvServiceTest = getUserColumnsSrv.getUserColumnsSrvServiceTest;

    // ===============  COLUMNS AND DATA
    $scope.gridOptions = {
        enableFiltering: true,
        columnDefs: [],
        onRegisterApi: function onRegisterApi(gridApi) {
            $scope.grid1Api = gridApi;
        }
    };
    $scope.getUsers = function () {
        userListSrv.getCustomUserList().then(function (response) {
            $scope.gridOptions.data = response.data;
        });
    };
    $scope.getUsers();
});
'use strict';

angular.module('app').service('deleteAllUsersSrv', function ($http) {
    // =============== TESTS
    this.deleteAllUsersServiceTest = 'the deleteAllUsersSrv is connected';

    // =============== ENDPOINTS
    this.deleteAllUsers = function () {
        $http({
            url: 'http://localhost:3000/api/user',
            method: 'DELETE'
        }).then(function (httpResponse) {
            console.log('response:', JSON.stringify(httpResponse));
        });
    };
});
'use strict';

angular.module('app').service('getUserColumnsSrv', function ($http) {
    // =============== TESTS
    this.getUserColumnsSrvServiceTest = 'the getUserColumnsSrv is connected';

    // =============== ENDPOINTS
    this.getColumnList = function () {
        return $http.get('http://localhost:3000/api/user/columns');
    };
});
'use strict';

angular.module('app').service('postUserInfoSrv', function ($http) {
    // =============== TESTS
    this.serviceTest = 'the postUserInfoSrv is connected';

    // =============== ENDPOINTS
    this.submitUserInfo = function (data) {
        // console.log(`clicked submit and got ${JSON.stringify(data)}`)
        $http({
            url: 'http://localhost:3000/api/user',
            method: 'POST',
            data: data
        }).then(function (httpResponse) {
            console.log('response:', JSON.stringify(httpResponse));
        });
    };
});
'use strict';

angular.module('app').service('stateListSrv', function ($http) {
    // =============== TESTS
    this.serviceTest = 'the stateListSrv is connected';

    // =============== ENDPOINTS
    this.getStatesList = function () {
        return $http.get('http://localhost:3000/api/states');
    };
});
'use strict';

angular.module('app').service('userListSrv', function ($http) {
    // =============== TESTS
    this.userServiceTest = 'the userListSrv is connected';

    // =============== ENDPOINTS
    this.getUserList = function () {
        return $http.get('http://localhost:3000/api/user');
    };
    this.getCustomUserList = function () {
        return $http.get('http://localhost:3000/api/users');
    };
});
//# sourceMappingURL=bundle.js.map
