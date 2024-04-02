const express=require('express')
const router=express.Router();
const fetchadmin=require('../middleware/fetchadmin');
const fetchuser=require('../middleware/fetchuser')
const Order=require('../models/Order')
const Product=require('../models/Products')
const User=require('../models/User');
const Appmember=require('../models/AppMember');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/postorder',fetchuser, async (req,res)=>{
    success=false;
    try{
        
        
        if(req.body.cart.length==0)
        {
            return res.json({success,"message":"no products "})
        }
        
        let price=0;
        let productnames=[]
        for(let i=0;i<req.body.cart.length;i++)
        {
            
            let tempid=req.body.cart[i];
            let product=await Product.findById(tempid);
            if(!product)
            {
                
                return res.json({success,"message":"wrong product"})
                
            }
            productnames.push(product.name);
            price+=parseInt(product.price);
            

        }
        let user=await User.findById(req.body.buyer)
        if(!user)
        {
            
            return res.json({success,"message":"wrong user"});
        }
        
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

router.post('/create-checkout-session', async (req, res) => {
    try {
        
        const { price } = req.body;

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Total Amount', // You can name this whatever you want
                        },
                        unit_amount: price * 100, // Convert price to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://dribbble.com/shots/5902176-Payment-Success-page', // URL to redirect to after successful payment
            cancel_url: 'https://webflow.com/made-in-webflow/website/failed-payment-page', // URL to redirect to after payment is canceled
        });

        // Send the checkout session URL to the frontend
        res.status(200).json({ sessionUrl: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Error creating checkout session');
    }
});

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