const UnitsAvailable=require('../models/Units');
const BuildingId=require('../models/Buildings');
const TenantDetails=require('../models/Tenant');
const { default: mongoose, mongo } = require('mongoose');
const response=require('../helper/response')
exports.NewUnits=async(req,res)=>{
    try{
    const newImage=new UnitsAvailable({
        UnitNo:req.body.UnitNo,
        BuildingId:req.body._id,
        Rooms:req.body.Rooms,
        Area:req.body.Area,
        Bathrooms:req.body.Bathrooms,
        Currency:req.body.Currency,
        MonthlyRent:req.body.MonthlyRent,
        UnitPicture:req.file.originalname,
        Description:req.body.Description,
        OwnerId:req.body.OwnerId
    })
    newImage.save().then(()=>{
       return response.successResponse(res,"sucessfully uploaded")
    }).catch(err=>{
        res.send(err.message)
    })
}catch(err){
    return response.failedResponse(res,err.message)
}
}
exports.ShowUnits=async(req,res)=>{
    try{
  const ShowUnits=await UnitsAvailable.find({})
  return response.successResponse(res,ShowUnits)
    }
    catch(err){
        return response.failedResponse(res,err.message)
    }
}
exports.UnitDetails=async(req,res)=>{
    try{
    const UnitDetails=await UnitsAvailable.aggregate([{
        $match:{
           "_id":new mongoose.Types.ObjectId(req.params._id) 
        }
    },{
        $lookup:{
          from:"buildings",
          localField:"BuildingId",
          foreignField:"_id",
          as:"BuildingDetails" 
        }
    },{
        $project:{
        "OwnerId":0
        }
    }])
    return response.successResponse(res,UnitDetails)
}catch(err){
    return response.failedResponse(res,err.message)
}
}
exports.UnitDetailsTenantWise=async(req,res)=>{
    try{
     const UnitDetailsTenantWise=await UnitsAvailable.aggregate([{
        $lookup:{
            from:"tenants",
            localField:"_id",
            foreignField:"Unit_No",
            as:"TenantDetails"
        }
     },{
        $lookup:{
            from:"buildings",
            localField:"BuildingId",
            foreignField:"_id",
            as:"BuildingDetails"
        }
     },{
        $project:{
            "BuildingId":0,
            "OwnerId":0
        }
     }])
     return response.successResponse(res,UnitDetailsTenantWise)
    }
    catch(err){
        return response.failedResponse(res,err.message)
    }
}
exports.UnitDetailsDocWise=async(req,res)=>{
    try{
    const UnitId=req.params._id
    const FilteredDataDocWise=await UnitsAvailable.aggregate([{
        $match:{
            "_id":new mongoose.Types.ObjectId(UnitId)
        }
    },{
        $lookup:{
            from:"tenants",
            localField:"_id",
            foreignField:"Unit_No",
            as:"TenantDetails"
        }
    },{
        $lookup:{
            from:"contracts",
            localField:"TenantDetails.Contract_Id",
            foreignField:"_id",
            as:"ContractDetails"
        }
    },{
        $lookup:{
            from:"payments",
            localField:"TenantDetails._id",
            foreignField:"Tenant_Id",
            as:"PaymentDetails"
        }
    },{
        $lookup:{
            from:"maintains",
            localField:"TenantDetails._id",
            foreignField:"TenantId",
            as:"MaintanenceRequests"
        }
    },{
        $lookup:{
            from:"buildings",
            localField:"BuildingId",
            foreignField:"_id",
            as:"BuildingDetails"
        }
    }])
    return response.successResponse(res,FilteredDataDocWise)
    }
    catch(err){
        return response.failedResponse(res,err.message)
    }
}
exports.UpdateUnitDetails=async(req,res)=>{
try{
const Payload={
    BuildingId:req.body._id,
    Rooms:req.body.Rooms,
    Area:req.body.Area,
    Bathrooms:req.body.Bathrooms,
    Currency:req.body.Currency,
    MonthlyRent:req.body.MonthlyRent,
    Description:req.body.Description,
    OwnerId:req.body.OwnerId,
    TenantId:req.body.TenantId
}
const UpdateUnitDetails=await UnitsAvailable.findByIdAndUpdate(
    req.params._id,
    Payload
)
return response.successResponse(res,UpdateUnitDetails)
}
catch(err){
    return response.failedResponse(res,err.message)
}
}
exports.RemoveUnitDetails=async(req,res)=>{
    try{
   const RemoveUnitDetails=await UnitsAvailable.deleteOne({
    _id:req.params._id
   })
   return response.successResponse(res,RemoveUnitDetails)
    }
    catch(err){
        return response.failedResponse(res,err.message)
    }
}
