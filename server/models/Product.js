const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true        
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    prices: {
        type: [Number],
        required: true
    },
    extraOptions: {
        type: [
            {
                text: {type: String, required: true},
                price: {type: Number, required: true}
            }
          ]
    }


}, {timestamps: true})

module.exports = mongoose.model('product', ProductSchema)