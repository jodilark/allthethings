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
    // ...................  update containers
    this.updateContainer = (id, data) => {
        $http({
            url: 'http://localhost:3000/api/containers/' + id,
            method: 'PUT',
            data: data
        }).then((httpResponse) => console.log('response:', JSON.stringify(httpResponse)))
    }
    // ...................  delete containers
    this.deleteContainer = (id) => {
        $http({
            url: 'http://localhost:3000/api/containers/' + id,
            method: 'DELETE'
        }).then((httpResponse) => console.log('response:', JSON.stringify(httpResponse)))
    }
})