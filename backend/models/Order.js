const mongoose =require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    productsname:[
      {
        type:String,
        default:""
      }
    ],
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    refid:{
      type:String,
      default:"TLS-001"
    },
    price:{
      type:Number,
      default:0
    },
    usercontact:[{
      type:String,
      default:""
    }],
    date:{
      type:String,
      default:Date.now
    }
  }
  
);
const Order=mongoose.model('Order',OrderSchema);

module.exports=Order;