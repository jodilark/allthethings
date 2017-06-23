angular.module('app').directive('bcScanner',
    function () {
        return {
            restrict: 'E',
            templateUrl: '../views/barcodeScanner.html',
            scope: '@',
            controller: ($scope, bcService) => {
                // .................... variables
                $scope.barcode
                $scope.storeBarcode = () => bcService.storeBarcode($scope.barcode)

                // .................... quagga barcode scanner
                var Quagga = window.Quagga;
                var resultsArr = []
                var counter = resultsArr.length
                var App = {
                    _lastResult: null,
                    init: function () {
                        this.attachListeners();
                    },
                    activateScanner: function () {
                        var scanner = this.configureScanner('.overlay__content'),
                            onDetected = function (result) {
                                resultsArr.push(result.codeResult.code)
                                counter = resultsArr.length
                                // console.log("On Detected :", resultsArr)
                                // console.log("counter = ", counter)
                                if (counter === 10) {
                                    var mc = mostCommon(resultsArr)
                                    console.log("most common", mc)
                                    $scope.barcode = mc                                    
                                    $scope.storeBarcode()
                                    $scope.$apply()
                                    $scope.stoppy()
                                    $scope.showBarcodeWindow = false
                                    $scope.$apply()
                                    snd.play()
                                }
                            }.bind(this),
                            stop = function () {
                                scanner.stop();  // should also clear all event-listeners?
                                scanner.removeEventListener('detected', onDetected);
                                this.hideOverlay();
                                this.attachListeners();
                            }.bind(this);

                        this.showOverlay(stop);
                        console.log("activateScanner");
                        scanner.addEventListener('detected', onDetected).start();
                    },
                    showOverlay: function (cancelCb) {
                        $scope.showBarcodeWindow = true
                        $scope.$apply()
                        document.querySelector('.container ')
                            .classList.add('hide');
                        document.querySelector('.overlay--inline')
                            .classList.add('show');
                        $scope.stoppy = () => {
                            cancelCb();
                        };
                    },
                    attachListeners: function () {
                        var button = document.querySelector('button.scan'),
                            self = this;

                        button.addEventListener("click", function clickListener(e) {
                            e.preventDefault();
                            button.removeEventListener("click", clickListener);
                            self.activateScanner();
                        });
                    },
                    hideOverlay: function () {
                        document.querySelector('.container ')
                            .classList.remove('hide');
                        document.querySelector('.overlay--inline')
                            .classList.remove('show');
                    },
                    configureScanner: function (selector) {
                        var scanner = Quagga
                            .decoder({ readers: ['ean_reader'] })
                            .locator({ patchSize: 'medium' })
                            .fromSource({
                                target: selector,
                                constraints: {
                                    width: 600,
                                    height: 600,
                                    facingMode: "environment"
                                }
                            });
                        return scanner;
                    }
                };
                App.init();

                // .................... take results array and get the average
                const mostCommon = (arr) => {
                    return arr.sort((a, b) =>
                        arr.filter(v => v === a).length
                        - arr.filter(v => v === b).length
                    ).pop()
                }
                // .................... play a sound
                var snd = new Audio("../audio/cameraOne.wav")

                // .................... hide / show playback window
                $scope.showBarcodeWindow = false
            }

        };
    }
);