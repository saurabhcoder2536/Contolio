const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
 PhoneNo:{
    type:String,
    length:10,
    required:true
 },
 Specialist:{
    type:String,
    enum:["AcRepair","Electrician","gardner","Carpenter"]
 },
 Remarks:{
    type:String,
    required:true
 },
 Images:{
    type:String,
    required:true
 }
})
const Expert=mongoose.model('experts',Schema);
module.exports=Expert