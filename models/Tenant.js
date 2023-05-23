const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:[true,'please enter a email'],
        lowercase:true,
        unique:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    Phone:{
        type:Number,
        length:10,
        required:true
    },
    Building_Name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"buildings"
    },
    Unit_No:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"unitsavailables"
    },
    Payment:{
       type:String,
        enum:["Cheque","Manual"]
    },
    Contract_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"contracts"
    },
    Country:{
        Type:String
    }
})
const Tenant=mongoose.model('tenants',Schema);
module.exports=Tenant;