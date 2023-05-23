const express=require('express')
const Contract=require('../Controller/Contract');
const Upload = require('../middleware/multer');
const {verify}=require('../middleware/auth')
const router=express.Router();
router
.get('/ContractWise/:_id',verify,Contract.ContractWise)
.get('/ShowContracts',verify,Contract.ShowContracts)
.post('/AddContract',verify,Upload.single("ContractImage"),Contract.CreateContract)
.delete('/RemoveContract/:_id',verify,Contract.RemoveContract)
exports.routes=router;
