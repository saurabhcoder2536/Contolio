const express=require('express');
const {verify}=require('../middleware/auth')
const router=express.Router();
const Payment=require('../Controller/Payment')
router
.get('/ShowPaymentManually',verify,Payment.ShowPaymentManually)
.get('/ShowPaymentByCheque',verify,Payment.ShowPaymentByCheque)
.post('/AddPaymentManually',verify,Payment.AddPaymentManually)
.post('/AddPaymentByCheque',verify,Payment.AddPaymentByCheque)

exports.routes=router;