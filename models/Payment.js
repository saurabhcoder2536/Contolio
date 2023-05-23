const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    Tenant_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tenants"
    },
    Building_Name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"buildings",
    },
    Unit_No:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"unitavailables"
    },
    Amount:{
        type:String,
        required:true,
    },
    Method:{
        type:String,
        enum:["Cheque","Manual"],
        required:true,
    },
    Payment_Date:{
        type:Date,
        required:true,
    },      
    Cheque_No:{
        type:Number
    },
    Upcoming_Payment:{
        type:Date
    },
    Remarks:{
        type:String,
        required:true,
    },
    Payment_Status:{
        type:String,
        enum:["Pending","Overdue","Clear"]
    }
})
const Payments=mongoose.model('Payments',Schema);
module.exports=Payments;