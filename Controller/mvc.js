const product = require('../models/contact us')
exports.ContactUs = async (req, res) => {
    const {Name,Email,Subject,Description} = req.body;
    try {
    const user=await product.create({Name,Email,Subject,Description})
    res.status(201).json({user})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

