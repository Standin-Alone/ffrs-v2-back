
// MARKET CONTROLLER

const { method, get } = require("lodash");



const methods = {};

methods.getInfo  = async (req,res)=>{

    try{

     

        
        let getUsersInfo = await connection.createQueryBuilder().select(`rsbsa_no`)       
            .from('FARMERS_INFORMATION','fa')
            .where("reg = '07'").getRawMany();
        
        
              
        if(getUsersInfo.length > 0){
            return res.send({status:true,data:getUsersInfo});
        }
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}

module.exports = methods;