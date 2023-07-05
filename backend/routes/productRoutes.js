const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const Review = require('../models/review');



router.get('/products',async(req,res)=>{

    try{
        const products= await Product.find({});
        res.json(products);
    }
    catch(e){
        console.log('Error in getting products');
    }
})

// CRUD Operations
// to create new product
router.post('/products',async(req,res)=>{
    //console.log(req.body);

    const product = await Product.create(req.body);

    res.status(200).json(product);

    //res.send('Shopping-App Working');
})

// to show a particular  product by id
router.get('/products/:id',async(req,res)=>{

    const product = await Product.findById(req.params.id).populate('reviews');
    
    res.json(product);
})

// edit route:- to edit any product item

router.get('/products/:id/edit',async (req,res)=>{

    const product = await Product.findById(req.params.id);

    res.json(product);
})

// patch route:- to patch(to make some changes) any product item

router.patch('/products/:id',async (req,res)=>{

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body);

    res.json(updatedProduct);
})

// delete route- to delete product item

router.delete('/products/:id',async (req,res)=>{

    await Product.findByIdAndDelete(req.params.id);

    res.json("deleted successfully");
})

// create a reiew for a product item

router.post('/products/:id/review',async (req,res)=>{
    
    //console.log(req.body);
    //res.send('Review route works');
    try{
        // find the product
        const product = await Product.findById(req.params.id);

        // then created a new review
        const review = new Review({
            // then spread the ratings and reviews using spread operator
            ...req.body
        })

        // then push the current review into product's reviews array
        product.reviews.push(review);

        //then save the review
        await review.save();
        await product.save();

        res.status(200).json(product);
    }
    catch(e){
        res.send("Error while creating review");
    }    
})


module.exports = router;