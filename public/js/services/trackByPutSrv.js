angular.module('app').service('trackByPutSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByPutSrvTest = 'the trackByPutSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  update trackbys
    this.updateTrackBy = (id, data) => {
        $http({
            url: '/api/trackbys/' + id,
            method: 'PUT',
            data: data
        })
    }
})