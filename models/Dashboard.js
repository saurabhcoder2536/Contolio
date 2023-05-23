const mongoose=require('mongoose');
const Schema=new schema({
ActiveBuildings:{
    type:Number,
    required:true
},
ActiveUnits:{
    type:Number,
    required:true
},
ActiveTenants:{
    type:Number,
    required:true
},
ActiveRent:{
    type:Number,
    required:true
},
TimePeriod:{
    type:String,
    required:true
},
Owner:{
type:String,
required:true
},
Building:{
type:String,
required:true
},
Tenant:{
type:String,
required:true
},
TotalAmountOfPaymentsSettled:{
    type:String,
    required:true
},
TotalAmountOfPaymentsOverdue:{
    type:String,
    required:true
},
TotalAmountOfPaymentsUpcoming:{
    type:String,
    required:true
},
TotalAmountOfExpensesMaintenance:{
    type:String,
    required:true
},
ClosedRequestsMaintenance:{
    type:String,
    required:true
},
OpenRequestsMaintenance:{
    type:String,
    required:true
}
})
const Dashboard=mongoose.model('Dashboards',Schema);
module.exports=Dashboard;