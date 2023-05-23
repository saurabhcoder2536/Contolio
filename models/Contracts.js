const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    Contract_Name:{
      type:String,
      required:true
    },
    ContractImage:{
        type:String,
        required:true
    },
    Unit_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'unitsavailables'
    },
    Start_Date:{
        type:Date,
        required:true
    },
    Expiry_Date:{
        type:Date,
        required:true
    },
    Status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    }
})
const Contract=mongoose.model('Contracts',Schema);
module.exports=Contract