const express = require('express')
const router = express.Router()
const {createMerchant,getMerchant,getMerchantByName,getMerchantById} = require('../controller/merchantController')

router.get('/detail/:id',getMerchantById)
router.get('/search',getMerchantByName)
router.post('/create',createMerchant)
router.get('/',getMerchant)

module.exports = router