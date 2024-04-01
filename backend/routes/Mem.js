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
const sendMail = require('../utils/nodeMailer');
const member = require('../models/Member');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_MEMBER;
cron.schedule("0 0 0 * * *", async ()=> {
  
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
 router.post('/getappmembers',fetchmember,async (req,res) =>{
  
    const members=await AppMember.find();
    let showmembers=[];
    let actmember=[];
    showmembers.push(req.body.memberid);
    let mem=await AppMember.findOne({memberid:req.body.memberid});
  
    actmember.push(mem);
    
    while(showmembers.length>0)
    {
    for(let i=0;i<members.length;++i)
    {
      
      if(members[i].parentname==showmembers[0])
      {
        
        showmembers.push(members[i].memberid);
        
        actmember.push(members[i]);
      }
    }
    showmembers.shift();
  }
  
    res.json(actmember);
 });

//Route 4: Update Member
 
 router.put('/updateappmembers/:id',fetchadmin,async (req,res)=>{
  
  try{
    
    let newappmember={};
    if(req.body.memberid){newappmember.memberid=req.body.memberid}
    if(req.body.Lastmonthsales){newappmember.Lastmonthsales=req.body.Lastmonthsales}
    if(req.body.dailysales){newappmember.dailysales=req.body.dailysales}
    if(req.body.Monthsales){newappmember.Monthsales=req.body.Monthsales}
    if(req.body.GPG){newappmember.GPG=req.body.GPG}
    if(req.body.rank){newappmember.rank=req.body.rank}
    
    
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

 router.put('/updatemember/:id',fetchadmin,async (req,res)=>{
    
    try{
      
      
      
      let member= await Member.findById(req.params.id);
      if(!member)
      {
        return res.status(200).send("Members is not approved")
      }
      let newmember={};
      if(req.body.refid){newmember.refid=req.body.refid}
      else{newmember.refid=member.refid}
      if(req.body.Aadhar){newmember.Aadhar=req.body.Aadhar}
      else{newmember.Aadhar=member.Aadhar}
      if(req.body.Pan){newmember.Pan=req.body.Pan}
      else{newmember.Pan=member.Pan}
      if(req.body.AccountNum){newmember.AccountNum=req.body.AccountNum}
      else{newmember.AccountNum=member.AccountNum}
      if(req.body.IFSC){newmember.IFSC=req.body.IFSC}
      else{newmember.IFSC=member.IFSC}
      if(req.body.name){newmember.name=req.body.name}
      else{newmember.name=member.name}
      if(req.body.email){newmember.email=req.body.email}
      else{newmember.email=member.email}
      if(req.body.password){newmember.password=req.body.password}
      else{newmember.password=member.password}
      if(req.body.phone){newmember.phone=req.body.phone}
      else{newmember.phone=member.phone}
      if(req.body.address){newmember.address=req.body.address}
      else{newmember.address=member.address}
      member= await Member.findByIdAndUpdate(req.params.id,{$set:newmember},{new:true});
      res.json(member);
    }
    catch(error){
      console.error(error.message)
      res.status(500).send("Internal Server Error");
    }
    })


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

 router.post('/memberdetail/:id',fetchadmin,async (req,res)=>{
  let member=await AppMember.findById(req.params.id)
    if(!member)
    {
      return res.status(200).send("member not found")
    }
    let idmem=member.member;
    let memberdetails=await Member.findById(idmem)
    res.json({member:member,memberdetails:memberdetails})
 })

 router.post('/verification',async(req,res)=>{
    let member=await Member.findOne({email:req.body.email});
    
    if(!member)
    {
      return res.status(200).send("member not found. Try registering first")
    }
    let newappmember=await AppMember.findOne({member:member._id})
    if(newappmember)
    {
      return res.status(200).send("Member already verified")
    }
    let email=req.body.email
    req.body.email=member.email;
    req.session.confirmationEmail = email;
    let confirmations=await sendMail(req,res);
    req.session.confirmationCode = confirmations[email];
    
    res.json({success:"true",confirmations})
    
 })
 router.post('/verifycode',async(req,res)=>{  
    const { code } = req.body;
    const email = req.body.confirmationEmail;
    const confirmationCode = req.body.confirmationCode;
    
    if (confirmationCode === code) {
      let member=await Member.findOne({email:email});
      let parent=await AppMember.findOne({ memberid:member.refid });
      let pid;
      let pname="";
      if(parent)
      {
         pid=parent._id;
         pname=parent.memberid;
      }
      else
      {
        let p2=await Member.findOne({memberid:"TLS-001"});
        pid=p2._id;
        pname=p2.memberid;
      }
      let newappmember=await AppMember.findOne({member:member._id})
      if(newappmember)
      {
        return res.status(200).send("Member already verified")
      }
      let str="TLS-"
      for(let i=100;i<10000;++i)
      {
        let str1=str+i;
        let appmember=await AppMember.findOne({memberid:str1})
        if(!appmember)
        {str=str1;break;}
      }
      let appmember=await AppMember.create({
        member:member._id,
        parent:pid,
        parentname:pname,
        name:member.name,
        memberid:str,
        lastmonthsales:"0",
        dailysales:"0",
        Monthsales:"0",
        GPG:"0",
        rank:"0",
        childranks:"0"
    })
    res.json(appmember);
 }})

 router.post('/forgotpassword',async(req,res)=>{
    let member=await Member.findOne({email:req.body.email});
    
    if(!member)
    {
      return res.status(200).send("member not found. Try registering first")
    }
    let email=req.body.email;
    req.body.email=member.email;
    req.session.confirmationEmail = email;
   
    let confirmations=await sendMail(req,res);
    req.session.confirmationCode = confirmations[email];
   
    res.json({success:"true",confirmations})
  })
  router.post('/resetpassword',async(req,res)=>{  
    const { code } = req.body.code;
    const email = req.session.confirmationEmail;
    const confirmationCode = req.session.confirmationCode;
    
    
    if (confirmationCode === code) {
      let member=await Member.findOne({email:email});
      let newmember=member;

      if(req.body.password){
        const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      newmember.password=secPass;
    }
      else{newmember.password=member.password}
      member= await Member.findByIdAndUpdate(member._id,{$set:newmember},{new:true});
      res.json(member);
    }
  })



  module.exports=router;