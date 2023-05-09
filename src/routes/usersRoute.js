const express = require('express')
const router = express.Router()
const {createUsers,getAllUser,loginUsers,updateUser} = require('../controller/usersController')
const { protect } = require('../middleware/authProtect')

router.post('/register',createUsers)
router.post('/login',loginUsers)
router.get('/list',protect,getAllUser)
router.put('/update',protect,updateUser)

module.exports = router