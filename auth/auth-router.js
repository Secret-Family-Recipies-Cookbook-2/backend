const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

//generates token
function createToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };

    const secret = process.env.JWT_SECRET || "top secret!";         //secret to be read by token

    const options = {
        expiresIn: "1d",                                    //expires in 1 day
    };
    return jwt.sign(payload, secret, options);          
}



module.exports = router; 