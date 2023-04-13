const { Router } = require('express')
const router = Router()

const { getSpecificTicketCtrl, verifyTicketCtrl, purchaseTicketCtrl } = require('../controllers/tickets.controller')

router.get('/', getSpecificTicketCtrl)
router.post('/verify', verifyTicketCtrl)
router.post('/purchase', purchaseTicketCtrl) 



module.exports = { ticketsRouter: router }
