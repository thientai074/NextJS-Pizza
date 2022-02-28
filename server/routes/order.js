const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

// Create order
router.post('/', async(req, res) => {
    const { customer, address, total, status, method} = req.body
    try {
        const newOrder = new Order({
            customer, 
            address, 
            total, 
            status, 
            method
        })
        await newOrder.save()
        res.json(newOrder)

    } catch (error) {
        console.log(error)
        res.json('Internal server error')
    }
})

// get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.json('Internal server error')        
    }
})

// delete Order
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)       
        res.json('Order has been deleted')
    } catch (error) {
        console.log(error)
        res.json('Internal server error')    
    }
})

// update Order
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedOrder)

    } catch (error) {
        console.log(error)
        res.json('Internal server error')          
    }
})

module.exports = router