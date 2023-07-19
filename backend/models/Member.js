const mongoose =require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
   

   refid:{
    type:String,
    default:"hi",
    required:true
        },
    
    Aadhar:{
      type:String,
    default:"hi",
    required:true
    },
    Pan:{
      type:String,
    default:"hi",
    required:true
    },
    AccountNum:{
      type:String,
    default:"hi",
    required:true
    },
    IFSC:{
      type:String,
    default:"hi",
    required:true
    },
   
  name:{
    type:String,
    default:"hi",
    required:true
  },
  email:{
    type:String,
    default:"email@eee.com",
    unique: true,
    required:true
  },
  password:{
    type:String,
    default:"1234",
    required:true
  },
  phone:{
    type:String,
    default:"1234567890",
    required:true
  },
  address:{
    type:String,
    default:"no address",
    required:true
  
  },
  date:{
    type:String,
    default:Date.now
  }
});
const member=mongoose.model('member',memberSchema);

module.exports=member;