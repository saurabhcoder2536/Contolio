const mongoose=require('mongoose');
const schema=new mongoose.Schema({
   Name:{
    type:String,
    required:[true,'please enter a valid name']
   },
   Email:{
    type:String,
    required:[true,'please enter a email'],
    lowercase:true,
    unique:true,
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    }
   },
   Subject:{
    type:String,
    required:[true,'please enter a valid subject']
   },
   Description:{
    type:String,
    required:[true,"please enter a valid description"]
   }
})
const productschema=mongoose.model('contact us',schema);

module.exports=productschema;