const express=require('express');
const Control=require('../Controller/SignupLogin');
const { verify } = require('../middleware/auth');
const router=express.Router();
router
.post('/Login',verify,Control.Login_User)
.put('/EditProfile',verify,Control.EditProfile)
.patch('/ChangePassword',verify,Control.ChangePassword)
exports.routes=router;