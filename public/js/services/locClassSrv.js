angular.module('app').service('locClassSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.locClassServiceTest = 'the locClassSrv is connected'

    // // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get loc_classes
    this.getLocClassesList = () => ($http.get('http://localhost:3000/api/loc_classes'))
    // ...................  create loc_classes
    this.createLocClassObj = (data) => {
        $http({
            url: 'http://localhost:3000/api/loc_classes',
            method: 'POST',
            data: data
        })
    }
    // ...................  update loc_classes
    this.updateLocClass = (id, data) => {
        $http({
            url: 'http://localhost:3000/api/loc_classes/' + id,
            method: 'PUT',
            data: data
        })
    }
    // ...................  delete loc_classes
    this.deleteLocClass = (id) => {
        $http({
            url: 'http://localhost:3000/api/loc_classes/' + id,
            method: 'DELETE'
        })
    }
})