const { default: mongoose } = require("mongoose");
const NewBuilding = require("../models/Buildings");
const UnitsAvailable = require("../models/Units");
const response=require('../helper/response')
exports.ShowBuildings = async (req, res) => {
  try {
    const TotalData = await NewBuilding.aggregate([
      {
        $lookup: {
          from: "unitsavailables",
          localField: "_id",
          foreignField: "BuildingId",
          as: "Units",
        },
      },
    ]);
    if(TotalData) {
      for (let i = 0; i < TotalData.length; i++) {
        let CountUnit = 0;
        CountUnit = TotalData[i].Units.length;
        TotalData[i].Units = CountUnit;
      }
      return response.successResponse(res,TotalData)
    }
    else {
      //something went Wrong
    }

  } catch (err) {
 return response.failedResponse(res,err.message)
  }
};

exports.AddBuilding = async (req, res) => {
  try {
    const Admin = req.Admin._id;
    const { BuildingName, Address, Location, Description } = req.body;
    const Building = await NewBuilding.create({
      BuildingName,
      Address,
      Location,
      Description,
      Admin,
    });
    return response.successResponseWithData(res,"Building added Successful",Building)
  } catch (err) {
    return response.failedResponse(res,err.message)
  }
};

exports.RemoveBuilding = async (req, res) => {
  try {
    await NewBuilding.deleteOne({ _id: req.body._id });
    await UnitsAvailable.deleteMany({ BuildingId: req.body._id });
    return response.successResponse(res,"Building Removed Successful")
  } catch (err) {
    return response.failedResponse(res,err.message)
  }
};
exports.ShowUnitWise = async (req, res) => {
  try {
    const FilteredData = await UnitsAvailable.aggregate([
        {
        $match:{
            "BuildingId":new mongoose.Types.ObjectId(req.params._id)
        }
    },
{
    $lookup:{
        from:"owners",
        localField:"OwnerId",
        foreignField:"_id",
        as:"OwnerDetails"
    }
},
{
    $unwind:"$OwnerDetails"
},
{
    $lookup:{
        from:"buildings",
        localField:"BuildingId",
        foreignField:"_id",
        as:"BuildingDetails"
    }
},
{
        $lookup:{
            from:"management_users",
            localField:"BuildingDetails.Admin",
            foreignField:"_id",
            as:"AdminDetails"
        }
    
},
{
    $unwind:"$AdminDetails"
},{
    $project:{
        BuildingDetails:"$BuildingDetails",
        PropertyCompany:"$AdminDetails.Company",
        Status:"$BuildingDetails.Status",
        OwnerName:"$OwnerDetails.Name",
        OwnerId:"$OwnerDetails._id",
        UnitNo:"$UnitNo",
        UnitId:"$_id"
    }
  }])
   return response.successResponse(res,FilteredData)
  } catch (err) {
    return response.failedResponse(res,err.message)
  }
};
exports.ChangeStatus = async (req, res) => {
  try {
    const Building = await NewBuilding.findById(req.body._id);
    if (Building.Status == "Active") {
      await NewBuilding.updateOne(
        { _id: req.body._id },
        { Status: "Deactive" }
      );
    } else {
      await NewBuilding.updateOne({ _id: req.body._id }, { Status: "active" });
    }
    return response.successResponse(res,"Status Changed successfully")
  } catch (err) {
    return response.failedResponse(res,err.message)
  }
};
exports.RemoveUnitWise=async(req,res)=>{
    try{
    await UnitsAvailable.deleteOne({_id:req.body._id})
    return response.successResponse(res,"Unit Removed Successful")
    }
    catch(err){
       return response.failedResponse(res,err.message)
    }
}
