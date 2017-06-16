angular.module('app').controller('userManage', function ($scope, uiGridConstants, userListSrv, getUserColumnsSrv) {
    // ===============  TESTS
    $scope.userManageControllerTest = 'userManage Controller is ready to role!'
    $scope.getUserColumnsSrvServiceTest = getUserColumnsSrv.getUserColumnsSrvServiceTest

    // ===============  COLUMNS AND DATA
    $scope.gridOptions = {
        enableFiltering: true,
        columnDefs: [],
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;
        }
    };
    $scope.getUsers = () => {
        userListSrv.getCustomUserList().then((response) => {
            $scope.gridOptions.data = response.data
        })
    }
    $scope.getUsers()

})