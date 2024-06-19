const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser=require('../middleware/fetchuser');
const User = require('../models/User');

const JWT_SECRET= "njcnirjenirj";
// Create a user using POST "/api/auth/"
router.post("/createuser", [
    // Validation rules for name, email, and password
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create user object from request body
        const { name, email, password } = req.body;

        // Check if the user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Generate salt for password hashing
        const salt = await bcrypt.genSalt(10);

        // Hash password with generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance with hashed password
        const user = new User({
            name,
            email,
            password: hashedPassword // Save the hashed password
        });

        // Save user to the database
        const savedUser = await user.save();
        const data= {
           user:{ id:user.id}
        }
        // Generate JWT token for user authentication
        const authToken= jwt.sign(data,JWT_SECRET);
        
        // Send response with authToken
        res.json({authToken});
    } catch (error) {
        console.error('Error creating user:', error);
        // Check for duplicate key error (email uniqueness constraint)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).send('Error creating user');
    }
});


// Authenticate a user using : POST "/api/auth/login"


router.post("/login", [
    // Validation rules for name, email, and password
   
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank ').exists()
], async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
         let user= await User.findOne({email});
         if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
         }
         const passwordcompare= await bcrypt.compare(password,user.password);
         if(!passwordcompare){
            return res.status(400).json({error:"Please try to login with correct credentials"});
         }
          const payload={
            user:{
                id:user.id
            }
          }
          const authToken =jwt.sign(payload,JWT_SECRET);
          res.json(authToken);
    }
    catch (error) {
        console.error('Error creating user:', error);
        // Check for duplicate key error (email uniqueness constraint)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).send('Error creating user');
    }
})


// Get user detail using : POST "/api/auth/getUser". Login Required

router.post("/getUser",fetchuser, async (req, res) =>{

    try {
        userId=req.user.id
        const user= await User.findById(userId).select("-password")
        res.send(user)
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error")
    }
})



module.exports = router;
