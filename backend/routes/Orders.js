const express=require('express')
const router=express.Router();
const fetchadmin=require('../middleware/fetchadmin');
const fetchuser=require('../middleware/fetchuser')
const Order=require('../models/Order')
const Product=require('../models/Products')
const User=require('../models/User');
const Appmember=require('../models/AppMember');


router.post('/postorder',fetchuser, async (req,res)=>{
    success=false;
    try{
        
        console.log("postorder")
       console.log(req.body.cart)
        if(req.body.cart.length==0)
        {
            return res.json({success,"message":"no products "})
        }
        
        let price=0;
        let productnames=[]
        for(let i=0;i<req.body.cart.length;i++)
        {
            console.log("hello in postorder")
            let tempid=req.body.cart[i];
            let product=await Product.findById(tempid);
            if(!product)
            {
                console.log("product me dikakat")
                return res.json({success,"message":"wrong product"})
                
            }
            productnames.push(product.name);
            price+=parseInt(product.price);
            

        }
        let user=await User.findById(req.body.buyer)
        if(!user)
        {
            console.log(req.body.buyer)
            console.log("user me dikkat")
            return res.json({success,"message":"wrong user"});
        }
        console.log("just before creating order");
        let order= await Order.create({
            products:req.body.cart,
            buyer:req.body.buyer,
            price:price,
            productsname:productnames,
            usercontact:[user.name,user.address,user.phone],
            refid:req.body.refid,
        })
        success=true
        res.json({success,order,price,user})
        
    }
    
    catch(error){
        console.error(error.message);
    res.status(500).json({success,"message":"Internal Server Error"});

    }

}
)
router.get('/getorders',fetchadmin,async (req,res)=>{
    try{
        let orders=await Order.find();
        let productnames=[];
        console.log("in get order");
        for(let i=0;i<orders.length;i++)
        {
            
            let temporder=orders[i];
            let product=temporder.products
            for(let j=0;j<product.length;j++)
            {
                
                productnames.push()
            }
        }
        
        res.json(orders)
    }
    catch(error){
        console.error(error.message);
    res.status(500).json({"message":"Internal Server Error"});
    }
})


router.put('/approveorder/:id',fetchadmin, async (req,res)=>{
    try{
        let order=await Order.findById(req.params.id);
        if(!order)
        {
            return res.json({"message":"invalid request"})

        }
        let sale=order.price;
        let idmember=req.body.memberid;
        let mem=await Appmember.findOne({memberid:idmember});
        if(!mem)
        {
            return res.json({"message":"sales not added to the member"});
        }
        console.log(mem.Lastmonthsales)
        mem.Lastmonthsales=(parseInt(mem.Lastmonthsales)+sale).toString();
        
        mem.Monthsales=(parseInt(mem.Monthsales)+sale).toString();
        mem.dailysales=(parseInt(mem.dailysales)+sale).toString();
        let member= await Appmember.findByIdAndUpdate(mem._id,{$set:mem},{new:true});
        order=await Order.findByIdAndDelete(req.params.id);
        res.json({order,member});

    }
    catch(error){
        console.error(error.message);
    res.status(500).json({"message":"Internal Server Error"});
    }
})

router.delete('/deleteorder/:id',fetchadmin, async (req,res)=>{
    try{
        let order=Order.findByIdAndDelete(req.params.id);
        res.json({order});
    }
    catch(error){
        console.error(error.message);
    res.status(500).json({"message":"Internal Server Error"});
    }
})


module.exports=router;