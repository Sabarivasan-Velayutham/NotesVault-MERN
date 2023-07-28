
const asyncHandler = require("express-async-handler");
const { findOne } = require("../models/userModel");
const User = require("../models/userModel")
const generateToken = require("../utils/generateToken")

const registerUser = asyncHandler(async (req, res) => {
    //getting data from user 
    const { name, email, password, pic } = req.body;

    //chk if user aready exist
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // else
    const user = await User.create({
        name, email, password, pic
    })

    //if user is created, create response for it  
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            isAdmin: user.isAdmin,
            // send also the token to the client 
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw Error("Error Occured in creating user")
    }
})


// login function
const authUser = asyncHandler(async (req, res) => {
    //getting data from user 
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // if user exist and password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        })
    }
    else {
        res.status(400);
        throw Error("Invalid Email or Password")
    }
})


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });

module.exports = { registerUser, authUser, updateUserProfile };