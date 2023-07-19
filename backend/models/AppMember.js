const mongoose =require('mongoose');
const { Schema } = mongoose;

const AppmemberSchema = new Schema({
   member:{
    type: mongoose.ObjectId,
    ref: "member",
        required:true
   },
   parent:{
    type: mongoose.ObjectId,
    ref: "member",
    default:"64b511e2b014a90a045dd868"
   },
   memberid:{
    type:String,
    default:"hi",
    required:true,
    unique:true
},

Lastmonthsales:{
    type:String,
    default:"0",
    
},
dailysales:{
    type:String,
    default:"0",
    
},
Monthsales:{
    type:String,
    default:"0",
    
},
GPG:{
    type:String,
    default:"0",
    
},
rank:{
    type:String,
    default:"0"
},
childranks:{
    type:String,
    default:"0",
},
  date:{
    type:String,
    default:Date.now
  }
});
const Appmember=mongoose.model('Appmember',AppmemberSchema);

module.exports=Appmember;