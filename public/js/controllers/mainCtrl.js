angular.module('app').controller('mainCtrl', function ($scope, $interval, authService, checkUserSrv, modalService) {
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

    //modal hide/show controls
    //________FUNCTION
    $scope.showStorageModal = () => {
        modalService.refreshWindow()
        $scope.modalShownStorage = true
    }
    $scope.showTrackbyModal = () => {
        modalService.refreshWindow()
        $scope.modalShownTrackby = true
    }

    $scope.showItemsModal = () => {
        modalService.refreshWindow()
        $scope.modalShownItems = true
    }



    //_________DASHBOARD TITLE
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