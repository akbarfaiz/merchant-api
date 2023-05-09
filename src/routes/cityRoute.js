const express = require('express')
const router = express.Router()
const {createCity,getCity,getCityByName,getCityById} = require('../controller/cityController')

router.get('/detail/:id',getCityById)
router.get('/search',getCityByName)
router.post('/create',createCity)
router.get('/',getCity)

module.exports = router