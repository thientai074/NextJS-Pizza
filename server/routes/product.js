const express = require('express')
const router = express.Router()
const Product = require('../models/Product')


// create product
router.post('/', async (req, res) => {
    const {title, desc, img, prices, extraOptions} = req.body
    try {
        const newProduct = new Product({
            title, 
            desc, 
            img, 
            prices,
            extraOptions,
            user: req.userId
        })
        await newProduct.save()
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        res.json('Internal server error')
    }
})

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)

    } catch(error) {
        console.log(error)
        res.json('Internal server error')
    }        
    }
)

// Get product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)

    } catch (error) {
        console.log(error)
        res.json('Internal server error')
    }
})
// delete Product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.json({
            message: 'Product has been deleted',
            deletedProduct
        })       
    } catch (error) {
        console.log(error)
        res.json('Internal server error')    
    }
})

// Update product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true})
            res.json({
                message: 'Updated successfully',
                updatedProduct
            })
    } catch (error) {
        console.log(error)
        res.json('Internal server error')    
    }
})

module.exports = router