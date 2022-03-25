const jwt = require('jsonwebtoken')
const Customer = require('../models/User')

const auth = async (req, res, next) => {
    if (req.header('Authorization')?.includes("Bearer ")) {
        var token = req.header('Authorization');
        if (token){
            token = token.replace('Bearer ', '')
        }
        if (token) {
            try {
                const data = await jwt.verify(token, "mycustomersecretkey")
                console.log("ddddata", data)
                const customer = await Customer.findOne({ _id: data?._id, 'tokens.token': token })
                if (!customer) {
                    throw new Error("Not authorized to access this resource")
                }
                req.customer = customer
                req.token = token
                next()
            } catch (error) {
                res.status(401).send({ error })
            }
        } else {
            res.status(401).send({ error: 'Invalid Token' })
        }
    } else {
        res.status(401).send({ error: 'Token type should be Bearer' })
    }
}
module.exports = auth