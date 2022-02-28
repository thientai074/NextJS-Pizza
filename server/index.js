const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser()) 
app.use(cors())
app.use(express.json())
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern-pizza', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Ket noi Database thanh cong !!!!')
    } catch (error) {
        console.log(error)
    }
}
connectDB()

app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/cart', cartRouter)

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))