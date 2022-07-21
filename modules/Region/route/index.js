//  Login ROUTE
const route = require('@forkjs/group-router');

const controller  = require('../Controller');

// GROUP ROUTE
route.group('/region',()=>{    
    route.get('/users',controller.getInfo)       
  
})


module.exports = route.router;