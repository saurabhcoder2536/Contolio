const express = require('express');
require('./config');
const ContactUs=require('./routes/ContactUs');
const SignupLogin=require('./routes/SignupLogin');
const Buildings=require('./routes/Building');
const Units=require('./routes/Units');
const Owners=require('./routes/Owner');
const Contracts=require('./routes/Contract');
const Tenant=require('./routes/Tenant');
const Payment=require('./routes/Payment');
const Maintain=require('./routes/maintain');


const app = express();
app.use(express.json())

app.use('/Contact',ContactUs.routes);
app.use('/',SignupLogin.routes);
app.use('/',Units.routes)
app.use('/',Buildings.routes);
app.use('/',Owners.routes);
app.use('/',Contracts.routes);
app.use('/',Tenant.routes);
app.use('/',Payment.routes);
app.use('/',Maintain.routes)
app.listen(3000,()=>{
  console.log('server is connected')
})
console.log(2+3);
console.log(5+4);