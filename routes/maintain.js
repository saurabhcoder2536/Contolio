const express=require('express');
const router=express.Router();
const {verify}=require('../middleware/auth')
const Upload=require('../middleware/multer')
const Expert=require('../Controller/Maintain')
router
.delete('/RemoveExpert',verify,Expert.RemoveExpert)
.put('/EditMaintainRequest/:_id',verify,Upload.single("Images"),Expert.EditMaintainRequest)
.get('/ShowMaintainRequest',verify,Expert.MaintenanceRequest)
.post('/AddMaintain/:_id',verify,Upload.single("Images"),Expert.AddMaintain)
.post('/AddExpense/:_id',verify,Upload.single("Images"),Expert.AddExpenses)
.post('/AddExpert',verify,Upload.single("Images"),Expert.AddExpert)
exports.routes=router;