const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchadmin = require('../middleware/fetchadmin');

require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

//Route !: Create Admin. 
router.post('/create',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
  
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] ,
async (req,res)=>{
  let success=false;
    try {
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        
        // Create a new Admin
        user = await Admin.create({
          name: req.body.name,
          password: secPass
          
        });
        const data = {
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
    
    
        // res.json(user)
        success=true;
        res.json({ success,authtoken })

    }
    catch(error){
        console.error(success,error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 2: Admin Login.

router.post('/login', [
    
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    
    let success=false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, password } = req.body;
    try {
      let user = await Admin.findOne({ name });
      if (!user) {
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken })
  
    } catch (error) {
      console.error(sucess, error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });

  router.get('/getadmin', fetchadmin,  async (req, res) => {

    try {
      
      const userId = await req.user.user.id;
      
      const user = await Admin.findById(userId);
      
      res.json(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })


module.exports =router;