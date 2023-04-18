const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares/middleware')


const { getSpecificTicketCtrl, verifyTicketCtrl, purchaseTicketCtrl } = require('../controllers/tickets.controller')

router.get('/', getSpecificTicketCtrl)
router.post('/verify', verifyTicketCtrl)
router.post('/purchase', verifyToken, purchaseTicketCtrl) 



module.exports = { ticketsRouter: router }
