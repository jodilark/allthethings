angular.module('app').service('trackByGetSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByGetSrvTest = 'the trackByGetSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get trackbys
    this.getTrackByList = () => ($http.get('/api/trackbys/'))
})