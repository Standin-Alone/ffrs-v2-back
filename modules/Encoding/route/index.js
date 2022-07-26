//  Login ROUTE
const route = require('@forkjs/group-router');

const controller  = require('../Controller');

// GROUP ROUTE
route.group('/ffrs',()=>{    
    route.get('/get-crops/:classification?',controller.getCrops)       
    route.get('/get-regions',controller.getRegions)       
    route.get('/get-provinces/:region_code',controller.getProvinces)       
    route.get('/get-municipalities/:region_code/:province_code',controller.getMunicipalities)       
    route.get('/get-barangay/:region_code/:province_code/:municipality_code',controller.getBarangay)       
    route.post('/encode',controller.encode)       
    route.post('/upload-files',controller.uploadFiles)       
    route.post('/check-possible-duplicates',controller.checkPossibleDuplicates)       
    
  
})


module.exports = route.router;