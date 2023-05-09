const express = require('express')
const router = express.Router()
const {createOrderStatus,getOrderStatus,getOrderStatusById} = require('../controller/orderStatusController')

router.get('/detail/:id',getOrderStatusById)
router.post('/create',createOrderStatus)
router.get('/',getOrderStatus)

module.exports = router