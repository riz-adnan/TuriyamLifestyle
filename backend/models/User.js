const mongoose =require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
const User=mongoose.model('User',UserSchema);

module.exports=User;