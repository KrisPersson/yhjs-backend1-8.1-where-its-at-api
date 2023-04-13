const { Router } = require('express')
const router = Router()

const { getAllEventsCtrl } = require('../controllers/events.controller')

router.get('/', getAllEventsCtrl) 

module.exports = { eventsRouter: router }
