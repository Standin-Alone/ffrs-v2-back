
// MARKET CONTROLLER

const { method, get } = require("lodash");



const methods = {};

methods.getRegions  = async (req,res)=>{

    try{

     

        
        let getRegions = await connection.createQueryBuilder()
            .select(["REG_NAME","REG_CODE"])                   
            .from('GEO_MAP','GM')  
            .groupBy(["REG_NAME",'REG_CODE'])          
            .orderBy('REG_CODE','ASC')   
            .getRawMany();
        
     
              
        if(getRegions.length > 0){
            return res.send({status:true,data:getRegions});
        }
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}


methods.getProvinces  = async (req,res)=>{

    try{

        let regionCode = req.params.region_code
     
        console.warn(regionCode);
        
        let getProvinces = await connection.createQueryBuilder()
            .select(["PROV_NAME","PROV_CODE"])                   
            .from('GEO_MAP','GM')  
            .where('REG_CODE = :regionCode',{regionCode:regionCode})
            .groupBy(["PROV_NAME",'PROV_CODE'])                     
            .getRawMany();
        
     
              
        if(getProvinces.length > 0){
            return res.send({status:true,data:getProvinces});
        }
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}



methods.getMunicipalities  = async (req,res)=>{

    try{

        let regionCode = req.params.region_code;
        let provinceCode = req.params.province_code;
     
        
        
        let getMunicipalities = await connection.createQueryBuilder()
            .select(["MUN_NAME","MUN_CODE"])                   
            .from('GEO_MAP','GM')  
            .where('REG_CODE = :regionCode',{regionCode:regionCode})
            .where('PROV_CODE = :provinceCode',{provinceCode:provinceCode})
            .groupBy(["MUN_NAME",'MUN_CODE'])                    
            .getRawMany();
        
     
              
        if(getMunicipalities.length > 0){
            return res.send({status:true,data:getMunicipalities});
        }
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}




methods.getBarangay  = async (req,res)=>{

    try{

        let regionCode = req.params.region_code;
        let provinceCode = req.params.province_code;
        let municipalityCode = req.params.municipality_code;
     
        
        
        let getBarangay = await connection.createQueryBuilder()
            .select(["BGY_NAME","BGY_CODE"])                   
            .from('GEO_MAP','GM')  
            .where('REG_CODE = :regionCode',{regionCode:regionCode})
            .where('PROV_CODE = :provinceCode',{provinceCode:provinceCode})
            .where('MUN_CODE = :municipalityCode',{municipalityCode:municipalityCode})
            .groupBy(["BGY_NAME",'BGY_CODE'])                    
            .getRawMany();
        
     
              
        if(getBarangay.length > 0){
            return res.send({status:true,data:getBarangay});
        }
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}

module.exports = methods;