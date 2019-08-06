const User = require('../models/userSchema')

const signup = async(req,res) =>{
    const userExists = await User.findOne({email : req.body.email})
    if(userExists)
        return res.status(403).json({
            error : "Email is taken!"
        })
    else
    {
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message : "Signup Success! Please Login"})
    }
}

module.exports = {signup}