const express=require('express');
const {verify}=require('../middleware/auth')
const router=express.Router();
const UnitsAvailable=require('../Controller/Units')
const Upload = require('../middleware/multer');
router
.delete('/RemoveUntDetails/:_id',verify,UnitsAvailable.RemoveUnitDetails)
.patch('/UpdateUnitDetails/:_id',verify,UnitsAvailable.UpdateUnitDetails)
.get('/UnitDetailsDocWise/:_id',verify,UnitsAvailable.UnitDetailsDocWise)
.get('/UnitDetailsTenantWise',verify,UnitsAvailable.UnitDetailsTenantWise)
.get('/UnitDetails/:_id',verify,UnitsAvailable.UnitDetails)
.get('/UnitsShowing',verify,UnitsAvailable.ShowUnits)
.post('/UnitsAvailable',verify,Upload.single('UnitPicture'),UnitsAvailable.NewUnits)
exports.routes=router;
