angular.module('app').service('getUserColumnsSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.getUserColumnsSrvServiceTest = 'the getUserColumnsSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.getColumnList = () => ($http.get('/api/user/columns'))
})
