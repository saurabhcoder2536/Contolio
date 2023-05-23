const Tenant = require("../models/Tenant");
exports.NewTenant = async (req, res) => {
  try {
    const { Name, Email, Payment, Phone, Contract_Id, Unit_No } = req.body;
    const NewTenant = await Tenant.create({
      Unit_No,
      Name,
      Email,
      Payment,
      Phone,
      Contract_Id,
    });
    res.status(200).json({ message: "Tenant added succesfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.TenantRequests = async (req, res) => {
  try {
    const TenantRequests = await Tenant.aggregate([
      {
        $lookup: {
          from: "contracts",
          localField: "Contract_Id",
          foreignField: "_id",
          as: "ContractDetails",
        },
      },
    ]);
    res.status(200).json(TenantRequests);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.TenantFullDetails = async (req, res) => {
  try {
    const TenantFullDetails = await Tenant.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params._id),
        },
      },
      {
        $lookup: {
          from: "contracts",
          localField: "Contract_Id",
          foreignField: "_id",
          as: "ContractDetails",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "Tenant_Id",
          as: "PaymentDetails",
        },
      },
      {
        $lookup: {
          from: "unitsavailables",
          localField: "Unit_No",
          foreignField: "_id",
          as: "UnitDetails",
        },
      },
      {
        $lookup: {
          from: "buildings",
          localField: "UnitDetails.BuildingId",
          foreignField: "_id",
          as: "BuildingDetails",
        },
      },
    ]);
    res.status(200).json(TenantFullDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.EditTenantDetails=async(req,res)=>{
    try{
        console.log('eeeeeeeeeeeeeeeee')
    const Payload={
        Unit_No:req.body.Unit_No,
        Name:req.body.Name,
        Email:req.body.Email,
        Payment:req.body.Payment,
        Phone:req.body.Phone,
        Contract_Id:req.body.Contract_Id,
    }
    const ChangedTenantDetails=await Tenant.findByIdAndUpdate(
        req.params._id,
        Payload
    )
    res.status(200).json(ChangedTenantDetails)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}
exports.RemoveTenant=async(req,res)=>{
  try{
    const{id}=req.body;
  const RemoveTenant=await Tenant.findByIdAndDelete(id)
  res.status(200).json({message:"Tenant Removed Succesfully"})
  }
  catch(err){
    res.status(400).json({message:err.message})
  }
}
