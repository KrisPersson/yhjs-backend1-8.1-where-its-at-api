const { Router } = require('express')
const router = Router()

const { userRegisterCtrl, userLoginCtrl, verifyTokenCtrl } = require('../controllers/user.controller')

router.post('/register', userRegisterCtrl)
router.post('/login', userLoginCtrl) 
router.get('/verify', verifyTokenCtrl)


module.exports = { userRouter: router }
