
const jwt = require('jsonwebtoken');
const response = require('../helper/response');
const model = require('../models/SignupLogin')
const user = model.user
exports.verify = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return response.failedResponse(res, "Unauthorized ...");
        }
        let token = req.headers.authorization.split(" ")[1];
        let verifyToken = jwt.verify(token, '12345');
        console.log(verifyToken);
        let verified = await model.findById(verifyToken.id)
        if (verified) {
            req.user = verified;
            next();
        }
    } catch (error) {
        return response.failedResponse(res, error.message);
    }
} 