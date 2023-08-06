const mongoose =require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
 
  name:{
    type:String,
    default:"Unnamed Product",
    required:true
  },
  
  price:{
    type:String,
    default:"1234",
    required:true
  },
  urltoimage:{
    type:String,
    default:"g",
    required:true
  },
  description:{
    type:String,
    default:"Amazing Product",
    required:true
  },
  category:{
    type:String,
    default:"general",
    required:true
  },
  date:{
    type:String,
    default:Date.now
  }
});
const Products=mongoose.model('Products',ProductsSchema);

module.exports=Products;