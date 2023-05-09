const express = require('express')
const router = express.Router()
const Users =   require('./usersRoute')
const City =   require('./cityRoute')
const Merchant =   require('./merchantRoute')
const Product =   require('./productRoute')
const Status =   require('./statusRoute')
const Order =   require('./orderRoute')
const OrderStatus =   require('./orderStatusRoute')

router.use('/users',Users)
router.use('/city',City)
router.use('/merchant',Merchant)
router.use('/product',Product)
router.use('/status',Status)
router.use('/order',Order)
router.use('/orderStatus',OrderStatus)

router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Merchant API !!!' });   
})

module.exports = router