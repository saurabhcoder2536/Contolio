const product = require('../models/contact us')
const response=require('../helper/response')
exports.ContactUs = async (req, res) => {
    const {Name,Email,Subject,Description} = req.body;
    try {
    const user=await product.create({Name,Email,Subject,Description})
    return response.successResponse(res,user)
    } catch (error) {
    return response.failedResponse(res,error.message)
    }
}

