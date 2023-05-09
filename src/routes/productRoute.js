const express = require('express')
const router = express.Router()
const {createProduct,getProduct,getProductByName,getProductById} = require('../controller/productController')

router.get('/detail/:id',getProductById)
router.get('/search',getProductByName)
router.post('/create',createProduct)
router.get('/',getProduct)

module.exports = router