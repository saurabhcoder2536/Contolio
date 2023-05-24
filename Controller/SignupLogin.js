const SignupLogin = require("../models/SignupLogin");
const Jwt= require("jsonwebtoken")
const Bcrypt=require('bcrypt');
const response=require('../helper/response')
exports.Login_User = async (req, res) => {
  try {
    // const Management_Users =await SignupLogin.create({
    //     Name: "Saurabh Kumar Rai",
    //     Password: await Bcrypt.hash('Saurabhrai2536',8),
    //     Email: "skrgang524@gmail.com",
    //     Phone: 9340255384,
    //     Role: "Admin",
    //     Country: "India",
    //     Company: "Sunfocus Solution Pvt Ltd",
    //     Office_Contact: "Office Contact",
    //   });
    const FindId = await SignupLogin.findById("646758ef7a23898763a6b2eb");
    let token =  Jwt.sign({id:FindId._id},"12345")
    console.log("======",token)
    return res.send({data:FindId,token:token})
  } catch (err) {
  return response.failedResponse(res,err.message)
  }
};
exports.EditProfile = async (req, res) => {
    try{
        const { Name, Email, Phone, Role, Country, Company, Office_Contact, _id } = req.body;
        const FinData = await SignupLogin.findOne({
            _id:_id
        })
          const ProfileChanges = await SignupLogin.updateOne(
    { Name:FinData.Name},{Name, Email, Phone, Role, Country, Company, Office_Contact}
     );
     return response.successResponse(res,ProfileChanges)
    }
    catch(err){
        return response.failedResponse(res,err.message)
    }
};
exports.ChangePassword=async(req,res)=>{
    try{
    const{PasswordInput}=req.body;
    const FinData=await SignupLogin.findOne({
        _id:req.body._id
    })
const CurrentPassword=FinData.Password;
const Auth=await Bcrypt.compare(PasswordInput,CurrentPassword)
if(Auth){
    console.log('aaaaaaaaaaaaaaaaaaaaaa')
await SignupLogin.updateOne({Password:CurrentPassword},{Password:req.body.NewPassword})
return response.successResponse(res,"password changed successfully")
}
    }catch(err){
        return response.failedResponse(res,err.message)
    }
}
