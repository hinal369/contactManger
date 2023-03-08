const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @desc Register
// @route POST /api/users/register
// @access public 
const registerUser = asyncHandler (async (req, res) => {
    const { username, email, password } = req.body;

    if ( !username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash Password 
    const hashedPassword =  await bycrpt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    })

    if (user) {
        res.status(201).json({id : user._id, email : user.email}); 
    } else {
        res.status(400);
        throw new Error("Invalid Data");
    }
    res.send("Register");   
})

// @desc Login
// @route POST /api/users/login
// @access public 
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }

    const user = await User.findOne({ email });

    if (user && (await bycrpt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : "15m"}
        )
        res.status(200).json({ accessToken });
    } else {
        res.status(401)
        throw new Error("Email or Password is not valid")   
    }
})

// @desc Current User
// @route POST /api/users/current
// @access private 
const currentUser = asyncHandler (async (req, res) => {
    res.json(req.user); 
})

module.exports = { registerUser, loginUser, currentUser }