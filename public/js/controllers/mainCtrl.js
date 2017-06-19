angular.module('app').controller('mainCtrl', function ($scope) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    $scope.controllerTest = 'Controller Engaged!!!'

    $scope.loggedIn = false;

    $scope.login = () => $scope.loggedIn = true
    $scope.logout = () => $scope.loggedIn = false

})