const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()


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
const signin = (req,res) =>{
    const {email,password} = req.body
    User.findOne({email} ,(err,user) =>{
        if(err || !user)
        {
            return res.status(401).json({
                error : "User with this Email does not exist, Please Sign in Again"
            })
        }
        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error : "The Email and Password combination does not match"
            })
        }
        //Generate a token with user id and secret
        const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)
        res.cookie("t", token,{expire : new Date() + 9999})
        const {_id,name,email} = user;
        return res.json({token , user : {_id, email, name}})
    })
}
const signout = (req,res) =>{
    res.clearCookie("t")
    return res.json({message : "Sign Out Success"})
}
module.exports = {signup,signin,signout}