const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    BuildingName:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Owner:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"owners"
    },
    Admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"management_users"
    },
    Status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    }
})
const Buildings=mongoose.model("Buildings",Schema);
module.exports=Buildings