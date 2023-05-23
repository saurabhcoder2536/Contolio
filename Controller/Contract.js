const { default: mongoose } = require('mongoose');
const Contract=require('../models/Contracts');
exports.CreateContract=async(req,res)=>{
try{
        const NewContract=new Contract({
            Contract_Name:req.body.Contract_Name,
            ContractImage:req.file.originalname,
            Unit_Id:req.body.Unit_Id,
            Start_Date:req.body.Start_Date,
            Expiry_Date:req.body.Expiry_Date,
            Status:req.body.Status
        })
        NewContract.save().then(()=>{
            res.send('Sucessfully Contracts added')
        }).catch(err=>{
            res.send("aaaaaaaaaaaaa",err.message)
        })
        
}catch(err){
    res.status(400).json({message:err.message})
}
}
exports.ShowContracts=async(req,res)=>{
    try{
     const Contracts=await Contract.aggregate([{
        $lookup:{
            from:"unitsavailables",
            localField:"Unit_Id",
            foreignField:"_id",
            as:"Contracts"
        }
     }])
     res.status(200).json({Contracts})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}

exports.RemoveContract=async(req,res)=>{
    try{
     const ContractDel=await Contract.deleteOne({
        _id:req.params._id
     })
     if(ContractDel){
        res.status(200).json({message:"Contract remove succesfully"})
     }
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}
exports.ContractWise=async(req,res)=>{
    try{
    const ContractWise=await Contract.aggregate([{
        $match:{
            "_id":new mongoose.Types.ObjectId(req.params._id)
        }
    },{
        $lookup:{
            from:"unitsavailables",
            localField:"Unit_Id",
            foreignField:"_id",
            as:"UnitDetails"
        }
    },{
        $lookup:{
            from:"buildings",
            localField:"UnitDetails.BuildingId",
            foreignField:"_id",
            as:"BuildingDetails"
        }
    }])
    res.status(200).json(ContractWise)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}