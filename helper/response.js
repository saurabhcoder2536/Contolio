module.exports = {
    successResponse: (res, msg) => {
        return res.status(200).json({
            status: 200,
            message: msg
        });
    },
    successResponseWithData: (res, msg, data) => {
        return res.status(200).json({
            status: 200,
            message: msg,
            data: data
        });
    },
    successResponseWithToken: (res, data, token) => {
        return res.status(200).json({
            status: 200,
            data: data,
            token: token
        });
    },
    failedResponse: (res, msg) => {
        return res.status(400).json({
            status: 400,
            message: msg
        });
    },
    successResponseData: (res, data) => {
        return res.status(200).json({
            status: 200,
            data: data
        })
    }

}