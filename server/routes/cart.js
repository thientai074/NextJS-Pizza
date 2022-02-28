const express = require('express')
const Cart = require('../models/Cart')
const router = express.Router()

// Create
router.post('/', async (req, res) => {    
    const {products} = req.body
    try {
        const savedCart = new Cart({
            products,
            user: req.userId
        })
        
        res.json(savedCart)
    } catch (error) {
        console.log(error)
        res.json('Internal server error')
    }    
})

// Get all Cart
router.get('/', async (req, res)=> {
    try {
        const carts = await Cart.find({user: req.userId})
        res.json(carts)
    } catch(error) {
        console.log(error)
        res.json('Internal server error')
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.json({
            message: 'Updated Cart Successfully',
            updatedCart
        })
    } catch (error) {
        console.log(error)
        res.json('Internal server error')
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id)
        res.json({
            message: 'Deleted Cart successfully',
            deletedCart
        })
    } catch(error) {
        console.log(error)
        res.json('Internal server error')
    }
})


module.exports = router