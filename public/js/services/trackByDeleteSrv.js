angular.module('app').service('trackByDeleteSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByDeleteSrvTest = 'the trackByDeleteSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  delete trackbys
    this.deleteTrackBy = (id) => {
        $http({
            url: 'http://localhost:3000/api/trackbys/' + id,
            method: 'DELETE'
        })
    }
})