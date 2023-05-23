const express=require('express');
const router=express.Router();
const {verify}=require('../middleware/auth')
const Tenant=require('../Controller/Tenant')
router
.delete('/RemoveTenant',verify,Tenant.RemoveTenant)
.get('/TenantFullDetails/:_id',verify,Tenant.TenantFullDetails)
.get('/TenantRequests',verify,Tenant.TenantRequests)
.post('/NewTenant/',verify,Tenant.NewTenant)
.patch('/EditTenantDetails/:_id',verify,Tenant.EditTenantDetails)

exports.routes=router;