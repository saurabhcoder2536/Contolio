const ExpertModel = require("../models/Maintain/Expert");
const ExpensesModel=require("../models/Maintain/Expenses")
const MaintainModels=require("../models/Maintain/Maintain")
const Unit=require('../models/Units')
const Tenant=require('../models/Tenant');
const { default: mongoose } = require("mongoose");
const response=require('../helper/response');
exports.AddExpert = async (req, res) => {
  try {
   const Expert=new ExpertModel({
    Name:req.body.Name,
    PhoneNo:req.body.PhoneNo,
    Specialist:req.body.Specialist,
    Remarks:req.body.Remarks,
    Images:req.file.originalname
   })
   Expert.save().then(()=>{
    return response.successResponse(res,"expert added successfully")
   }).catch(err=>{
   return response.failedResponse(res,err.message)
   })
  } catch (err) {
   return response.failedResponse(res,err.message)
  }
};

exports.AddExpenses=async(req,res)=>{
    try{
      const _id=req.params._id;
    const FinData=await Tenant.findById(_id);
    const TenantId=FinData._id;
    const UnitId=FinData.Unit_No;
    const Building=await Unit.findById(UnitId)
    const BuildingId=Building.BuildingId    
 const AddExpenses=new ExpensesModel({
    BuildingId:BuildingId,
      UnitId:UnitId,
      TenantId:TenantId,
      ExpertId:req.body.ExpertId,
      ExpenseItem:req.body.ExpenseItem,
      Currency:req.body.Currency,
      ExpensesAmount:req.body.ExpensesAmount,
      Date:req.body.Date,
      Remark:req.body.Remark,
      Images:req.file.originalname
    })
    AddExpenses.save().then(()=>{
      return response.successResponse(res,"expenses added successfully")
      }).catch(err=>{
        return response.failedResponse(res,err.message)
      })
    }
    catch(err){
      return response.failedResponse(res,err.message)
    }
}
     
     exports.AddMaintain=async(req,res)=>{
         try{
          const _id=req.params._id;
          const FinData=await Tenant.findById(_id);
          const TenantId=FinData._id;
          const UnitId=FinData.Unit_No;
          const Building=await Unit.findById(UnitId)
          const BuildingId=Building.BuildingId
          const RequestDate=await ExpensesModel.findOne({TenantId:_id})
          const RequestDateId=RequestDate.Date
      const MaintainModel=new MaintainModels({
         BuildingId:BuildingId,
           UnitId:UnitId,
           TenantId:TenantId,
           AssignExpertId:req.body.AssignExpertId,
           RequestStatus:req.body.RequestStatus,
           RequestForId:req.body.RequestForId,
           RequestDateId:RequestDateId,
           Description:req.body.Description,
           Images:req.file.originalname
         })
         MaintainModel.save().then(()=>{
          return response.successResponse(res,"maintenance added successfully")
           }).catch(err=>{
            return response.failedResponse(res,err.message)
           })
         }
         catch(err){
          return response.failedResponse(res,err.message)
         }
}
exports.MaintenanceRequest=async(req,res)=>{
  try{
  const MaintenanceRequest=await MaintainModels.aggregate([{
    $lookup:{
      from:"buildings",
      localField:"BuildingId",
      foreignField:"_id",
      as:"BuildingDetails"
    }
  },{
    $lookup:{
      from:"unitsavailables",
      localField:"UnitId",
      foreignField:"_id",
      as:"UnitDetails"
    }
  },{
    $lookup:{
      from:"experts",
      localField:"RequestForId",
      foreignField:"_id",
      as:"ExpertsDetails"
    }
  },{
    $lookup:{
      from:"expenses",
      localField:"TenantId",
      foreignField:"TenantId",
      as:"ExpensesDetails"
    }
  }])
  return response.successResponse(res,MaintenanceRequest)
  }
  catch(err){
    return response.failedResponse(res,err.message)
  }
}

exports.EditMaintainRequest=async(req,res)=>{
  try{
    const _id=req.params._id;
    const FinData=await Tenant.findById(_id);
    const TenantId=FinData._id;
    const UnitId=FinData.Unit_No;
    const Building=await Unit.findById(UnitId)
    const BuildingId=Building.BuildingId
    const RequestDate=await ExpensesModel.findOne({TenantId:_id})
    const RequestDateId=RequestDate.Date
  const EditMaintainRequest=await MaintainModels.updateOne({TenantId:_id},{
    BuildingId:BuildingId,
    UnitId:UnitId,
    TenantId:TenantId,
    AssignExpertId:req.body.AssignExpertId,
    RequestStatus:req.body.RequestStatus,
    RequestForId:req.body.RequestForId,
    RequestDateId:RequestDateId,
    Description:req.body.Description,
    Images:req.file.originalname
  })
  return response.successResponse(res,EditMaintainRequest)
   }
   catch(err){
    return response.failedResponse(res,err.message)
   }
}
exports.RemoveExpert=async(req,res)=>{
  try{
    const{id}=req.body;
    const RemoveExpert=await ExpertModel.findByIdAndDelete(id);
    return response.successResponse(res,"expert removed successfully")
  }
  catch(err){
    return response.failedResponse(res,err.message)
  }
}