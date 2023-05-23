const mongoose=require('mongoose');
const uri='mongodb://localhost:27017/contolio'
mongoose.connect(uri).then(()=>{
    console.log('database is connected')
}).catch((err)=>{
    console.log('problem in db connectivity')
})