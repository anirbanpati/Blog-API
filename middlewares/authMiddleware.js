const jwt = require('jsonwebtoken');
const User = require('../models/User.models.js');
const {status} = require('../constants');

const protect = async (req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try{
        token =  req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
        }catch(err){
            res.status(status.UNAUTHORIZED).json({message: 'Not authorized, token failed'});

        }
        }
        if(!token){
             res.status(status.UNAUTHORIZED).json({message: 'Not authorized, no token'});

        }
};



module.exports = {protect};