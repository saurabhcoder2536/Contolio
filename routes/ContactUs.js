const express=require('express');
const control=require('../Controller/mvc')
const router=express.Router();
const {verify}=require('../middleware/auth')
router
.post('/Contact',verify,control.ContactUs)
exports.routes=router;