angular.module('app').controller('userManage', function ($scope, uiGridConstants, userListSrv, stateListSrv, countryListSrv, updateUserSrv, getUserColumnsSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS
    $scope.userManageControllerTest = 'userManage Controller is ready to role!'
    $scope.getUserColumnsSrvServiceTest = getUserColumnsSrv.getUserColumnsSrvServiceTest
    $scope.updateUserServiceTest = updateUserSrv.updateUserServiceTest
    $scope.StateServiceTest = stateListSrv.serviceTest
    $scope.countryListServiceTest = countryListSrv.countryListServiceTest

    // »»»»»»»»»»»»»»»»»»»║  GET STATES LIST
    $scope.states = () => stateListSrv.getStatesList().then((response) => $scope.stateName = response.data)
    $scope.states()

    // »»»»»»»»»»»»»»»»»»»║  GET COUNTRY LIST
    $scope.country = () => countryListSrv.getcountryList().then((response) => $scope.countryName = response.data)
    $scope.country()

    // »»»»»»»»»»»»»»»»»»»║  COLUMNS AND DATA
    $scope.gridOptions = {
        enableRowSelection: false
        , enableRowHeaderSelection: false
        , enableFiltering: true
        , columnDefs: [ //this shows which columns show in grid. the value needs to match the data key.
            // { name: 'id' },
            { name: 'first_name' }
            , { name: 'last_name' }
            , { name: 'phone' }
            , { name: 'email' }
            , { name: 'state', displayName: 'State'}
        ]
        , onRegisterApi: (gridApi) => {
            $scope.grid1Api = gridApi

            // ...........   update the user on lost focus, tab, or enter
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                $scope.updatedUser = rowEntity
                $scope.update($scope.updatedUser)
            })
        }
    };

    // ....................  get column data
    $scope.getUsers = () => userListSrv.getCustomUserList().then((response) => $scope.gridOptions.data = response.data)
    $scope.getUsers()



    // »»»»»»»»»»»»»»»»»»»║ UPDATE USER
    $scope.update = (updateObj) => {
        var uId = updateObj.id
        var expectedObj = {
            "firstName": updateObj.first_name
            , "lastName": updateObj.last_name
            , "phone": updateObj.phone
            , "email": updateObj.email
            , "address1": updateObj.address1
            , "address2": updateObj.address2
            , "city": updateObj.city
            , "state_id": updateObj.state
            , "country_id": updateObj.country
            , "zip": updateObj.zip
            , "renter_rating": updateObj.renter_rating
            , "inactive": updateObj.inactive
            , "auth_id": updateObj.auth_id
        }
        let getId = () => {
            // ..... convert state name
            for (let i = 0; i < $scope.stateName.length; i++) {
                if ($scope.stateName[i].name === expectedObj.state_id) {
                    expectedObj.state_id = $scope.stateName[i].id
                }
            }
            // ..... convert country name
            for (let i = 0; i < $scope.countryName.length; i++) {
                if ($scope.countryName[i].name === expectedObj.country_id) {
                    expectedObj.country_id = $scope.countryName[i].id
                }
            }
            // console.log(`this is what will be sent! ${uId}`)
            // console.log(`this is what will be sent! ${JSON.stringify(expectedObj)}`)
            updateUserSrv.updateUser(uId, expectedObj)
        }
        getId()
    }
})