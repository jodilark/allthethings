angular.module('app').service('bcService', function($http){
    // VARIABLES
    this.upc

    //FUNCTIONS
    this.storeBarcode = (bc) => {
        console.log("barcode was stored and is", bc)
        this.upc = bc}
    
})