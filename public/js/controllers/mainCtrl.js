angular.module('app').controller('mainCtrl', function ($scope, authService, checkUserSrv) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    $scope.controllerTest = 'Controller Engaged!!!'

    $scope.loggedIn = false;

    $scope.login = () => $scope.loggedIn = true
    $scope.logout = () => {
        $scope.loggedIn = false
        authService.logout()
    }
    // .......................  checks to see if the user is logged in
    checkUserSrv.getUser().then((response) => $scope.loggedIn = true)

})