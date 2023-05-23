const { default: mongoose } = require("mongoose");
const NewBuilding = require("../models/Buildings");
const UnitsAvailable = require("../models/Units");
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
    for (let i = 0; i < TotalData.length; i++) {
      let CountUnit = 0;
      CountUnit = TotalData[i].Units.length;
      TotalData[i].Units = CountUnit;
    }
    res.status(200).json({ TotalData });
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    res.status(200).json({ message: "building add successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.RemoveBuilding = async (req, res) => {
  try {
    await NewBuilding.deleteOne({ _id: req.body._id });
    await UnitsAvailable.deleteMany({ BuildingId: req.body._id });
    res.status(200).json({ message: "Building removed Sucessfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
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
},{
        $lookup:{
            from:"management_users",
            localField:"BuildingDetails.Admin",
            foreignField:"_id",
            as:"AdminDetails"
        }
    
},{
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
    res.status(200).json({ FilteredData });
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    res.status(200).json({ message: "status changed succesfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.RemoveUnitWise=async(req,res)=>{
    try{
    await UnitsAvailable.deleteOne({_id:req.body._id})
    res.status(200).json({message:"Unit removed Successfully"})
    }
    catch(err){
        res.status(400).json(err.message)
    }
}
