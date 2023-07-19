const mongoose =require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  name:{
    type:String,
    default:"hi",
    required:true,
    
  },
  
  password:{
    type:String,
    default:"1234",
    required:true
  },
  date:{
    type:String,
    default:Date.now
  }
});
const Admin=mongoose.model('Admin',AdminSchema);

module.exports=Admin;