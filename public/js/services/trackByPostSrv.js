angular.module('app').service('trackByPostSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.trackByPostSrvTest = 'the trackByPostSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  create trackbys
    this.createTrackBy = (data) => {
        if (data.trackby_name == undefined) {
            alert('Fill out all fields')
        }
        else {
            $http({
                url: 'http://localhost:3000/api/trackbys/',
                method: 'POST',
                data: data
            })
        }
    }
})