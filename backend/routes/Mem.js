const express = require('express');
const Member = require('../models/Member');
const AppMember=require('../models/AppMember')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchadmin = require('../middleware/fetchadmin');
const fetchmember=require('../middleware/fetchmember')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_MEMBER;

router.post('/requestmember', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await Member.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      // Create a new user
      user = await Member.create({
        refid:req.body.refid,
        Aadhar:req.body.Aadhar,
        Pan:req.body.Pan,
        AccountNum:req.body.AccountNum,
        IFSC:req.body.IFSC,

        name: req.body.name,
        password: secPass,
        email: req.body.email,
        phone:req.body.phone,
        address: req.body.address,
        
      });
    
      res.json(user);
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
 // Route 2: Login for Approved Members. No login required
 router.post('/memberlogin',async (req,res)=>{
    const { memberid, password } = req.body;
    try {
      let user = await AppMember.findOne({ memberid });
      if (!user) {
        return res.status(400).json({ error: "Please try to login with correct credentials.email" });
      }
      let memuser=await Member.findById(user.member);
      const passwordCompare = await bcrypt.compare(password, memuser.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
  
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
 });

 //Route 3: Route for getting all the member(approved) by members.
 router.get('/getappmembers',fetchmember,async (req,res) =>{
    const member=await AppMember.find();
    res.json(member);
 });



  module.exports=router;