angular.module('app').service('trackByDeleteSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByDeleteSrvTest = 'the trackByDeleteSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  delete trackbys
    this.deleteTrackBy = (id) => {
        $http({
            url: '/api/trackbys/' + id,
            method: 'DELETE'
        })
    }
})