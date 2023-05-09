const express = require('express')
const router = express.Router()
const {createStatus,getStatus,getStatusById} = require('../controller/statusController')

router.get('/detail/:id',getStatusById)
router.post('/create',createStatus)
router.get('/',getStatus)

module.exports = router