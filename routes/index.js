const path = require('path');
const { readdir } = require('fs');




// const isAuth  = async (req,res,next)=>{

//   try{
         
//       let getSystemToken = await connection.createQueryBuilder().select()       
//           .from('SYSTEM_TOKEN','fa')
//           .where("username = 'FFRS'")
//           .where("password = 'FFRS'")
//           .getRawOne();
//         console.warn(getSystemToken);
//       if(getSystemToken){
//           res.cookie('auth',getSystemToken.ACCESS_TOKEN);
//           next();
//       }else{
//         return res.status(401).send("Access denied");     
//       }
      
//   }catch(error){
//       console.warn(error);
//       return res.status(401).send("Access denied");
//   }
// }



// MODULAR 
module.exports = function(app){
  // app.use(isAuth)
    readdir(
        path.resolve(__dirname,'../Modules'),
        (err, files) => {
          if (err) throw err;
            
          for (let file of files) {
                
                app.use('',require(`../modules/${file}/route`));            
                    
          }
        }
      );


}