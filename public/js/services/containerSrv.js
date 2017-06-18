angular.module('app').service('containerSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.containerServiceTest = 'the containerSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    // ...................  get containers
    this.getContainerList = () => ($http.get('http://localhost:3000/api/containers'))
    // ...................  create containers
    this.createContainer = (data) => {
        $http({
            url: 'http://localhost:3000/api/containers',
            method: 'POST',
            data: data
        }).then((httpResponse) => console.log('response:', JSON.stringify(httpResponse)))
    }
    this.updateContainer = (id) => ($http.get('http://localhost:3000/api/containers/' + id))
    this.deleteContainer = (id) => ($http.get('http://localhost:3000/api/containers/' + id))

})