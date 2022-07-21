//  Login ROUTE
const route = require('@forkjs/group-router');

const controller  = require('../Controller');

// GROUP ROUTE
route.group('/ffrs',()=>{    
    route.get('/users',controller.getInfo)       
  
})


module.exports = route.router;