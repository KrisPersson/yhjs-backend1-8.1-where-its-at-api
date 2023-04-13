const { getEvents } = require('../models/events.model')

async function getAllEventsCtrl(request, response) {
    const events = await getEvents()
    response.json({ success: true, events })
}

module.exports = { getAllEventsCtrl }
