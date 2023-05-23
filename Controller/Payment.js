const Payment = require("../models/Payment");
const Tenant = require("../models/Tenant");
exports.AddPaymentByCheque = async (req, res) => {
  try {
    const TenantPaymentStatus = await Tenant.find();
    const Method = "Cheque";
    for (let i = 0; i < TenantPaymentStatus.length; i++) {
      if (TenantPaymentStatus[i].Payment == "Cheque" && Method == "Cheque") {
        const {
          Tenant_Id,
          Amount,
          Payment_Date,
          Upcoming_Payment,
          Cheque_No,
          Remarks,
        } = req.body;
        await Payment.create({
          Tenant_Id,
          Amount,
          Payment_Date,
          Upcoming_Payment,
          Cheque_No,
          Remarks,
          Method,
        });
        break;
      }
    }
    res.status(200).json({ message: "Payment added Succesfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.AddPaymentManually = async (req, res) => {
  try {
    const TenantPaymentStatus = await Tenant.find();
    const Method = "Manual";
    for (let i = 0; i < TenantPaymentStatus.length; i++) {
      if (TenantPaymentStatus[i].Payment == "Manual" && Method == "Manual") {
        const { Tenant_Id, Amount, Payment_Date, Payment_Status, Remarks } =
          req.body;
        await Payment.create({
          Tenant_Id,
          Amount,
          Payment_Date,
          Payment_Status,
          Remarks,
          Method
        });
        break;
      }
    }
    res.status(200).json({ message: "Payment added Succesfully Manual" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.ShowPaymentByCheque=async(req,res)=>{
  try{
    const ChequePayment=await Payment.aggregate([{
      $match:{
        "Method":"Cheque"
      }
    },{
      $lookup:{
        from:"tenants",
        localField:"Tenant_Id",
        foreignField:"_id",
        as:"TenantDetails"
      }
    },{
      $lookup:{
        from:"unitsavailables",
        localField:"TenantDetails.Unit_No",
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
    res.status(200).json(ChequePayment)
  }
  catch(err){
    res.status(400).json({message:err.message})
  }
}
exports.ShowPaymentManually=async(req,res)=>{
  try{
    const ManualPayment=await Payment.aggregate([{
      $match:{
        "Method":"Manual"
      }
    },{
      $lookup:{
        from:"tenants",
        localField:"Tenant_Id",
        foreignField:"_id",
        as:"TenantDetails"
      }
    },{
      $lookup:{
        from:"unitsavailables",
        localField:"TenantDetails.Unit_No",
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
    res.status(200).json(ManualPayment)
  }
  catch(err){
    res.status(400).json({message:err.message})
  }
}
