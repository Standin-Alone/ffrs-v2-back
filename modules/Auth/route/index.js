//  Login ROUTE
const route = require('@forkjs/group-router');

const controller  = require('../Controller');

// GROUP ROUTE
route.group('/auth',()=>{    
    route.post('/login',controller.login)       
    route.get('/user-info/:accessToken',controller.getAccessToken)       
  
})


module.exports = route.router;