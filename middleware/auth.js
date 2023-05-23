const jwt = require('jsonwebtoken')
const SignupLogin = require('../models/SignupLogin')

exports.verify = async(req, res, next)=>{
try {
    let token = req.headers.authorization.split(" ")[1]
    let verifyToken = jwt.verify(token, "12345")
    const matchInDb = await SignupLogin.findById(verifyToken.id)
   req.Admin=matchInDb;
    next();
} catch (error) {
    console.log(error.message)
}
}  