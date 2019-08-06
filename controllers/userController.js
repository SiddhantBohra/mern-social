const User = require('../models/userSchema')
const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    })
}
const hasAuthorization = (req,res,next) =>{
    const authorized =  req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized)
    {
        return res.status(403).json({
            error : "User is not authorized to perform this action"
        })
    }
}
module.exports = { userById }