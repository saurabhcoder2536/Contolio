const Owners=require('../models/Owner');

exports.ShowOwners=async(req,res)=>{
try{
const OwnersDetails=await Owners.find({});
res.status(200).json({OwnersDetails});
}
catch(err){
    res.status(400).json({message:err.message})
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
    res.status(200).json({message:"Owners added Sucessfully"})
}
catch(err){
    res.status(401).json({message:err.message})
}
}

exports.RemoveOwner=async(req,res)=>{
    try{
     await Owners.deleteOne({_id:req.body._id})
     res.status(200).json({message:"Owners removed Successfully"})
    }
    catch(err){
        res.status(400).json({message:message.err})
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
       res.status(200).json({message:"User Status Changed succesfully"})
       }
       catch(err){
           res.status(400).json({message:err.message})
       }
}