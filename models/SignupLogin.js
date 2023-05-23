const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    Name:{
        type:String,
        required:[true,"please enter a valid name"]
    },
    Password:{
        type:String,
        required:[true,'please enter a valid password'],
        minLength:[6,'please enter a valid length password of min 6 char']
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
        length:10
    },
    Role:{
        type:String,
        required:[true,'please enter a valid role']
    },
    Country:{
        type:String
    },
    Company:{
        type:String
    },
    Office_Contact:{
        type:String
    }
})
const SignupLogin=mongoose.model('Management_User',Schema)
module.exports=SignupLogin;