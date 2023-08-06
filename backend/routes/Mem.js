const express = require('express');
const Member = require('../models/Member');
const AppMember=require('../models/AppMember')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchadmin = require('../middleware/fetchadmin');
const fetchmember=require('../middleware/fetchmember')
const cron = require("node-cron");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_MEMBER;
cron.schedule("0 0 0 * * *", async ()=> {
  console.log("10sec")
  let member=await AppMember.find();
  
  const l=member.length
  for(let i=0;i<l;++i)
  {
   
    
    let mem=member[i];
    
    let newappmember={};
    newappmember.memberid=member[i].memberid
    newappmember.Lastmonthsales=member[i].Lastmonthsales
    newappmember.dailysales="0"
    newappmember.Monthsales=member[i].Monthsales
    newappmember.GPG=member[i].GPG
    newappmember.rank=member[i].rank
    newappmember.childranks=member[i].childranks
    
    let members=await AppMember.findByIdAndUpdate(member[i]._id,{$set:newappmember},{new:true})
  }});



  cron.schedule("* * 1 * *", async ()=> {
    console.log("10sec")
    let member=await AppMember.find();
    
    const l=member.length
    for(let i=0;i<l;++i)
    {
     
      
      let mem=member[i];
      
      let newappmember={};
      newappmember.memberid=member[i].memberid
      newappmember.Lastmonthsales=member[i].Lastmonthsales
      newappmember.dailysales="0"
      newappmember.Monthsales="0"
      newappmember.GPG=member[i].GPG
      newappmember.rank=member[i].rank
      newappmember.childranks=member[i].childranks
      
      let members=await AppMember.findByIdAndUpdate(member[i]._id,{$set:newappmember},{new:true})
    }

});
router.post('/requestmember', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success , errors: errors.array() });
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
      success=true;
      res.json({success,user});
  
    } catch (error) {
      console.error(error.message);
      success=false;
      res.status(500).json({success,"message":"Internal Server Error"});
    }
  })
 // Route 2: Login for Approved Members. No login required
 router.post('/memberlogin',async (req,res)=>{
  let success=false;
    const { memberid, password } = req.body;
    try {
      let user = await AppMember.findOne({ memberid });
      if (!user) {
        return res.status(400).json({ success,error: "Please try to login with correct credentials.email" });
      }
      let memuser=await Member.findById(user.member);
      const passwordCompare = await bcrypt.compare(password, memuser.password);
      if (!passwordCompare) {
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
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
      success=false;
      console.error(success,error.message);
      res.status(500).send("Internal Server Error");
    }
 });

 //Route 3: Route for getting all the member(approved) by members.
 router.get('/getappmembers',fetchmember,async (req,res) =>{
    const member=await AppMember.find();
    res.json(member);
 });

//Route 4: Update Member
 
 router.put('/updateappmembers/:id',fetchadmin,async (req,res)=>{
  
  try{
    console.log(req.body)
    let newappmember={};
    if(req.body.memberid){newappmember.memberid=req.body.memberid}
    if(req.body.Lastmonthsales){newappmember.Lastmonthsales=req.body.Lastmonthsales}
    if(req.body.dailysales){newappmember.dailysales=req.body.dailysales}
    if(req.body.Monthsales){newappmember.Monthsales=req.body.Monthsales}
    if(req.body.GPG){newappmember.GPG=req.body.GPG}
    if(req.body.rank){newappmember.rank=req.body.rank}
    
    console.log(newappmember)
    let member= await AppMember.findById(req.params.id);
    if(!member)
    {
      return res.status(200).send("Members is not approved")
    }
    member= await AppMember.findByIdAndUpdate(req.params.id,{$set:newappmember},{new:true});
    res.json(member);


  }
  catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
 }
 
 )

 router.delete('/deletemember/:id',fetchadmin,async (req,res)=>{
  
    try{
      let member=await AppMember.findById(req.params.id)
    if(!member)
    {
      return res.status(200).send("member not found")
    }
    member=await AppMember.findByIdAndDelete(req.params.id)
    
    res.json({member})
  }
  catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
 });

 router.delete('/deleterequest/:id',fetchadmin,async (req,res)=>{
  
  try{
    let member=await Member.findById(req.params.id)
  if(!member)
  {
    return res.status(200).send("member not found")
  }
  member=await Member.findByIdAndDelete(req.params.id)
  
  res.json({member})
}
catch(error){
  console.error(error.message)
  res.status(500).send("Internal Server Error");
}
});

 router.get('/memberdetail/:id',fetchadmin,async (req,res)=>{
  let member=await AppMember.findById(req.params.id)
    if(!member)
    {
      return res.status(200).send("member not found")
    }
    let idmem=member.member;
    let memberdetails=await Member.findById(idmem)
    res.json({member:member,memberdetails:memberdetails})
 })



  module.exports=router;