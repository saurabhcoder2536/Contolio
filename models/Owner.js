const mongoose=require('mongoose');
const Schema=mongoose.Schema({
Name:{
    type:String,
    required:true
},
Phone:{
type:Number,
length:10,
required:true,
unique:true
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
Remarks:{
    type:String,
    required:true

},
Status:{
    type:String,
    enum:["Active","Deactive"],
    default:"Active"

}
})
const OwnerSchema=mongoose.model('Owners',Schema);
module.exports=OwnerSchema;
