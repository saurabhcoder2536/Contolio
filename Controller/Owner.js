const Owners=require('../models/Owner');
const response=require('../helper/response')

exports.ShowOwners=async(req,res)=>{
try{
const OwnersDetails=await Owners.find({});
return response.successResponse(res,OwnersDetails)
}
catch(err){
    return response.failedResponse(res,err.message)
}
}

exports.CreateOwner=async(req,res)=>{
    try{
    const{Name,Phone,Email,Remarks}=req.body;
    await Owners.create({
        Name,
        Phone,
        Email,
        Remarks
    })
    return response.successResponse(res,"owner added successfully")
}
catch(err){
    return response.failedResponse(res,err.message)
}
}

exports.RemoveOwner=async(req,res)=>{
    try{
     await Owners.deleteOne({_id:req.body._id})
     return response.successResponse(res,"owner removed successfully")
    }
    catch(err){
        return response.failedResponse(res,err.message)
    }
}

exports.ChangeStatus=async(req,res)=>{
    try{
       const Status=await Owners.findOne({_id:req.body._id});
       let Change='';
       if(Status.Status="Active"){
        Change="Deactive"
       }
       else{
        Change="Active"
       }
       await Owners.updateOne({_id:req.body._id},{Status:Change})
       return response.successResponse(res,"user status changed successfully")
       }
       catch(err){
          return response.failedResponse(res,err.message)
       }
}