const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {status} = require('../constants');


const registerUser = async (req,res) => {
    const {username, email, password,name} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({message: 'User already exists'});
        }
        const user = await User.create({
            username,
            email,
            password,
            name
        });
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{ expiresIn: '30d' });
    res.status(status.CREATED).json({token});
    }catch(error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
};


const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            const token = jwt.sign({id: user._id} , process.env.JWT_SECRET, {expiresIn: '30d'});
            res.status(status.OK).json({token});
        } else {
            res.status(status.UNAUTHORIZED).json({message: 'Invalid credentials'});
        }
    }
    catch(error){
        res.status(status.INTERNAL_SERVER_ERROR).json({message: "Server Error"});
    }
};


module.exports = {registerUser, loginUser};