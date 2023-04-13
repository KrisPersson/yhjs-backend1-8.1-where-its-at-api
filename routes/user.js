const { Router } = require('express')
const router = Router()

const { userRegisterCtrl, userLoginCtrl } = require('../controllers/user.controller')

router.post('/register', userRegisterCtrl)
router.post('/login', userLoginCtrl) 


module.exports = { userRouter: router }
