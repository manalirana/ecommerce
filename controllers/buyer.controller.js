const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const signUp = async(req, res)=> {
    console.log(req.body.email)
    const isEmailExist = await userModel.findOne({email : req.body.email});
    if(isEmailExist){
        res.status(400).send("Email is already Exist")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const createUser = await userModel.create({
        ...req.body,
        password : hashedPassword
    })
    res.status(201).send(createUser);
}

const login = async( req, res ) => {
    const {email, password} = req.body;

const user = await userModel.findOne({email});
if(!user){
    return res.status(401).json({message:'Invalid email or password'});
}
const validPassword = await bcrypt.compare(password, user.password)
if(!validPassword){
    return res.status(401).json({message : 'Invalid email'});
}
const token = jwt.sign({userId : user._id},'secretkey');
res.json({token});
}
 module.exports = {signUp, login}