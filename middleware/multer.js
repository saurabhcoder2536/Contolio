const path=require('path')
const multer = require('multer');
const storage = multer.diskStorage({
destination:function(req,file,collback){
collback(null,'./uploads');
},
filename:function(req, file, callback){
  callback(null, Date.now()+'-'+file.originalname);
}
});
const Upload= multer({storage});
module.exports=Upload