angular.module('app').controller('locContainer', function ($scope, containerSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.locContainerTest = 'locContainerTest controller is connected and operational'
    $scope.containerServiceTest = containerSrv.containerServiceTest

    // »»»»»»»»»»»»»»»»»»»║ CLEAR FORM
    $scope.clearForm = () => document.getElementById("containerCreateForm").reset()

    // »»»»»»»»»»»»»»»»»»»║ CONTAINER MANIPULATION
    // .................... get list of container types
    $scope.getContainers = () => containerSrv.getContainerList().then((response) => $scope.containers = response.data)
    $scope.getContainers()

    // .................... create container types
    $scope.container = {}
    $scope.createContainer = () => {
        // console.log(`this will be created ... ${JSON.stringify($scope.container)}`)
        containerSrv.createContainer($scope.container)
        $scope.clearForm()
    }


    // .................... update container types


})