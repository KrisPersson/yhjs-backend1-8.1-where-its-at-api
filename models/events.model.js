const { eventsDb } = require('../db')


async function getEvents() {
    return eventsDb.find({})
}

module.exports = { getEvents }
