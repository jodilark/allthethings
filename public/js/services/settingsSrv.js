angular.module('app').service('settingsSrv', function ($http) {
    // ...................  get default location
    this.getDefaultLocation = () => $http.get('http://localhost:3000/api/settings/default_location')

    // ...................  update default location
    this.updateDefaultLocation = (data) => {
        console.log('sending data')
        console.log(data)
        $http({
            url: '/api/settings/default_location',
            method: 'PUT',
            data: data
        })
    }

})