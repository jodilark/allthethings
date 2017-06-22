angular.module('app').controller('itemManage', function($scope, itemGetSrv, itemPostSrv, itemPutSrv, itemDeleteSrv){
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.itemManageTest = 'itemManage controller is connected and operational'
    $scope.itemGetSrvTest = itemGetSrv.itemGetSrvTest
    $scope.itemPostSrvTest = itemPostSrv.itemPostSrvTest
    $scope.itemPutSrvTest = itemPutSrv.itemPutSrvTest
    $scope.itemDeleteSrvTest = itemDeleteSrv.itemDeleteSrvTest
})