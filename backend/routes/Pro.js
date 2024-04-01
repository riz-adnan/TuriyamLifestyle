const express = require('express');
const Products = require('../models/Products');
const router = express.Router();
const fetchadmin=require('../middleware/fetchadmin')
//Route1: Get All Products. No Login Required

router.get('/', async (req,res)=>{
    const prod=await Products.find()
    res.json(prod);
})


//Route2:Add Products. Admin Login Required

router.post('/addprod',fetchadmin,

async (req,res)=>{
    try {
        const { name,price,urltoimage , description, category } = req.body;

        
        
        const prod = new Products({
            name,price,urltoimage , description, category
        })
        const savedProd = await prod.save()

        res.json(savedProd)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// update product
    router.put('/updateprod/:id',fetchadmin,
    async (req,res)=>{
        const {name,price,urltoimage , description, category }=req.body;
       try{
        const newProd={};
            

            let prod= await Products.findById(req.params.id);
            if(name) {newProd.name=name}
            else {newProd.name=prod.name}
            if(price){newProd.price=price}
            else {newProd.price=prod.price}
            if(urltoimage){newProd.urltoimage=urltoimage}
            else {newProd.urltoimage=prod.urltoimage}
            if(description) {newProd.description=description}
            else {newProd.description=prod.description}
            if(category) {newProd.category=category}
            else {newProd.category=prod.category}

            if(!prod){
                return res.status(404).send("Not Found");
            }
            
            prod= await Products.findByIdAndUpdate(req.params.id,{$set:newProd},{new:true});
            res.json(prod);

        }
       
       catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error");
       }
    })
//delete note.
router.delete('/deleteprod/:id', fetchadmin, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let prod = await Products.findById(req.params.id);
        if (!prod) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
       
        prod = await Products.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", prod: prod });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports=router;