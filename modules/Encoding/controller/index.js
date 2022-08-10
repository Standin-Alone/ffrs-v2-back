
// MARKET CONTROLLER

const { Console } = require("console");
const { method, get } = require("lodash");



const methods = {};


methods.checkPossibleDuplicates  = async (req,res)=>{

    try{

        let controlNumber = req.body.controlNumber;

        console.warn(controlNumber)
        
        let getPossibleDuplicates = await connection.createQueryBuilder()
            .select([
                    "FIRST_NAME || ' ' || MIDDLE_NAME || ' ' || SURNAME  ||  CONCAT((CASE WHEN EXT_NAME IS NOT NULL THEN ',' ELSE ' ' END  ) ,EXT_NAME) as FULL_NAME",
                    'CONTROL_NO',
                    'SEX',
                    'MOTHER_MAIDEN_NAME',
                    'RSBSA_NO'
                ])                   
            .from('FARMERS_KYC1','FK1')                  
            .where("CONTROL_NO = :controlNumber",{controlNumber:controlNumber})          
            .getRawMany();
        
     
        
        if(getPossibleDuplicates.length > 0){
            return res.send({status:true,data:getPossibleDuplicates});
        }else{
            return res.send({status:false,message:' No DUPLICATION'});
        }
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}




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


methods.getCrops  = async (req,res)=>{

    try{

        let classification = req.params.classification;
        console.warn(req.cookies.auth);
        
        let getCropAnimals = '';
        if(classification){
            getCropAnimals = await connection.createQueryBuilder()
            .select()                   
            .from('CROPS_ANIMALS','CA')  
            .where('CLASSIFICATION = :classification',{classification:classification ? classification : '1'})                        
            .getRawMany();
        }else{

        
         getCropAnimals = await connection.createQueryBuilder()
            .select()                   
            .from('CROPS_ANIMALS','CA')                   
            .getRawMany();
        
        }
              
        if(getCropAnimals.length > 0){
            return res.send({status:true,data:getCropAnimals});
        }
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}



methods.encode  = async (req,res)=>{
    const queryRunner = await connection.createQueryRunner();
    await queryRunner.connect();
    
    let body = req.body;   

    // PERSONAL INFORMATION 

    let farmerId = uuid();
    let referenceNumber = req.body.referenceNumber;
    let firstName = req.body.firstName;
    let middleName = req.body.middleName;
    let surName = req.body.surName;
    let extensionName = req.body.extensionName;
    let gender = req.body.gender;
    let address1 = req.body.address1.id; //region 
    let address2 = req.body.address2.id; // province
    let address3 = req.body.address3.id; //municipality
    let address4 = req.body.address4.id; //barangay
    let address5 = req.body.address5; // house
    let address6 = req.body.address6; // street

    // VERTICAL 1 DATA
    let mobileNumber = req.body.mobileNumber;
    let landlineNumber = req.body.landlineNumber;
    let birthday = req.body.birthday;
    let pobMunicipality = req.body.pobMunicipality;
    let pobProvince = req.body.pobProvince;
    let pobCountry = req.body.pobCountry;
    let religion = req.body.religion;
    let civilStatus = req.body.civilStatus;
    let spouseName = req.body.spouseName;
    let mothersMaidenName = req.body.mothersMaidenName;
    let isHouseHoldHead = req.body.isHouseHoldHead;
    let householdHeadName = req.body.householdHeadName;
    let relationshipHouseholdHead = req.body.relationshipHouseholdHead;
    let numberofLivingHouseholdMembers = req.body.numberOfLivingHouseholdMembers;
    let numberOfFemale = req.body.numberOfFemale;
    let numberOfMale = req.body.numberOfMale;

    // VERTICAL 2 DATA
    let highestFormalEducation = req.body.highestFormalEducation;
    let personWithDisability =req.body.personWithDisability;
    let fourPsBeneficiary =req.body.fourPsBeneficiary;
    let memberOfIndigenousGroup =req.body.memberOfIndigenousGroup;
    let specifyIndigenousGroup  =    req.body. specifyIndigenousGroup;
    let withGovernmentId =req.body.withGovernmentId;
    let specifyIdType =  req.body.specifyIdType;
    let specifyIdNumber  =      req.body.specifyIdNumber;
    let memberOfFarmerAssocCooperative = req.body.memberOfFarmerAssocCooperative;
    let specifyFarmerAssocCooperative = req.body.specifyFarmerAssocCooperative;
    let personToNotifyInCaseOfEmergency = req.body.personToNotifyInCaseOfEmergency;
    let personToNotifyMobileNumber = req.body.personToNotifyMobileNumber;

    let farmingIncome = req.body.farmingIncome;
    let nonFarmingIncome = req.body.nonFarmingIncome;

    
    try{

        // start transaction
        await queryRunner.startTransaction();

      
        
        
        let insertFarmerKYC1 = await queryRunner.manager.createQueryBuilder()
                                .insert()
                                .into('FARMERS_KYC1')
                                .values({
                                    DATA_SOURCE:'FFRS',
                                    FARMERID:farmerId,
                                    CONTROL_NO:referenceNumber,
                                    RSBSA_NO:referenceNumber,
                                    FIRST_NAME:firstName,
                                    MIDDLE_NAME:middleName,
                                    SURNAME:surName,
                                    EXT_NAME:extensionName,
                                    MOTHER_MAIDEN_NAME:mothersMaidenName,
                                    
                                    SEX:gender,
                                    REG:address1,
                                    PRV:address2,
                                    MUN:address3,
                                    BRGY:address4,
                                    STREET:address5,
                                    HOUSE_NO:address6,
                                    CONTACT_NUM:mobileNumber,
                                    LANDLINE_NUM:landlineNumber,
                                    EDUCATION:highestFormalEducation,
                                    BIRTHDAY:()=>` TO_DATE('${birthday}','MM-DD-YYYY')`,
                                    PWD:personWithDisability,
                                    RELIGION:religion,
                                    CIVIL_STATUS:civilStatus,
                                    SPOUSE:spouseName,                                    
                                })
                                .execute();

            //  CHECK IF FARMER KYC 1 IS ALREADY INSERT
            if(insertFarmerKYC1){

              
                let insertFarmerKYC2 = await queryRunner.manager.createQueryBuilder()
                .insert()
                .into('FARMERS_KYC2')
                .values({                    
                    FARMERID:farmerId,
                    RSBSA_NO:referenceNumber,
                    BIRTH_PLACE:pobCountry,                    
                    BIRTH_PRV:pobProvince,                    
                    BIRTH_PRV_MUN:pobMunicipality,
                    HH_HEAD:isHouseHoldHead,
                    HH_HEAD_NAME:householdHeadName,
                    HH_RELATIONSHIP:relationshipHouseholdHead,
                    HH_NO_MEMBERS:numberofLivingHouseholdMembers,
                    HH_NO_MALE:numberOfFemale,
                    HH_NO_FEMALE:numberOfMale,
                    BENEFICIARY_4PS:fourPsBeneficiary,
                    GOV_ID:specifyIdType,
                    GOV_ID_NUM:specifyIdNumber,
                    GOV_ANS: withGovernmentId,
                    FCA_ANS:memberOfFarmerAssocCooperative,
                    FCA_ID:specifyFarmerAssocCooperative,
                    EMERGENCY_NAME:personToNotifyInCaseOfEmergency,
                    EMERGENCY_CONTACT:personToNotifyMobileNumber,
                    IND_ANS:memberOfIndigenousGroup,
                    IND_ID:specifyIndigenousGroup,
                    GROSS_INCOME_FARMING:farmingIncome,
                    GROSS_INCOME_NONFARMING:nonFarmingIncome                                  
                })
                .execute();

               


                // CHECK IF FARMER_KYC2 IS ALREADY INSERTED
                if(insertFarmerKYC2){


                    
                  
    
                    let parcel = req.body.parcel;


                    parcel.map(async (parcelItem,index)=>{
                      
                        let parcelId = uuid();    
                        let farmLandDescription = parcelItem.farmLandDescription;

                        let farmProv = farmLandDescription.province.id;
                        let farmMun = farmLandDescription.municipality.id;
                        let farmBarangay = farmLandDescription.barangay.id;
                        let farmTotalArea = farmLandDescription.totalArea;                        
                        let farmOwnership = farmLandDescription.ownership;
                        let farmTypeOfOwnership = farmLandDescription.typeOfOwnership;
                        let farmARB = farmLandDescription.ARB;
                        let farmAncestralDomain = farmLandDescription.ancestralDomain;
                        let farmName = farmLandDescription.farmName;
                        

                         // INSERT PARCEL FARM PARCEL OWNERSHIP
                        let insertFarmParcelOwnership = await queryRunner.manager.createQueryBuilder()
                            .insert()
                            .into('FARMPARCELOWNERSHIP')
                            .values({                                                    
                                PARCEL_ID: parcelId,
                                RSBSA_NO: referenceNumber,
                                OWN_STATUS:farmOwnership
                            })
                            .execute();
                        
                        // CHECK IF PARCEL FARM PARCEL OWNERSHIP IS INSERTED
                        if(insertFarmParcelOwnership){
                         


                            // INSERT PARCEL FARM PARCEL
                            let insertFarmParcel = await queryRunner.manager.createQueryBuilder()
                            .insert()
                            .into('FARMPARCEL')
                            .values({                                                    
                                PARCEL_ID: parcelId,
                                PARCEL_NO: index+1, 
                                ARB: farmARB,
                                ANCESTRAL:farmAncestralDomain,
                                BGY:farmBarangay,
                                MUN:farmMun,
                                PRV:farmProv,
                                REG:address1, //region
                            })
                            .execute();

                        

                            // CHECK IF  FARM PARCEL IS INSERTED
                            if(insertFarmParcel){

                                // GET PARCEL ACTIVITY
                                let parcelActivity = parcelItem.parcelInfo;



                                parcelActivity.map(async (parcelActivityItem, parcelActivityItemIndex)=>{

                                    let parcelCrop = parcelActivityItem.crop;
                                    let parcelSize = parcelActivityItem.size;
                                    let parcelNoOfHead = parcelActivityItem.noOfHead;
                                    let parcelFarmType = parcelActivityItem.farmType;
                                    let parcelOrganicPractitioner = parcelActivityItem.organicPractitioner;

                              
                                    // INSERT  FARM PARCEL ACTIVITY
                                    let insertFarmParcelActivity = await queryRunner.manager.createQueryBuilder()
                                    .insert()
                                    .into('FARMPARCELACTIVITY')
                                    .values({                                                    
                                        PARCEL_ID: parcelId,
                                        RSBSA_NO: referenceNumber,
                                        CROP_ID: parcelCrop.id, //CROP ID
                                        NO_HEADS:parcelNoOfHead,
                                        FARM_TYPE:parcelFarmType,
                                        ORGANIC:parcelOrganicPractitioner,
                                        size:parcelSize                                   
                                    })
                                    .execute();

                                
                                });

                            }
                        }

                        

                    })
                   
                }

            }         
                                         
        // commit transaction now:
        await queryRunner.commitTransaction();

        return res.send({status:true})
    }catch(error){
        console.warn(error)

        await queryRunner.rollbackTransaction();
        return res.send({status:false,message:error});
    }
}




methods.uploadFiles  = async (req,res)=>{

    try{

        let ownershipFiles = req.body.ownershipFiles;
        let rsbsaFormFiles = req.body.rsbsaFormFiles;
        let otherAttachmentFiles = req.body.otherAttachmentFiles;
        let applicantImage = req.body.applicantImage;
        let countErrorUploads = '';

        
        // APPLICANT IMAGE UPLOAD

        if(applicantImage){
            var base64result = applicantImage.base64.split(',')[1];                
            let fileBuffer =  Buffer.from(base64result, 'base64');
            
            let newFileName = md5(applicantImage.fileName);

            fs.writeFile(`./uploads/photo/${newFileName}.${applicantImage.mime}`, fileBuffer , function (err) {  
            
                if(err){
                    
                    countErrorUploads++
                }                
            });  
        }


        // OWNERSHIP DOCUMENT UPLOAD
        ownershipFiles.map((fileItem)=>{
            fileItem.files.map((fileResponse)=>{
                var base64result = fileResponse.base64.split(',')[1];                
                let fileBuffer =  Buffer.from(base64result, 'base64');
                
                let newFileName = md5(fileResponse.fileName);

                fs.writeFile(`./uploads/ownership_document/${newFileName}.${fileResponse.mime}`, fileBuffer , function (err) {  
                 
                    if(err){
                        
                        countErrorUploads++
                    }                
                });    
            })

        })
      

        // RSBSA FORM UPLOAD
        rsbsaFormFiles.map((fileItem)=>{
            fileItem.files.map((fileResponse)=>{
                var base64result = fileResponse.base64.split(',')[1];                
                let fileBuffer =  Buffer.from(base64result, 'base64');
                
                let newFileName = md5(fileResponse.fileName);

                fs.writeFile(`./uploads/rsbsa_form/${newFileName}.${fileResponse.mime}`, fileBuffer , function (err) {  
             
                    if(err){
                        
                        countErrorUploads++
                    }                
                });    
            })

        })
      

        // OTHER DOCUMENT FORM UPLOAD
        otherAttachmentFiles.map((fileItem)=>{
            fileItem.files.map((fileResponse)=>{
                var base64result = fileResponse.base64.split(',')[1];                
                let fileBuffer =  Buffer.from(base64result, 'base64');
                
                let newFileName = md5(fileResponse.fileName);

                fs.writeFile(`./uploads/other_document/${newFileName}.${fileResponse.mime}`, fileBuffer , function (err) {  
               
                    if(err){
                        
                        countErrorUploads++
                    }                
                });    
            })

        })
      



        
   
        
    }catch(error){
        console.warn(error);
        return res.send({status:false,message:error});
    }
}

module.exports = methods;