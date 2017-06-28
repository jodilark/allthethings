angular.module('app').service('modalService', function ($interval) {

// ...........  refreshes window so the grids fix themselves in the modals
    this.refreshWindow = () => {
        $interval(function () {
            var fireRefreshEventOnWindow = function () {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent('resize', true, false);
                window.dispatchEvent(evt);
            };
            fireRefreshEventOnWindow();
            // console.log('refreshed')
        }, 100, 1);
    }
})