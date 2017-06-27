angular.module('app').controller('mainCtrl', function ($scope, authService, checkUserSrv) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    $scope.controllerTest = 'Controller Engaged!!!'

    $scope.loggedIn = false;

    $scope.login = () => {
        $scope.loggedIn = true
        // authService.logMeIn()
    }
    $scope.logout = () => {
        $scope.loggedIn = false
        authService.logout()
    }
    // .......................  checks to see if the user is logged in
    // checkUserSrv.getUser().then((response) => $scope.loggedIn = true)

    // .......................  modal controls
    $scope.modalShown = false;
    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    //vars
    // $scope.createUserModalContent = false
    // $scope.createLocModalContent = false
    // $scope.setModalContent = (contentId) => {
    //     switch (contentId) {
    //         case 0:
    //             $scope.setAllModalFalse()
    //             $scope.createUserModalContent = true
    //             $scope.toggleModal()
    //             break;
    //         case 1:
    //             $scope.setAllModalFalse()
    //             $scope.createLocModalContent = true
    //             $scope.toggleModal()
    //             break;
    //     }
    // }
    // $scope.setAllModalFalse = () => {
    //     $scope.createUserModalContent = false
    //     $scope.createLocModalContent = false
    //     // console.log("create user =", $scope.createUserModalContent)
    // }

    $scope.pageTitle = "Dashboard"
    $scope.watchLocation = (area) => {
        var url = area
        // var url = window.location.hash
        // console.log(url)
        switch (url) {
            case '#!/user_manage':
            $scope.pageTitle = 'Users'
            break;
            case '#!/location_manage':
            $scope.pageTitle = 'Locations'
            break;
            case '#!/item_manage':
            $scope.pageTitle = 'Items'
            break;
            case '#!/dashboard':
            $scope.pageTitle = 'Dashboard'
            break;
        }
    }
    $scope.watchLocation(window.location.hash)
})