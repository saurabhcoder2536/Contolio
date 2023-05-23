const express=require('express');
const Owner=require('../Controller/Owner');
const {verify}=require('../middleware/auth')
const router=express.Router();
router
.get('/ShowOwners',verify,Owner.ShowOwners)
.post('/AddOwner',verify,Owner.CreateOwner)
.delete('/RemoveOwner',verify,Owner.RemoveOwner)
.patch('/OwnerStatus',verify,Owner.ChangeStatus)
exports.routes=router