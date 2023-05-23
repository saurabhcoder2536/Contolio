const express=require('express');
const NewBuilding=require('../Controller/Building')
const {verify}=require('../middleware/auth')
const router=express.Router();

router
.delete('/RemoveUnitWise',verify,NewBuilding.RemoveUnitWise)
.patch('/ChangeStatusBuild',verify,NewBuilding.ChangeStatus)
.get('/ShowUnitWise/:_id',verify,NewBuilding.ShowUnitWise)
.get('/ShowBuildings',verify,NewBuilding.ShowBuildings)
.post('/NewBuilding',verify,NewBuilding.AddBuilding)
.delete('/RemoveBuilding',verify,NewBuilding.RemoveBuilding)
exports.routes=router