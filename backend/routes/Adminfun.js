const express = require('express');
const Admin = require('../models/Admin');
const Member = require('../models/Member');
const AppMember = require('../models/AppMember');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchadmin = require('../middleware/fetchadmin');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_MEMBER;

router.get('/getmember', fetchadmin, async (req, res) => {
    const member = await Member.find()
    res.json(member);
})

router.post('/approvemember/:id', fetchadmin, async (req, res) => {
    const{memberid,lastmonthsales,dailysales,Monthsales,GPG,rank,childranks}=req.body;
    try {
        const member = await Member.findById(req.params.id);
        
            if(!member){
                return res.status(404).send("Not Found");
            }
            console.log(member);
            
            
                const parent=await AppMember.findOne({ memberid:req.body.parentid });
                console.log(parent)
                if(!parent)
                {
                    return res.status(200).send("Wrong referral");
                }
            
            
        
        const appmember=AppMember.create({
            member:member._id,
            parent:parent._id,
            memberid:memberid,
            lastmonthsales:lastmonthsales,
            dailysales:dailysales,
            Monthsales:Monthsales,
            GPG:GPG,
            rank:rank,
            childranks:childranks
        })
        res.json(appmember)
        const data = {
            user: {
              id: appmember.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);

          
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/getappmembers',fetchadmin,async (req,res) =>{
    const member=await AppMember.find();
    res.json(member);
 });

module.exports=router;