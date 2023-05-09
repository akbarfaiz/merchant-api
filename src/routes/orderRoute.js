const express = require('express')
const router = express.Router()
const {createOrder,getOrder,getOrderById,getOrderByMonth,getOrderByProduct,getOrderByCity} = require('../controller/orderController')
const { protect } = require('../middleware/authProtect')

router.get('/detail/:id',getOrderById)
router.get('/month/:month',getOrderByMonth)
router.get('/product/:product_id',getOrderByProduct)
router.get('/city/:city_id',getOrderByCity)
router.post('/create',protect,createOrder)
router.get('/',getOrder)

module.exports = router