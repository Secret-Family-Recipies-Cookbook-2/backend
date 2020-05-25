const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require('express').Router();

const Users = require('../users/users-model');
const { isValid } = require("../users/users-service.js");


// POST /auth/register
router.post("/register", (req, res) => {
    const credentials = req.body;
    if (isValid(credentials)) {

        const rounds = process.env.BCRYPT_ROUNDS || 8;
        // hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;

        // save the user to the database
        Users.add(credentials)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "username and password and the password should be alphanumeric",
        });
    }
});


//login POST   /auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                // compare the password the hash stored in the database
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);
                    res.status(200).json({ message: "Welcome to our Secret Family Recipes API", token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password should be alphanumeric",
        });
    }
});


//generates token
function createToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = process.env.JWT_SECRET || "top secret!"; //secret to be read by token
    const options = {
        expiresIn: "1d",      //token expires in 1 day
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router; 