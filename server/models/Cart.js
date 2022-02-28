const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    products : [
        {
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }
    ]
})

module.exports = mongoose.model('cart', CartSchema)